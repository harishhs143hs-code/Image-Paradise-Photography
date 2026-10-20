import React, { useState } from 'react';

export const ReferralProgram: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [referralPhone, setReferralPhone] = useState('');
  const [city, setCity] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !referral || !referralPhone) return;

    const message = encodeURIComponent(
      `Image Paradise Referral\n\nReferrer: ${name}\nPhone: ${phone}\nReferred Client: ${referral}\nClient Phone: ${referralPhone}\nCity: ${city || 'Not specified'}\n\nPlease contact the referred client and register this referral.`
    );
    window.open(`https://wa.me/917708510143?text=${message}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section className="referral-page-section" aria-labelledby="referral-heading">
      <div className="referral-page-hero">
        <p className="section-kicker">IMAGE PARADISE PARTNER PROGRAM</p>
        <h1 id="referral-heading">Refer a client.<br /><em>Earn a reward.</em></h1>
        <p>Know a couple planning a wedding or event? Introduce them to Image Paradise Photography. When an eligible referral becomes a confirmed booking, the referrer can receive a reward under the current program terms.</p>
      </div>

      <div className="referral-steps" aria-label="Referral process">
        <div><span>01</span><h3>Register</h3><p>Share your details and the client you are referring.</p></div>
        <div><span>02</span><h3>Connect</h3><p>We contact the client and handle the enquiry professionally.</p></div>
        <div><span>03</span><h3>Confirm</h3><p>If the eligible booking is confirmed, your referral is recorded.</p></div>
        <div><span>04</span><h3>Receive</h3><p>The applicable reward is provided according to the program terms.</p></div>
      </div>

      <div className="referral-main-grid">
        <div className="referral-info-card">
          <p className="section-kicker">WHO CAN REFER</p>
          <h2>Built for people who know people.</h2>
          <p>Wedding planners, makeup artists, decorators, venues, friends, family, past clients and business partners can introduce genuine enquiries.</p>
          <ul>
            <li>Simple referral registration</li>
            <li>Professional client follow-up</li>
            <li>Referral status handled directly by Image Paradise</li>
            <li>Reward only for eligible confirmed bookings</li>
          </ul>
          <p className="referral-note">Reward values and eligibility may vary by service and booking. Full terms are shared during registration.</p>
        </div>

        <div className="referral-form-card">
          {submitted ? (
            <div className="referral-success">
              <p className="section-kicker">REFERRAL RECEIVED</p>
              <h2>Thank you, {name}.</h2>
              <p>Your referral has been prepared for our team. We will follow up with the referred client.</p>
              <button type="button" className="btn-pink" onClick={() => setSubmitted(false)}>Refer another client</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="section-kicker">REGISTER A REFERRAL</p>
              <h2>Tell us who you are referring.</h2>
              <div className="ref-form-grid-simple">
                <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" /></label>
                <label>Your phone<input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" placeholder="WhatsApp number" /></label>
                <label>Client name<input value={referral} onChange={(e) => setReferral(e.target.value)} required placeholder="Bride, groom or couple" /></label>
                <label>Client phone<input value={referralPhone} onChange={(e) => setReferralPhone(e.target.value)} required type="tel" placeholder="Client WhatsApp number" /></label>
                <label>City<input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Chennai / Tiruvallur / Other" /></label>
              </div>
              <button type="submit" className="btn-pink referral-submit">Submit referral <span aria-hidden="true">→</span></button>
              <p className="ref-form-disclaimer">Submitting a referral does not guarantee a reward. Rewards apply only to eligible confirmed bookings under the active referral terms.</p>
            </form>
          )}
        </div>
      </div>

      <div className="referral-bottom-cta">
        <div><p className="section-kicker">PARTNER WITH US</p><h2>Have regular wedding enquiries?</h2><p>Talk to us about a professional referral or business-development partnership.</p></div>
        <a className="btn-outline" href="https://wa.me/917708510143" target="_blank" rel="noopener noreferrer">Talk to Image Paradise <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
};
