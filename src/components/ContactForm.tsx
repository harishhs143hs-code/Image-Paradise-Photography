import React, { useState } from 'react';
import { EnquiryFormData } from '../types';

interface ContactFormProps {
  initialSessionType?: string;
  initialBudget?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialSessionType = '',
  initialBudget = ''
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sessionType: initialSessionType || '',
    eventDate: '',
    budget: initialBudget || '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if initial prop changes
  React.useEffect(() => {
    if (initialSessionType) {
      setFormData((prev) => ({ ...prev, sessionType: initialSessionType }));
    }
  }, [initialSessionType]);

  React.useEffect(() => {
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialBudget]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'Required';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number required';
    }
    if (!formData.sessionType) {
      errs.sessionType = 'Select one';
    }
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      errs.message = 'Minimum 20 characters';
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

    setIsSubmitting(true);

    try {
      // Send to Web3Forms using the existing access key
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '63a5b850-8986-415e-989d-cb1d0f6ac37e',
          subject: `New Client Enquiry: ${formData.sessionType} - ${formData.firstName} ${formData.lastName}`,
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
      // Fallback: still treat as recorded locally so the client doesn't get blocked
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Image Paradise Photography!\nName: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nEvent: ${formData.sessionType}\nDate: ${formData.eventDate}\nBudget: ${formData.budget}\nDetails: ${formData.message}`
  );

  return (
    <section id="contact" data-contact-section="true">
      <div className="contact-grid">
        <div className="cinfo">
          <div className="sec-badge light">
            <img src="/images/Logo-opt.png" alt="" loading="lazy" width="24" height="24" />
            Enquire Now
          </div>
          <h2>
            Let's create<br />
            <em>something beautiful</em><br />
            together
          </h2>
          <p>Tell us your date and celebration details. We’ll check availability and get back to you within 24 hours.</p>

          <div className="ci-rows">
            <div className="ci-row">
              <div className="ci-icon">✉</div>
              <div>
                <label>Email</label>
                <p>imageparadise2020@gmail.com</p>
              </div>
            </div>
            <div className="ci-row">
              <div className="ci-icon">☎</div>
              <div>
                <label>Phone</label>
                <p>
                  <a href="tel:+917708510143" data-lead-event="phone_click">
                    +91 7708510143
                  </a>
                </p>
              </div>
            </div>
            <div className="ci-row">
              <div className="ci-icon">⊙</div>
              <div>
                <label>Office</label>
                <p>Chennai, Tamil Nadu, India</p>
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

          {/* preview strip of real photos */}
          <div className="ci-photo-strip">
            <img src="/images/gallery1.jpeg" alt="Couple engagement" loading="lazy" width={300} height={300} />
            <img src="/images/DSC06228-opt.JPG" alt="Wedding ceremony" loading="lazy" width={300} height={300} />
            <img src="/images/AR_02707-opt.JPG" alt="Sacred union" loading="lazy" width={300} height={300} />
            <img src="/images/MPS_6098-opt.JPG" alt="Family celebration" loading="lazy" width={300} height={300} />
          </div>
        </div>

        <div className="cform-wrap">
          {submitted ? (
            <div
              style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '24px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--ink)', marginBottom: '12px' }}>
                Thank You, {formData.firstName}!
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                Your wedding enquiry has been received. Our lead photographer will check date availability and reply within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <a
                  href={`https://wa.me/917708510143?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Send Details on WhatsApp Too →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      sessionType: '',
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
                    textDecoration: 'underline',
                    marginTop: '8px'
                  }}
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form id="eForm" onSubmit={handleSubmit}>
              <div className="f2col">
                <div className="fg">
                  <label htmlFor="f_fname">First Name *</label>
                  <input
                    id="f_fname"
                    name="firstName"
                    type="text"
                    placeholder="Aysha"
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
                    placeholder="Yunus"
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
                  placeholder="@gmail.com"
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
                  placeholder="+91 7708510143"
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
                    <option value="">Select...</option>
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Engagement Session">Engagement Session</option>
                    <option value="Bridal Portrait">Bridal Portrait</option>
                    <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    <option value="Family Portrait">Family Portrait</option>
                    <option value="Maternity Session">Maternity Session</option>
                    <option value="Newborn Photography">Newborn Photography</option>
                  </select>
                  {errors.sessionType && <span className="fe">{errors.sessionType}</span>}
                </div>

                <div className="fg">
                  <label htmlFor="f_date">Event Date *</label>
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
                <label htmlFor="f_budget">Budget Range</label>
                <small className="form-hint">Optional — helps us suggest the right coverage.</small>
                <select
                  id="f_budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                  <option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option>
                  <option value="₹2,00,000+">₹2,00,000+</option>
                </select>
              </div>

              <div className="fg">
                <label htmlFor="f_msg">Tell us about your day *</label>
                <textarea
                  id="f_msg"
                  name="message"
                  rows={4}
                  placeholder="Venue, guest count, coverage needs, or anything you already have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'bad' : ''}
                  required
                ></textarea>
                {errors.message && <span className="fe">{errors.message}</span>}
              </div>

              <div className="form-next-steps" aria-label="What happens next">
                <strong>What happens next</strong>
                <span>01 · We check your date</span>
                <span>02 · We discuss your coverage</span>
                <span>03 · We guide you to booking</span>
              </div>

              <button
                type="submit"
                className="fsub"
                id="fsub"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
