(function () {
  window.dataLayer = window.dataLayer || [];
  function record(name, detail) {
    var event = Object.assign({ event: name, event_source: "image_paradise_website" }, detail || {});
    window.dataLayer.push(event);
    if (typeof window.gtag === "function") window.gtag("event", name, detail || {});
  }
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) record("whatsapp_click", { link_type: "whatsapp" });
    else if (/^tel:/i.test(href)) record("phone_click", { link_type: "telephone" });
    else if (/^mailto:/i.test(href)) record("email_click", { link_type: "email" });
  }, true);
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.tagName || form.tagName.toLowerCase() !== "form") return;
    var id = form.id || "unnamed_form";
    record(id === "partnerForm" ? "referral_form_submit_attempt" : "lead_form_submit_attempt", { form_id: id });
  }, true);
})();
