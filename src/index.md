<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  * { box-sizing: border-box; }
  html, body { 
    background: #000; color: #0f0; font-family: monospace; 
    margin: 0; padding: 0; width: 100%; height: 100vh;
    display: flex; flex-direction: column; overflow: hidden;
  }
  
  /* 1. Header - Compact & Bright */
  header { height: 10vh; display: flex; flex-direction: column; justify-content: center; flex-shrink: 0; }
  .big-header { font-size: 30px; font-weight: bold; text-shadow: 0 0 15px #0f0; margin: 0; }
  .status-line { font-size: 11px; color: #fff; border-bottom: 1px solid #0f0; margin: 2px 10px; }
  
  /* 2. Navigation - Thick & Tap-Friendly */
  nav { height: 7vh; display: flex; gap: 5px; padding: 5px; flex-shrink: 0; }
  nav a { 
    color: #0f0; text-decoration: none; font-size: 12px; 
    border: 1px solid #0f0; flex: 1; display: flex; 
    align-items: center; justify-content: center; background: rgba(0, 255, 0, 0.1);
  }
  
  /* 3. The Terminal - MAXIMUM HEIGHT */
  #terminal-output { 
    flex-grow: 1; /* Pushes input to the bottom */
    width: 98vw; margin: 10px auto; border: 2px solid #0f0;
    padding: 15px; overflow-y: auto; font-size: 15px;
    background: #000; line-height: 1.4;
  }
  
  /* 4. Input - Locked to Bottom */
  .input-area { height: 10vh; display: flex; padding: 10px; gap: 5px; flex-shrink: 0; background: #000; }
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 0 15px; font-family: monospace; 
    font-size: 16px; outline: none; border-radius: 0;
  }
  button { background: #0f0; color: #000; border: none; padding: 0 25px; font-weight: bold; }

  .ARES { color: #f44; } .ORACLE { color: #a0f; } .TITAN { color: #f80; }
</style>

<header>
  <div class="big-header">SANCTUARY HUB</div>
  <div class="status-line">[ONLINE] | <span id="clock"></span> | [V.6.1 DOMINANCE]</div>
</header>

<nav>
  <a href="/council/">COUNCIL</a>
  <a href="/files/">FILES</a>
  <a href="/settings/">SETTINGS</a>
</nav>

<div id="terminal-output">
  <div class="ARES">[ARES-01]: Priority shifted to terminal dominance.</div>
  <div class="TITAN">[TITAN-06]: Wall of 3 standing by for input.</div>
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
