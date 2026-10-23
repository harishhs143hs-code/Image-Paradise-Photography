import React from 'react';
import { BanknoteIcon, CheckIcon } from './Icons';

interface ReferralBannerProps {
  onOpenReferralTab: () => void;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ onOpenReferralTab }) => {
  return (
    <section className="ref-home-banner-section" aria-label="Partner and Referral Program">
      <div className="ref-home-banner-card">
        <div className="rhb-content">
          <div className="sec-badge light" style={{ marginBottom: '10px', borderColor: 'rgba(212, 175, 55, 0.4)', color: '#D4AF37' }}>
            <BanknoteIcon size={14} color="#D4AF37" />
            <span>Partner &amp; Referral Program</span>
          </div>
          <h3>Know someone planning a wedding? <em>Earn up to ₹5,000.</em></h3>
          <p>
            Open to past couples, wedding guests, vendors, and friends across Tamil Nadu. Refer a couple and receive verified UPI cash transfers or luxury album vouchers directly from Creative Director Hariharan R.
          </p>
          <div className="rhb-perks">
            <div className="rhb-perk">
              <CheckIcon size={14} color="#D4AF37" />
              <span>₹2,000 – ₹5,000 UPI Cash per booking</span>
            </div>
            <div className="rhb-perk">
              <CheckIcon size={14} color="#D4AF37" />
              <span>₹2,500 Upgrade credit for your referred friend</span>
            </div>
            <div className="rhb-perk">
              <CheckIcon size={14} color="#D4AF37" />
              <span>Zero limit — unlimited seasonal earnings</span>
            </div>
          </div>
        </div>

        <div className="rhb-action-wrap">
          <button
            type="button"
            className="btn-pink"
            onClick={onOpenReferralTab}
            style={{ border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Explore Referral Program &amp; Calculator →
          </button>
          <small style={{ color: '#888', textAlign: 'center', display: 'block', marginTop: '8px', fontSize: '11px' }}>
            Instant UPI transfer within 48h of booking deposit
          </small>
        </div>
      </div>
    </section>
  );
};
export default ReferralBanner;
