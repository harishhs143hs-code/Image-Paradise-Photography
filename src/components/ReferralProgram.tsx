import React, { useState } from 'react';

export const ReferralProgram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'couples'>('public');
  const [referrerName, setReferrerName] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [referrerUpi, setReferrerUpi] = useState('');
  const [rewardChoice, setRewardChoice] = useState<'cash' | 'voucher'>('cash');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [friendDate, setFriendDate] = useState('');
  const [referralCount, setReferralCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Earning calculation
  const cashPerBooking = 3500;
  const totalEarnings = referralCount * cashPerBooking;

  const copyShareText = () => {
    const textToCopy = `Vanakkam! If you or someone in your family is planning a wedding in Chennai or Tamil Nadu, I strongly recommend Image Paradise Photography (Creative Director: Hariharan R, +91 7708510143). They specialize in soulful candid photography, 4K cinematic films, and 48-hour sneak peeks. If you book and mention my reference (${referrerName || 'my reference'}), you'll receive an exclusive ₹2,500 album upgrade credit! Check their work: https://image-paradise-photography.vercel.app/`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerName || !referrerPhone || !friendName) return;
    setSubmitted(true);

    const text = encodeURIComponent(
      `*New Wedding Referral Submission — Image Paradise*\n` +
      `Director: Hariharan R · Image Paradise\n` +
      `Studio Address: No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024\n\n` +
      `Referrer: ${referrerName} (${referrerPhone})\n` +
      `Reward Choice: ${rewardChoice === 'cash' ? `UPI Cash (${referrerUpi || 'Will provide'})` : '15% Future Service Voucher / Parent Album'}\n` +
      `Referred Couple: ${friendName} (${friendPhone})\n` +
      `Wedding Date/City: ${friendDate || 'Upcoming 2025/2026'}`
    );

    window.open(`https://wa.me/917708510143?text=${text}`, '_blank');
  };

  const shareableWhatsappText = encodeURIComponent(
    `Vanakkam ${friendName ? friendName : 'there'}! I wanted to recommend our trusted wedding photographer in Chennai — Image Paradise Photography (Creative Director: Hariharan R, +91 7708510143). They do stunning candid photography, 4K cinema, and deliver same-week sneak peeks. If you book with them, mention my name (${referrerName || 'my reference'}) to receive an exclusive ₹2,500 handcrafted album upgrade credit! Check their portfolio: https://image-paradise-photography.vercel.app/`
  );

  const referralFaqs = [
    {
      q: 'Who can join the Refer & Earn program?',
      a: 'Anyone! The Public Cash Earning option is open to everyone across Tamil Nadu — college students, wedding guests, vendors (caterers, makeup artists, mehendi artists), and family friends. You do not need to have been a past client to earn ₹2,000 to ₹5,000 cash.'
    },
    {
      q: 'When and how do I receive my UPI Cash reward?',
      a: 'We transfer your cash reward directly to your Google Pay, PhonePe, or Paytm UPI ID within 48 hours after your referred couple confirms their wedding booking with their deposit.'
    },
    {
      q: 'What is the reward for past brides and grooms?',
      a: 'Past couples can choose between a 15% discount voucher on all future photography services (anniversary, maternity, newborn, or family portraits) OR a complimentary handcrafted parent keepsake album worth ₹6,500.'
    },
    {
      q: 'What benefit does the couple I refer get?',
      a: 'It is a win-win! Your referred couple receives a complimentary ₹2,500 upgrade credit towards Italian leather album embossing, drone session add-on, or 10 extra edited heirloom prints.'
    },
    {
      q: 'Can I refer multiple couples in a year?',
      a: 'Yes, absolutely! There is zero limit. If you refer 4 couples who book with us, you can earn up to ₹20,000 in cash.'
    }
  ];

  return (
    <section className="referral-section" id="referral" aria-labelledby="referral-heading">
      <div className="referral-container">
        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            Partner &amp; Earn With Image Paradise
          </div>
          <h2 id="referral-heading">
            Refer a wedding. <em>Earn up to ₹5,000</em> cash.
          </h2>
          <p>
            Whether you are our past couple, a wedding vendor, a college student, or simply love our cinematic photography — recommend Image Paradise to friends or family planning their big day. Earn instant UPI cash or luxury service vouchers.
          </p>
        </header>

        {/* Tab Toggle for Public vs Past Couples */}
        <div className="ref-tab-nav" role="tablist">
          <button
            type="button"
            className={`ref-tab-btn ${activeTab === 'public' ? 'active' : ''}`}
            onClick={() => setActiveTab('public')}
            role="tab"
            aria-selected={activeTab === 'public'}
          >
            💰 Public Earning Program (Direct UPI Cash)
          </button>
          <button
            type="button"
            className={`ref-tab-btn ${activeTab === 'couples' ? 'active' : ''}`}
            onClick={() => setActiveTab('couples')}
            role="tab"
            aria-selected={activeTab === 'couples'}
          >
            🎁 Past Couples Program (15% Off / Gift Voucher)
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div className="referral-tiers-grid">
          <div className={`ref-tier-card ${activeTab === 'public' ? 'featured' : ''}`}>
            <div className="ref-tier-icon">💸</div>
            <div className="ref-tier-badge">Option 1 · For Public &amp; Friends</div>
            <h3>Direct UPI Cash Transfer</h3>
            <p className="ref-tier-amount">₹2,000 – ₹5,000</p>
            <p className="ref-tier-desc">
              Direct GPay, PhonePe, or bank transfer paid within 48 hours of your referred friend confirming their booking advance with Director Hariharan R.
            </p>
            <ul className="ref-tier-bullets">
              <li>✓ Essential Booking: <strong>₹2,000 Cash</strong></li>
              <li>✓ Premium Booking: <strong>₹3,500 Cash</strong></li>
              <li>✓ Luxury Booking: <strong>₹5,000 Cash</strong></li>
              <li>✓ No cap — refer unlimited weddings per year</li>
            </ul>
          </div>

          <div className={`ref-tier-card ${activeTab === 'couples' ? 'featured' : ''}`}>
            <div className="ref-tier-icon">🎁</div>
            <div className="ref-tier-badge">Option 2 · For Past Couples</div>
            <h3>15% Off or Heirloom Gift</h3>
            <p className="ref-tier-amount">15% Discount</p>
            <p className="ref-tier-desc">
              Exclusive for our newlyweds! Apply towards your 1st-year anniversary shoot, maternity portrait, baby shower, or receive a free Parent Album worth ₹6,500.
            </p>
            <ul className="ref-tier-bullets">
              <li>✓ 15% off any future portrait session</li>
              <li>✓ Or Free Luxury Parent Keepsake Album (₹6,500 value)</li>
              <li>✓ Valid for 3 full years from wedding date</li>
              <li>✓ Priority booking reservation guarantee</li>
            </ul>
          </div>

          <div className="ref-tier-card">
            <div className="ref-tier-icon">✨</div>
            <div className="ref-tier-badge">For Your Referred Friend</div>
            <h3>₹2,500 Album Upgrade</h3>
            <p className="ref-tier-amount">Gift Credit</p>
            <p className="ref-tier-desc">
              Your referred couple also wins! They receive a complimentary ₹2,500 album upgrade credit or aerial drone session add-on when they mention your name.
            </p>
            <ul className="ref-tier-bullets">
              <li>✓ Handcrafted Italian leather upgrade</li>
              <li>✓ Extra 10 high-resolution edited photos</li>
              <li>✓ Dedicated consultation with Hariharan R</li>
              <li>✓ Instant date availability confirmation</li>
            </ul>
          </div>
        </div>

        {/* Interactive Referral Calculator */}
        <div className="ref-calc-box">
          <div className="ref-calc-left">
            <span className="ref-calc-kicker">Referral Earnings Calculator</span>
            <h4>How many friends or relatives are getting married this year?</h4>
            <div className="ref-slider-wrap">
              <input
                type="range"
                min="1"
                max="8"
                value={referralCount}
                onChange={(e) => setReferralCount(parseInt(e.target.value))}
                className="ref-slider"
                aria-label="Number of wedding referrals"
              />
              <div className="ref-slider-marks">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>
          </div>

          <div className="ref-calc-right">
            <div className="ref-earn-label">Your Potential UPI Cash Payout</div>
            <div className="ref-earn-value">₹{totalEarnings.toLocaleString('en-IN')}</div>
            <p className="ref-earn-note">
              Based on {referralCount} couple{referralCount > 1 ? 's' : ''} confirming with Creative Director Hariharan R.
            </p>
          </div>
        </div>

        {/* Quick 1-Click WhatsApp Share Link Bar */}
        <div className="ref-share-action-bar">
          <div className="rsab-text">
            <strong>Fast Share: Recommend Image Paradise on WhatsApp</strong>
            <span>Copy our pre-written recommendation message with your name to share in group chats or DM friends.</span>
          </div>
          <div className="rsab-buttons">
            <button
              type="button"
              onClick={copyShareText}
              className="btn-outline-gold"
            >
              {copiedLink ? '✓ Copied to Clipboard!' : '📋 Copy Recommendation Text'}
            </button>
            <a
              href={`https://wa.me/?text=${shareableWhatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-action"
            >
              Share on WhatsApp ↗
            </a>
          </div>
        </div>

        {/* Lead Capture Form for Referrer */}
        <div className="ref-form-wrapper">
          <div className="ref-form-header">
            <h3>Submit a Wedding Referral</h3>
            <p>
              Fill in the couple's details below or connect directly with Creative Director Hariharan R. We will handle them with utmost care and transparency.
            </p>
          </div>

          {submitted ? (
            <div className="ref-success-state">
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>🎉</div>
              <h3>Thank You, {referrerName}!</h3>
              <p>
                We have registered your referral for <strong>{friendName}</strong>. Creative Director Hariharan R will connect warmly and credit your {rewardChoice === 'cash' ? 'UPI cash reward' : '15% service voucher'} the moment their celebration date is confirmed.
              </p>
              <div className="ref-success-actions">
                <a
                  href={`https://wa.me/?text=${shareableWhatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Forward Recommendation to {friendName} on WhatsApp ↗
                </a>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setSubmitted(false)}
                >
                  Refer Another Couple
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ref-form-grid">
              <div className="ref-field-group">
                <h4>Your Information (The Referrer)</h4>
                <div className="ref-input-box">
                  <label htmlFor="ref-your-name">Your Full Name *</label>
                  <input
                    id="ref-your-name"
                    type="text"
                    placeholder="e.g. Karthik Ram"
                    value={referrerName}
                    onChange={(e) => setReferrerName(e.target.value)}
                    required
                  />
                </div>

                <div className="ref-input-box">
                  <label htmlFor="ref-your-phone">Your WhatsApp / Phone *</label>
                  <input
                    id="ref-your-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={referrerPhone}
                    onChange={(e) => setReferrerPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="ref-input-box">
                  <label>Preferred Reward</label>
                  <div className="ref-reward-radios">
                    <label className="ref-radio-label">
                      <input
                        type="radio"
                        name="rewardChoice"
                        checked={rewardChoice === 'cash'}
                        onChange={() => setRewardChoice('cash')}
                      />
                      <span>Direct UPI Cash (GPay / PhonePe / Paytm)</span>
                    </label>
                    <label className="ref-radio-label">
                      <input
                        type="radio"
                        name="rewardChoice"
                        checked={rewardChoice === 'voucher'}
                        onChange={() => setRewardChoice('voucher')}
                      />
                      <span>15% Service Voucher (Anniversary / Maternity / Album)</span>
                    </label>
                  </div>
                </div>

                {rewardChoice === 'cash' && (
                  <div className="ref-input-box">
                    <label htmlFor="ref-your-upi">Your UPI ID (For direct cash payout)</label>
                    <input
                      id="ref-your-upi"
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                      value={referrerUpi}
                      onChange={(e) => setReferrerUpi(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="ref-field-group">
                <h4>Couple Planning Their Wedding (Your Referral)</h4>
                <div className="ref-input-box">
                  <label htmlFor="ref-friend-name">Couple's Name / Bride or Groom *</label>
                  <input
                    id="ref-friend-name"
                    type="text"
                    placeholder="e.g. Ananya & Vignesh"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    required
                  />
                </div>

                <div className="ref-input-box">
                  <label htmlFor="ref-friend-phone">Couple's WhatsApp Phone *</label>
                  <input
                    id="ref-friend-phone"
                    type="tel"
                    placeholder="+91 97890 12345"
                    value={friendPhone}
                    onChange={(e) => setFriendPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="ref-input-box">
                  <label htmlFor="ref-friend-date">Approximate Wedding Date or Month / City</label>
                  <input
                    id="ref-friend-date"
                    type="text"
                    placeholder="e.g. November 2026 / Chennai or Tiruvallur"
                    value={friendDate}
                    onChange={(e) => setFriendDate(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: '22px' }}>
                  <button type="submit" className="ref-submit-btn">
                    Submit Referral &amp; Register Reward →
                  </button>
                  <small style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                    🔒 We respect privacy. Creative Director Hariharan R will connect respectfully and mention you personally recommended them.
                  </small>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Referral Program FAQ Accordion */}
        <div className="ref-faq-container">
          <h3 className="ref-faq-title">Frequently Asked Questions About Refer &amp; Earn</h3>
          <div className="ref-faq-list">
            {referralFaqs.map((faq, idx) => (
              <div key={idx} className={`ref-faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  className="ref-faq-q"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <span className="ref-faq-arrow">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="ref-faq-a">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Studio Direct Verification Banner */}
        <div className="ref-studio-badge">
          <div className="rsb-icon">📍</div>
          <div className="rsb-info">
            <strong>IMAGE PARADISE STUDIO</strong>
            <span>Creative Director: <b>Hariharan R</b> · Phone: <a href="tel:+917708510143">+91 7708510143</a></span>
            <span>No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </section>
  );
};
