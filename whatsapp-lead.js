document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappLeadForm");
  if (!form) return;

  const businessPhone = "917708510143";
  const status = document.getElementById("leadFormStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (String(data.get("companyWebsite") || "").trim()) return;

    const fields = [
      ["Name", "clientName"],
      ["Phone / WhatsApp", "clientMobile"],
      ["Email", "clientEmail"],
      ["Event location", "clientLocation"],
      ["Service", "eventType"],
      ["Event date", "eventDate"],
      ["Date status", "dateFlexibility"],
      ["Coverage", "coverage"],
      ["Budget", "budget"],
      ["Requirements", "requirements"]
    ];
    const lines = ["Hello Image Paradise Photography, I'd like to enquire about your services.", ""];
    for (const [label, key] of fields) {
      const value = String(data.get(key) || "").trim();
      if (value) lines.push(label + ": " + value);
    }

    const whatsappUrl = "https://wa.me/" + businessPhone + "?text=" + encodeURIComponent(lines.join("\n"));
    if (status) status.textContent = "WhatsApp is opening with your enquiry details. Please review the message and tap Send to contact us.";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});