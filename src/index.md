<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body style="background:#000; color:#0f0; font-family:sans-serif; margin:0; padding:0; overflow:hidden; position:fixed; width:100vw; height:100vh;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#111; border-right:1px solid #333; transition:0.3s; z-index:100; display:flex; flex-direction:column;">
    <div style="padding:30px 20px 10px;">
      <div style="background:#222; border-radius:25px; padding:10px; color:#888; font-size:14px;">🔍 Search for chats</div>
    </div>
    <div style="padding:10px 20px;">
      <div style="background:#222; border-radius:10px; padding:15px; color:#fff;">➕ New chat</div>
    </div>
    <div style="flex-grow:1; padding:20px; color:#888; font-size:12px; font-weight:bold; text-transform:uppercase;">Recent Chats</div>
    <div style="padding:15px 20px; border-top:1px solid #222; color:#fff;">⚙️ Settings</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="height:70px; display:flex; align-items:center; padding:0 20px; background:#000;">
    <div onclick="toggleMenu()" style="cursor:pointer; font-size:24px;">☰</div>
    <div style="margin-left:20px; font-size:20px; font-weight:bold;">Sanctuary Hub</div>
  </div>

  <div style="margin:10px; border:1px solid #333; border-radius:15px; flex-grow:1; height:calc(100vh - 180px); padding:20px; background:#050505;">
    <div style="color:#f44;">[ARES-01]: Sidebar foundation laid.</div>
    <div style="color:#a0f;">[ORACLE-08]: Awaiting next instruction.</div>
    <div style="color:#f80;">[TITAN-06]: Wall of 3 active.</div>
  </div>

  <script>
    function toggleMenu() {
      const menu = document.getElementById('side-menu');
      const overlay = document.getElementById('overlay');
      if (menu.style.left === '0px') {
        menu.style.left = '-300px';
        overlay.style.display = 'none';
      } else {
        menu.style.left = '0px';
        overlay.style.display = 'block';
      }
    }
  </script>
</body>
