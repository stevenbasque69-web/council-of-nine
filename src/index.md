<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<style>
  body { 
    background: #000; color: #0f0; font-family: monospace; 
    padding: 5px; margin: 0; 
    display: flex; flex-direction: column; align-items: center;
    width: 100vw; overflow-x: hidden; /* Prevents side-scrolling */
  }
  
  /* 1. Sanctuary Hub Bigger & Wide */
  .big-header { font-size: 40px; font-weight: bold; margin-top: 10px; text-shadow: 0 0 10px #0f0; width: 100%; text-align: center; }
  
  /* 2. Time and status */
  .status-line { font-size: 14px; margin: 5px 0 15px 0; color: #fff; border-bottom: 1px solid #0f0; width: 95%; text-align: center; }
  
  /* 3. The Links - Full Width Row */
  .nav-menu { display: flex; justify-content: center; gap: 5px; margin-bottom: 15px; width: 98%; }
  .nav-menu a { color: #0f0; text-decoration: none; font-size: 12px; border: 1px solid #0f0; padding: 10px 0; flex: 1; text-align: center; }
  
  /* 4. The Wide Terminal - Locked to screen width */
  .terminal { 
    background: #000; border: 2px solid #0f0; 
    height: 350px; width: 98%; 
    padding: 10px; overflow-y: auto; 
    box-sizing: border-box; font-size: 14px;
  }
  
  .input-area { display: flex; width: 98%; margin-top: 10px; gap: 5px; }
  
  /* 16px font size is the magic number to stop iOS/Android auto-zoom */
  input { 
    background: #000; border: 1px solid #0f0; color: #0f0; 
    flex-grow: 1; padding: 12px; font-family: monospace; 
    font-size: 16px; border-radius: 0; outline: none;
  }
  
  button { background: #0f0; color: #000; border: none; padding: 12px 15px; font-weight: bold; cursor: pointer; }
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
  <div style="color:#f44;">[ARES-01]: Shield active. Wide-screen width locked.</div>
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
      out.innerHTML += `<div style="color:red">[ERR]: Connection Interrupted.</div>`;
    }
    input.value = "";
    out.scrollTop = out.scrollHeight;
  }
</script>
