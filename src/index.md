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
    <div style="margin-left:15px; font-weight:bold;">SANCTUARY V.38</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; padding:15px; -webkit-overflow-scrolling:touch;">
    <div id="inner-terminal">
      </div>
  </div>

  <div style="height:80px; background:#000; border-top:1px solid #111; display:flex; align-items:center; padding:0 10px 10px; flex-shrink:0; box-sizing:border-box;">
    <div style="background:#111; border:1px solid #222; border-radius:25px; display:flex; align-items:center; width:100%; padding:2px 12px;">
      <input type="text" id="user-input" placeholder="Enter Command..." onkeydown="if(event.key==='Enter') sendMsg()" style="background:transparent; border:none; color:#fff; flex-grow:1; padding:10px 5px; outline:none; font-family:monospace; font-size:16px;">
      <button onclick="sendMsg()" style="color:#0f0; background:none; border:none; font-size:20px; cursor:pointer;">➤</button>
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

    function addLog(text, color) {
      const out = document.getElementById('inner-terminal');
      const msg = document.createElement('div');
      msg.style.cssText = `color:${color}; margin:30px 0; line-height:1.8; white-space: pre-wrap; font-size:15px;`;
      msg.textContent = text;
      out.appendChild(msg);
      document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
    }

    function sendMsg() {
      const input = document.getElementById('user-input');
      const val = input.value.trim();
      if (!val) return;

      addLog("> " + val.toUpperCase(), "#666");
      input.value = "";

      // DOUBLE-LENGTH TECHNICAL DATA BLOCKS
      setTimeout(() => {
        addLog("[ORACLE-08]: Information stream detected. Processing primary data points for: " + val + ". This system is currently indexing the string across 12 unique neural clusters to ensure zero data loss. Our current packet density is hovering at 144 units per millisecond, which is well within the safety parameters of the Sanctuary architecture. No logical conflicts found in the provided string. Continuing to monitor background telemetry for potential shifts in the data landscape.", "#a0f");
        
        setTimeout(() => {
          addLog("[ARES-01]: Scanning environment for " + val + " implementation. Hardware status is nominal. Memory allocation is locked at 4.2GB, and the tactical firewall remains engaged at Tier 4. Network latency is holding steady at 12ms. All primary defense gates are holding position. We are detecting no external interference or unauthorized attempts to access the core memory buffer. The sector remains green. System cooling is functioning efficiently, and the power draw is stabilized for long-term operation.", "#f44");
          
          setTimeout(() => {
            addLog("[TITAN-06]: Structural foundation for Sanctuary confirmed. The Wall of 4 is now synchronized with your last input. Persistence layer is active, ensuring that all data written during this session is etched into the permanent log files. Structural integrity of the UI container is currently at 100%. We have cleared the cache to allow for a continuous, high-volume scrolling experience without lag. System is fully operational and awaiting your next direct command.", "#f80");
            
            setTimeout(() => {
              addLog("[CENTURION-04]: Backup protocol engaged. Synchronizing the Wall of 4 with the localized server node. Every bit of information transmitted has been verified for structural accuracy. We are standing by to provide secondary reinforcement to the primary pillars. The stream is now locked and the terminal is ready for the next cycle of input. Command acknowledged.", "#0af");
            }, 1600);
          }, 1400);
        }, 1200);
      }, 1000);
    }
  </script>
</body>
</html>
