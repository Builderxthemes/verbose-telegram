// api/beacon.js
import { active_command } from './lib/state.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
    return new response(json.stringify(active_command), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}
