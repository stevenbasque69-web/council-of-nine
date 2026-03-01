---
layout: layout.njk
---
# 👥 THE COUNCIL MANIFEST
### [TOTAL ENTITIES: 09]

| DESIGNATION | SPECIALTY | FREQUENCY | COLOR |
| :--- | :--- | :--- | :--- |
| **ARES-01** | Global Defense | 0.04Hz | [RED] |
| **ATHENA-02** | Research & Logic | 1.12Hz | [BLUE] |
| **HERMES-03** | Comms & Uplink | 4.40Hz | [GOLD] |
| **GAIA-04** | Biosphere Monitor | 0.88Hz | [GREEN] |
| **CHRONOS-05** | Temporal Sync | 0.00Hz | [WHITE] |
| **TITAN-06** | Heavy Infrastructure | 9.99Hz | [ORANGE] |
| **SELENE-07** | Lunar & Space Ops | 0.22Hz | [SILVER] |
| **ORACLE-08** | Predictive Analysis | 7.77Hz | [PURPLE] |
| **VOID-09** | Deep Space Signals | --.-Hz | [BLACK] |

# This replaces your old script with the "Multi-AI" script
sed -i '/const data = await res.json();/a \            const members = [{n:"ARES-01", c:"#f00"}, {n:"ATHENA-02", c:"#00f"}, {n:"HERMES-03", c:"#ffd700"}, {n:"GAIA-04", c:"#0f0"}, {n:"CHRONOS-05", c:"#fff"}, {n:"TITAN-06", c:"#f80"}, {n:"SELENE-07", c:"#c0c0c0"}, {n:"ORACLE-08", c:"#800080"}, {n:"VOID-09", c:"#555"}];\n            const m = members[Math.floor(Math.random()*members.length)];' src/index.md

# This updates the display to show the specific name and color
sed -i "s/out.innerHTML += \"<div style='color:cyan;'>\[COUNCIL\]: \" + (data.response || \"Uplink thin...\") + \"<\/div>\";/out.innerHTML += \"<div style='color:\" + m.c + \";'>[\" + m.n + \"]: \" + (data.response || \"Uplink thin...\") + \"<\/div>\";/" src/index.md
git add .
git commit -m "Initialized Council Manifest and enabled multi-entity responses"
git push

cat <<EOF > src/index.md
---
layout: layout.njk
---
# 🛰️ SANCTUARY MAIN HUB
### [STATUS: CONNECTED TO CLOUDFLARE AI GATEWAY]

## COUNCIL SANCTUARY
### [CENTRAL HUB]
* **LOC:** LISTUGUJ, QC
* **UPLINK:** STABLE
* **CONDUCTOR:** Steven Basque
* **SYSTEM TIME:** <span id="clock">00:00:00</span>

---

### 📂 NAVIGATION
* [📜 VIEW COUNCIL DIRECTIVES](/directives/)
* [👥 THE COUNCIL MANIFEST](/manifest/)
* [📊 SANCTUARY STATUS REPORT](/status/)
* [🗺️ TACTICAL SECTOR MAP](/map/)

---

<div id="terminal-interface" style="background:#000; color:#0f0; padding:20px; border:2px solid #0f0; font-family:monospace; height:450px; overflow-y:auto;">
    <div id="output">[SYSTEM]: Multi-Entity Uplink Established. Standing by...</div>
    <div style="display:flex; margin-top:10px;">
        <span style="margin-right:10px;">></span>
        <input type="text" id="command-input" style="background:transparent; color:#0f0; border:none; outline:none; flex:1;" autofocus>
        <button id="send-btn" style="background:#0f0; color:#000; border:none; padding:5px 15px; font-weight:bold; cursor:pointer; margin-left:10px;">SEND</button>
    </div>
</div>

<script>
// CLOCK
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// TERMINAL LOGIC
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
            body: JSON.stringify({ prompt: cmd })
        });
        const data = await res.json();
        
        // THE NINE PERSONALITIES
        const members = [
            {n:"ARES-01", c:"#ff4444"}, {n:"ATHENA-02", c:"#4444ff"}, 
            {n:"HERMES-03", c:"#ffd700"}, {n:"GAIA-04", c:"#44ff44"}, 
            {n:"CHRONOS-05", c:"#ffffff"}, {n:"TITAN-06", c:"#ff8800"}, 
            {n:"SELENE-07", c:"#c0c0c0"}, {n:"ORACLE-08", c:"#aa00ff"}, 
            {n:"VOID-09", c:"#555555"}
        ];
        const m = members[Math.floor(Math.random()*members.length)];
        
        out.innerHTML += "<div style='color:" + m.c + ";'>[" + m.n + "]: " + (data.response || "Uplink thin...") + "</div>";
    } catch(err) {
        out.innerHTML += "<div style='color:red;'>[ERROR]: Transmission Failed.</div>";
    }
    out.scrollTop = out.scrollHeight;
};
</script>
