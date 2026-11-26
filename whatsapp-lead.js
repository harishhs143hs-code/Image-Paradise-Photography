document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;

  const whatsappNumber = "917708510143";
  const status = document.getElementById("leadFormStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Quietly reject submissions that fill the hidden spam-trap field.
    const data = new FormData(form);
    if (String(data.get("companyWebsite") || "").trim()) {
      if (status) status.textContent = "Please try again.";
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const value = (name, fallback = "Not provided") => {
      const field = String(data.get(name) || "").trim();
      return field || fallback;
    };

    const message = [
      "Hello Image Paradise Photography, I’d like to enquire about a photography service.",
      "",
      "Name: " + value("clientName"),
      "WhatsApp / phone: " + value("clientMobile"),
      "Email: " + value("clientEmail"),
      "Event location: " + value("clientLocation"),
      "Service: " + value("eventType"),
      "Event date: " + value("eventDate", "Not decided"),
      "Date status: " + value("dateFlexibility", "Not specified"),
      "Coverage: " + value("coverage"),
      "Estimated budget: " + value("budget"),
      "Additional requirements: " + value("requirements")
    ].join("\n");

    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");

    if (status) {
      status.textContent = "WhatsApp opened with your enquiry details. Review the message and tap Send to submit your enquiry.";
    }
  });
});
