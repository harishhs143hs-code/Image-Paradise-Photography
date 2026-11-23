document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;

  const phone = "917708510143";
  const status = document.getElementById("leadFormStatus");
  const submitButton = form.querySelector('button[type="submit"]');

  const value = (data, key) => String(data.get(key) || "").trim();
  const emit = (event, detail = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, event_source: "image_paradise_website", ...detail });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (value(data, "companyWebsite")) return;

    const service = value(data, "eventType") || "Photography";
    const name = value(data, "clientName");
    const mobile = value(data, "clientMobile");
    const location = value(data, "clientLocation");
    const date = value(data, "eventDate") || "Not decided";
    const flexibility = value(data, "dateFlexibility");
    const coverage = value(data, "coverage");
    const budget = value(data, "budget");
    const email = value(data, "clientEmail");
    const requirements = value(data, "requirements");

    const lines = [
      "Hello Image Paradise Photography, I would like to enquire about " + service + ".",
      "",
      "Name: " + name,
      "WhatsApp / Phone: " + mobile,
      "Event location: " + location,
      "Service: " + service,
      "Event date: " + date,
      "Date status: " + (flexibility || "Not specified"),
      "Expected coverage: " + (coverage || "Not specified"),
      "Estimated budget: " + (budget || "Not specified")
    ];
    if (email) lines.push("Email: " + email);
    if (requirements) lines.push("Requirements: " + requirements);
    lines.push("", "Source: " + window.location.pathname);

    const whatsappUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(lines.join("\n"));

    // Open a tab during the user's click so mobile browsers do not block the later redirect.
    const whatsappTab = window.open("about:blank", "_blank");
    if (whatsappTab) whatsappTab.opener = null;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Preparing your enquiry…";
    }
    if (status) status.textContent = "Preparing your enquiry. Please wait…";

    let saved = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: mobile,
          email,
          location,
          service,
          event_date: value(data, "eventDate"),
          date_flexibility: flexibility,
          coverage,
          budget,
          requirements,
          consent: data.get("leadConsent") === "yes",
          website: value(data, "companyWebsite"),
          source_page: window.location.pathname
        })
      });
      saved = response.status === 201;
    } catch (_) {
      saved = false;
    }

    emit(saved ? "lead_saved" : "lead_storage_unavailable", { form_id: form.id, service_type: service });
    emit("whatsapp_click", { link_type: "lead_form", service_type: service });

    if (whatsappTab) {
      whatsappTab.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }

    if (status) {
      status.textContent = saved
        ? "Your enquiry has been saved. WhatsApp is opening with your details; review the message and tap Send."
        : "Your message is ready in WhatsApp. Online lead storage is not connected yet, so please tap Send to share your enquiry.";
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Enquiry & Continue to WhatsApp";
    }
  });
});
