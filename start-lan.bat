@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo ========================================
echo  Siji Changchun Monitor - LAN mode
echo  Same WiFi phone / other PC / MT5
echo ========================================
where node >nul 2>&1
if errorlevel 1 ( echo Install Node.js 20 from https://nodejs.org/ & pause & exit /b 1 )
cd /d "%~dp0server"
if not exist ".env" copy /Y ".env.example" ".env" >nul
set "HOST=0.0.0.0"
set "PORT=8787"
if not exist "node_modules\" call npm install
echo Local: http://127.0.0.1:%PORT%
echo LAN IP will print after start. Firewall: allow TCP %PORT%
call npm start
pause
