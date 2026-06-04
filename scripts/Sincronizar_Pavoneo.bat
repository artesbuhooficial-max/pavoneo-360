@echo off
setlocal
cd /d "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Sincronizar_Pavoneo.ps1" -Push
pause
