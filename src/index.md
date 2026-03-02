<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100vw; height: 100vh;
    display: flex; flex-direction: column; overflow: hidden;
  }
  
  /* 1. Header (Fixed 90px) */
  .header-ui { height: 90px; flex-shrink: 0; text-align: center; padding-top: 10px; }
  .big-header { font-size: 32px; font-weight: bold; text-shadow: 0 0 15px #0f0; margin: 0; }
  .status-line { font-size: 11px; color: #fff; border-bottom: 1px solid #0f0; width: 90%; display: inline-block; }
  
  /* 2. Nav (Fixed 60px) */
  .nav-ui { height: 60px; flex-shrink: 0; display: flex; gap: 5px; padding: 10px; }
  .nav-ui a { 
    flex: 1; border: 1px solid #0f0; color: #0f0; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; background: rgba(0,255,0,0.1);
  }
  
  /* 3. THE TERMINAL (Mathematical Fill) */
  /* Calculation: 100vh - (Header 90 + Nav 60 + Input 80) = Full Screen Fill */
  #terminal-output { 
    height: calc(100vh - 230px); 
    width: 96vw; margin: 0 auto; border: 2px solid #0f0;
    padding: 15px; overflow-y: auto; font-size: 15px; background: #000;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  
  /* 4. Input (Fixed 80px) */
  .input-ui { height: 80px; flex-shrink: 0; display: flex; padding: 15px; gap: 5px; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 0 15px; font-family: monospace; 
    font-size: 16px; outline: none;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 20px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="header-ui">
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.10.0 TOTAL-FILL]</div>
</div>

<div class="nav-ui">
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</div>

<div id="terminal-output">
  <div id="inner-terminal">
    <div class="ARES">[ARES-01]: Mathematical anchoring engaged.</div>
    <div class="ORACLE">[ORACLE-08]: Calc(100vh) protocol forcing terminal expansion.</div>
    <div class="TITAN">[TITAN-06]: Wall of 3 standing by.</div>
  </div>
</div>

<div class="input-ui">
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
    const out = document.getElementById('inner-terminal');
    const container = document.getElementById('terminal-output');
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
    container.scrollTop = container.scrollHeight;
  }
</script>
