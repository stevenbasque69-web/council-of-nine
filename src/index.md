<style>
  body { background: #000; color: #0f0; font-family: monospace; padding: 10px; margin: 0; display: flex; flex-direction: column; align-items: center; }
  
  /* 1. Sanctuary Hub Bigger & Wider */
  .big-header { font-size: 48px; font-weight: bold; margin-top: 10px; text-shadow: 0 0 15px #0f0; width: 100%; text-align: center; }
  
  /* 2. Time and stuff */
  .status-line { font-size: 14px; margin: 5px 0 15px 0; color: #fff; border-bottom: 1px solid #0f0; width: 95%; text-align: center; padding-bottom: 5px; }
  
  /* 3. The links */
  .nav-menu { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; width: 100%; }
  .nav-menu a { color: #0f0; text-decoration: none; font-size: 14px; border: 1px solid #0f0; padding: 5px 10px; flex: 1; max-width: 120px; text-align: center; }
  
  /* 4. The WIDE chat box */
  .terminal { background: #000; border: 2px solid #0f0; height: 400px; width: 98vw; padding: 10px; overflow-y: auto; text-align: left; box-sizing: border-box; }
  .input-area { display: flex; width: 98vw; margin-top: 10px; gap: 5px; }
  input { background: #000; border: 1px solid #0f0; color: #0f0; flex-grow: 1; padding: 12px; font-family: monospace; font-size: 16px; }
  button { background: #0f0; color: #000; border: none; padding: 12px 20px; font-weight: bold; cursor: pointer; }
</style>

<div class="big-header">SANCTUARY HUB</div>

<div class="status-line">
  [ONLINE] | <span id="clock"></span> | [V.3 STABLE]
</div>

<div class="nav-menu">
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</div>

<div class="terminal" id="terminal-output">
  <div style="color:#f44;">[ARES-01]: System wide-screen expansion complete.</div>
</div>

<div class="input-area">
  <input type="text" id="user-input" placeholder="Execute..." autocomplete="off">
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
      out.innerHTML += `<div style="color:red">[ERR]: Connection Lost.</div>`;
    }
    input.value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
