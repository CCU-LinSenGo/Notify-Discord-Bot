const interactionsHandler = require('./interactions').handler;
const cronHandler = require('./cron').handler;

exports.handler = async (event, context) => {
    // 判斷是否為來自建立的 Function URL (HTTP) 請求
    // Function URL 的事件通常會帶有 requestContext 或 headers
    if (event.requestContext || event.headers) {
        console.log('接收到 HTTP 請求 (Discord Webhook Interactions)...');
        return await interactionsHandler(event, context);
    }

    // 如果沒有 headers，代表是來自 EventBridge 的定時排程 (Cron) 或手動觸發測試
    console.log('接收到 EventBridge 定時排程 (Cron)...');
    return await cronHandler(event, context);
};
