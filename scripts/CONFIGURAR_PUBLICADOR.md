# Configurar el publicador (Google Apps Script → GitHub)

Sustituye al webhook de n8n (caducado) por una webapp gratuita de Google Apps Script que
recibe el expediente del artista, valida privacidad y hace commit a GitHub. **Sin cuenta
nueva y sin límites para tu volumen.** Se hace una sola vez (~10 min).

## Paso 1 · Crear un token de GitHub (fine-grained)

1. Entra en https://github.com/settings/personal-access-tokens/new (sesión de `artesbuhooficial-max`).
2. **Token name:** `pavoneo-publicador`. **Expiration:** 1 año (o sin caducidad).
3. **Resource owner:** `artesbuhooficial-max`.
4. **Repository access → Only select repositories →** marca `pavoneo-360`.
5. **Permissions → Repository permissions → Contents →** `Read and write`.
6. Genera el token y **cópialo** (empieza por `github_pat_...`). Solo se ve una vez.

## Paso 2 · Crear la webapp de Apps Script

1. Entra en https://script.google.com → **Nuevo proyecto**.
2. Borra el contenido y pega **todo** el código de `apps-script-publicar.gs` (esta misma carpeta).
3. Ponle nombre al proyecto: `Pavoneo Publicador`.
4. Icono ⚙ (**Configuración del proyecto**) → baja a **Propiedades del script** →
   **Añadir propiedad de script**:
   - Propiedad: `GITHUB_TOKEN` · Valor: *(pega el token del paso 1)*
   - Guardar.
   *(No hace falta añadir owner/repo/branch: ya tienen el valor correcto por defecto.)*

## Paso 3 · Publicar la webapp

1. Botón **Implementar** (arriba a la derecha) → **Nueva implementación**.
2. Rueda dentada → tipo **Aplicación web**.
3. Configura:
   - **Descripción:** `pavoneo v1`
   - **Ejecutar como:** *Yo* (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona**
4. **Implementar** → autoriza los permisos que pida (tu propia cuenta).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

## Paso 4 · Conectar el sistema

Pásame esa URL `/exec` y la pego en los tres sitios que publican
(`oficina/index.html`, `artistas/material.html`, `artistas/calendario.html`) y hago push.
A partir de ahí, el botón **"Publicar cambios"** confirma **"Publicado ✓"** y el commit
aparece en GitHub en segundos.

> Si más adelante cambias el código del script, usa **Implementar → Gestionar
> implementaciones → editar (lápiz) → Nueva versión**. La URL `/exec` NO cambia.

## Prueba rápida (opcional)

Pega la URL `/exec` en el navegador: debe responder
`{"status":"ok","message":"Pavoneo publicador activo..."}`. Si responde eso, está viva.

## Mientras no esté configurado

El botón "Publicar cambios" descarga el JSON (alternativa local): guárdalo en `inbox/` y
haz doble clic en `scripts/Sincronizar_Pavoneo.bat`.
