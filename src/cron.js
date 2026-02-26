const { buildResponse } = require('./utils');

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

exports.handler = async (event) => {
    try {
        const message = buildResponse();

        const url = `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`;

        // In Node 20, fetch is globally available
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${BOT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`Failed to send message: ${response.status} ${response.statusText}`, text);
            throw new Error('Discord API error');
        }

        console.log('Daily message sent successfully.');
        return { statusCode: 200, body: 'OK' };
    } catch (err) {
        console.error('Error executing cron:', err);
        throw err;
    }
};
