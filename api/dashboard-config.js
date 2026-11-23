module.exports = (req,res) => {
  res.setHeader("Content-Type","application/json");
  res.setHeader("Cache-Control","no-store");
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_ANON_KEY;
  if(!url || !key){res.statusCode=503;return res.end(JSON.stringify({error:"Dashboard configuration is incomplete"}));}
  res.statusCode=200;res.end(JSON.stringify({url,key}));
};