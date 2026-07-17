# Summer Adventure App

横版暑假冒险地图打卡应用，适配电脑、iPad 和手机。应用会在当前浏览器的 `localStorage` 中保存打卡记录。

## 本地使用

直接打开 `index.html`，或运行：

```powershell
npm run check
```

`npm run build` 会把地图、岛屿和录音内嵌到 `index.html`，生成可离线打开的单文件版本。

## 项目结构

- `src/summer-adventure-checkin.html`：可编辑的页面源码
- `assets/`：地图、岛屿、环境音和夸奖录音
- `scripts/build-standalone.cjs`：单文件构建脚本
- `tests/smoke-test.cjs`：结构、脚本和内嵌资源检查
- `index.html`：服务器部署文件
- `deploy/nginx.conf`：Nginx 配置

## iPad 使用

1. 使用 Safari 打开服务器地址。
2. 点击“分享”，选择“添加到主屏幕”。
3. 始终从同一个地址进入，打卡进度会保存在这台 iPad 上。
4. 清除 Safari 网站数据、使用无痕模式或更换网址会丢失本机记录。

为了让主屏幕应用和数据保存更稳定，正式使用建议配置域名和 HTTPS。
