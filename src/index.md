<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:auto;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:280px; height:100%; background:#080808; border-right:1px solid #111; transition:0.3s; z-index:100; display:flex; flex-direction:column;">
    <div style="padding:25px 15px 10px;">
      <div style="background:#111; border:1px solid #222; border-radius:20px; padding:10px 15px; color:#555; font-size:14px;">🔍 Search chats</div>
    </div>
    
    <div style="padding:10px 15px;">
      <div onclick="location.reload()" style="background:#111; border:1px solid #0f0; border-radius:10px; padding:12px; color:#0f0; text-align:center; cursor:pointer; font-weight:bold;">+ New Chat</div>
    </div>

    <div style="flex-grow:1; padding:20px; color:#333; font-size:12px; letter-spacing:1px;">RECENT HISTORY PENDING...</div>
    
    <div style="padding:20px; border-top:1px solid #111; color:#0f0; font-size:14px;">⚙️ Settings</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="height:50px; background:#000; display:flex; align-items:center; padding:0 15px; border-bottom:1px solid #111; flex-shrink:0;">
    <div onclick="toggleMenu()" style="cursor:pointer; display:flex; flex-direction:column; gap:4px;">
      <div style="width:18px; height:2px; background:#0f0;"></div>
      <div style="width:18px; height:2px; background:#0f0;"></div>
      <div style="width:18px; height:2px; background:#0f0;"></div>
    </div>
    <div style="margin-left:15px; font-size:16px; font-weight:bold; color:#0f0;">SANCTUARY V.24</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:15px; background:#000;">
    <div id="inner-terminal">
      <div style="color:#f44; margin-bottom:10px;">[ARES-01]: Sidebar functionality expanding.</div>
      <div style="color:#a0f; margin-bottom:10px;">[ORACLE-08]: Reset protocols loaded.</div>
      <div style="color:#f80; margin-bottom:10px;">[TITAN-06]: Wall of 3 standing by.</div>
    </div>
  </div>

  <div style="height:80px; background:#000; border-top:1px solid #111; display:flex; align-items:center; padding:0 10px 10px 10px; flex-shrink:0; box-sizing:border-box;">
    <div style="background:#111; border:1px solid #222; border-radius:25px; display:flex; align-items:center; width:100%; padding:2px 12px;">
      <input type="text" id="user-input" placeholder="Message..." style="background:transparent; border:none; color:#fff; flex-grow:1; padding:10px 5px; outline:none; font-family:monospace; font-size:16px;">
      <button onclick="sendCommand()" style="color:#0f0; background:none; border:none; font-size:20px;">➤</button>
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
      out.innerHTML += `<div style="color:#666; margin:10px 0; text-align:right;">${input.value}</div>`;
      input.value = "";
      container.scrollTop = container.scrollHeight;
    }
  </script>
</body>
