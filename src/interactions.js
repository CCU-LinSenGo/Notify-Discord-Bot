const nacl = require('tweetnacl');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { buildResponse } = require('./utils');

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const COMMAND_NAME = process.env.COMMAND_NAME || 'daysleft';

exports.handler = async (event) => {
    try {
        const signature = event.headers['x-signature-ed25519'] || event.headers['X-Signature-Ed25519'];
        const timestamp = event.headers['x-signature-timestamp'] || event.headers['X-Signature-Timestamp'];
        const body = event.body;

        if (!signature || !timestamp || !body) {
            return { statusCode: 401, body: 'Missing signature headers or body' };
        }

        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + body),
            Buffer.from(signature, 'hex'),
            Buffer.from(PUBLIC_KEY, 'hex')
        );

        if (!isVerified) {
            return { statusCode: 401, body: 'Invalid request signature' };
        }

        const payload = JSON.parse(body);

        // Handle PING
        if (payload.type === InteractionType.PING) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: InteractionResponseType.PONG })
            };
        }

        // Handle SLASH COMMAND
        if (payload.type === InteractionType.APPLICATION_COMMAND) {
            if (payload.data.name === COMMAND_NAME) {
                const message = buildResponse();

                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: message
                        }
                    })
                };
            }
        }

        // Fallback
        return { statusCode: 400, body: 'Unhandled interaction' };

    } catch (err) {
        console.error('Error handling interaction', err);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};
