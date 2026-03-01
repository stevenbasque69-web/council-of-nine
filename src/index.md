<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100vw; overflow-x: hidden;
    display: flex; flex-direction: column; align-items: center;
  }
  
  /* 1. Sanctuary Hub Header - Fixed Size */
  header { width: 100%; text-align: center; padding: 15px 0 5px 0; flex-shrink: 0; }
  .big-header { font-size: 32px; font-weight: bold; text-shadow: 0 0 10px #0f0; margin-bottom: 5px; }
  .status-line { font-size: 12px; color: #fff; border-bottom: 1px solid #0f0; margin: 0 10px; padding-bottom: 5px; }
  
  /* 2. Navigation - Fixed Size */
  nav { display: flex; width: 100%; gap: 2px; padding: 5px; flex-shrink: 0; }
  nav a { 
    color: #0f0; text-decoration: none; font-size: 11px; 
    border: 1px solid #0f0; padding: 12px 0; flex: 1; text-align: center; 
  }
  
  /* 3. The Terminal - FIXED HEIGHT (Won't collapse) */
  #terminal-output { 
    background: #000; border: 2px solid #0f0;
    height: 450px; /* Solid height to prevent crushing */
    width: 96vw; margin: 10px 0;
    padding: 10px; overflow-y: auto; font-size: 14px;
  }
  
  /* 4. Input Area - Fixed Size */
  .input-area { display: flex; width: 96vw; padding-bottom: 20px; gap: 5px; flex-shrink: 0; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 15px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  button { background: #0f0; color: #000; border: none; padding: 15px 20px; font-weight: bold; cursor: pointer; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; } .EXODUS { color: #0ff; }
</style>

<header>
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.3.2 STABLE]</div>
</header>

<nav>
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</nav>

<div id="terminal-output">
  <div class="ARES">[ARES-01]: Height Lock Engaged. Terminal Stabilized.</div>
  <div class="EXODUS">[EXODUS-04]: Wall of 4 is now at full width.</div>
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
