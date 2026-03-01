# MAIN HUB

[COUNCIL] [FILES] [SYSTEM SETTINGS]

---
---
---
## SANCTUARY MAIN HUB
### [STATUS: RECOVERED] | [TIME SYNC: ACTIVE]

## COUNCIL SANCTUARY
* **SYSTEM TIME:** <span id="clock">00:00:00</span>

---

<div id="terminal-interface" style="background:#000; color:#0f0; padding:20px; border:2px solid #0f0; font-family:monospace; height:400px; overflow-y:auto;">
    <div id="output">[SYSTEM]: Emergency Reboot Complete. Uplink Stable.</div>
    <div style="display:flex; margin-top:10px;">
        <span style="margin-right:10px;">></span>
        <input type="text" id="command-input" style="background:transparent; color:#0f0; border:none; outline:none; flex:1;" autofocus>
        <button id="send-btn" style="background:#0f0; color:#000; border:none; padding:5px 15px; font-weight:bold;">SEND</button>
    </div>
</div>

<script>
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
    document.getElementById('clock').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("send-btn").onclick = async () => {
    const input = document.getElementById("command-input");
    const out = document.getElementById("output");
    const cmd = input.value;
    if(!cmd) return;
    input.value = "";
    out.innerHTML += "<div>> " + cmd + "</div>";

    try {
        const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ max_tokens: 35,  max_tokens: 35,  prompt: "STRICT SHORT: " + cmd })
        });
        const data = await res.json();
        const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];

        members.forEach((m, i) => {
            setTimeout(() => {
                out.innerHTML += "<div style='color:" + m.c + ";'>[" + m.n + "]: " + (data.response || "Data link clear.") + "</div>";
                out.scrollTop = out.scrollHeight;
            }, i * 500);
        });
    } catch(e) {
        out.innerHTML += "<div style='color:red;'>[ERROR]: Connection Failed.</div>";
    }
};
</script>
