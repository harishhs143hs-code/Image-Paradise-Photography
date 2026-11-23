const PHONE_PATTERN = /^[+()0-9 .-]{7,30}$/;
const text = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";
const json = (res, status, body) => { res.statusCode = status; res.setHeader("Content-Type","application/json"); res.setHeader("Cache-Control","no-store"); res.end(JSON.stringify(body)); };
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "https://www.imageparadisephotography.online");
  res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type");
  if (req.method === "OPTIONS") return json(res,204,{});
  if (req.method !== "POST") return json(res,405,{error:"Method not allowed"});
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return json(res,503,{error:"Lead storage is not configured"});
  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (text(body.website,160)) return json(res,200,{ok:true});
  const name=text(body.name,100), phone=text(body.phone,30), location=text(body.location,160), service=text(body.service,100);
  if (!name || !PHONE_PATTERN.test(phone) || !location || !service || body.consent !== true) return json(res,400,{error:"Please complete the required fields and consent"});
  const record = {
    name, phone, email:text(body.email,160) || null, location, service,
    event_date:text(body.event_date,10) || null, date_flexibility:text(body.date_flexibility,60),
    coverage:text(body.coverage,80), budget:text(body.budget,100), requirements:text(body.requirements,1200),
    consent_at:new Date().toISOString(), source_page:text(body.source_page,200) || "/",
    status:"new"
  };
  try {
    const response = await fetch(url.replace(/\/$/,"") + "/rest/v1/photography_leads", {
      method:"POST", headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":"application/json",Prefer:"return=minimal"},
      body:JSON.stringify(record)
    });
    if (!response.ok) return json(res,502,{error:"Could not save the enquiry"});
    return json(res,201,{ok:true});
  } catch (_) { return json(res,502,{error:"Lead storage is temporarily unavailable"}); }
};