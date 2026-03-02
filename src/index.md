<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100vw; height: 100vh;
    overflow: hidden; position: relative;
  }
  
  /* 1. Header & Nav - Pinned to Top */
  .top-ui { 
    position: absolute; top: 0; left: 0; width: 100%; height: 140px; 
    z-index: 10; background: #000; text-align: center;
  }
  .big-header { font-size: 32px; font-weight: bold; text-shadow: 0 0 15px #0f0; padding-top: 10px; }
  .status-line { font-size: 11px; color: #fff; border-bottom: 1px solid #0f0; width: 90%; display: inline-block; }
  .nav-row { display: flex; gap: 5px; padding: 10px; }
  .nav-row a { 
    flex: 1; border: 1px solid #0f0; color: #0f0; text-decoration: none;
    height: 40px; display: flex; align-items: center; justify-content: center;
    font-size: 11px; background: rgba(0,255,0,0.1);
  }
  
  /* 2. THE TERMINAL - Absolute Center Fill */
  #terminal-output { 
    position: absolute;
    top: 140px; /* Starts exactly below Nav */
    bottom: 80px; /* Ends exactly above Input */
    left: 2vw; width: 96vw;
    border: 2px solid #0f0; padding: 15px;
    overflow-y: auto; font-size: 15px; background: #000;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  
  /* 3. Input Bar - Pinned to Bottom */
  .input-ui { 
    position: absolute; bottom: 0; left: 0; width: 100%; height: 80px;
    display: flex; padding: 15px; gap: 5px; background: #000;
  }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 0 15px; font-family: monospace; 
    font-size: 16px; outline: none;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 20px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="top-ui">
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.9.0 ANCHORED]</div>
  <div class="nav-row">
    <a href="/council/">COUNCIL</a>
    <a href="/files/">FILES</a>
    <a href="/settings/">SETTINGS</a>
  </div>
</div>

<div id="terminal-output">
  <div id="inner-terminal">
    <div class="ARES">[ARES-01]: Absolute anchoring engaged. Void eliminated.</div>
    <div class="ORACLE" style="color:#a0f;">[ORACLE-08]: Terminal stretched to full screen depth.</div>
    <div class="TITAN" style="color:#f80;">[TITAN-06]: Wall of 3 standing by.</div>
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
