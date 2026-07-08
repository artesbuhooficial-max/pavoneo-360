/**
 * PAVONEO 360° — Publicador a GitHub (reemplazo gratuito del webhook n8n)
 * ---------------------------------------------------------------------------
 * Recibe el expediente de un artista por POST, valida privacidad y hace commit
 * a data/artistas/{slug}.json en el repo de GitHub Pages. Devuelve JSON con el
 * resultado para que el botón muestre "Publicado ✓" o el error.
 *
 * CONFIGURACIÓN (una sola vez):
 *   1. Pega este código en un proyecto nuevo de https://script.google.com
 *   2. Configuración del proyecto (⚙) → Propiedades del script → añade:
 *        GITHUB_TOKEN = <token fine-grained con permiso "Contents: Read and write" sobre el repo pavoneo-360>
 *      (opcionales, ya tienen valor por defecto correcto:)
 *        GITHUB_OWNER  = artesbuhooficial-max
 *        GITHUB_REPO   = pavoneo-360
 *        GITHUB_BRANCH = main
 *   3. Implementar → Nueva implementación → Aplicación web
 *        · Ejecutar como: Yo
 *        · Quién tiene acceso: Cualquier persona
 *      Copia la URL /exec y pásasela a Claude para pegarla en oficina/material/calendario.
 *
 * El token NO se guarda aquí: vive en las propiedades del script (privado).
 */

var FORBIDDEN_KEYS = ['dni','nie','nif','telefono','phone','movil','direccion','address',
  'iban','rgpd','gdpr','contrato','contract','transcripcion','transcript','pdf_firmado',
  'firma','email_privado','password','token'];
var RE_DNI  = /\b\d{8}[A-Za-z]\b/;
var RE_NIE  = /\b[XYZxyz]\d{7}[A-Za-z]\b/;
var RE_IBAN = /\b[A-Za-z]{2}\d{2}[A-Za-z0-9]{10,30}\b/;
var RE_MAIL = /\b[\w.+-]+@[\w-]+\.[A-Za-z]{2,}\b/;

function prop_(k, def){
  var v = PropertiesService.getScriptProperties().getProperty(k);
  return v || def;
}

function out_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(){
  return out_({ status:'ok', message:'Pavoneo publicador activo. Usa POST con el expediente del artista.' });
}

function doPost(e){
  try{
    var payload = JSON.parse(e.postData.contents);
    var violations = validate_(payload);
    if(violations.length){
      return out_({ status:'error', message:'Validación de privacidad fallida', violations: violations });
    }
    var commitSha = commit_(payload);
    return out_({ status:'ok', artistId: payload.artistId, message:'Publicado correctamente', commit: commitSha });
  }catch(err){
    return out_({ status:'error', message: String(err) });
  }
}

function validate_(payload){
  var v = [];
  scan_(payload, '', v);
  if(!payload.artistId || !/^[a-z0-9-]+$/.test(String(payload.artistId))){
    v.push('artistId ausente o con formato no válido (debe ser slug: minúsculas, números y guiones)');
  }
  return v;
}

function scan_(obj, path, v){
  if(obj === null || obj === undefined) return;
  if(Array.isArray(obj)){
    for(var i=0;i<obj.length;i++) scan_(obj[i], path+'['+i+']', v);
    return;
  }
  if(typeof obj === 'object'){
    Object.keys(obj).forEach(function(k){
      var lk = k.toLowerCase();
      var cp = path ? path+'.'+k : k;
      if(FORBIDDEN_KEYS.some(function(fk){ return lk.indexOf(fk) !== -1; })){
        v.push('Clave prohibida encontrada: "'+cp+'"');
      }
      scan_(obj[k], cp, v);
    });
    return;
  }
  if(typeof obj === 'string'){
    if(RE_DNI.test(obj) || RE_NIE.test(obj)) v.push('Posible DNI/NIE detectado en "'+path+'"');
    if(RE_IBAN.test(obj) && obj.replace(/\s/g,'').length >= 15) v.push('Posible IBAN detectado en "'+path+'"');
    if(RE_MAIL.test(obj) && path.toLowerCase().indexOf('publiclinks') === -1){
      v.push('Posible email detectado en "'+path+'" (fuera de publicLinks)');
    }
  }
}

function commit_(payload){
  var owner  = prop_('GITHUB_OWNER',  'artesbuhooficial-max');
  var repo   = prop_('GITHUB_REPO',   'pavoneo-360');
  var branch = prop_('GITHUB_BRANCH', 'main');
  var token  = prop_('GITHUB_TOKEN',  null);
  if(!token) throw 'Falta GITHUB_TOKEN en las propiedades del script';

  var path = 'data/artistas/' + payload.artistId + '.json';
  var api  = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path;
  var headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'pavoneo-publicador'
  };

  // 1) Obtener el SHA si el archivo ya existe (para actualizar en vez de crear)
  var sha = null;
  var getRes = UrlFetchApp.fetch(api + '?ref=' + branch, { method:'get', headers: headers, muteHttpExceptions:true });
  if(getRes.getResponseCode() === 200){
    sha = JSON.parse(getRes.getContentText()).sha;
  }

  // 2) Crear/actualizar el archivo
  var content = JSON.stringify(payload, null, 2) + '\n';
  var body = {
    message: (sha ? 'Sync: actualizar ' : 'Sync: crear ') + payload.artistId + ' desde panel de oficina',
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    branch: branch
  };
  if(sha) body.sha = sha;

  var putRes = UrlFetchApp.fetch(api, {
    method: 'put', headers: headers, contentType: 'application/json',
    payload: JSON.stringify(body), muteHttpExceptions: true
  });
  var code = putRes.getResponseCode();
  if(code !== 200 && code !== 201){
    throw 'GitHub API ' + code + ': ' + putRes.getContentText();
  }
  return JSON.parse(putRes.getContentText()).commit.sha;
}
