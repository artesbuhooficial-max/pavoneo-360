"use strict";
const $ = id => document.getElementById(id);
const KEY = "artesbuho-bime-tarjetas-v2";
const states = ["Pendiente", "Grabada", "Seleccionada", "Montada", "Publicada"];
const fields = ["status", "take", "range", "quote", "notes", "caption", "url"];
const durations = [30, 45, 60, 90, 120];
const initialState = c => ({priority: !!c.priority, status: "Pendiente", duration: 45, take: "", range: "", quote: "", notes: "", url: "", caption: `${c.title}\n\n[BORRADOR: completar con la idea real del entrevistado después de grabar.]\n\n${c.cta}`});
let data = Object.fromEntries(cards.map(c => [c.id, initialState(c)]));
let current = cards[0].id;
let remainingMs = 45000, deadline = 0, interval = null, pendingImport = null;
let storageAvailable = true;

function validateImport(value) {
  if (!value || typeof value !== "object" || ![1, 2].includes(value.version) || (value.version === 2 && value.app !== "artesbuho-bime") || !value.cards || typeof value.cards !== "object" || Array.isArray(value.cards)) throw Error("Formato de copia no compatible.");
  const clean = {};
  for (const card of cards) {
    if (!Object.hasOwn(value.cards, card.id)) continue;
    const source = value.cards[card.id];
    if (!source || typeof source !== "object" || Array.isArray(source)) throw Error(`Ficha inválida: ${card.id}.`);
    const target = initialState(card);
    if (Object.hasOwn(source, "priority")) {
      if (typeof source.priority !== "boolean") throw Error(`Prioridad inválida: ${card.id}.`);
      target.priority = source.priority;
    }
    for (const field of fields) {
      if (!Object.hasOwn(source, field)) continue;
      if (typeof source[field] !== "string" || source[field].length > 20000) throw Error(`Campo inválido o demasiado largo: ${card.id} / ${field}.`);
      target[field] = source[field];
    }
    if (!states.includes(target.status)) throw Error(`Estado inválido: ${card.id}.`);
    if (Object.hasOwn(source, "duration")) {
      if (!durations.includes(source.duration)) throw Error(`Duración inválida: ${card.id}.`);
      target.duration = source.duration;
    }
    clean[card.id] = target;
  }
  if (!Object.keys(clean).length) throw Error("La copia no contiene tarjetas reconocidas.");
  return clean;
}
function envelope() { return {app: "artesbuho-bime", version: 2, exportedAt: new Date().toISOString(), current, cards: data}; }
function notice(message) { $("notice").textContent = message; }
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(envelope()));
    storageAvailable = true;
    $("saveState").textContent = "Guardado en este navegador";
  } catch {
    storageAvailable = false;
    $("saveState").textContent = "Sin guardado · exporta copia";
    notice("El navegador no permite guardar. Las notas siguen en esta sesión: descarga una copia JSON antes de cerrar.");
  }
}
try {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    data = {...data, ...validateImport(parsed)};
    if (series.some(c => c.id === parsed.current)) current = parsed.current;
  }
  const probe = `${KEY}-probe`;
  localStorage.setItem(probe, "1"); localStorage.removeItem(probe);
} catch {
  storageAvailable = false;
  $("saveState").textContent = "Revisar guardado local";
  notice("No se pudo recuperar o comprobar el guardado local. Conserva tu copia JSON; descarga otra antes de salir si añades notas.");
}
function visibleCards() {
  return cards.filter(c => c.collection === $("collection").value && (!$("area").value || c.area === $("area").value) && (!$("priorityOnly").checked || data[c.id].priority));
}
function option(value, label) { const el = document.createElement("option"); el.value = value; el.textContent = label; return el; }
function areas() {
  $("area").replaceChildren(option("", "Todas las áreas"), ...[...new Set(cards.filter(c => c.collection === $("collection").value).map(c => c.area))].map(a => option(a, a)));
}
function updateProgress() {
  const collection = cards.filter(c => c.collection === $("collection").value);
  const done = collection.filter(c => data[c.id].status !== "Pendiente").length;
  $("progress").textContent = `${done} de ${collection.length} grabadas o posteriores`;
  $("progressBar").max = collection.length;
  $("progressBar").value = done;
  $("noteIndicator").textContent = ["take", "range", "quote", "notes", "url"].some(f => data[current][f]) ? "· con notas" : "";
}
function render() {
  const list = visibleCards();
  $("collectionLabel").textContent = $("collection").value === "series" ? "Serie principal · 9 vídeos" : "Banco extra · 15 preguntas";
  $("jump").replaceChildren(...list.map(c => option(c.id, `${c.id} · ${c.title}`)));
  $("jump").disabled = !list.length;
  $("card").hidden = !list.length;
  $("empty").hidden = !!list.length;
  $("prev").disabled = $("next").disabled = !list.length;
  if (!list.length) { $("position").textContent = "0 / 0"; updateProgress(); return; }
  if (!list.some(c => c.id === current)) current = list[0].id;
  const c = cards.find(c => c.id === current), s = data[current];
  for (const [id, value] of Object.entries({code: c.id, category: c.area, question: c.q, purpose: c.purpose, focus: c.focus, rescue: c.rescue, guard: c.guard, title: c.title, resource: c.resource, cta: c.cta})) $(id).textContent = value;
  for (const field of fields) $(field).value = s[field];
  $("priority").checked = s.priority;
  $("duration").value = String(s.duration);
  for (const [id, values] of [["beats", c.beats], ["extra", c.extra || []]]) $(id).replaceChildren(...values.map(value => { const li = document.createElement("li"); li.textContent = value; return li; }));
  $("extraDetails").hidden = !c.extra;
  $("jump").value = current;
  const index = list.findIndex(c => c.id === current);
  $("position").textContent = `${index + 1} / ${list.length}`;
  $("prev").disabled = index === 0; $("next").disabled = index === list.length - 1;
  updateProgress();
}
function updateClock() {
  const sec = Math.ceil(remainingMs / 1000);
  $("clock").textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  $("clock").classList.toggle("ending", sec <= 15);
  const hint = sec === 0 ? "Objetivo alcanzado. Cierra con una acción; puedes seguir hablando si lo necesitas." : sec <= 15 ? "Últimos segundos: una acción concreta para el artista." : "Idea → ejemplo → acción. No hace falta agotar el tiempo.";
  if ($("timerHint").textContent !== hint) $("timerHint").textContent = hint;
}
function pauseTimer() {
  if (interval !== null) { remainingMs = Math.max(0, deadline - Date.now()); clearInterval(interval); }
  interval = null; updateClock();
  $("timerButton").textContent = remainingMs === 0 ? "Repetir" : remainingMs === data[current].duration * 1000 ? "Iniciar" : "Continuar";
}
function resetTimer() {
  if (interval !== null) clearInterval(interval);
  interval = null; remainingMs = data[current].duration * 1000;
  updateClock(); $("timerButton").textContent = "Iniciar";
}
function changeCard(id, focus = false) {
  pauseTimer(); if (id) current = id;
  $("editing").open = false; $("extraDetails").open = false;
  render(); resetTimer(); save();
  if (focus && !$("card").hidden) { $("question").focus({preventScroll: true}); $("card").scrollIntoView({block: "start", behavior: "instant"}); }
}
for (const field of fields) $(field).addEventListener("input", () => { data[current][field] = $(field).value; save(); updateProgress(); });
$("priority").addEventListener("change", () => { data[current].priority = $("priority").checked; save(); if ($("priorityOnly").checked) changeCard(); });
$("collection").addEventListener("change", () => { areas(); changeCard(); });
for (const id of ["area", "priorityOnly"]) $(id).addEventListener("change", () => changeCard());
$("jump").addEventListener("change", () => { changeCard($("jump").value, true); $("organize").open = false; });
function move(step) { const list = visibleCards(), index = list.findIndex(c => c.id === current); if (list[index + step]) changeCard(list[index + step].id, true); }
$("prev").onclick = () => move(-1); $("next").onclick = () => move(1);
$("duration").onchange = () => { data[current].duration = Number($("duration").value); resetTimer(); save(); };
$("resetTimer").onclick = resetTimer;
$("timerButton").onclick = () => {
  if (interval !== null) { pauseTimer(); return; }
  if (remainingMs <= 0) resetTimer();
  deadline = Date.now() + remainingMs; $("timerButton").textContent = "Pausar";
  interval = setInterval(() => { remainingMs = Math.max(0, deadline - Date.now()); updateClock(); if (!remainingMs) pauseTimer(); }, 100);
};
document.addEventListener("visibilitychange", () => { if (!document.hidden && interval !== null) { remainingMs = Math.max(0, deadline - Date.now()); updateClock(); if (!remainingMs) pauseTimer(); } });

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const link = document.createElement("a"); link.href = url; link.download = name; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  notice("Exportación solicitada. Comprueba las descargas o el menú de archivos de tu navegador.");
}
function exportJSON() { download(`artesbuho-bime-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(envelope(), null, 2), "application/json"); }
$("exportJSON").onclick = $("backupBefore").onclick = exportJSON;
$("exportText").onclick = () => {
  const header = "# Artes Búho / Pavoneo 360° · Rodaje BIME\n\nGuías de entrevista y borradores; no son transcripciones ni afirmaciones de Román.\nMontaje: frase real → idea → ejemplo → acción. Revisar audio, subtítulos, permisos y texto antes de publicar.\n\n";
  const body = cards.map(c => { const s = data[c.id]; return [
    `## ${c.id} · ${c.title}`, `Colección: ${c.collection === "series" ? "Serie principal" : "Banco extra"} | Área: ${c.area}`, `Estado: ${s.status} | Prioritaria: ${s.priority ? "Sí" : "No"} | Objetivo: ${s.duration} s`,
    `Pregunta: ${c.q}`, `Propósito: ${c.purpose}`, `Enfoque: ${c.focus}`, `Guion de apoyo:\n${c.beats.map(x => "- " + x).join("\n")}`, c.extra ? `Ampliación:\n${c.extra.map(x => "- " + x).join("\n")}` : "", `Repregunta: ${c.rescue}`, `Criterio editorial: ${c.guard}`,
    `Archivo / toma: ${s.take || "PENDIENTE"}`, `Entrada / salida: ${s.range || "PENDIENTE"}`, `Frase REAL: ${s.quote || "PENDIENTE DE ESCUCHAR"}`, `Recurso sugerido: ${c.resource}`, `Recursos y notas: ${s.notes || "PENDIENTE"}`, `Pregunta de cierre (borrador): ${c.cta}`, `Texto de publicación (borrador):\n${s.caption}`, `Enlace publicado: ${s.url || "PENDIENTE"}`
  ].filter(Boolean).join("\n\n"); }).join("\n\n---\n\n");
  download("artesbuho-bime-fichas-montaje.md", header + body, "text/markdown;charset=utf-8");
};
$("importJSON").onclick = () => $("file").click();
$("file").onchange = async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    if (file.size > 2000000) throw Error("La copia supera los 2 MB.");
    const imported = validateImport(JSON.parse(await file.text()));
    pendingImport = imported;
    const ids = Object.keys(imported), mainCount = ids.filter(id => id.startsWith("BIME-")).length;
    $("importSummary").textContent = `${file.name}: ${ids.length} tarjetas reconocidas (${mainCount} de la serie principal y ${ids.length - mainCount} del banco extra).`;
    $("importDialog").showModal();
  } catch (error) { pendingImport = null; notice("No se pudo importar: " + error.message); }
  finally { event.target.value = ""; }
};
$("confirmImport").onclick = () => {
  if (!pendingImport) return;
  pauseTimer(); data = {...data, ...pendingImport}; pendingImport = null;
  $("importDialog").close(); render(); resetTimer(); save();
  notice(storageAvailable ? "Copia importada y guardada en este navegador." : "Copia importada solo para esta sesión. Descarga una copia antes de salir.");
};
$("cancelImport").onclick = () => { pendingImport = null; $("importDialog").close(); notice("Importación cancelada. Se conservan las notas actuales."); };
$("importDialog").addEventListener("cancel", () => { pendingImport = null; });
areas(); render(); resetTimer();
