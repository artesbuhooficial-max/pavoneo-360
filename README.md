# Pavoneo 360 Master

Proyecto maestro para publicar el seguimiento Pavoneo 360 en GitHub Pages.

## Estructura del repo

```
pavoneo-360/
├── index.html              Redirección automática a oficina/
├── enlaces.html            Registro de todos los enlaces publicados
├── oficina/
│   ├── index.html          Panel interno de gestión de expedientes
│   └── global.html         Dashboard general: todos los artistas, pipeline y documentos
├── artistas/
│   ├── index.html          Vista del artista (misma app, modo cliente forzado por URL)
│   ├── material.html       Portal de entrega de material del artista (?id={slug})
│   └── calendario.html     Calendario editorial interactivo del artista (?id={slug})
├── mezcla/
│   └── index.html          App React de revisión de mezcla / Mix Studio
├── data/
│   ├── artistas/
│   │   ├── index.json        Manifest de artistas (alimenta oficina/global.html)
│   │   └── {slug}.json       JSON público por artista (fuente de verdad publicada)
│   └── historico/
│       └── {slug}.json       Snapshots automáticos de progreso (GitHub Action diaria)
├── inbox/                  Staging local — los .json aquí nunca se commitean
├── private/                Material sensible local — nunca se publica
└── scripts/
    ├── Sincronizar_Pavoneo.bat   Lanzador Windows del script de sync
    └── Sincronizar_Pavoneo.ps1   Script de sincronización (pendiente implementar)
```

## URLs en GitHub Pages

```
https://artesbuhooficial-max.github.io/pavoneo-360/
https://artesbuhooficial-max.github.io/pavoneo-360/oficina/
https://artesbuhooficial-max.github.io/pavoneo-360/artistas/?id=artista-001
https://artesbuhooficial-max.github.io/pavoneo-360/mezcla/
```

## Clave de acceso a la oficina

```
pavoneo360
```

Se introduce al pulsar el boton "Oficina" en el panel. Es una barrera visual de front-end
para evitar accesos accidentales. No sustituye permisos reales de servidor — la clave
esta visible en el codigo fuente.

## Capas del sistema

### `oficina/index.html` — Panel interno

Panel de gestion de expedientes de artistas. Dos modos:

- **Modo Oficina** (requiere clave): sidebar con navegacion entre los 8 bloques del proceso,
  KPIs de progreso, formularios internos, timing editable del dia de grabacion, calendario
  editorial, alertas y resumen de incidencias.
- **Modo Artista**: oculta toda la capa interna. El artista ve solo su bloque activo.

Estado persistido en `localStorage` del navegador. No hace fetch a ningun servidor propio.

Boton **Exportar JSON**: descarga el expediente del artista como `.json` para depositarlo
manualmente en `inbox/`.

Boton **Publicar cambios**: envia el JSON directamente al webhook de n8n via POST.
Muestra "Publicando...", "Publicado ✓" o "Error al publicar" segun la respuesta.
Si el webhook no esta configurado, cae de vuelta a la descarga del JSON.

Los 8 bloques del proceso:

| # | id | Titulo | Responsable |
|---|---|---|---|
| 01 | contacto | Entrada en Pavoneo | Equipo AB |
| 02 | formulario | Dashboard, preconsultoria e Info Maestra | Oficina + Cliente |
| 03 | briefing | Briefing y preproduccion | Oficina + David |
| 04 | grabacion | Grabacion en estudio | David + Artista |
| 05 | postproduccion | Postproduccion | David + Miriam |
| 06 | lanzamiento | Calendario editorial | Miriam |
| 07 | inversion | Inversion en redes sociales | Miriam + Hector (solo Premium) |
| 08 | cierre | Consultoria de cierre | Por definir |

### `artistas/index.html` — Vista del artista

Mismo codigo que `oficina/index.html`. La diferencia es que cuando la URL contiene
`/artistas/`, la constante `ARTIST_ROUTE` es `true` y fuerza modo cliente permanente
(el toggle de modo queda oculto).

Al cargar, hace `fetch` a `../data/artistas/{id}.json` (donde `{id}` viene del parametro
`?id=` de la URL). Si el fetch falla o no hay `?id=`, cae de vuelta a `localStorage`
sin romper nada.

### `mezcla/index.html` — Mix Studio

App React 18 (CDN + Babel standalone, sin build step). Herramienta para la sesion de
postproduccion:

- Carga audio local y dibuja forma de onda (Web Audio API + Canvas).
- Marcas de instrumento en el timeline (27 instrumentos en 6 grupos).
- Tabla de estructura por cancion: secciones, tomas, dinamicas.
- Formulario de creditos: ISRC, UPC, integrantes, productor, mezcla, mastering.
- Pestaña Stems: enlace a Moises.ai para separacion de pistas con IA.
- Guarda/carga sesiones como `_mix.json` local.
- Boton Enviar: POST a Google Sheets via Apps Script (`no-cors`).

### `data/artistas/{id}.json` — Fuente de verdad publica

JSON minimo por artista. Campos:

```json
{
  "artistId": "artista-001",
  "displayName": "Nombre del artista",
  "pack": "basico",
  "currentStep": "contacto",
  "unlockedUntil": "contacto",
  "updatedAt": "2026-06-17",
  "publicLinks": {
    "infoMaestra": "",
    "materialesPublicos": "",
    "artifactCloud": "https://...",
    "mixApp": "../mezcla/"
  },
  "recordingTiming": [ ... ],
  "editorialCalendar": [ ... ],
  "steps": {
    "contacto": { "status": "active" },
    ...
  }
}
```

No debe contener: RGPD, contratos, DNI/NIE/NIF, direcciones, telefonos,
emails privados, transcripciones ni PDFs firmados.

## Flujo de sincronizacion (activo)

```
oficina/index.html
    └── boton "Publicar cambios"
            └── POST JSON → https://artesbuho.app.n8n.cloud/webhook/pavoneo-sync
                    └── n8n valida privacidad
                            └── commit → data/artistas/{id}.json
                                    └── GitHub Pages publica
                                            └── artistas/?id={id} lo lee al refrescar
```

El webhook de n8n es la pieza que sustituye al script `Sincronizar_Pavoneo.ps1`
(que sigue vacio — puede eliminarse o implementarse como alternativa local).

## Flujo alternativo manual (sin webhook)

1. Oficina abre `oficina/`.
2. Introduce la clave `pavoneo360`.
3. Cambia el estado del expediente.
4. Pulsa "Exportar JSON" y descarga el archivo.
5. Deposita el JSON en `inbox/`.
6. Ejecuta `scripts/Sincronizar_Pavoneo.bat` (pendiente implementar el `.ps1`).
7. El script valida privacidad, actualiza `data/artistas/`, hace commit y push.

## Mapa de conexiones

```
index.html (raiz)
    └── redirect → oficina/index.html

oficina/index.html
    ├── lee/escribe  → localStorage (estado del panel)
    ├── POST JSON    → webhook n8n (boton "Publicar cambios")
    ├── descarga     → inbox/{artista}.json (boton "Exportar JSON")
    ├── enlaza       → Google Forms (formulario preconsultoria)
    ├── enlaza       → Google Doc (Info Maestra, campo editable)
    └── enlaza       → ../mezcla/

artistas/index.html
    ├── fetch        → ../data/artistas/{id}.json (al cargar, segun ?id=)
    └── fallback     → localStorage (si fetch falla)

mezcla/index.html
    ├── lee          → audio local (Web Audio API)
    ├── lee/escribe  → {proyecto}_mix.json (local)
    └── POST         → Google Sheets (Apps Script)

data/artistas/*.json
    └── escribe      → n8n webhook (desde oficina)
    └── lee          → artistas/index.html (al cargar)

private/             ← nunca se publica (.gitignored)
inbox/*.json         ← nunca se publica (.gitignored)
```

## Estado del proyecto (junio 2026)

| Componente | Estado |
|---|---|
| Panel de oficina (8 pasos, KPIs, timing, calendario editorial) | Completo |
| Vista artista con carga desde JSON publico | Completo |
| Boton "Publicar cambios" wired a n8n | Completo |
| Webhook n8n recibe POST y hace commit | Activo |
| App Mix Studio (mezcla/) | Completa |
| Dashboard general de oficina (oficina/global.html) | Completo |
| Manifest de artistas (data/artistas/index.json) | Activo |
| Portal de entrega de material (artistas/material.html) | Completo |
| Calendario editorial interactivo (artistas/calendario.html) | Completo |
| Histórico de progreso (.github/workflows/historico.yml) | Activo |
| JSON publico por artista (formato y ejemplo) | Definido |
| Script Sincronizar_Pavoneo.ps1 (alternativa local) | Pendiente |

## Git — operaciones con SSL

Este equipo tiene un problema de certificado SSL con GitHub. Usar siempre:

```bash
git -c http.sslVerify=false fetch origin
git -c http.sslVerify=false pull origin main
git -c http.sslVerify=false push origin main
```

Para clonar:

```bash
git -c http.sslVerify=false clone https://github.com/artesbuhooficial-max/pavoneo-360.git
```
