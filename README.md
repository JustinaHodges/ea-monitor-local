# 四季常春监控公益版 · 本机 / 局域网

**如果对你有用赞助 Solana：** `JCZp9REG5AGhsr4NpkchzNdRvUwxJWNH4dhTzuGNX9xh`

没有云服务器时，在自己电脑上跑监控站。同一 WiFi 下手机、其它电脑、局域网里的 MT5 也可以连。

工作室局域网的内网版的带控制开发中,功能 群控 开控EA 平仓 停止EA,切换EA,这个版本看心情开源。

云服务器 / 域名版请用另一个仓库：[JustinaHodges/ea-monitor](https://github.com/JustinaHodges/ea-monitor)

QQ:3271663089 t.me/ton66888

## 快速开始（Windows）

1. 安装 [Node.js 20 LTS](https://nodejs.org/)
2. 下载本仓库 ZIP 或 `git clone`
3. 双击其一：
   - **`start-local.bat`** — 仅本机 `http://127.0.0.1:8787`
   - **`start-lan.bat`** — 局域网可访问（窗口会打印 `http://192.168.x.x:8787`）
4. 首次会生成 `server/.env`，用记事本改 `ADMIN_TOKEN`（登录密码）
5. **保持黑窗口打开**；关掉就等于关站

其它设备打不开时：Windows 防火墙放行 TCP **8787**。

## macOS / Linux

```bash
chmod +x start-lan.sh
./start-lan.sh
```

仅本机：`HOST=127.0.0.1 ./start-lan.sh`

## EA 怎么填

| MT5 位置 | API 地址 |
|----------|----------|
| 和监控同一台电脑 | `http://127.0.0.1:8787` |
| 局域网另一台 | `http://运行监控那台电脑的局域网IP:8787` |

实例 ID、私钥与后台「实例管理」里创建的一致。

本机版心跳间隔可调到 **1 秒**（EA 参数 `InpIntervalSec`），服务端不再卡最低 5 秒。  
后台总览 / 实例 / 盈亏页约 **每 1 秒自动刷新**（切到别的浏览器标签会暂停）。

## 说明

- 与云端版同一套功能，数据在本机 `server/data/`
- 本机版允许 1 秒心跳，网站接近实时刷新；云端公开站仍建议 30 秒以上
- 电脑休眠 / 关机 / 关启动窗口后，监控与分享链接都会停
- 没有公网 IP 时，外网无法直接打开你的分享页

更细步骤见 [docs/本机与局域网部署.md](docs/本机与局域网部署.md)

## License

本项目开源，可自由使用、修改与部署。
