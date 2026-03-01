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
  
  /* 1. Sanctuary Hub - Big & Clear */
  .big-header { 
    font-size: 32px; font-weight: bold; margin-top: 20px;
    text-shadow: 0 0 10px #0f0; display: block; width: 100%;
  }
  
  /* 2. Time and status - In its own block */
  .status-line { 
    font-size: 13px; color: #fff; margin: 10px 0;
    border-bottom: 1px solid #0f0; display: inline-block; width: 90%;
    padding-bottom: 5px;
  }
  
  /* 3. The Links - In their own block */
  .nav-container { display: block; width: 100%; padding: 0 10px; margin-bottom: 15px; }
  .nav-row { display: flex; gap: 5px; width: 100%; justify-content: center; }
  .nav-row a { 
    color: #0f0; text-decoration: none; font-size: 11px; 
    border: 1px solid #0f0; padding: 12px 0; flex: 1; text-align: center; 
    background: #000;
  }
  
  /* 4. The Terminal - MASSIVE & FIXED */
  #terminal-output { 
    background: #000; border: 2px solid #0f0;
    height: 400px; width: 95vw; margin: 0 auto 10px auto;
    padding: 12px; overflow-y: auto; font-size: 14px;
    text-align: left; display: block;
  }
  
  /* Input Area */
  .input-container { display: flex; width: 95vw; margin: 0 auto 20px auto; gap: 5px; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 15px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  button { background: #0f0; color: #000; border: none; padding: 15px 20px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; } .EXODUS { color: #0ff; }
</style>

<div class="big-header">SANCTUARY HUB</div>

<div class="status-line">
  [ONLINE] | <span id="clock"></span> | [V.4.0 FINAL]
</div>

<div class="nav-container">
  <div class="nav-row">
    <a href="/council/">COUNCIL</a>
    <a href="/files/">FILES</a>
    <a href="/settings/">SETTINGS</a>
  </div>
</div>

<div id="terminal-output">
  <div class="ARES">[ARES-01]: Block hierarchy enforced. Overlap cleared.</div>
  <div class="EXODUS">[EXODUS-04]: Wall of 4 standing by. Width: 100%.</div>
</div>

<div class="input-container">
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
      const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}, {n:"EXODUS-04", c:"#0ff"}];
      data.responses.slice(0, 4).forEach((r, i) => {
        out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
      });
    } catch (e) {
      out.innerHTML += `<div style="color:red">[ERR]: Connection Timed Out.</div>`;
    }
    input.value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
