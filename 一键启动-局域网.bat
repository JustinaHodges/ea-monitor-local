@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ========================================
echo  四季常春监控公益版 - 局域网模式
echo  同一 WiFi 下手机/其它电脑/MT5 可访问
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 Node.js，请先安装 20 LTS:
  echo https://nodejs.org/
  pause
  exit /b 1
)

cd /d "%~dp0server"
if not exist ".env" (
  copy /Y ".env.example" ".env" >nul
  echo 已生成 server\.env ，请用记事本改 ADMIN_TOKEN
  echo.
)

set "HOST=0.0.0.0"
set "PORT=8787"

if not exist "node_modules\" (
  echo 首次运行，正在安装依赖...
  call npm install
  if errorlevel 1 (
    echo [错误] npm install 失败
    pause
    exit /b 1
  )
)

echo.
echo 本机: http://127.0.0.1:%PORT%
echo 局域网地址会在下方打印（如 http://192.168.x.x:8787）
echo 其它设备打不开时，请放行防火墙 TCP %PORT%
echo 请保持本窗口打开。按 Ctrl+C 可停止。
echo.
call npm start
pause
