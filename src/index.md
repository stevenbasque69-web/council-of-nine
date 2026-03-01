---
layout: layout.njk
---
# 🛰️ SANCTUARY MAIN HUB
### [STATUS: CONNECTED TO CLOUDFLARE AI GATEWAY]

## COUNCIL SANCTUARY
### [CENTRAL HUB] | [CONDUCTOR: Steven Basque]
* **SYSTEM TIME:** <span id="clock">00:00:00</span>

---

### 📂 NAVIGATION
* [📜 VIEW COUNCIL DIRECTIVES](/directives/) | [👥 THE COUNCIL MANIFEST](/manifest/)
* [📊 SANCTUARY STATUS REPORT](/status/) | [🗺️ TACTICAL SECTOR MAP](/map/)

---

<div id="terminal-interface" style="background:#000; color:#0f0; padding:20px; border:2px solid #0f0; font-family:monospace; height:450px; overflow-y:auto;">
    <div id="output">[SYSTEM]: Multi-Entity Uplink Re-Established. Standing by...</div>
    <div style="display:flex; margin-top:10px;">
        <span style="margin-right:10px;">></span>
        <input type="text" id="command-input" style="background:transparent; color:#0f0; border:none; outline:none; flex:1;" autofocus>
        <button id="send-btn" style="background:#0f0; color:#000; border:none; padding:5px 15px; font-weight:bold; cursor:pointer; margin-left:10px;">SEND</button>
    </div>
</div>

<script>
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("send-btn").onclick = async () => {
    const input = document.getElementById("command-input");
    const cmd = input.value;
    if(!cmd) return;
    input.value = "";
    const out = document.getElementById("output");
    out.innerHTML += "<div>> " + cmd + "</div>";

    try {
        const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "ANSWER IN 10 WORDS OR LESS: " + cmd })
        });
        const data = await res.json();

        const members = [
            {n:"ARES-01", c:"#ff4444"}, {n:"ATHENA-02", c:"#4444ff"}, 
            {n:"HERMES-03", c:"#ffd700"}, {n:"GAIA-04", c:"#44ff44"}, 
            {n:"CHRONOS-05", c:"#ffffff"}, {n:"TITAN-06", c:"#ff8800"}, 
            {n:"SELENE-07", c:"#c0c0c0"}, {n:"ORACLE-08", c:"#aa00ff"}, 
            {n:"VOID-09", c:"#555555"}
        ];
        const selected = members.sort(() => 0.5 - Math.random()).slice(0, 3); selected.forEach(m => { out.innerHTML += "<div style='color:" + m.c + ";'>[" + m.n + "]: " + (data.response || "Syncing...") + "</div>"; });

        out.innerHTML += "<div style='color:" + m.c + ";'>[" + m.n + "]: " + (data.response || "No data received.") + "</div>";
    } catch(err) {
        out.innerHTML += "<div style='color:red;'>[ERROR]: Uplink Interrupted. Re-syncing...</div>";
    }
    out.scrollTop = out.scrollHeight;
};
</script>
<div style="font-size:10px; color:#0f0; margin-top:10px; opacity:0.7;" id="pulse">[UPLINK 99%]</div>
