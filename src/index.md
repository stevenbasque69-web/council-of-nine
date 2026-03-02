<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#080808; border-right:1px solid #0f0; transition:0.3s; z-index:100; padding-top:20px;">
    <div style="padding:20px; color:#0f0; border-bottom:1px solid #030; font-weight:bold;">SANCTUARY MENU</div>
    <div style="padding:20px; color:#666;">Navigation (Step 4)</div>
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

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:20px; box-sizing:border-box; background:#000;">
    <div id="inner-terminal">
      <div style="color:#f44; margin-bottom:15px;">[ARES-01]: Scroll-lock bypassed. Swiping enabled.</div>
      <div style="color:#a0f; margin-bottom:15px;">[ORACLE-08]: History buffer unlocked for navigation.</div>
      <div style="color:#f80; margin-bottom:15px;">[TITAN-06]: Wall of 3 standing by.</div>
      <div style="height:1000px; border-left:1px dashed #111; margin-top:20px; color:#222; padding-left:10px;">[SCROLL TEST AREA]</div>
      <div style="color:#0f0;">[END OF BUFFER]</div>
    </div>
  </div>

  <div style="height:70px; background:#000; border-top:1px solid #111; display:flex; align-items:center; padding:0 15px; flex-shrink:0;">
    <input type="text" id="user-input" placeholder="Message..." style="background:#111; border:1px solid #222; border-radius:20px; color:#fff; flex-grow:1; padding:10px 15px; outline:none; font-family:monospace;">
    <button onclick="sendCommand()" style="margin-left:10px; color:#0f0; background:none; border:none; font-size:18px;">➤</button>
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
      out.innerHTML += `<div style="color:#666; margin-top:15px; text-align:right;">${input.value}</div>`;
      input.value = "";
      // Auto-scroll to bottom
      container.scrollTop = container.scrollHeight;
    }
  </script>
</body>
