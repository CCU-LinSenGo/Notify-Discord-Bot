const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const COMMAND_NAME = process.env.COMMAND_NAME || 'daysleft';

// Optional: specific guild for testing, if not provided will register globally
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const commandData = {
    name: COMMAND_NAME,
    description: '查詢距離專題系展還有幾天（附贈厭世毒雞湯）',
    type: 1 // CHAT_INPUT
};

async function registerCommand() {
    if (!APPLICATION_ID || !BOT_TOKEN) {
        console.error("Missing DISCORD_APPLICATION_ID or DISCORD_BOT_TOKEN");
        console.error("Try running with: node --env-file=.env scripts/register.js");
        process.exit(1);
    }

    const url = GUILD_ID
        ? `https://discord.com/api/v10/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`
        : `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

    console.log(`Registering command /${COMMAND_NAME} ${GUILD_ID ? 'for guild ' + GUILD_ID : 'globally'}...`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commandData)
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(`Failed to register command: ${response.status} ${response.statusText}`, text);
    } else {
        const data = await response.json();
        console.log(`Successfully registered command: ${data.name} (ID: ${data.id})`);
    }
}

registerCommand();
