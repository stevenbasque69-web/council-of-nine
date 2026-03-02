<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  html, body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100vw; height: 100vh;
    overflow: hidden; display: flex; flex-direction: column;
  }
  
  .header-block { height: 75px; flex-shrink: 0; padding-top: 10px; text-align: center; }
  .big-header { font-size: 34px; font-weight: bold; text-shadow: 0 0 15px #0f0; }
  .status-line { font-size: 11px; color: #fff; margin-top: 2px; border-bottom: 1px solid #0f0; display: inline-block; width: 90%; }
  
  .nav-block { height: 55px; flex-shrink: 0; display: flex; gap: 5px; padding: 10px; }
  .nav-block a { 
    flex: 1; border: 1px solid #0f0; color: #0f0; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: bold; background: rgba(0,255,0,0.1);
  }
  
  #terminal-output { 
    flex-grow: 1; 
    width: 96vw; margin: 5px auto; border: 2px solid #0f0;
    padding: 15px; overflow-y: auto; font-size: 14px;
    background: #000; text-align: left;
  }
  
  .input-block { height: 75px; flex-shrink: 0; display: flex; padding: 10px; gap: 5px; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 0 15px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 20px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="header-block">
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.7.0 FORCE-LOAD]</div>
</div>

<div class="nav-block">
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</div>

<div id="terminal-output">
  <div class="ARES">[ARES-01]: Cache-buster active. V.7.0 deployed.</div>
  <div class="ORACLE">[ORACLE-08]: Wall of 3 signal is clear.</div>
  <div class="TITAN">[TITAN-06]: Terminal depth maximized.</div>
</div>

<div class="input-block">
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
