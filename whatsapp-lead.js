document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("whatsappLeadForm");
  if(!form)return;
  const phone="917708510143";
  form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    const data=new FormData(form);
    const service=data.get("eventType")||"photography";
    const optionalDetails=[
      ["Event date",data.get("eventDate")],
      ["Date status",data.get("dateFlexibility")],
      ["Coverage",data.get("coverage")],
      ["Budget range",data.get("budget")],
      ["Additional requests",data.get("requirements")]
    ].filter(([,value])=>String(value||"").trim());
    const message=[
      "Hello Image Paradise Photography, I would like to check availability and get a quote for "+service+".",
      "",
      "Name: "+data.get("clientName"),
      "WhatsApp / phone: "+data.get("clientMobile"),
      "Email: "+(data.get("clientEmail")||"Not provided"),
      "Location: "+data.get("clientLocation"),
      "Service: "+service,
      ...optionalDetails.map(([label,value])=>label+": "+value)
    ].join("\\n");
    window.open("https://wa.me/"+phone+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
  });
});
