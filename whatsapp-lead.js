document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;

  const phone = "917708510143";
  const status = document.getElementById("leadFormStatus");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const trap = form.querySelector('[name="companyWebsite"]');
    if (trap && trap.value.trim()) {
      if (status) status.textContent = "Thanks. If your enquiry is genuine, please contact us directly on WhatsApp.";
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = name => String(data.get(name) || "").trim();
    const service = value("eventType");
    const lines = [
      "Hello Image Paradise Photography, I’d like to enquire about a photography service.",
      "",
      "Name: " + value("clientName"),
      "Phone / WhatsApp: " + value("clientMobile"),
      "Email: " + (value("clientEmail") || "Not provided"),
      "Location: " + value("clientLocation"),
      "Service: " + service,
      "Event date: " + (value("eventDate") || "Not decided"),
      "Date status: " + (value("dateFlexibility") || "Not specified"),
      "Coverage: " + (value("coverage") || "Not specified"),
      "Budget: " + (value("budget") || "Not specified"),
      "Requirements: " + (value("requirements") || "Not specified")
    ];

    const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
    if (status) status.textContent = "WhatsApp has opened with your enquiry details. Review the message and tap Send in WhatsApp; nothing is sent or stored by this website.";
  });
});
