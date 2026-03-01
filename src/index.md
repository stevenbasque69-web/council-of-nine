<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    padding: 0; margin: 0; 
    display: flex; flex-direction: column; align-items: center;
    width: 100vw; overflow-x: hidden;
  }
  
  /* 1. Sanctuary Hub - Adjusted for Wide Fit */
  .big-header { 
    font-size: 34px; /* Slightly smaller to fit mobile width without cutoff */
    font-weight: bold; margin-top: 15px; 
    text-shadow: 0 0 10px #0f0; width: 100%; text-align: center; 
    white-space: nowrap; 
  }
  
  /* 2. Time and status */
  .status-line { font-size: 13px; margin: 5px 0 15px 0; color: #fff; width: 100%; text-align: center; }
  
  /* 3. The Links - Full Edge-to-Edge */
  .nav-menu { display: flex; width: 100%; justify-content: center; gap: 2px; margin-bottom: 10px; }
  .nav-menu a { 
    color: #0f0; text-decoration: none; font-size: 11px; 
    border: 1px solid #0f0; padding: 12px 0; flex: 1; text-align: center; 
    background: rgba(0, 255, 0, 0.05);
  }
  
  /* 4. The Wide Terminal - 100% Edge */
  .terminal { 
    background: #000; border-top: 2px solid #0f0; border-bottom: 2px solid #0f0;
    height: 400px; width: 100%; 
    padding: 10px; overflow-y: auto; 
    box-sizing: border-box; font-size: 14px;
  }
  
  .input-area { display: flex; width: 100%; margin-top: 0; background: #000; }
  
  input { 
    background: #000; border: none; border-right: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 15px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  
  button { background: #0f0; color: #000; border: none; padding: 15px 25px; font-weight: bold; cursor: pointer; }
  
  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
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
  <div class="ARES">[ARES-01]: Calibration complete. Interface locked to 100% width.</div>
</div>

<div class="input-area">
  <input type="text" id="user-input" placeholder="Execute Command..." autocomplete="off">
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
