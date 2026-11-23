document.addEventListener("DOMContentLoaded",async()=>{
 const $=id=>document.getElementById(id),login=$("loginPanel"),panel=$("dashboardPanel"),status=$("globalStatus");
 let supabase=null,leads=[];
 const say=(message,kind="muted")=>{status.className=kind;status.textContent=message;};
 const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 try{const cfgRes=await fetch("/api/dashboard-config");if(!cfgRes.ok)throw new Error("Dashboard database is not configured yet.");const cfg=await cfgRes.json();if(!window.supabase)throw new Error("Secure sign-in library could not load.");supabase=window.supabase.createClient(cfg.url,cfg.key);}
 catch(e){$("loginStatus").textContent=e.message;return;}
 const session=async()=> (await supabase.auth.getSession()).data.session;
 async function api(method="GET",body){const s=await session();if(!s)throw new Error("Please sign in again.");const r=await fetch("/api/admin/leads",{method,headers:{Authorization:"Bearer "+s.access_token,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined});const data=await r.json();if(!r.ok)throw new Error(data.error||"Dashboard request failed");return data;}
 $("loginForm").addEventListener("submit",async e=>{e.preventDefault();$("loginStatus").textContent="Sending secure sign-in link…";const {error}=await supabase.auth.signInWithOtp({email:$("loginEmail").value.trim(),options:{emailRedirectTo:location.origin+"/admin.html",shouldCreateUser:false}});$("loginStatus").textContent=error?error.message:"Check your email for the sign-in link.";});
 $("signOut").addEventListener("click",async()=>{await supabase.auth.signOut();});
 $("refresh").addEventListener("click",load);
 $("search").addEventListener("input",render);$("statusFilter").addEventListener("change",render);
 async function load(){try{say("Loading enquiries…");const data=await api();leads=data.leads||[];render();say(leads.length+" enquiries loaded.","success");}catch(e){say(e.message,"error");}}
 function render(){
  const q=$("search").value.toLowerCase(),f=$("statusFilter").value;
  const visible=leads.filter(x=>(!f||x.status===f)&&[x.name,x.phone,x.location,x.service,x.email].join(" ").toLowerCase().includes(q));
  $("stats").innerHTML=["new","contacted","quoted","booked"].map(s=>'<div class="stat"><b>'+leads.filter(x=>x.status===s).length+'</b><small>'+s+'</small></div>').join("");
  $("leadList").innerHTML=visible.length?visible.map(x=>'<article class="lead"><div class="lead-head"><div><h3>'+esc(x.name)+'</h3><small>'+esc(x.created_at?new Date(x.created_at).toLocaleString():"")+'</small></div><strong>'+esc(x.service)+'</strong></div><div class="lead-grid"><div><small>Phone</small><br><a href="tel:'+encodeURIComponent(x.phone)+'">'+esc(x.phone)+'</a></div><div><small>Location</small><br>'+esc(x.location)+'</div><div><small>Event date</small><br>'+esc(x.event_date||"Not decided")+'</div><div><small>Budget</small><br>'+esc(x.budget||"Not shared")+'</div><div><small>Coverage</small><br>'+esc(x.coverage||"Not shared")+'</div><div><small>Email</small><br>'+esc(x.email||"Not shared")+'</div></div><p>'+esc(x.requirements||"No extra requirements")+'</p><div class="toolbar"><label>Status <select data-status="'+esc(x.id)+'">'+["new","contacted","quoted","booked","closed"].map(s=>'<option '+(x.status===s?"selected":"")+'>'+s+'</option>').join("")+'</select></label><button class="btn" data-save="'+esc(x.id)+'">Save status / notes</button></div><label class="field">Internal follow-up notes<textarea data-notes="'+esc(x.id)+'">'+esc(x.notes||"")+'</textarea></label></article>').join(""):'<p class="muted">No matching enquiries.</p>';
  $("leadList").querySelectorAll("[data-save]").forEach(b=>b.addEventListener("click",async()=>{const id=b.dataset.save;try{await api("PATCH",{id,status:$("leadList").querySelector('[data-status="'+id+'"]').value,notes:$("leadList").querySelector('[data-notes="'+id+'"]').value});say("Lead updated.","success");await load();}catch(e){say(e.message,"error");}}));
 }
 supabase.auth.onAuthStateChange((_event,s)=>{const active=!!s;login.classList.toggle("hidden",active);panel.classList.toggle("hidden",!active);if(active)load();});
 const s=await session();login.classList.toggle("hidden",!!s);panel.classList.toggle("hidden",!s);if(s)load();
});