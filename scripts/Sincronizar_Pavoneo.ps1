param(
  [switch]$Push
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $ScriptDir "..")
$Inbox = Join-Path $Root "inbox"
$DataDir = Join-Path $Root "data\artistas"

function Fail($Message) {
  Write-Host ""
  Write-Host "ERROR: $Message" -ForegroundColor Red
  exit 1
}

function Test-Privacy($RawJson, $FileName) {
  $keywords = @(
    "dni", "nie", "nif", "rgpd", "contrato", "direccion", "dirección",
    "domicilio", "telefono", "teléfono", "email", "correo", "transcripcion",
    "transcripción", "iban", "firma", "pdf firmado"
  )

  foreach ($keyword in $keywords) {
    if ($RawJson -match "(?i)$([regex]::Escape($keyword))") {
      Fail "Privacidad bloqueada en $FileName. Detectado: $keyword"
    }
  }

  if ($RawJson -match "\b\d{8}[A-Za-z]\b") {
    Fail "Privacidad bloqueada en $FileName. Parece contener DNI/NIF/NIE."
  }

  if ($RawJson -match "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}") {
    Fail "Privacidad bloqueada en $FileName. Parece contener email."
  }

  if ($RawJson -match "(\+34\s*)?(\d[\s-]?){9,}") {
    Fail "Privacidad bloqueada en $FileName. Parece contener telefono."
  }
}

function ConvertTo-StableJson($Object) {
  return ($Object | ConvertTo-Json -Depth 30)
}

Set-Location $Root

if (-not (Test-Path $Inbox)) {
  New-Item -ItemType Directory -Path $Inbox | Out-Null
}

if (-not (Test-Path $DataDir)) {
  New-Item -ItemType Directory -Path $DataDir | Out-Null
}

$Files = Get-ChildItem -LiteralPath $Inbox -Filter "*.json" -File

if (-not $Files) {
  Write-Host "No hay JSON pendientes en inbox." -ForegroundColor Yellow
  exit 0
}

$Updated = @()

foreach ($File in $Files) {
  Write-Host "Revisando $($File.Name)..." -ForegroundColor Cyan
  $Raw = Get-Content -LiteralPath $File.FullName -Raw -Encoding UTF8
  Test-Privacy -RawJson $Raw -FileName $File.Name

  try {
    $Json = $Raw | ConvertFrom-Json
  } catch {
    Fail "JSON invalido: $($File.Name)"
  }

  if (-not $Json.artistId) {
    Fail "Falta artistId en $($File.Name)"
  }

  $ArtistId = [string]$Json.artistId
  if ($ArtistId -notmatch "^[a-z0-9][a-z0-9-]{1,80}$") {
    Fail "artistId invalido en $($File.Name). Usa solo minusculas, numeros y guiones."
  }

  $Target = Join-Path $DataDir "$ArtistId.json"
  ConvertTo-StableJson $Json | Set-Content -LiteralPath $Target -Encoding UTF8
  $Updated += "data/artistas/$ArtistId.json"
  Write-Host "Actualizado data/artistas/$ArtistId.json" -ForegroundColor Green
}

$HasGit = Test-Path (Join-Path $Root ".git")
if (-not $HasGit) {
  Write-Host ""
  Write-Host "Archivos actualizados. Todavia no hay repo git inicializado en esta carpeta." -ForegroundColor Yellow
  exit 0
}

git add -- data/artistas
$Status = git status --porcelain -- data/artistas

if (-not $Status) {
  Write-Host "No hay cambios para commit." -ForegroundColor Yellow
  exit 0
}

$Message = "Actualizar expedientes Pavoneo"
if ($Updated.Count -eq 1) {
  $Message = "Actualizar expediente Pavoneo: $($Updated[0] -replace '^data/artistas/','' -replace '\.json$','')"
}

git commit -m $Message

if ($Push) {
  git push
}

Write-Host ""
Write-Host "Sincronizacion Pavoneo completada." -ForegroundColor Green
