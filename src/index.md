<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    body { background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; height:100vh; display:flex; flex-direction:column; overflow:hidden; }
    #header { height:45px; border-bottom:1px solid #111; display:flex; align-items:center; padding:0 15px; font-size:12px; flex-shrink:0; background:#000; z-index:10; }
    #terminal { flex-grow:1; overflow-y:auto; padding:15px; font-size:15px; -webkit-overflow-scrolling:touch; margin-bottom: 70px; }
    #input-area { position: fixed; bottom: 20px; left: 0; right: 0; height:70px; background:rgba(0,0,0,0.9); padding:10px 15px; display:flex; align-items:center; z-index:100; }
    input { background:#111; border:1px solid #0f0; color:#fff; width:100%; padding:15px; border-radius:30px; outline:none; font-family:monospace; font-size:16px; box-shadow: 0 0 10px rgba(0,255,0,0.1); }
    .msg { margin-bottom:20px; line-height:1.5; border-left: 2px solid #222; padding-left: 10px; }
  </style>
</head>
<body>
  <div id="header">SANCTUARY V.44 | INTERFACE RESTORED</div>
  <div id="terminal"><div id="log"></div></div>
  <div id="input-area">
    <input type="text" id="user-input" placeholder="Type to the Council..." onkeydown="if(event.key==='Enter') sendMsg()">
  </div>

  <script src="secret.js"></script>
  <script>
    async function getRealAI(p) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: p }] }] })
      });
      const d = await r.json();
      return d.candidates[0].content.parts[0].text;
    }

    async function sendMsg() {
      const i = document.getElementById('user-input');
      const l = document.getElementById('log');
      const val = i.value; if(!val) return;
      
      l.innerHTML += `<div class="msg" style="color:#666;">> ${val.toUpperCase()}</div>`;
      i.value = "";
      const loadId = "L" + Date.now();
      l.innerHTML += `<div id="${loadId}" class="msg" style="color:#a0f;">[ORACLE-08]: Consulting the core...</div>`;
      
      try {
        const reply = await getRealAI(val);
        document.getElementById(loadId).innerHTML = `[ORACLE-08]: ${reply}`;
      } catch (e) {
        document.getElementById(loadId).innerHTML = `<span style="color:red;">[ERROR]: CORE DISCONNECTED. CHECK VAULT.</span>`;
      }
      document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
  </script>
</body>
</html>
