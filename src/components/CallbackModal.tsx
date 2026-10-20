import React, { useState } from 'react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [callTime, setCallTime] = useState('Within 15 minutes');
  const [weddingDate, setWeddingDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);\n  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !privacyConsent) return;
    setIsSubmitting(true);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '63a5b850-8986-415e-989d-cb1d0f6ac37e',
          subject: `⚡ URGENT Callback Request: ${name} (${phone}) - Preferred Time: ${callTime}`,
          name,
          phone,
          preferred_time: callTime,
          wedding_date: weddingDate || 'Not specified',
          notes: notes || 'None'
        })
      });
    } catch (err) {
      // Continue to show success & open WhatsApp
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappText = encodeURIComponent(
    `*⚡ Quick Callback Request with Creative Director Hariharan R*\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Preferred Call Time: ${callTime}\n` +
    `Wedding Date: ${weddingDate || 'TBD'}\n` +
    `Note: ${notes || 'Looking for wedding photography details'}`
  );

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Request a direct callback with Hariharan R"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="callback-modal-card">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <div className="cb-badge">📞 VIP Studio Callback</div>
            <h3>Speak Directly With Creative Director Hariharan R</h3>
            <p className="cb-sub">
              Have questions about your wedding photography, package customization, or Muhurtham schedule? Request a 10-minute call without filling lengthy forms.
            </p>

            <form onSubmit={handleSubmit} className="cb-form">
              <div className="cb-field">
                <label htmlFor="cb-name">Your Full Name *</label>
                <input
                  id="cb-name"
                  type="text"
                  placeholder="e.g. Swathi or Vignesh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="cb-field">
                <label htmlFor="cb-phone">Your Phone / WhatsApp *</label>
                <input
                  id="cb-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="cb-field">
                <label htmlFor="cb-time">Preferred Call Time</label>
                <select
                  id="cb-time"
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                >
                  <option value="Within 15 minutes">⚡ Immediately / Within 15 minutes</option>
                  <option value="Today Evening (6:00 PM – 8:30 PM)">Today Evening (6:00 PM – 8:30 PM)</option>
                  <option value="Tomorrow Morning (9:30 AM – 12:00 PM)">Tomorrow Morning (9:30 AM – 12:00 PM)</option>
                  <option value="Weekend Afternoon">Weekend Afternoon</option>
                </select>
              </div>

              <div className="cb-field">
                <label htmlFor="cb-date">Tentative Wedding Date / Venue</label>
                <input
                  id="cb-date"
                  type="text"
                  placeholder="e.g. Nov 2026 / Chennai or Tiruvallur"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </div>

              <label htmlFor="cb-privacy-consent" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.5 }}>
                <input id="cb-privacy-consent" type="checkbox" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} required style={{ marginTop: '4px' }} />
                <span>I have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a> and agree that the details I submit may be used to respond to my callback request.</span>
              </label>
              <button type="submit" className="cb-submit-btn" disabled={isSubmitting || !privacyConsent}>
                {isSubmitting ? 'Requesting Callback...' : 'Request Direct Callback Now →'}
              </button>

              <div className="cb-call-now">
                <span>Prefer to call immediately?</span>
                <a href="tel:+917708510143">Direct Line: +91 7708510143</a>
              </div>
            </form>
          </>
        ) : (
          <div className="cb-success">
            <div style={{ fontSize: '46px', marginBottom: '12px' }}>✨</div>
            <h3>Callback Scheduled!</h3>
            <p>
              Thank you, <strong>{name}</strong>. Hariharan R has received your request and will connect with you <strong>{callTime.toLowerCase()}</strong>.
            </p>
            <div className="cb-success-actions">
              <a
                href={`https://wa.me/917708510143?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Connect on WhatsApp Right Now ↗
              </a>
              <button
                type="button"
                className="btn-outline"
                onClick={onClose}
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
