import React, { useState, useEffect } from 'react';
import { EnquiryFormData } from '../types';

interface ContactFormProps {
  initialSessionType?: string;
  initialBudget?: string;
  initialMessage?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialSessionType = '',
  initialBudget = '',
  initialMessage = ''
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sessionType: initialSessionType || 'Wedding Photography',
    eventDate: '',
    budget: initialBudget || '',
    message: initialMessage || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  useEffect(() => {
    if (initialSessionType) {
      setFormData((prev) => ({ ...prev, sessionType: initialSessionType }));
    }
  }, [initialSessionType]);

  useEffect(() => {
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialBudget]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n${initialMessage}` : initialMessage
      }));
    }
  }, [initialMessage]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First name required';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'WhatsApp phone required';
    }
    if (!formData.sessionType) {
      errs.sessionType = 'Select one session';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters about your wedding';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!privacyConsent) {
      setErrors((prev) => ({ ...prev, consent: 'Please read and accept the Privacy Notice to continue.' }));
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '63a5b850-8986-415e-989d-cb1d0f6ac37e',
          subject: `Wedding Enquiry: ${formData.sessionType} - ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          session: formData.sessionType,
          event_date: formData.eventDate,
          budget: formData.budget,
          message: formData.message
        })
      });

      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `*Wedding Photography Enquiry — Image Paradise*\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Event: ${formData.sessionType}\n` +
      `Date: ${formData.eventDate || 'TBD'}\n` +
      `Budget: ${formData.budget || 'Custom'}\n` +
      `Details: ${formData.message}`
  );

  return (
    <section id="contact" data-contact-section="true">
      <div className="contact-grid">
        <div className="cinfo">
          <div className="sec-badge light">
            <img src="/images/Logo-opt.png" alt="" loading="lazy" width={24} height={24} />
            Let's Talk
          </div>
          <h2>
            Let's create<br />
            <em>something beautiful</em><br />
            together
          </h2>
          <p>
            Tell us your date and celebration details. We accept only <strong>1 wedding per day</strong> to guarantee complete devotion. We'll verify date availability within 24 hours.
          </p>

          <div className="ci-rows">
            <div className="ci-row">
              <div className="ci-icon">📷</div>
              <div>
                <label>Creative Director</label>
                <p>Hariharan R</p>
              </div>
            </div>
            <div className="ci-row">
              <div className="ci-icon">☎</div>
              <div>
                <label>Phone / WhatsApp</label>
                <p>
                  <a href="tel:+917708510143" data-lead-event="phone_click">
                    +91 7708510143
                  </a>
                </p>
              </div>
            </div>
            <div className="ci-row">
              <div className="ci-icon">✉</div>
              <div>
                <label>Direct Studio Email</label>
                <p>imageparadise2020@gmail.com</p>
              </div>
            </div>
            <div className="ci-row">
              <div className="ci-icon">⊙</div>
              <div>
                <label>Studio Address</label>
                <p>
                  <strong>IMAGE PARADISE</strong><br />
                  No. 2/670, Kudiyanvur Street 87<br />
                  Veppampattu – 602024, Tamil Nadu
                </p>
              </div>
            </div>
          </div>

          <div className="soc-row">
            <a href="https://www.instagram.com/imageparadisephotography" className="soc" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://www.facebook.com/imageparadisephotography" className="soc" target="_blank" rel="noopener">
              Facebook
            </a>
            <a href="https://in.pinterest.com/imageparadisephotography" className="soc" target="_blank" rel="noopener">
              Pinterest
            </a>
          </div>

          {/* photo strip */}
          <div className="ci-photo-strip">
            <img src="/images/DSC06422-opt.JPG" alt="Engagement couple" loading="lazy" width={300} height={300} />
            <img src="/images/DSC06228-opt.JPG" alt="Ceremony Muhurtham" loading="lazy" width={300} height={300} />
            <img src="/images/AR_02707-opt.JPG" alt="Couple Golden Hour" loading="lazy" width={300} height={300} />
            <img src="/images/MPS_6098-opt.JPG" alt="Family smile" loading="lazy" width={300} height={300} />
          </div>
        </div>

        <div className="cform-wrap">
          {submitted ? (
            <div className="cform-success-card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--ink)', marginBottom: '12px' }}>
                Thank You, {formData.firstName}!
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                Your wedding enquiry has reached our studio calendar. Our lead photographer will verify your date availability and respond within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                <a
                  href={`https://wa.me/917708510143?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  💬 Speed Up: Chat on WhatsApp Now →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setPrivacyConsent(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      sessionType: 'Wedding Photography',
                      eventDate: '',
                      budget: '',
                      message: ''
                    });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textDecoration: 'underline'
                  }}
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form id="eForm" onSubmit={handleSubmit}>
              {initialMessage && (
                <div className="custom-quote-badge">
                  <span>✨ Applied your custom calculated package details below</span>
                </div>
              )}

              <div className="f2col">
                <div className="fg">
                  <label htmlFor="f_fname">First Name *</label>
                  <input
                    id="f_fname"
                    name="firstName"
                    type="text"
                    placeholder="e.g. Swathi"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'bad' : ''}
                    required
                  />
                  {errors.firstName && <span className="fe">{errors.firstName}</span>}
                </div>

                <div className="fg">
                  <label htmlFor="f_lname">Last Name *</label>
                  <input
                    id="f_lname"
                    name="lastName"
                    type="text"
                    placeholder="e.g. Sundaram"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'bad' : ''}
                    required
                  />
                  {errors.lastName && <span className="fe">{errors.lastName}</span>}
                </div>
              </div>

              <div className="fg">
                <label htmlFor="f_email">Email Address *</label>
                <input
                  id="f_email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'bad' : ''}
                  required
                />
                {errors.email && <span className="fe">{errors.email}</span>}
              </div>

              <div className="fg">
                <label htmlFor="f_phone">WhatsApp Number *</label>
                <input
                  id="f_phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'bad' : ''}
                  required
                />
                {errors.phone && <span className="fe">{errors.phone}</span>}
              </div>

              <div className="f2col">
                <div className="fg">
                  <label htmlFor="f_session">Session Type *</label>
                  <select
                    id="f_session"
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className={errors.sessionType ? 'bad' : ''}
                    required
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Muhurtham & Reception">Muhurtham &amp; Reception</option>
                    <option value="Engagement Ceremony">Engagement Ceremony</option>
                    <option value="Bridal Portrait">Bridal Portrait</option>
                    <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    <option value="Family Portrait">Family Portrait</option>
                    <option value="Maternity Session">Maternity Session</option>
                  </select>
                  {errors.sessionType && <span className="fe">{errors.sessionType}</span>}
                </div>

                <div className="fg">
                  <label htmlFor="f_date">Wedding Date *</label>
                  <input
                    id="f_date"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    aria-label="Event date"
                    required
                  />
                </div>
              </div>

              <div className="fg">
                <label htmlFor="f_budget">Estimated Budget Range</label>
                <small className="form-hint">Optional — helps us suggest the best team size.</small>
                <select
                  id="f_budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select range...</option>
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                  <option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option>
                  <option value="₹2,00,000+">₹2,00,000+ (Luxury Multi-Event)</option>
                </select>
              </div>

              <div className="fg">
                <label htmlFor="f_msg">Tell us about your celebration *</label>
                <textarea
                  id="f_msg"
                  name="message"
                  rows={4}
                  placeholder="Venue name, city, number of guests, events to cover, or specific photography requests..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'bad' : ''}
                  required
                ></textarea>
                {errors.message && <span className="fe">{errors.message}</span>}
              </div>

              <label htmlFor="f_privacy_consent" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5, margin: '16px 0', fontSize: '13px' }}>
                <input id="f_privacy_consent" type="checkbox" checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} required style={{ marginTop: '4px' }} />
                <span>I have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a> and agree that the details I submit may be used to respond to my enquiry.</span>
              </label>
              {errors.consent && <span className="fe" role="alert">{errors.consent}</span>}

              <div className="form-next-steps" aria-label="What happens next">
                <strong>Our 3-Step Booking Journey</strong>
                <span>01 · We confirm date availability within 24h</span>
                <span>02 · Review customized portfolio and itemized quote</span>
                <span>03 · Pay booking advance to lock your date</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  className="fsub"
                  id="fsub"
                  disabled={isSubmitting}
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  {isSubmitting ? 'Sending Enquiry...' : 'Check Date & Send Enquiry'}
                </button>
                <a
                  href={`https://wa.me/917708510143?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-direct"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 20px',
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none'
                  }}
                >
                  <span>💬 Enquire via WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
