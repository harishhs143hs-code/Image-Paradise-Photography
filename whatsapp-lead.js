document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;

  const phone = "917708510143";
  const status = document.getElementById("leadFormStatus");
  const submit = form.querySelector('button[type="submit"]');

  const value = (data, key) => String(data.get(key) || "").trim();
  const setStatus = (message, kind = "info") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = kind;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (value(data, "companyWebsite")) return; // quiet honeypot spam trap

    const lead = {
      name: value(data, "clientName"),
      phone: value(data, "clientMobile"),
      email: value(data, "clientEmail"),
      location: value(data, "clientLocation"),
      service: value(data, "eventType"),
      event_date: value(data, "eventDate"),
      date_flexibility: value(data, "dateFlexibility"),
      coverage: value(data, "coverage"),
      budget: value(data, "budget"),
      requirements: value(data, "requirements"),
      consent: document.getElementById("leadConsent")?.checked === true,
      source_page: window.location.pathname
    };

    const message = [
      "Hello Image Paradise Photography, I would like to enquire about a booking.",
      "",
      "Name: " + lead.name,
      "Phone: " + lead.phone,
      "Email: " + (lead.email || "Not provided"),
      "Event Location: " + lead.location,
      "Service: " + lead.service,
      "Event Date: " + (lead.event_date || "Not decided"),
      "Date Status: " + (lead.date_flexibility || "Not specified"),
      "Coverage: " + (lead.coverage || "Not specified"),
      "Budget: " + (lead.budget || "Not specified"),
      "Requirements: " + (lead.requirements || "Not specified")
    ].join("\n");

    const whatsappUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    if (submit) submit.disabled = true;
    setStatus("Submitting your enquiry securely…");

    let saved = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        saved = result.ok === true;
      } else {
        const result = await response.json().catch(() => ({}));
        setStatus(result.error || "We could not save your enquiry just now. WhatsApp is still available.", "warning");
      }
    } catch (_) {
      setStatus("We could not reach the lead system. WhatsApp is still available.", "warning");
    } finally {
      if (submit) submit.disabled = false;
    }

    if (whatsappWindow) {
      whatsappWindow.location = whatsappUrl;
    } else {
      setStatus("Your enquiry was " + (saved ? "saved. " : "not saved yet. ") +
        "Your browser blocked the WhatsApp tab. Please use the WhatsApp contact button or allow pop-ups.", "warning");
    }

    if (saved) {
      setStatus("Enquiry saved successfully. WhatsApp is opening with your details—please press Send there.", "success");
      form.reset();
    }
  });
});
