const BOT_HTML = `
  <button class="ai-chat-launcher" id="aiChatLauncher" aria-label="Open Image Paradise AI assistant" aria-expanded="false">
    <span class="ai-chat-spark">✦</span><span>Ask AI</span>
  </button>
  <section class="ai-chat-panel" id="aiChatPanel" aria-label="Image Paradise AI assistant" hidden>
    <header class="ai-chat-header">
      <div><strong>Image Paradise AI</strong><small>Wedding photography assistant</small></div>
      <button id="aiChatClose" class="ai-chat-close" aria-label="Close">×</button>
    </header>
    <div class="ai-chat-messages" id="aiChatMessages" aria-live="polite">
      <div class="ai-msg ai-msg-bot">Hi! 👋 I can help with packages, wedding photography, pre-wedding shoots, and checking what to do next. What are you planning?</div>
    </div>
    <div class="ai-chat-suggestions" id="aiChatSuggestions">
      <button type="button">Wedding packages</button>
      <button type="button">Check my date</button>
      <button type="button">Pre-wedding shoot</button>
    </div>
    <form class="ai-chat-form" id="aiChatForm">
      <input id="aiChatInput" maxlength="1200" autocomplete="off" placeholder="Ask about your wedding…" aria-label="Message">
      <button type="submit" aria-label="Send">➤</button>
    </form>
    <a class="ai-chat-whatsapp" href="https://wa.me/917708510143?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20photography" target="_blank" rel="noopener">Prefer WhatsApp? Chat with us →</a>
  </section>`;

const BOT_CSS = `
.ai-chat-launcher{position:fixed;right:22px;bottom:92px;z-index:9998;border:0;border-radius:999px;padding:13px 18px;background:#111;color:#fff;font:600 14px/1 Inter,Arial,sans-serif;box-shadow:0 10px 30px #0002;cursor:pointer;display:flex;gap:8px;align-items:center}.ai-chat-spark{color:#ff4d91;font-size:18px}.ai-chat-panel{position:fixed;right:22px;bottom:148px;width:min(380px,calc(100vw - 28px));height:min(600px,calc(100vh - 180px));z-index:9999;background:#fff;border:1px solid #eee;border-radius:20px;box-shadow:0 20px 70px #0003;overflow:hidden;font-family:Inter,Arial,sans-serif;display:flex;flex-direction:column}.ai-chat-panel[hidden]{display:none}.ai-chat-header{padding:17px 18px;background:linear-gradient(135deg,#111,#2a1720);color:#fff;display:flex;justify-content:space-between;align-items:center}.ai-chat-header strong,.ai-chat-header small{display:block}.ai-chat-header small{margin-top:4px;opacity:.7;font-size:11px}.ai-chat-close{border:0;background:transparent;color:#fff;font-size:26px;cursor:pointer}.ai-chat-messages{flex:1;padding:16px;overflow:auto;background:#fafafa}.ai-msg{max-width:88%;padding:11px 13px;margin:0 0 10px;border-radius:15px;font-size:13px;line-height:1.5;white-space:pre-wrap}.ai-msg-bot{background:#fff;border:1px solid #eee;border-top-left-radius:5px}.ai-msg-user{margin-left:auto;background:#e91e63;color:#fff;border-top-right-radius:5px}.ai-msg-typing{opacity:.55}.ai-chat-suggestions{display:flex;gap:7px;overflow:auto;padding:8px 12px;border-top:1px solid #eee}.ai-chat-suggestions button{white-space:nowrap;border:1px solid #ddd;background:#fff;border-radius:999px;padding:7px 10px;font-size:11px;cursor:pointer}.ai-chat-form{display:flex;padding:10px;border-top:1px solid #eee;gap:8px}.ai-chat-form input{min-width:0;flex:1;border:1px solid #ddd;border-radius:12px;padding:11px 12px;outline:none}.ai-chat-form input:focus{border-color:#e91e63}.ai-chat-form button{width:42px;border:0;border-radius:12px;background:#e91e63;color:#fff;cursor:pointer}.ai-chat-whatsapp{font-size:11px;text-align:center;padding:0 10px 12px;color:#555;text-decoration:none}.ai-chat-whatsapp:hover{text-decoration:underline}@media(max-width:767px){.ai-chat-launcher{right:14px;bottom:78px}.ai-chat-panel{right:10px;bottom:130px;width:calc(100vw - 20px);height:min(560px,calc(100vh - 150px))}}
`;

function addMessage(text, type){
  const box=document.getElementById('aiChatMessages');
  const el=document.createElement('div');
  el.className=`ai-msg ai-msg-${type}`;
  el.textContent=text;
  box.appendChild(el);
  box.scrollTop=box.scrollHeight;
  return el;
}

function initAiChat(){
  if(document.getElementById('aiChatLauncher')) return;
  const style=document.createElement('style');style.textContent=BOT_CSS;document.head.appendChild(style);
  const root=document.createElement('div');root.innerHTML=BOT_HTML;document.body.appendChild(root);
  const launcher=document.getElementById('aiChatLauncher'),panel=document.getElementById('aiChatPanel'),close=document.getElementById('aiChatClose'),form=document.getElementById('aiChatForm'),input=document.getElementById('aiChatInput');
  const history=[];
  const toggle=open=>{panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));if(open)input.focus()};
  launcher.onclick=()=>toggle(panel.hidden);close.onclick=()=>toggle(false);
  document.querySelectorAll('#aiChatSuggestions button').forEach(b=>b.onclick=()=>{input.value=b.textContent;form.requestSubmit()});
  form.onsubmit=async e=>{
    e.preventDefault();const text=input.value.trim();if(!text)return;
    input.value='';document.getElementById('aiChatSuggestions').style.display='none';addMessage(text,'user');history.push({role:'user',content:text});
    const typing=addMessage('Thinking…','bot');typing.classList.add('ai-msg-typing');
    try{
      const r=await fetch('/api/ai-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-8)})});
      const data=await r.json();typing.remove();
      const reply=data.reply||data.error||'Please use WhatsApp and we will help you.';addMessage(reply,'bot');history.push({role:'assistant',content:reply});
    }catch(err){typing.remove();addMessage('I’m having trouble connecting right now. Please use WhatsApp to enquire directly.','bot')}
  };
}

document.addEventListener('DOMContentLoaded',initAiChat);
