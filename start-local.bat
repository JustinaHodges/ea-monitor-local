@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo ========================================
echo  Siji Changchun Monitor - Local only
echo  http://127.0.0.1:8787
echo ========================================
where node >nul 2>&1
if errorlevel 1 ( echo Install Node.js 20 from https://nodejs.org/ & pause & exit /b 1 )
cd /d "%~dp0server"
if not exist ".env" copy /Y ".env.example" ".env" >nul
set "HOST=127.0.0.1"
set "PORT=8787"
if not exist "node_modules\" call npm install
echo Open http://127.0.0.1:%PORT%  Keep this window open.
call npm start
pause
