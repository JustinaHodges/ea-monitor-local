@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ========================================
echo  四季常春监控公益版 - 本机模式
echo  浏览器打开: http://127.0.0.1:8787
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
  echo 已生成 server\.env
  echo 默认登录密码见该文件里的 ADMIN_TOKEN
  echo 当前默认是: change-me-to-a-long-random-string
  echo.
)

set "HOST=127.0.0.1"
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
echo 启动后请用浏览器打开: http://127.0.0.1:%PORT%
echo 登录密码 = server\.env 里的 ADMIN_TOKEN
echo 请保持本窗口打开；关掉即停站。按 Ctrl+C 可停止。
echo.
call npm start
pause
