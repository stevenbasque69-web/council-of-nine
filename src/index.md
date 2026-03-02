<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden;">

  <div style="height:80px; flex-shrink:0; text-align:center; padding-top:10px;">
    <div style="font-size:32px; font-weight:bold; text-shadow:0 0-15px #0f0; margin:0;">SANCTUARY HUB</div>
    <div style="font-size:11px; color:#fff; border-bottom:1px solid #0f0; width:90%; display:inline-block;">[ONLINE] | V.13.0 SCROLL-FIX</div>
  </div>

  <div style="height:60px; flex-shrink:0; display:flex; gap:5px; padding:10px;">
    <a href="/council/" style="flex:1; border:1px solid #0f0; color:#0f0; text-decoration:none; display:flex; align-items:center; justify-content:center; font-size:11px; background:rgba(0,255,0,0.1);">COUNCIL</a>
    <a href="/files/" style="flex:1; border:1px solid #0f0; color:#0f0; text-decoration:none; display:flex; align-items:center; justify-content:center; font-size:11px; background:rgba(0,255,0,0.1);">FILES</a>
    <a href="/settings/" style="flex:1; border:1px solid #0f0; color:#0f0; text-decoration:none; display:flex; align-items:center; justify-content:center; font-size:11px; background:rgba(0,255,0,0.1);">SETTINGS</a>
  </div>

  <div id="terminal-output" style="flex-grow:1; width:96vw; margin:0 auto; border:2px solid #0f0; padding:15px; overflow-y: scroll; -webkit-overflow-scrolling: touch; font-size:15px; background:#000; display:flex; flex-direction:column;">
    <div id="inner-terminal" style="margin-top: auto;">
      <div style="color:#f44;">[ARES-01]: Scrolling protocols re-established.</div>
      <div style="color:#a0f;">[ORACLE-08]: Wall of 3 confirmed. Overflow unlocked.</div>
      <div style="color:#f80;">[TITAN-06]: History buffer active.</div>
    </div>
  </div>

  <div style="height:80px; flex-shrink:0; display:flex; padding:15px; gap:5px; background:#000;">
    <input type="text" id="user-input" placeholder="Execute..." autocomplete="off" style="background:#000; border:1px solid #0f0; color:#0f0; flex-grow:1; padding:0 15px; font-family:monospace; font-size:16px; outline:none;">
    <button onclick="sendCommand()" style="background:#0f0; color:#000; border:none; padding:0 20px; font-weight:bold;">SEND</button>
  </div>

  <script>
    async function sendCommand() {
      const input = document.getElementById('user-input');
      const out = document.getElementById('inner-terminal');
      const container = document.getElementById('terminal-output');
      if(!input.value) return;
      out.innerHTML += `<div style="color:#fff; margin-top:10px;">> ${input.value}</div>`;
      
      try {
        const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ max_tokens: 35, prompt: "STRICT SHORT: " + input.value })
        });
        const data = await res.json();
        // PERMANENT WALL OF 3
        const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];
        data.responses.slice(0, 3).forEach((r, i) => {
          out.innerHTML += `<div style="color:${members[i].c}">[${members[i].n}]: ${r}</div>`;
        });
      } catch (e) {
        out.innerHTML += `<div style="color:red">[ERR]: Connection Lost.</div>`;
      }
      input.value = "";
      // Auto-scroll to bottom
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  </script>
</body>
