<style>
  body { background: #000; color: #0f0; font-family: monospace; padding: 15px; margin: 0; line-height: 1.4; }
  .nav { border-bottom: 2px solid #0f0; padding-bottom: 10px; margin-bottom: 15px; display: flex; gap: 15px; }
  .nav a { color: #0f0; text-decoration: none; font-size: 14px; font-weight: bold; padding: 5px; border: 1px solid transparent; }
  .nav a:hover { border: 1px solid #0f0; }
  .terminal { background: #000; border: 2px solid #0f0; height: 50vh; padding: 15px; overflow-y: auto; margin: 10px 0; font-size: 14px; }
  .input-area { display: flex; gap: 10px; align-items: center; }
  input { background: #000; border: 1px solid #0f0; color: #0f0; flex-grow: 1; padding: 12px; font-family: monospace; font-size: 16px; }
  button { background: #0f0; color: #000; border: none; padding: 12px 20px; font-weight: bold; font-family: monospace; }
  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="nav">
  <a href="council.html">[COUNCIL]</a> 
  <a href="files.html">[FILES]</a> 
  <a href="settings.html">[SETTINGS]</a>
</div>

<h2 style="margin:5px 0;">SANCTUARY HUB</h2>
<div style="font-size: 12px; margin-bottom: 10px;">
  STATUS: <span style="color:#fff;">ONLINE</span> | 
  TIME: <span id="clock" style="color:#fff;"></span>
</div>

<div class="terminal" id="terminal-output">
  <div class="ARES">[SYSTEM]: Full UI Restoration Complete. Wall of 3 Active.</div>
</div>

<div class="input-area">
  <input type="text" id="user-input" placeholder="Enter Command..." autocomplete="off">
  <button onclick="sendCommand()">SEND</button>
</div>

<script>
  function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-US', { hour12: true });
  }
  setInterval(updateClock, 1000);
  updateClock();

  async function sendCommand() {
    const input = document.getElementById('user-input');
    const cmd = input.value;
    if(!cmd) return;
    const out = document.getElementById('terminal-output');
    out.innerHTML += `<div style="color:#fff;">> ${cmd}</div>`;
    
    try {
      const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ max_tokens: 35, prompt: "STRICT SHORT: " + cmd })
      });
      const data = await res.json();
      const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];
      
      data.responses.slice(0, 3).forEach((r, i) => {
        out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
      });
    } catch (e) {
      out.innerHTML += `<div style="color:red">[ERROR]: Uplink Interrupted.</div>`;
    }
    input.value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
