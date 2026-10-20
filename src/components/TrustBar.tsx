import React from 'react';

export const TrustBar: React.FC = () => {
  return (
    <section className="trust-bar-section" aria-label="Image Paradise Photography services">
      <div className="trust-bar-inner">
        <div className="trust-item">
          <div className="trust-icon">📷</div>
          <div className="trust-text">
            <strong>Candid &amp; Traditional Photography</strong>
            <span>Real moments and essential ceremony coverage</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">🎬</div>
          <div className="trust-text">
            <strong>Photography + Cinematic Film</strong>
            <span>Coverage options for your event needs</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">⚡</div>
          <div className="trust-text">
            <strong>Preview within 24–48 Hours</strong>
            <span>Typical preview timeline; confirm when booking</span>
          </div>
        </div>

        <div className="trust-divider" aria-hidden="true" />

        <div className="trust-item">
          <div className="trust-icon">📖</div>
          <div className="trust-text">
            <strong>Wedding Album Options</strong>
            <span>Printed albums available in selected packages</span>
          </div>
        </div>
      </div>
    </section>
  );
};
