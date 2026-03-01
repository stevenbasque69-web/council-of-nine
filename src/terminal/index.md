---
layout: layout.njk
<div id="terminal-interface" style="background:#000; color:#0f0; padding:20px; border:1px solid #0f0; font-family:monospace; height:400px; overflow-y:auto;"><div id="output">[SYSTEM]: Main Hub Uplink Established...</div><div style="display:flex;"><span style="margin-right:10px;">></span><input type="text" id="command-input" style="background:transparent; color:#0f0; border:none; outline:none; flex:1;" autofocus></div></div>
---

# 📟 MULTI-AI TERMINAL
### [STATUS: CONNECTED TO CLOUDFLARE AI GATEWAY]

<div id="terminal-interface" style="background: #000; color: #0f0; padding: 20px; border: 1px solid #0f0; font-family: monospace; height: 400px; overflow-y: auto;">
  <div id="output">
    [SYSTEM]: Secure link established. Aegis-7 and Chronos are standing by...<br>
  </div>
</div>
<div style="background: #000; padding: 10px; border: 1px solid #0f0; border-top: none;">
  <span style="color: #0f0;">></span> <input type="text" id="user-input" style="background: transparent; border: none; color: #0f0; width: 80%; outline: none;" placeholder="Enter command..." autofocus>
</div>

<script>
  const input = document.getElementById('user-input');
  const output = document.getElementById('output');

  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      output.innerHTML += `<br><span style="color: #fff;">[CONDUCTOR]: ${val}</span><br>`;
      
      output.innerHTML += `<span style="color: #888;">[SYSTEM]: Routing to Council AIs...</span><br>`;
      
      // This is where we will point to your real AI Worker
      try {
        const response = await fetch('https://council-ai-api.stevenbasque69.workers.dev', {
          method: 'POST',
          body: JSON.stringify({ prompt: val })
        });
        const data = await response.json();
        output.innerHTML += `<span style="color: #0fa;">[AEGIS-7]: ${data.aegis}</span><br>`;
        output.innerHTML += `<span style="color: #f0a;">[CHRONOS]: ${data.chronos}</span><br>`;
      } catch (err) {
        output.innerHTML += `<span style="color: #f00;">[ERROR]: Link Severed. Run uplink to reconnect.</span><br>`;
      }
      output.scrollTop = output.scrollHeight;
    }
  });
</script>

---
[⬅️ RETURN TO HUB](/)
<script>document.getElementById("command-input").addEventListener("keypress", async (e) => { if(e.key === "Enter") { const cmd = e.target.value; e.target.value = ""; const out = document.getElementById("output"); out.innerHTML += "<div>> " + cmd + "</div>"; try { const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", { method: "POST", body: JSON.stringify({ prompt: cmd }) }); const data = await res.json(); out.innerHTML += "<div style=\"color:cyan;\">[COUNCIL]: " + (data.response || "The connection is thin...") + "</div>"; } catch(err) { out.innerHTML += "<div style=\"color:red;\">[ERROR]: Signal Lost.</div>"; } out.scrollTop = out.scrollHeight; } });</script>
