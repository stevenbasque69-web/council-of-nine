<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100%; text-align: center;
    overflow-x: hidden;
  }
  
  /* 1. Sanctuary Hub - Bold Glowing Title */
  .big-header { 
    font-size: 38px; font-weight: bold; margin-top: 25px;
    text-shadow: 0 0 20px #0f0; display: block; width: 100%;
  }
  
  /* 2. Status */
  .status-line { 
    font-size: 13px; color: #fff; margin: 10px 0;
    border-bottom: 1px solid #0f0; display: inline-block; width: 90%;
    padding-bottom: 8px;
  }
  
  /* 3. Navigation - Edge to Edge */
  .nav-row { display: flex; gap: 2px; width: 100%; padding: 0 5px; margin-bottom: 15px; }
  .nav-row a { 
    color: #0f0; text-decoration: none; font-size: 11px; 
    border: 1px solid #0f0; padding: 15px 0; flex: 1; text-align: center; 
    background: #000; font-weight: bold;
  }
  
  /* 4. The Terminal - FIXED HEIGHT ENFORCEMENT */
  #terminal-output { 
    background: #000; border: 2px solid #0f0;
    height: 480px; /* Locked height to prevent squashing */
    width: 96vw; margin: 0 auto 10px auto;
    padding: 15px; overflow-y: auto; font-size: 14px;
    text-align: left; display: block;
    box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.1);
  }
  
  /* Input Area */
  .input-container { display: flex; width: 96vw; margin: 0 auto 20px auto; gap: 5px; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 18px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 25px; font-weight: bold; cursor: pointer; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="big-header">SANCTUARY HUB</div>

<div class="status-line">
  [ONLINE] | <span id="clock"></span> | [V.5.2 IRON-BOX]
</div>

<div class="nav-row">
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</div>

<div id="terminal-output">
  <div class="ARES">[ARES-01]: Height-lock protocol active at 480px.</div>
  <div class="ORACLE" style="color:#a0f;">[ORACLE-08]: Signal stabilized. Wall of 3 standing by.</div>
</div>

<div class="input-container">
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
    const out = document.getElementById('terminal-output');
    if(!input.value) return;
    out.innerHTML += `<div style="color:#fff;">> ${input.value}</div>`;
    
    try {
      const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ max_tokens: 35, prompt: "STRICT SHORT: " + input.value })
      });
      const data = await res.json();
      const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];
      data.responses.slice(0, 3).forEach((r, i) => {
        out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
      });
    } catch (e) {
      out.innerHTML += `<div style="color:red">[ERR]: Connection Timed Out.</div>`;
    }
    input.value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
