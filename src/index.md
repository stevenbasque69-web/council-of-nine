<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden; position:fixed;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#080808; border-right:1px solid #111; transition:0.3s; z-index:100;">
    <div style="padding:25px; color:#0f0; border-bottom:1px solid #111; font-weight:bold;">SANCTUARY V.22</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="height:60px; background:#000; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid #111; flex-shrink:0;">
    <div onclick="toggleMenu()" style="cursor:pointer; display:flex; flex-direction:column; gap:4px;">
      <div style="width:20px; height:2px; background:#0f0;"></div>
      <div style="width:20px; height:2px; background:#0f0;"></div>
      <div style="width:20px; height:2px; background:#0f0;"></div>
    </div>
    <div style="margin-left:20px; font-size:16px; font-weight:bold; letter-spacing:1px; color:#0f0;">SANCTUARY HUB V.22</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:20px; box-sizing:border-box;">
    <div id="inner-terminal">
      <div style="color:#f44; margin-bottom:12px;">[ARES-01]: Cache-bypass protocol 22.0 engaged.</div>
      <div style="color:#a0f; margin-bottom:12px;">[ORACLE-08]: Awaiting visual confirmation.</div>
      <div style="color:#f80; margin-bottom:12px;">[TITAN-06]: Wall of 3 standing by.</div>
    </div>
    <div style="height:100px;"></div>
  </div>

  <div style="height:90px; background:#000; border-top:1px solid #111; display:flex; align-items:flex-start; padding:15px; flex-shrink:0; box-sizing:border-box;">
    <div style="background:#111; border:1px solid #222; border-radius:30px; display:flex; align-items:center; width:100%; padding:2px 15px;">
      <input type="text" id="user-input" placeholder="Message..." style="background:transparent; border:none; color:#fff; flex-grow:1; padding:12px 5px; outline:none; font-family:monospace; font-size:16px;">
      <button onclick="sendCommand()" style="color:#0f0; background:none; border:none; font-size:22px;">➤</button>
    </div>
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
      out.innerHTML += `<div style="color:#666; margin:15px 0; text-align:right;">${input.value}</div>`;
      input.value = "";
      container.scrollTop = container.scrollHeight;
    }
  </script>
</body>
