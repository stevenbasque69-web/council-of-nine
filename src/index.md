<style>
  body { background: #000; color: #0f0; font-family: monospace; padding: 20px; line-height: 1.5; }
  .nav { border-bottom: 2px solid #0f0; padding-bottom: 10px; margin-bottom: 20px; }
  .nav a { color: #0f0; text-decoration: none; margin-right: 20px; font-weight: bold; }
  .nav a:hover { background: #0f0; color: #000; }
  .terminal { background: #000; border: 2px solid #0f0; height: 350px; padding: 15px; overflow-y: auto; margin-top: 20px; }
  input { background: #000; border: 1px solid #0f0; color: #0f0; width: 80%; padding: 10px; font-family: monospace; }
  button { background: #0f0; color: #000; border: none; padding: 10px 20px; cursor: pointer; font-family: monospace; font-weight: bold; }
  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="nav">
  <a href="#council">/COUNCIL</a> 
  <a href="#files">/FILES</a> 
  <a href="#settings">/SYSTEM_SETTINGS</a>
</div>

## SANCTUARY MAIN HUB
**STATUS:** RECOVERED | **TIME:** <span id="clock"></span>

<div class="terminal" id="terminal-output">
  <div class="ARES">[SYSTEM]: Emergency Reboot Complete. Uplink Stable.</div>
</div>

<br>
<input type="text" id="user-input" placeholder="Enter Command...">
<button onclick="sendCommand()">SEND</button>

<script>
  function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-US', { hour12: true });
  }
  setInterval(updateClock, 1000);
  updateClock();

  async function sendCommand() {
    const cmd = document.getElementById('user-input').value;
    if(!cmd) return;
    const out = document.getElementById('terminal-output');
    out.innerHTML += `<div>> ${cmd}</div>`;
    
    const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ max_tokens: 35, prompt: "STRICT SHORT: " + cmd })
    });
    const data = await res.json();
    const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];
    
    data.responses.forEach((r, i) => {
      out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
    });
    document.getElementById('user-input').value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
