import React, { useState } from 'react';
import { BanknoteIcon, GiftIcon, CheckIcon, WhatsAppIcon, ShieldCheckIcon } from './Icons';

interface ReferralProgramProps {
  isFullPage?: boolean;
  onBackToHome?: () => void;
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({ isFullPage = false, onBackToHome }) => {
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
    const textToCopy = `Vanakkam! If you or your family are planning a wedding in Chennai or Tamil Nadu, I recommend Image Paradise Photography (Creative Director: Hariharan R, Phone: +91 7708510143). They specialize in soulful candid photography, 4K cinema films, and 48-hour sneak peeks. If you book and quote my reference (${referrerName || 'my reference'}), you'll receive a complimentary ₹2,500 album upgrade credit! Check their portfolio: https://image-paradise-photography.vercel.app/`;

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
      `*Wedding Referral Submission — Image Paradise*\n` +
      `Director: Hariharan R · Image Paradise\n` +
      `Studio: No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu\n\n` +
      `Referrer: ${referrerName} (${referrerPhone})\n` +
      `Reward Preference: ${rewardChoice === 'cash' ? `Direct UPI Cash (${referrerUpi || 'Will share via WhatsApp'})` : '15% Future Service Voucher or Parent Keepsake Album'}\n` +
      `Referred Couple: ${friendName} (${friendPhone})\n` +
      `Event Date/City: ${friendDate || 'Upcoming 2026/2027'}`
    );

    window.open(`https://wa.me/917708510143?text=${text}`, '_blank');
  };

  const shareableWhatsappText = encodeURIComponent(
    `Vanakkam ${friendName ? friendName : 'there'}! I wanted to recommend our trusted wedding photographer in Chennai — Image Paradise Photography (Creative Director: Hariharan R, +91 7708510143). They do stunning candid photography, 4K cinema, and deliver same-week sneak peeks. If you book with them, quote my reference (${referrerName || 'my reference'}) to receive an exclusive ₹2,500 handcrafted album upgrade credit! Check their portfolio: https://image-paradise-photography.vercel.app/`
  );

  const referralFaqs = [
    {
      q: 'Who is eligible to participate in the Refer & Earn program?',
      a: 'The Public Partner Program is open to everyone across Tamil Nadu — wedding guests, event vendors (decorators, makeup artists, mehendi artists, caterers), college students, and friends. You do not need to be a past client to earn ₹2,000 to ₹5,000 cash per confirmed booking.'
    },
    {
      q: 'When and how do I receive my cash reward?',
      a: 'Creative Director Hariharan R authorizes payouts via Google Pay, PhonePe, or direct bank transfer within 48 hours of your referred couple confirming their booking and deposit.'
    },
    {
      q: 'What rewards are available for past brides and grooms?',
      a: 'Couples who previously booked with Image Paradise can choose between a 15% discount voucher on future portrait sessions (anniversary, maternity, family) or a complimentary handcrafted flush-mount parent keepsake album worth ₹6,500.'
    },
    {
      q: 'What benefit does the couple I refer receive?',
      a: 'It is a dual-sided benefit. Your referred couple receives a verified ₹2,500 upgrade credit applied toward archival leather album embossing, additional drone visuals, or extra fine-art heirloom prints.'
    },
    {
      q: 'Is there any limit to the number of couples I can refer?',
      a: 'There is no upper limit. If you refer 4 couples throughout the wedding season who book with us, your cumulative payout reaches up to ₹20,000 in cash.'
    }
  ];

  return (
    <section className="referral-section" id="referral" aria-labelledby="referral-heading">
      <div className="referral-container">
        {isFullPage && onBackToHome && (
          <div className="ref-breadcrumb" style={{ marginBottom: '24px' }}>
            <button
              type="button"
              onClick={onBackToHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--pk, #D81B60)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: 0
              }}
            >
              ← Back to Main Portfolio
            </button>
          </div>
        )}

        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            Official Partner Program
          </div>
          <h2 id="referral-heading">
            Refer a wedding. <em>Earn up to ₹5,000</em> cash.
          </h2>
          <p>
            Whether you are our past couple, a wedding industry partner, or someone who loves our candid photography — recommend Image Paradise to couples planning their wedding. Receive verified UPI cash transfers or luxury album credits.
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
            <BanknoteIcon size={16} color={activeTab === 'public' ? '#fff' : 'currentColor'} />
            <span>Public Partner Program (Direct UPI Cash)</span>
          </button>
          <button
            type="button"
            className={`ref-tab-btn ${activeTab === 'couples' ? 'active' : ''}`}
            onClick={() => setActiveTab('couples')}
            role="tab"
            aria-selected={activeTab === 'couples'}
          >
            <GiftIcon size={16} color={activeTab === 'couples' ? '#fff' : 'currentColor'} />
            <span>Past Couples Program (15% Off or Heirloom Album)</span>
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div className="referral-tiers-grid">
          <div className={`ref-tier-card ${activeTab === 'public' ? 'featured' : ''}`}>
            <div className="ref-tier-icon" style={{ color: '#D4AF37' }}>
              <BanknoteIcon size={24} color="#D4AF37" />
            </div>
            <div className="ref-tier-badge">Option 1 · For Public &amp; Industry Partners</div>
            <h3>Direct UPI Cash Transfer</h3>
            <p className="ref-tier-amount">₹2,000 – ₹5,000</p>
            <span className="ref-tier-sub">Paid via GPay / PhonePe per confirmed booking</span>
            <ul className="ref-tier-list">
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>₹2,000 cash for Essential package bookings</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>₹3,500 cash for Premium package bookings</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>₹5,000 cash for Luxury Signature celebrations</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Transferred within 48 hours of booking confirmation</span>
              </li>
            </ul>
          </div>

          <div className={`ref-tier-card ${activeTab === 'couples' ? 'featured' : ''}`}>
            <div className="ref-tier-icon" style={{ color: '#D4AF37' }}>
              <GiftIcon size={24} color="#D4AF37" />
            </div>
            <div className="ref-tier-badge">Option 2 · For Past Couples</div>
            <h3>15% Voucher or Parent Album</h3>
            <p className="ref-tier-amount">Worth up to ₹6,500</p>
            <span className="ref-tier-sub">Exclusive rewards for past Image Paradise brides &amp; grooms</span>
            <ul className="ref-tier-list">
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>15% discount voucher on all future portrait shoots</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>OR a complimentary handcrafted parent album (Worth ₹6,500)</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Transferable to siblings or immediate family</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Valid for 24 months from issue date</span>
              </li>
            </ul>
          </div>

          <div className="ref-tier-card">
            <div className="ref-tier-icon" style={{ color: '#D4AF37' }}>
              <ShieldCheckIcon size={24} color="#D4AF37" />
            </div>
            <div className="ref-tier-badge">For the Couple You Refer</div>
            <h3>Friend Welcome Benefit</h3>
            <p className="ref-tier-amount">₹2,500 Upgrade Credit</p>
            <span className="ref-tier-sub">Applied directly onto their wedding contract</span>
            <ul className="ref-tier-list">
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>₹2,500 credit toward leather album binding</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Complimentary 4K drone session add-on</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Priority 48-hour sneak peek delivery</span>
              </li>
              <li>
                <CheckIcon size={14} color="#D81B60" />
                <span>Zero hassle — applied when quoting your name</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Earnings Calculator */}
        <div className="ref-calc-box">
          <div className="ref-calc-header">
            <div>
              <span className="ref-calc-kicker">Interactive Estimation</span>
              <h3>Calculate Your Referral Income</h3>
              <p>Estimate how much you can earn this wedding season across Tamil Nadu.</p>
            </div>
            <div className="ref-calc-payout">
              <span className="rcp-label">Estimated Payout</span>
              <span className="rcp-val">₹{totalEarnings.toLocaleString('en-IN')}</span>
              <span className="rcp-sub">Direct UPI Transfer</span>
            </div>
          </div>

          <div className="ref-slider-wrap">
            <div className="ref-slider-labels">
              <span>Couples Referred &amp; Booked:</span>
              <strong>{referralCount} Weddings</strong>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={referralCount}
              onChange={(e) => setReferralCount(parseInt(e.target.value))}
              className="ref-range-input"
              aria-label="Number of couples referred"
            />
            <div className="ref-slider-ticks">
              <span>1 (₹3,500)</span>
              <span>3 (₹10,500)</span>
              <span>5 (₹17,500)</span>
              <span>10 (₹35,000)</span>
            </div>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="ref-steps-row">
          <div className="ref-step">
            <div className="rs-num">01</div>
            <h4>Share With Couple</h4>
            <p>Tell your friend or family member about Image Paradise and share your personal recommendation link.</p>
          </div>
          <div className="ref-step">
            <div className="rs-num">02</div>
            <h4>Couple Books Date</h4>
            <p>We consult with the couple, verify their date, and finalize their customized photography contract.</p>
          </div>
          <div className="ref-step">
            <div className="rs-num">03</div>
            <h4>Instant Reward Transfer</h4>
            <p>Director Hariharan R transfers your cash payout to your UPI ID or issues your archival album voucher within 48 hours.</p>
          </div>
        </div>

        {/* Quick Share Link Generator */}
        <div className="ref-share-card">
          <div className="rsc-header">
            <div>
              <h4>Generate Your Recommendation Message</h4>
              <p>Type your name to create an instant WhatsApp message with your referral reference.</p>
            </div>
            <div className="rsc-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={copyShareText}
                style={{ cursor: 'pointer' }}
              >
                {copiedLink ? 'Copied to Clipboard!' : 'Copy Invitation Text'}
              </button>
              <a
                href={`https://wa.me/?text=${shareableWhatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <WhatsAppIcon size={16} color="#fff" />
                <span>Share via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="rsc-input-row">
            <input
              type="text"
              placeholder="Enter your name (e.g. Ramesh or Swathi)"
              value={referrerName}
              onChange={(e) => setReferrerName(e.target.value)}
              className="rsc-name-input"
              aria-label="Your Name for referral"
            />
          </div>
        </div>

        {/* Referral Lead Submission Form */}
        <div className="ref-form-card">
          <div className="sec-badge light" style={{ marginBottom: '12px' }}>
            <span>Verified Studio Submission</span>
          </div>
          <h3>Submit a Friend's Wedding Details Directly</h3>
          <p className="rfc-sub">
            Prefer us to reach out to the couple directly? Fill in their details below. We will handle the conversation with utmost courtesy and credit your payout upon confirmation.
          </p>

          {submitted ? (
            <div className="ref-form-success">
              <div style={{ color: '#D4AF37', marginBottom: '12px' }}>
                <CheckIcon size={36} color="#D4AF37" />
              </div>
              <h4>Referral Details Transferred!</h4>
              <p>
                Thank you, <strong>{referrerName}</strong>. We have logged your referral for <strong>{friendName}</strong>. Our studio coordinator will connect with the couple and notify you via WhatsApp at <strong>{referrerPhone}</strong>.
              </p>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '16px', cursor: 'pointer' }}
              >
                Submit Another Referral
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ref-form-grid">
              <div className="rfg-group">
                <label htmlFor="ref-name">Your Full Name *</label>
                <input
                  id="ref-name"
                  type="text"
                  placeholder="e.g. Hari Sundar"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  required
                />
              </div>

              <div className="rfg-group">
                <label htmlFor="ref-phone">Your WhatsApp Number *</label>
                <input
                  id="ref-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={referrerPhone}
                  onChange={(e) => setReferrerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="rfg-group">
                <label htmlFor="ref-reward">Preferred Reward Type</label>
                <select
                  id="ref-reward"
                  value={rewardChoice}
                  onChange={(e) => setRewardChoice(e.target.value as any)}
                >
                  <option value="cash">Direct UPI Cash Transfer (GPay / PhonePe / Paytm)</option>
                  <option value="voucher">15% Future Service Voucher or Parent Archival Album</option>
                </select>
              </div>

              {rewardChoice === 'cash' && (
                <div className="rfg-group">
                  <label htmlFor="ref-upi">Your UPI ID (Optional for now)</label>
                  <input
                    id="ref-upi"
                    type="text"
                    placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                    value={referrerUpi}
                    onChange={(e) => setReferrerUpi(e.target.value)}
                  />
                </div>
              )}

              <div className="rfg-group">
                <label htmlFor="ref-fname">Couple / Friend's Name *</label>
                <input
                  id="ref-fname"
                  type="text"
                  placeholder="e.g. Karthik & Swathi"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  required
                />
              </div>

              <div className="rfg-group">
                <label htmlFor="ref-fphone">Couple's Phone Number</label>
                <input
                  id="ref-fphone"
                  type="tel"
                  placeholder="+91 98400 12345"
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                />
              </div>

              <div className="rfg-group full-width">
                <label htmlFor="ref-fdate">Tentative Wedding Date / Venue City</label>
                <input
                  id="ref-fdate"
                  type="text"
                  placeholder="e.g. November 2026 / Mayor Ramanathan Chettiar Hall, Chennai"
                  value={friendDate}
                  onChange={(e) => setFriendDate(e.target.value)}
                />
              </div>

              <div className="rfg-actions full-width">
                <button type="submit" className="ref-submit-btn">
                  Submit Referral &amp; Connect on WhatsApp →
                </button>
              </div>
            </form>
          )}

          <div className="ref-director-sign">
            <strong>Verified &amp; Guaranteed By Creative Director Hariharan R</strong>
            <span>IMAGE PARADISE · No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu · Direct Helpline: +91 7708510143</span>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="ref-faq-wrap">
          <h3 className="ref-faq-head">Frequently Asked Questions About Refer &amp; Earn</h3>
          <div className="ref-faq-list">
            {referralFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="ref-faq-item">
                  <button
                    type="button"
                    className="ref-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="ref-faq-toggle">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="ref-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;
