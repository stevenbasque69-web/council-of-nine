<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden;">

  <div id="side-menu" style="position:fixed; top:0; left:-300px; width:280px; height:100%; background:#080808; border-right:1px solid #111; transition:0.3s; z-index:100; display:flex; flex-direction:column;">
    <div style="padding:25px 15px 10px;"><div style="background:#111; border:1px solid #222; border-radius:20px; padding:10px 15px; color:#555;">🔍 Search</div></div>
    <div style="padding:10px 15px;"><div onclick="location.reload()" style="border:1px solid #0f0; border-radius:10px; padding:12px; color:#0f0; text-align:center; cursor:pointer;">+ New Chat</div></div>
    <div style="flex-grow:1;"></div>
    <div style="padding:20px; border-top:1px solid #111; color:#0f0;">⚙️ Settings</div>
  </div>

  <div id="overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:99;"></div>

  <div style="height:50px; background:#000; display:flex; align-items:center; padding:0 15px; border-bottom:1px solid #111; flex-shrink:0;">
    <div onclick="toggleMenu()" style="cursor:pointer; display:flex; flex-direction:column; gap:4px;">
      <div style="width:18px; height:2px; background:#0f0;"></div>
      <div style="width:18px; height:2px; background:#0f0;"></div>
      <div style="width:18px; height:2px; background:#0f0;"></div>
    </div>
    <div style="margin-left:15px; font-weight:bold;">SANCTUARY V.28</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; padding:15px; -webkit-overflow-scrolling:touch;">
    <div id="inner-terminal">
      <div style="color:#f44; margin-bottom:10px;">[ARES-01]: Absolute scroll-buffer active.</div>
      <div style="color:#a0f; margin-bottom:10px;">[ORACLE-08]: Native touch-response engaged.</div>
      <div style="color:#f80; margin-bottom:10px;">[TITAN-06]: Wall of 3 standing by.</div>
    </div>
  </div>

  <div style="height:80px; background:#000; border-top:1px solid #111; display:flex; align-items:center; padding:0 10px 10px; flex-shrink:0; box-sizing:border-box;">
    <div style="background:#111; border:1px solid #222; border-radius:25px; display:flex; align-items:center; width:100%; padding:2px 12px;">
      <input type="text" id="user-input" placeholder="Message..." onkeydown="if(event.key==='Enter') sendCommand()" style="background:transparent; border:none; color:#fff; flex-grow:1; padding:10px 5px; outline:none; font-family:monospace; font-size:16px;">
      <button onclick="sendCommand()" style="color:#0f0; background:none; border:none; font-size:20px; cursor:pointer;">➤</button>
    </div>
  </div>

  <script>
    function toggleMenu() {
      const m = document.getElementById('side-menu');
      const o = document.getElementById('overlay');
      const isOpen = m.style.left === '0px';
      m.style.left = isOpen ? '-300px' : '0px';
      o.style.display = isOpen ? 'none' : 'block';
    }

    function sendCommand() {
      const inputField = document.getElementById('user-input');
      const terminal = document.getElementById('inner-terminal');
      const scrollContainer = document.getElementById('terminal-output');
      
      if (inputField.value.trim() !== "") {
        // Add your message to the screen
        const userMsg = document.createElement('div');
        userMsg.style.cssText = "color:#666; margin:15px 0; text-align:right; font-style:italic;";
        userMsg.textContent = "> " + inputField.value;
        terminal.appendChild(userMsg);

        // Clear input and auto-scroll
        inputField.value = "";
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  </script>
</body>
</html>
