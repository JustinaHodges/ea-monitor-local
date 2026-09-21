#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT/server"

if ! command -v node >/dev/null 2>&1; then
  echo "请先安装 Node.js 20+: https://nodejs.org/"
  exit 1
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "已生成 server/.env，请修改 ADMIN_TOKEN"
fi

export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-8787}"

if [[ ! -d node_modules ]]; then
  echo "首次运行，安装依赖…"
  npm install
fi

echo "本机: http://127.0.0.1:${PORT}"
echo "局域网模式 HOST=${HOST}（启动后会打印局域网 IP）"
echo "Ctrl+C 停止"
exec npm start
