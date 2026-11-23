const json=(res,status,body)=>{res.statusCode=status;res.setHeader("Content-Type","application/json");res.setHeader("Cache-Control","no-store");res.end(JSON.stringify(body));};
const clean=(v,max=1000)=>typeof v==="string"?v.trim().slice(0,max):"";
module.exports=async(req,res)=>{
 if(!["GET","PATCH"].includes(req.method))return json(res,405,{error:"Method not allowed"});
 const base=process.env.SUPABASE_URL,anon=process.env.SUPABASE_ANON_KEY,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const admins=(process.env.DASHBOARD_ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
 if(!base||!anon||!service||!admins.length)return json(res,503,{error:"Dashboard is not configured"});
 const auth=clean(req.headers.authorization,3000);
 if(!auth.startsWith("Bearer "))return json(res,401,{error:"Sign in required"});
 try{
  const userRes=await fetch(base.replace(/\/$/,"")+"/auth/v1/user",{headers:{apikey:anon,Authorization:auth}});
  if(!userRes.ok)return json(res,401,{error:"Your session is invalid or expired"});
  const user=await userRes.json(),email=clean(user.email,160).toLowerCase();
  if(!email||!admins.includes(email))return json(res,403,{error:"This account is not authorised for the lead dashboard"});
  const root=base.replace(/\/$/,"")+"/rest/v1/photography_leads";
  if(req.method==="GET"){
   const r=await fetch(root+"?select=*&order=created_at.desc&limit=250",{headers:{apikey:service,Authorization:"Bearer "+service}});
   const rows=await r.json();if(!r.ok)return json(res,502,{error:"Could not load leads"});
   return json(res,200,{leads:rows});
  }
  const body=req.body&&typeof req.body==="object"?req.body:{},id=clean(body.id,64);
  const patch={};
  if(body.status!==undefined){const allowed=["new","contacted","quoted","booked","closed"];if(!allowed.includes(body.status))return json(res,400,{error:"Invalid status"});patch.status=body.status;}
  if(body.notes!==undefined)patch.notes=clean(body.notes,2000);
  if(!id||!Object.keys(patch).length)return json(res,400,{error:"Lead id and an update are required"});
  patch.updated_at=new Date().toISOString();
  const r=await fetch(root+"?id=eq."+encodeURIComponent(id),{method:"PATCH",headers:{apikey:service,Authorization:"Bearer "+service,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(patch)});
  const rows=await r.json();if(!r.ok)return json(res,502,{error:"Could not update this lead"});
  return json(res,200,{lead:rows[0]||null});
 }catch(_){return json(res,502,{error:"Dashboard service temporarily unavailable"});}
};