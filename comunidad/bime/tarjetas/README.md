# Tarjetas de rodaje BIME

Aplicación estática de Artes Búho / Pavoneo 360°. GitHub Pages sirve esta carpeta desde `main`, sin compilación ni dependencias externas.

URL: https://artesbuhooficial-max.github.io/pavoneo-360/comunidad/bime/tarjetas/

- `cards.js`: nueve vídeos principales, en orden, con guías de entrevista y criterios editoriales.
- `bank.js`: quince preguntas secundarias del modelo de referencia.
- `app.js`: navegación, filtros, temporizador, estados, guardado y copias.
- `index.html` y `style.css`: interfaz móvil y metadatos para compartir.

Las notas se guardan en `localStorage` bajo `artesbuho-bime-tarjetas-v2`. No se envían a ningún servidor. JSON v2 identifica la aplicación y admite estados, notas y duración por tarjeta. La importación requiere confirmación y conserva las tarjetas que no figuran en el archivo. También acepta las tarjetas reconocidas de las copias v1 del modelo original. Los datos importados se muestran como texto, nunca como HTML.

No incluye grabación de vídeo, montaje, publicación, sincronización ni caché sin conexión. Las propuestas editoriales son borradores; las citas reales empiezan vacías.

Validación realizada con Chromium y perfil temporal: nueve tarjetas, quince del banco, filtros y vacío, persistencia, temporizador y duración por tarjeta, exportación JSON y Markdown, importación confirmada/cancelada/inválida, compatibilidad v1, contenido HTML tratado como texto y almacenamiento bloqueado. Revisión de anchos 320, 390, 768 y 1280 px. Las pruebas no usan cuentas ni notas personales.
