<style>
  body { background: #000; color: #0f0; font-family: monospace; margin: 0; display: flex; justify-content: center; }
  #compact-hub { max-width: 420px; width: 100%; padding: 15px; box-sizing: border-box; }
  .nav { border-bottom: 1px solid #0f0; padding-bottom: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; }
  .nav a { color: #0f0; text-decoration: none; font-size: 12px; font-weight: bold; }
  .terminal { background: #000; border: 1px solid #0f0; height: 300px; padding: 10px; overflow-y: auto; font-size: 13px; }
  input { background: #000; border: 1px solid #0f0; color: #0f0; width: 70%; padding: 8px; font-family: monospace; }
  button { background: #0f0; color: #000; border: none; padding: 8px 15px; font-weight: bold; cursor: pointer; }
  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div id="compact-hub">
  <div class="nav">
    <a href="/council/">[COUNCIL]</a> 
    <a href="/files/">[FILES]</a> 
    <a href="/settings/">[SETTINGS]</a>
  </div>

  <h2 style="margin:0;">SANCTUARY HUB</h2>
  <small>STATUS: RECOVERED | <span id="clock"></span></small>

  <div class="terminal" id="terminal-output">
    <div class="ARES">[SYSTEM]: Link Stabilized. Wall of 3 Active.</div>
  </div>

  <div style="margin-top:15px;">
    <input type="text" id="user-input" placeholder="Enter Command...">
    <button onclick="sendCommand()">SEND</button>
  </div>
</div>

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
      if(i < 3) out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
    });
    document.getElementById('user-input').value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
