<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; overflow:hidden; position:fixed;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:300px; height:100%; background:#080808; border-right:1px solid #0f0; transition:0.3s; z-index:100; padding-top:20px;">
    <div style="padding:20px; color:#0f0; border-bottom:1px solid #030; font-weight:bold;">SANCTUARY MENU</div>
    <div style="padding:20px; color:#888;">[History logic coming next...]</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="position:absolute; top:0; left:0; width:100%; height:80px; background:#000; border-bottom:1px solid #030; display:flex; align-items:center; padding:0 20px; z-index:10;">
    <div onclick="toggleMenu()" style="cursor:pointer; display:flex; flex-direction:column; gap:5px; margin-right:20px;">
      <div style="width:25px; height:2px; background:#0f0;"></div>
      <div style="width:25px; height:2px; background:#0f0;"></div>
      <div style="width:25px; height:2px; background:#0f0;"></div>
    </div>
    <div style="font-size:24px; font-weight:bold; text-shadow:0 0 10px #0f0;">SANCTUARY HUB</div>
  </div>

  <div style="position:absolute; top:90px; bottom:20px; left:2vw; width:96vw; border:1px solid #0f0; padding:15px; background:#000; overflow:hidden;">
    <div style="color:#f44;">[ARES-01]: Menu trigger re-installed.</div>
    <div style="color:#a0f;">[ORACLE-08]: Sidebar foundation active.</div>
    <div style="color:#f80;">[TITAN-06]: Wall of 3 standing by.</div>
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
