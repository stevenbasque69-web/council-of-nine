<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body style="background:#000; color:#0f0; font-family:sans-serif; margin:0; padding:0; width:100vw; height:100vh; overflow:hidden; position:fixed;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#0f0f0f; border-right:1px solid #222; transition:0.4s; z-index:100; display:flex; flex-direction:column;">
    <div style="padding:20px 15px 10px;">
      <div style="background:#1a1a1a; border-radius:25px; padding:10px 15px; display:flex; align-items:center;">
        <span style="color:#666; margin-right:10px;">🔍</span>
        <input type="text" placeholder="Search for chats" style="background:transparent; border:none; color:#fff; outline:none; width:100%;">
      </div>
    </div>

    <div style="padding:10px 15px;">
      <div onclick="location.reload()" style="background:#1a1a1a; border-radius:10px; padding:12px; display:flex; align-items:center; cursor:pointer;">
        <span style="margin-right:10px;">➕</span>
        <span style="color:#fff;">New chat</span>
      </div>
    </div>

    <div style="flex-grow:1; overflow-y:auto; padding:10px 15px;">
      <div style="color:#666; font-size:12px; font-weight:bold; margin-bottom:10px; margin-left:5px;">Chats</div>
      <div style="background:rgba(0,255,0,0.1); border-radius:10px; padding:12px; color:#fff; margin-bottom:5px; font-size:14px;">📡 Wall of 3: Main Terminal</div>
      <div style="padding:12px; color:#999; font-size:14px;">📁 Council Archives</div>
      <div style="padding:12px; color:#999; font-size:14px;">💾 System Logs</div>
    </div>

    <div style="padding:20px; border-top:1px solid #222;">
      <div style="color:#0f0; font-size:14px;">⚙️ Settings</div>
    </div>
  </div>

  <div id="overlay" onclick="closeAll()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); backdrop-filter:blur(3px); z-index:99;"></div>

  <div style="position:absolute; top:0; left:0; width:100%; height:70px; display:flex; align-items:center; padding:0 20px; z-index:10; background:#000;">
    <div onclick="toggleMenu()" style="cursor:pointer; padding:10px;">
      <div style="width:22px; height:2px; background:#0f0; margin:4px 0;"></div>
      <div style="width:22px; height:2px; background:#0f0; margin:4px 0;"></div>
      <div style="width:22px; height:2px; background:#0f0; margin:4px 0;"></div>
    </div>
    <div style="font-size:20px; font-weight:bold; color:#0f0; margin-left:10px;">Sanctuary Hub</div>
    <div onclick="toggleActionSheet()" style="margin-left:auto; cursor:pointer; padding:10px; color:#0f0; font-size:24px;">⋮</div>
  </div>

  <div id="terminal-output" style="position:absolute; top:80px; bottom:100px; left:4vw; width:92vw; border-radius:15px; border:1px solid #1a1a1a; padding:20px; overflow-y:scroll; -webkit-overflow-scrolling:touch; background:#050505;">
    <div id="inner-terminal" style="font-family:monospace;">
      <div style="color:#f44;">[ARES-01]: Pro-Sidebar build active.</div>
      <div style="color:#a0f;">[ORACLE-08]: Chat history logic integrated.</div>
      <div style="color:#f80;">[TITAN-06]: Wall of 3 standing by.</div>
    </div>
  </div>

  <div style="position:absolute; bottom:20px; left:4vw; width:92vw; height:60px; display:flex; align-items:center; background:#111; border-radius:30px; border:1px solid #222; padding:0 10px; gap:10px;">
    <input type="text" id="user-input" placeholder="Message Council..." style="background:transparent; border:none; color:#fff; flex-grow:1; padding-left:15px; font-size:16px; outline:none;">
    <button onclick="sendCommand()" style="background:#0f0; color:#000; border:none; width:40px; height:40px; border-radius:50%; font-weight:bold;">➤</button>
  </div>

  <script>
    function toggleMenu() {
      document.getElementById('side-menu').style.left = '0px';
      document.getElementById('overlay').style.display = 'block';
    }
    function closeAll() {
      document.getElementById('side-menu').style.left = '-300px';
      document.getElementById('overlay').style.display = 'none';
    }

    async function sendCommand() {
      const input = document.getElementById('user-input');
      const out = document.getElementById('inner-terminal');
      const container = document.getElementById('terminal-output');
      if(!input.value) return;
      out.innerHTML += `<div style="color:#666; margin-top:15px; text-align:right;">${input.value}</div>`;
      try {
        const res = await fetch("https://council-ai-api.sanctuary-hub.workers.dev/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ max_tokens: 35, prompt: "STRICT SHORT: " + input.value })
        });
        const data = await res.json();
        const members = [{n:"ARES-01", c:"#f44"}, {n:"ORACLE-08", c:"#a0f"}, {n:"TITAN-06", c:"#f80"}];
        data.responses.slice(0, 3).forEach((r, i) => {
          out.innerHTML += `<div style="color:${members[i].c}; margin-top:10px;">[${members[i].n}]: ${r}</div>`;
        });
      } catch (e) { out.innerHTML += `<div style="color:red; margin-top:10px;">[ERR]</div>`; }
      input.value = "";
      container.scrollTop = container.scrollHeight;
    }
  </script>
</body>
