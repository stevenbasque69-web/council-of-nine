<style>
  body { background: #000; color: #0f0; font-family: monospace; padding: 20px; margin: 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
  #main-container { max-width: 600px; width: 100%; }
  
  /* 1. Sanctuary Hub Bigger */
  .big-header { font-size: 50px; font-weight: bold; margin-top: 20px; text-shadow: 0 0 15px #0f0; letter-spacing: 3px; }
  
  /* 2. Time and stuff under that */
  .status-line { font-size: 16px; margin: 10px 0 25px 0; color: #fff; border-bottom: 1px solid #0f0; padding-bottom: 10px; }
  
  /* 3. The links under the time */
  .nav-menu { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; }
  .nav-menu a { color: #0f0; text-decoration: none; font-size: 18px; border: 1px solid #0f0; padding: 8px 15px; min-width: 100px; }
  .nav-menu a:hover { background: #0f0; color: #000; }
  
  /* 4. Then the chat box */
  .terminal { background: #000; border: 2px solid #0f0; height: 350px; width: 100%; padding: 15px; overflow-y: auto; text-align: left; box-sizing: border-box; }
  .input-area { display: flex; width: 100%; margin-top: 10px; gap: 5px; }
  input { background: #000; border: 1px solid #0f0; color: #0f0; flex-grow: 1; padding: 15px; font-family: monospace; font-size: 16px; }
  button { background: #0f0; color: #000; border: none; padding: 15px 25px; font-weight: bold; cursor: pointer; }
</style>

<div id="main-container">
  <div class="big-header">SANCTUARY HUB</div>
  
  <div class="status-line">
    [ONLINE] | <span id="clock"></span> | [V.3 STABLE]
  </div>

  <div class="nav-menu">
    <a href="https://conductor.sanctuary-hub.workers.dev/council/">COUNCIL</a>
    <a href="https://conductor.sanctuary-hub.workers.dev/files/">FILES</a>
    <a href="https://conductor.sanctuary-hub.workers.dev/settings/">SETTINGS</a>
  </div>

  <div class="terminal" id="terminal-output">
    <div style="color:#f44;">[ARES-01]: Hierarchy updated. Wall of 3 ready.</div>
  </div>

  <div class="input-area">
    <input type="text" id="user-input" placeholder="Execute..." autocomplete="off">
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
