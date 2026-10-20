import React, { useState } from 'react';

export const ReferralProgram: React.FC = () => {
  const [referrerName, setReferrerName] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [friendDate, setFriendDate] = useState('');
  const [friendCity, setFriendCity] = useState('Chennai');
  const [hasPermission, setHasPermission] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referenceId] = useState(() => 'IP-' + Date.now().toString(36).toUpperCase());

  const referralMessage =
    'Hi Image Paradise Photography, I would like to register a referral.\n' +
    'Referral Reference: ' + referenceId + '\n' +
    'Referrer: ' + referrerName.trim() + '\n' +
    'Referrer Contact: ' + referrerPhone.trim() + '\n' +
    'Potential Client: ' + (friendName.trim() || 'Not provided') + '\n' +
    'Potential Client Contact: ' + (friendPhone.trim() || 'Not provided') + '\n' +
    'Event Date: ' + (friendDate || 'Not confirmed') + '\n' +
    'City/Venue Area: ' + friendCity + '\n' +
    'Permission to share contact details confirmed: ' + (hasPermission ? 'Yes' : 'No') + '\n' +
    'Please confirm whether this is a qualified referral and share the reward terms in writing before I make further introductions.';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasPermission) return;
    const url = 'https://wa.me/917708510143?text=' + encodeURIComponent(referralMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareMessage =
    'Hi! I wanted to share Image Paradise Photography for wedding photography and cinematic films in Chennai and Tamil Nadu. You can view their work and enquire here: https://image-paradise-photography.vercel.app/';

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.open('https://wa.me/?text=' + encodeURIComponent(shareMessage), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="referral-section" id="referral" aria-labelledby="referral-heading">
      <div className="referral-container">
        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            Image Paradise Partner Program
          </div>
          <h1 id="referral-heading">Refer a Client. <em>Earn on Confirmed Bookings.</em></h1>
          <p>
            Refer a genuine wedding or event enquiry to Image Paradise Photography. We handle the consultation and photography work.
            The referral reward and payout milestone are confirmed with you in writing before the referral is accepted.
          </p>
        </header>

        <div className="referral-tiers-grid">
          <article className="ref-tier-card featured">
            <div className="ref-tier-icon" aria-hidden="true">🤝</div>
            <div className="ref-tier-badge">For everyone</div>
            <h2>Refer a friend or family</h2>
            <p className="ref-tier-desc">
              Share our portfolio with someone planning a wedding, engagement, pre-wedding shoot or event. Tell them to mention your name when they enquire.
            </p>
            <ul className="ref-tier-bullets">
              <li>Submit a new lead before they book.</li>
              <li>We confirm the referral and reward terms with you.</li>
              <li>Reward eligibility starts only after the agreed booking milestone is met.</li>
            </ul>
          </article>

          <article className="ref-tier-card">
            <div className="ref-tier-icon" aria-hidden="true">💼</div>
            <div className="ref-tier-badge">For professionals</div>
            <h2>Business development partner</h2>
            <p className="ref-tier-desc">
              Wedding planners, makeup artists, decorators, venues, event managers and freelance business developers can discuss a longer-term partnership.
            </p>
            <ul className="ref-tier-bullets">
              <li>Agree the commission before each eligible referral or campaign.</li>
              <li>Keep lead ownership clear in writing.</li>
              <li>Receive payout after the agreed booking and payment conditions are met.</li>
            </ul>
          </article>

          <article className="ref-tier-card">
            <div className="ref-tier-icon" aria-hidden="true">📷</div>
            <div className="ref-tier-badge">Services</div>
            <h2>What you can refer</h2>
            <p className="ref-tier-desc">
              Wedding photography, candid coverage, cinematic videography, pre-wedding shoots, engagement photography and wedding album options.
            </p>
            <p className="ref-tier-desc">Studio service areas include Chennai, Tiruvallur, Avadi, Ambattur and nearby Tamil Nadu locations.</p>
          </article>
        </div>

        <div className="ref-share-action-bar">
          <div className="rsab-text">
            <strong>Share Image Paradise</strong>
            <span>Copy a simple introduction to send to someone planning a wedding.</span>
          </div>
          <div className="rsab-buttons">
            <button type="button" onClick={copyMessage} className="btn-outline-gold">
              {copied ? '✓ Copied' : 'Copy Recommendation'}
            </button>
            <a href={'https://wa.me/?text=' + encodeURIComponent(shareMessage)} target="_blank" rel="noopener noreferrer" className="btn-wa-action">
              Share on WhatsApp ↗
            </a>
          </div>
        </div>

        <div className="ref-form-wrapper">
          <div className="ref-form-header">
            <h2>Register a Referral</h2>
            <p>Complete the details and continue to WhatsApp. This form does not store a referral in a database or request payment/UPI details.</p>
            <p><strong>Your temporary reference:</strong> {referenceId}</p>
          </div>

          <form onSubmit={handleSubmit} className="ref-form">
            <div className="ref-form-grid">
              <label>
                Your name
                <input name="referrerName" value={referrerName} onChange={(event) => setReferrerName(event.target.value)} autoComplete="name" required />
              </label>
              <label>
                Your phone number
                <input name="referrerPhone" type="tel" value={referrerPhone} onChange={(event) => setReferrerPhone(event.target.value)} autoComplete="tel" required />
              </label>
              <label>
                Potential client's name (optional)
                <input name="friendName" value={friendName} onChange={(event) => setFriendName(event.target.value)} />
              </label>
              <label>
                Potential client's phone (optional)
                <input name="friendPhone" type="tel" value={friendPhone} onChange={(event) => setFriendPhone(event.target.value)} />
              </label>
              <label>
                Event date (optional)
                <input name="friendDate" type="date" value={friendDate} onChange={(event) => setFriendDate(event.target.value)} />
              </label>
              <label>
                City / venue area
                <select name="friendCity" value={friendCity} onChange={(event) => setFriendCity(event.target.value)}>
                  <option>Chennai</option>
                  <option>Tiruvallur</option>
                  <option>Avadi</option>
                  <option>Ambattur</option>
                  <option>Other Tamil Nadu location</option>
                </select>
              </label>
            </div>

            <label className="ref-consent" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', margin: '16px 0' }}>
              <input type="checkbox" checked={hasPermission} onChange={(event) => setHasPermission(event.target.checked)} required />
              <span>I have permission to share the contact details I have entered. I have read the <a href="/referral-terms" target="_blank" rel="noopener noreferrer">Referral Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a>.</span>
            </label>

            <button type="submit" className="btn-pink" disabled={!hasPermission}>
              Continue to WhatsApp to Register Referral →
            </button>
          </form>
        </div>

        <section className="referral-terms-summary" aria-labelledby="referral-rules-heading" style={{ marginTop: '32px' }}>
          <h2 id="referral-rules-heading">How reward eligibility works</h2>
          <ol>
            <li>Register a new lead before they have already enquired with or booked the studio.</li>
            <li>We confirm lead eligibility and the reward amount or calculation in writing before accepting the referral.</li>
            <li>A reward is payable only after the referred client's booking and the agreed payment milestone are confirmed.</li>
            <li>Duplicate, self-referred, cancelled or refunded bookings may not qualify; the full rules are set out in the Referral Terms.</li>
            <li>Payment details are requested only when a reward is due—not in this registration form.</li>
          </ol>
          <p>For a commission discussion, WhatsApp <a href="https://wa.me/917708510143">+91 7708510143</a> or email <a href="mailto:imageparadise2020@gmail.com">imageparadise2020@gmail.com</a>.</p>
        </section>
      </div>
    </section>
  );
};
