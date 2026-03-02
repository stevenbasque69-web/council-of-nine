<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  /* Force the body to be a full-screen column */
  html, body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100%; height: 100vh;
    display: flex; flex-direction: column; overflow: hidden;
  }
  
  /* 1. Header & Nav - They stay at the top but take minimal space */
  .top-section { flex-shrink: 0; text-align: center; }
  .big-header { font-size: 32px; font-weight: bold; text-shadow: 0 0 15px #0f0; padding-top: 10px; }
  .status-line { font-size: 11px; color: #fff; border-bottom: 1px solid #0f0; width: 90%; display: inline-block; margin-bottom: 5px; }
  
  .nav-row { display: flex; gap: 5px; padding: 5px 10px; height: 50px; }
  .nav-row a { 
    flex: 1; border: 1px solid #0f0; color: #0f0; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; background: rgba(0,255,0,0.1);
  }
  
  /* 2. THE TERMINAL - "PULLED DOWN" to the bottom */
  #terminal-output { 
    flex-grow: 1; /* This pushes the box to fill all space */
    width: 96vw; margin: 5px auto; border: 2px solid #0f0;
    padding: 15px; overflow-y: auto; font-size: 15px;
    background: #000; text-align: left;
    display: flex; flex-direction: column; 
    justify-content: flex-end; /* This pulls the text down to the bottom */
  }
  
  /* 3. Input Bar - Anchored to the very bottom */
  .input-section { height: 80px; flex-shrink: 0; display: flex; padding: 10px; gap: 5px; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 0 15px; font-family: monospace; 
    font-size: 16px; outline: none;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 20px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<div class="top-section">
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.8.5 PULLED-DOWN]</div>
  <div class="nav-row">
    <a href="/council/">COUNCIL</a>
    <a href="/files/">FILES</a>
    <a href="/settings/">SETTINGS</a>
  </div>
</div>

<div id="terminal-output">
  <div id="inner-terminal">
    <div class="ARES">[ARES-01]: Terminal gravity inverted.</div>
    <div class="ORACLE">[ORACLE-08]: Chat-box pulled down to primary input zone.</div>
    <div class="TITAN">[TITAN-06]: Wall of 3 standing by.</div>
  </div>
</div>

<div class="input-section">
  <input type="text" id="user-input" placeholder="Enter command..." autocomplete="off">
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
    const scrollContainer = document.getElementById('terminal-output');
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
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
</script>
