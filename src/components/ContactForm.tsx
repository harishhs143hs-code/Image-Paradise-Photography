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
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialSessionType) setFormData((prev) => ({ ...prev, sessionType: initialSessionType }));
  }, [initialSessionType]);

  useEffect(() => {
    if (initialBudget) setFormData((prev) => ({ ...prev, budget: initialBudget }));
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
    if (!formData.firstName.trim()) errs.firstName = 'First name required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.phone.trim()) errs.phone = 'WhatsApp phone required';
    if (!formData.sessionType) errs.sessionType = 'Select one session';
    if (!formData.eventDate) errs.eventDate = 'Event date required';
    if (!formData.message.trim() || formData.message.trim().length < 15) errs.message = 'Please provide at least 15 characters about your celebration';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

      if (!response.ok) throw new Error('Unable to send enquiry');
      const result = await response.json().catch(() => null);
      if (result && result.success === false) throw new Error(result.message || 'Unable to send enquiry');
      setSubmitted(true);
    } catch (error) {
      setSubmitError('We could not send the enquiry right now. Please use WhatsApp below so your request is not lost.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError('');
    setErrors({});
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      sessionType: 'Wedding Photography', eventDate: '', budget: '', message: ''
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Wedding Photography Enquiry — Image Paradise\n` +
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
          <h2>Let's create<br /><em>something beautiful</em><br />together</h2>
          <p>Tell us your date and celebration details. We'll verify availability with you and guide you through the next steps.</p>

          <div className="ci-rows">
            <div className="ci-row"><div className="ci-icon">Phone</div><div><label>Phone / WhatsApp</label><p><a href="tel:+917708510143" data-lead-event="phone_click">+91 7708510143</a></p></div></div>
            <div className="ci-row"><div className="ci-icon">Email</div><div><label>Direct Studio Email</label><p>imageparadise2020@gmail.com</p></div></div>
            <div className="ci-row"><div className="ci-icon">Studio</div><div><label>Studio Address</label><p><strong>IMAGE PARADISE</strong><br />No. 2/670, Kudiyanvur Street 87<br />Veppampattu – 602024, Tamil Nadu</p></div></div>
          </div>

          <div className="soc-row">
            <a href="https://www.instagram.com/imageparadisephotography" className="soc" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/imageparadisephotography" className="soc" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>

          <div className="ci-photo-strip">
            <img src="/images/gallery1.jpeg" alt="Engagement couple" loading="lazy" width={300} height={300} />
            <img src="/images/DSC06228-opt.JPG" alt="Ceremony Muhurtham" loading="lazy" width={300} height={300} />
            <img src="/images/AR_02707-opt.JPG" alt="Couple Golden Hour" loading="lazy" width={300} height={300} />
            <img src="/images/MPS_6098-opt.JPG" alt="Family smile" loading="lazy" width={300} height={300} />
          </div>
        </div>

        <div className="cform-wrap">
          {submitted ? (
            <div className="cform-success-card">
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--ink)', marginBottom: '12px' }}>Thank You, {formData.firstName}.</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>Your enquiry was sent successfully. We'll verify your date and get back to you.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                <a href={`https://wa.me/917708510143?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="btn-pink" style={{ textDecoration: 'none', display: 'inline-block' }}>Continue on WhatsApp →</a>
                <button type="button" onClick={resetForm} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>Submit another enquiry</button>
              </div>
            </div>
          ) : (
            <form id="eForm" onSubmit={handleSubmit} noValidate>
              {initialMessage && <div className="custom-quote-badge"><span>Package details added to your enquiry</span></div>}

              <div className="f2col">
                <div className="fg"><label htmlFor="f_fname">First Name *</label><input id="f_fname" name="firstName" type="text" placeholder="e.g. Swathi" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'bad' : ''} autoComplete="given-name" />{errors.firstName && <span className="fe">{errors.firstName}</span>}</div>
                <div className="fg"><label htmlFor="f_lname">Last Name *</label><input id="f_lname" name="lastName" type="text" placeholder="e.g. Sundaram" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'bad' : ''} autoComplete="family-name" />{errors.lastName && <span className="fe">{errors.lastName}</span>}</div>
              </div>

              <div className="fg"><label htmlFor="f_email">Email Address *</label><input id="f_email" name="email" type="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} className={errors.email ? 'bad' : ''} autoComplete="email" />{errors.email && <span className="fe">{errors.email}</span>}</div>
              <div className="fg"><label htmlFor="f_phone">WhatsApp Number *</label><input id="f_phone" name="phone" type="tel" placeholder="+91 98765 43210" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className={errors.phone ? 'bad' : ''} />{errors.phone && <span className="fe">{errors.phone}</span>}</div>

              <div className="f2col">
                <div className="fg"><label htmlFor="f_session">Session Type *</label><select id="f_session" name="sessionType" value={formData.sessionType} onChange={handleChange}>{['Wedding Photography','Muhurtham & Reception','Engagement Ceremony','Bridal Portrait','Pre-Wedding Shoot','Family Portrait'].map((item) => <option key={item} value={item}>{item}</option>)}</select>{errors.sessionType && <span className="fe">{errors.sessionType}</span>}</div>
                <div className="fg"><label htmlFor="f_date">Event Date *</label><input id="f_date" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} />{errors.eventDate && <span className="fe">{errors.eventDate}</span>}</div>
              </div>

              <div className="fg"><label htmlFor="f_budget">Estimated Budget Range</label><small className="form-hint">Optional — helps us suggest the right package.</small><select id="f_budget" name="budget" value={formData.budget} onChange={handleChange}><option value="">Select range...</option><option value="₹35,000 – ₹50,000">₹35,000 – ₹50,000</option><option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option><option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option><option value="₹2,00,000+">₹2,00,000+</option></select></div>

              <div className="fg"><label htmlFor="f_msg">Tell us about your celebration *</label><textarea id="f_msg" name="message" rows={4} placeholder="Venue, city, events to cover, guest count, or specific requests..." value={formData.message} onChange={handleChange} className={errors.message ? 'bad' : ''} />{errors.message && <span className="fe">{errors.message}</span>}</div>

              <div className="form-next-steps" aria-label="What happens next"><strong>What happens next</strong><span>01 · We verify your date</span><span>02 · We discuss coverage and send a quote</span><span>03 · Booking advance confirms the date</span></div>

              {submitError && <div className="form-error" role="alert">{submitError}</div>}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="fsub" id="fsub" disabled={isSubmitting} style={{ flex: 1, minWidth: '200px' }}>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</button>
                <a href={`https://wa.me/917708510143?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-direct" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', background: '#25D366', color: '#fff', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, fontSize: '14px', border: 'none' }}>WhatsApp</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
