import React from 'react';
import { StarIcon, ClockIcon, ShieldCheckIcon, BookOpenIcon } from './Icons';

export const TrustBar: React.FC = () => {
  return (
    <section className="trust-bar-section" aria-label="Why couples trust Image Paradise">
      <div className="trust-bar-inner">
        <div className="trust-item">
          <div className="trust-icon" style={{ color: '#D4AF37' }}>
            <StarIcon size={20} color="#D4AF37" />
          </div>
          <div className="trust-text">
            <strong>5-Star Rated Service</strong>
            <span>Authentic Couple Reviews</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon" style={{ color: '#D4AF37' }}>
            <ClockIcon size={20} color="#D4AF37" />
          </div>
          <div className="trust-text">
            <strong>48-Hour Sneak Peek</strong>
            <span>Same-week high-res previews</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon" style={{ color: '#D4AF37' }}>
            <ShieldCheckIcon size={20} color="#D4AF37" />
          </div>
          <div className="trust-text">
            <strong>Dual-Card Redundancy</strong>
            <span>Zero-risk secure photo backup</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon" style={{ color: '#D4AF37' }}>
            <BookOpenIcon size={20} color="#D4AF37" />
          </div>
          <div className="trust-text">
            <strong>Handcrafted Albums</strong>
            <span>Archival flush-mount print quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrustBar;
