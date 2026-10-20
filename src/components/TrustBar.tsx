import React from 'react';

export const TrustBar: React.FC = () => {
  return (
    <section className="trust-bar-section" aria-label="Why couples trust Image Paradise">
      <div className="trust-bar-inner">
        <div className="trust-item">
          <div className="trust-icon">⭐</div>
          <div className="trust-text">
            <strong>4.9 / 5 Rating</strong>
            <span>120+ Verified Google Reviews</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">⚡</div>
          <div className="trust-text">
            <strong>48-Hour Sneak Peek</strong>
            <span>Same-week high-res previews</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">🛡️</div>
          <div className="trust-text">
            <strong>Dual-Card Redundancy</strong>
            <span>Zero-risk secure photo backup</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">📖</div>
          <div className="trust-text">
            <strong>Handcrafted Albums</strong>
            <span>Archival flush-mount print quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};
