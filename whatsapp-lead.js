document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;
  const status = document.getElementById("leadFormStatus");
  const phone = "917708510143";
  const value = (data, key, fallback = "Not provided") => String(data.get(key) || fallback).trim();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (value(data, "companyWebsite", "") !== "") return;
    const lead = {
      name: value(data,"clientName"), phone: value(data,"clientMobile"),
      email: value(data,"clientEmail",""), location: value(data,"clientLocation"),
      service: value(data,"eventType"), event_date: value(data,"eventDate",""),
      date_flexibility: value(data,"dateFlexibility","Not provided"),
      coverage: value(data,"coverage","Not provided"), budget: value(data,"budget","Not provided"),
      requirements: value(data,"requirements",""), consent: data.get("leadConsent") === "yes",
      website: value(data,"companyWebsite",""), source_page: window.location.pathname
    };
    const message = [
      "Hello Image Paradise Photography, I would like to enquire about a booking.",
      "", "Name: " + lead.name, "Phone / WhatsApp: " + lead.phone,
      "Email: " + (lead.email || "Not provided"), "Service: " + lead.service,
      "Event location: " + lead.location, "Event date: " + (lead.event_date || "Not decided"),
      "Date status: " + lead.date_flexibility, "Coverage: " + lead.coverage,
      "Budget: " + lead.budget, "Requirements: " + (lead.requirements || "Not provided")
    ].join("\n");
    const whatsappUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    if (status) status.textContent = "WhatsApp opened. Saving your enquiry to the booking dashboard…";
    try {
      const response = await fetch("/api/leads", {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify(lead)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Lead storage is not configured yet.");
      if (status) status.textContent = "Enquiry saved. Please send the prepared WhatsApp message to complete your request.";
      form.reset();
    } catch (error) {
      if (status) status.textContent = "WhatsApp is ready. The website could not save this enquiry to the dashboard, so please send the WhatsApp message or contact us directly.";
      console.error("Lead storage failed:", error.message);
    } finally {
      submit.disabled = false;
    }
  });
});