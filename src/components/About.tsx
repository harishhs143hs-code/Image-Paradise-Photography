import React from 'react';

interface AboutProps {
  onScrollToContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onScrollToContact }) => {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="about-inner">
        <div className="about-photos">
          <div className="ap-main">
            <img
              src="/images/DSC05261.JPG"
              alt="Hariharan R, Creative Director at Image Paradise Photography capturing candid wedding moments"
              loading="lazy"
              width={500}
              height={700}
            />
            <div className="ap-years" aria-label="6+ Years of Excellence">
              <span>6+</span>Years of<br />Excellence
            </div>
          </div>

          {/* Director Card Badge */}
          <div className="director-badge-card">
            <strong>Hariharan R</strong>
            <span>Creative Director &amp; Lead Cinematographer</span>
            <small>IMAGE PARADISE · Tamil Nadu</small>
          </div>
        </div>

        <div className="about-copy">
          <div className="sec-badge light">
            <img src="/images/Logo-opt.png" alt="" loading="lazy" width={24} height={24} />
            The Studio &amp; Director
          </div>
          <h2 id="about-heading">
            We photograph <em>love</em><br />in its purest form
          </h2>
          <div className="pink-bar"></div>

          <p>
            Founded and directed by <strong>Hariharan R</strong>, Image Paradise is a boutique wedding photography and cinema studio rooted in Veppampattu and serving Chennai, Tiruvallur, Avadi, Ambattur, and destination weddings across South India.
          </p>

          <p>
            With over six years documenting sacred Muhurthams and luxury celebrations, Hariharan's philosophy is rooted in quiet observation. We don't turn your wedding into an artificial movie set; we craft an effortless atmosphere where your genuine glances, joyous laughter, and the blessings of your elders take center stage.
          </p>

          {/* Studio Physical Location Trust Box */}
          <div className="studio-address-box">
            <div className="sab-icon">📍</div>
            <div className="sab-text">
              <strong>IMAGE PARADISE STUDIO</strong>
              <span>No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu</span>
              <span>Direct Studio Helpline: <a href="tel:+917708510143">+91 7708510143</a></span>
            </div>
          </div>

          <div className="about-pills">
            <span>✓ Directed by Hariharan R</span>
            <span>✓ Same-Week Sneak Peek</span>
            <span>✓ Authentic Candid Specialists</span>
            <span>✓ Archival Album Printing</span>
          </div>

          <button
            type="button"
            onClick={onScrollToContact}
            className="btn-pink"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
          >
            Check Your Date With Hariharan{' '}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
