/* ════════════════════════════════════════════════════════════
   CONFIG.JS — Epi&Brass
   Artes Búho · Sistema de control de acceso por nivel de servicio
   ════════════════════════════════════════════════════════════
   ESTE ARCHIVO LO EDITA ÚNICAMENTE ARTES BÚHO.
   El artista no necesita tocarlo ni saber que existe.

   Cómo desbloquear una sección cuando un cliente pasa a Infra
   (o a cualquier tier superior): cambia el valor de esa clave
   de `true` a `false` y haz commit. El cambio se refleja en la
   URL pública del cliente sin que él tenga que hacer nada.
   ════════════════════════════════════════════════════════════ */

window.PAVONEO_CONFIG = {

  // Identificación del cliente — solo informativo, no afecta a la lógica
  artistSlug: "epiybrass",
  artistName: "Epi&Brass",

  // Nivel de servicio contratado actualmente.
  // Valores posibles: "pavoneo" | "infra"
  // Esto es solo una etiqueta visual (se usa en el badge de la sidebar);
  // el bloqueo real lo controlan los flags de "locked" de abajo.
  tier: "pavoneo",

  // ── SECCIONES CON CANDADO ──────────────────────────────────
  // true  = bloqueada (el artista ve un aviso y no puede leer el contenido)
  // false = desbloqueada (contenido visible con normalidad)
  locked: {
    ficha:   true,   // Ficha Artística
    rider:   true,   // Rider Técnico & Formatos
    prensa:  true    // Notas de Prensa & Medios
  },

  // Texto que se muestra en el overlay de bloqueo.
  // Puedes personalizarlo por cliente si en algún momento quieres
  // un mensaje distinto (p.ej. una oferta concreta de upgrade).
  lockMessage: {
    title: "Contenido disponible en el plan Infra",
    body: "Esta sección forma parte de la ampliación de servicio Infra de Artes Búho. Si quieres desbloquearla, habla con tu gestor de proyecto.",
    cta: "Quiero más información"
  }
};
