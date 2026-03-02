<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:#000; color:#0f0; font-family:monospace; margin:0; padding:0; width:100vw; height:100vh; display:flex; flex-direction:column; overflow:hidden;">

  <div style="height:50px; background:#000; border-bottom:1px solid #111; display:flex; align-items:center; padding:0 15px;">
    <div style="font-weight:bold; color:#0f0;">SANCTUARY V.42 | REAL-AI ONLINE</div>
  </div>

  <div id="terminal-output" style="flex-grow:1; overflow-y:auto; padding:15px;">
    <div id="inner-terminal"></div>
  </div>

  <div style="height:80px; background:#000; border-top:1px solid #111; display:flex; align-items:center; padding:10px;">
    <input type="text" id="user-input" placeholder="Ask the Real Oracle..." onkeydown="if(event.key==='Enter') sendMsg()" style="background:#111; border:1px solid #222; color:#fff; width:100%; padding:10px; border-radius:20px; outline:none;">
  </div>

  <script src="secret.js"></script>
  <script>
    async function getRealAI(prompt) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    }

    async function sendMsg() {
      const input = document.getElementById('user-input');
      const val = input.value;
      if(!val) return;
      
      const out = document.getElementById('inner-terminal');
      out.innerHTML += `<div style="color:#666; margin:10px 0;">> ${val.toUpperCase()}</div>`;
      input.value = "";

      out.innerHTML += `<div id="loading" style="color:#a0f;">[ORACLE-08]: ACCESSING REAL-TIME CORE...</div>`;
      
      try {
        const reply = await getRealAI(val);
        document.getElementById('loading').remove();
        out.innerHTML += `<div style="color:#a0f; margin-bottom:20px; border-left:2px solid #a0f; padding-left:10px;">[ORACLE-08]: ${reply}</div>`;
      } catch (e) {
        out.innerHTML += `<div style="color:red;">[SYSTEM ERROR]: API KEY NOT FOUND OR INVALID.</div>`;
      }
      document.getElementById('terminal-output').scrollTop = document.getElementById('terminal-output').scrollHeight;
    }
  </script>
</body>
</html>
