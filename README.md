# 專題系展倒數 Discord Bot

專為距離「專題系展」（2026/05/19）倒數設計的 Discord 機器人。使用 Node.js 24.x 開發，並設計部署於 AWS Lambda。

## 功能
1. **每日自動發送**：每天晚間 8:00 (Asia/Taipei) 自動發送倒數天數到指定 Discord 頻道。
2. **Slash Command**：輸入 `/daysleft` 即時回覆倒數天數。
3. **隨機毒雞湯**：每次發文皆附上一句厭世毒雞湯，增加趣味。

## 架構
*   **Interactions Webhook (`src/interactions.js`)**：透過 AWS Lambda Function URL 接收 Discord Webhook。無伺服器，不需使用 WebSocket。
*   **Schedule Notification (`src/cron.js`)**：透過 EventBridge 排程觸發，呼叫 Discord REST API 發送訊息。