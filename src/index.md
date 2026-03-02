<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#080808; border-right:1px solid #0f0; transition:0.3s; z-index:100; padding-top:20px;">
    <div style="padding:20px; color:#0f0; border-bottom:1px solid #030; font-weight:bold;">SANCTUARY MENU</div>
    <div style="padding:20px; color:#666;">Navigation (Pending)</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="height:60px; background:#000; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid #111; flex-shrink:0;">
    <div onclick="toggleMenu()" style="cursor:pointer; display:flex; flex-direction:column; gap:4px;">
      <div style="width:20px; height:2px; background:#0f0;"></div>
      <div style="width:20px; height:2px; background:#0f0;"></div>
      <div style="width:20px; height:2px; background:#0f0;"></div>
    </div>
    <div style="margin-left:20px; font-size:18px; font-weight:bold; letter-spacing:1px;">SANCTUARY HUB</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:15px; box-sizing:border-box; background:#000; margin-bottom:10px;">
    <div id="inner-terminal">
      <div style="color:#f44; margin-bottom:10px;">[ARES-01]: Height recalibrated.</div>
      <div style="color:#a0f; margin-bottom:10px;">[ORACLE-08]: UI tightening complete.</div>
      <div style="color:#f80; margin-bottom:10px;">[TITAN-06]: Wall of 3 standing by.</div>
      <div style="height:400px; border-left:1px dashed #111; margin-top:10px;"></div>
      <div style="color:#0f0;">[STABILIZED]</div>
    </div>
  </div>

  <div style="height:90px; background:#000; border-top:1px solid #111; display:flex; align-items:flex-start; padding:15px; flex-shrink:0; box-sizing:border-box;">
    <input type="text" id="user-input" placeholder="Message..." style="background:#111; border:1px solid #222; border-radius:25px; color:#fff; flex-grow:1; padding:12px 18px; outline:none; font-family:monospace; font-size:16px;">
    <button onclick="sendCommand()" style="margin-left:12px; color:#0f0; background:none; border:none; font-size:22px;">➤</button>
  </div>

  <script>
    function toggleMenu() {
      const menu = document.getElementById('side-menu');
      const overlay = document.getElementById('overlay');
      const isOpen = menu.style.left === '0px';
      menu.style.left = isOpen ? '-300px' : '0px';
      overlay.style.display = isOpen ? 'none' : 'block';
    }

    async function sendCommand() {
      const input = document.getElementById('user-input');
      const out = document.getElementById('inner-terminal');
      const container = document.getElementById('terminal-output');
      if(!input.value) return;
      out.innerHTML += `<div style="color:#666; margin-top:10px; text-align:right;">${input.value}</div>`;
      input.value = "";
      container.scrollTop = container.scrollHeight;
    }
  </script>
</body>
