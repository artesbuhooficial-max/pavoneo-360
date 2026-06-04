# Pavoneo 360 Master

Proyecto maestro para publicar el seguimiento Pavoneo 360 en GitHub Pages.

## Objetivo

Este repo separa tres capas:

- `oficina/`: vista interna para saltar entre procesos, validar estados y preparar instrucciones.
- `artistas/`: vista de artista, bloqueada paso a paso.
- `mezcla/`: app de mezcla/revision con branding Pavoneo, enlazable desde postproduccion.
- `data/artistas/`: JSON publico y minimo por artista.
- `private/`: material sensible local. No se publica.
- `inbox/`: JSON exportados desde oficina antes de sincronizar.

## URLs en GitHub Pages

Si el repo se llama `pavoneo-360`, la URL de prueba sera:

```text
https://USUARIO.github.io/pavoneo-360/
https://USUARIO.github.io/pavoneo-360/oficina/
https://USUARIO.github.io/pavoneo-360/artistas/?id=artista-001
https://USUARIO.github.io/pavoneo-360/mezcla/
```

Si se crea una organizacion o usuario llamado `pavoneo`, podria existir:

```text
https://pavoneo.github.io/
```

No existe `pavoneo.github.com` como formato normal de GitHub Pages.

## Datos publicos

Cada artista tiene un JSON publico:

```text
data/artistas/artista-001.json
data/artistas/epi-brass.json
data/artistas/luna-roja.json
```

Ese JSON solo debe contener estado operativo:

- `artistId`
- nombre publico
- pack
- bloque actual
- bloque desbloqueado
- enlaces publicos o no sensibles
- timing publico del dia de grabacion
- estado por pasos

No debe contener:

- RGPD
- contratos
- DNI/NIE/NIF
- direcciones
- telefonos
- emails privados
- transcripciones
- PDFs firmados

## Flujo de oficina

1. Oficina abre `oficina/`.
2. Pulsa `Oficina` e introduce la clave provisional `pavoneo360`.
3. Cambia el estado del expediente.
4. Exporta el JSON del artista.
5. Deja el JSON en `inbox/`.
6. Ejecuta `scripts/Sincronizar_Pavoneo.bat`.
7. El script valida privacidad.
8. Si todo esta bien, actualiza `data/artistas/ARTISTA.json`.
9. Hace commit y push.
10. GitHub Pages publica la version nueva.

Nota: esta clave es una barrera visual de front-end para evitar accesos accidentales. No sustituye permisos reales de servidor.

## Accesos necesarios

Para que Codex pueda crear/subir el repo necesito una de estas opciones:

### Opcion recomendada

GitHub CLI autenticado en este equipo:

```text
gh auth login
```

Con permisos para crear repo o escribir en un repo existente.

### Opcion alternativa

Un token fino de GitHub con permisos solo sobre este repo:

- Contents: Read and write
- Metadata: Read
- Pages: Read and write, solo si vamos a configurar Pages por API

No compartir contrasena de GitHub.

## Primer commit sugerido

```text
Inicializar proyecto maestro Pavoneo 360
```

## Pendiente siguiente

- Conectar `oficina/` para exportar JSON real a `inbox/`.
- Conectar `artistas/` para cargar `data/artistas/{id}.json`.
- Ajustar la app `mezcla/` cuando se defina el flujo final de subida/correcciones.
- Crear el agente Claude Code `gestor-expedientes-pavoneo`.
