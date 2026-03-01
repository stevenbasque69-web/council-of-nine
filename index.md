---
layout: layout.njk
---
# 🛰️ SANCTUARY MAIN HUB
### [STATUS: CONNECTED TO CLOUDFLARE AI GATEWAY]

<div id="terminal-interface" style="background:#000; color:#0f0; padding:20px; border:2px solid #0f0; font-family:monospace; height:450px; overflow-y:auto;">
    <div id="output">[SYSTEM]: Main Hub Uplink Established. Welcome, Conductor.</div>
    <div style="display:flex; margin-top:10px;">
        <span style="margin-right:10px;">></span>
        <input type="text" id="command-input" style="background:transparent; color:#0f0; border:none; outline:none; flex:1;" autofocus>
        <button id="send-btn" style="background:#0f0; color:#000; border:none; padding:5px 15px; font-weight:bold; cursor:pointer; margin-left:10px;">SEND</button>
    </div>
</div>

<script>
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
        out.innerHTML += "<div style='color:cyan;'>[COUNCIL]: " + (data.response || "Uplink thin...") + "</div>";
    } catch(err) {
        out.innerHTML += "<div style='color:red;'>[ERROR]: Transmission Failed. Check Gateway.</div>";
    }
    out.scrollTop = out.scrollHeight;
};
</script>
