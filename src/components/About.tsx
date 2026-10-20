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
              alt="Image Paradise Photography team capturing wedding moments - Best wedding photographer in Chennai"
              loading="lazy"
              width={500}
              height={700}
            />
            <div className="ap-years" aria-label="6+ Years of Excellence">
              <span>6+</span>Years of<br />Excellence
            </div>
          </div>
        </div>
        <div className="about-copy">
          <div className="sec-badge light">
            <img src="/images/Logo-opt.png" alt="" loading="lazy" width="24" height="24" />
            About Us
          </div>
          <h2 id="about-heading">
            We photograph <em>love</em><br />in its purest form
          </h2>
          <div className="pink-bar"></div>
          <p>
            Based in Chennai, Image Paradise Photography specialises in wedding and portrait photography — crafting images that feel as intimate and genuine as the moments they capture.
          </p>
          <p>
            With over six years documenting love stories across South India, we've learned that the most enduring photographs are the ones where people forget we're there.
          </p>
          <div className="about-pills">
            <span>✓ South India Coverage</span>
            <span>✓ Same-Day Preview</span>
            <span>✓ Candid Specialists</span>
            <span>✓ International Weddings</span>
          </div>
          <button
            type="button"
            onClick={onScrollToContact}
            className="btn-pink"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
          >
            Start Your Journey{' '}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
