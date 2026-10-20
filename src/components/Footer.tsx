import React from 'react';

interface FooterProps {
  onNavigate: (route: string, anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer>
      <div className="footer-top">
        <div className="ft-brand">
          <img
            src="/images/Logo-opt.png"
            alt="Image Paradise Photography"
            className="ft-logo"
            loading="lazy"
            width={40}
            height={40}
          />
          <h3>
            IMAGE PARADISE<br />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Creative Director: Hariharan R
            </span>
          </h3>
          <p style={{ marginTop: '8px' }}>
            Capturing love, preserving paradise.<br />
            No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu.<br />
            Phone: <a href="tel:+917708510143" style={{ color: '#D4AF37' }}>+91 7708510143</a>
          </p>
        </div>

        <div className="ft-col">
          <h4>Explore</h4>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'portfolio')}>
            Portfolio
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'stories')}>
            Real Stories
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'services')}>
            Packages
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'calculator')}>
            Package Calculator
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('referral')} style={{ color: '#25D366', fontWeight: 600 }}>
            🤝 Referral &amp; Partner Program
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('blog')}>
            Blog &amp; Guides
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'contact')}>
            Contact Studio
          </button>
        </div>

        <div className="ft-col">
          <h4>Locations</h4>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('chennai')}>
            Chennai
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('pre-wedding')}>
            Pre-Wedding Shoots
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('videography')}>
            Cinematic Films
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('ambattur')}>
            Ambattur
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('avadi')}>
            Avadi
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('tiruvallur')}>
            Tiruvallur
          </button>
        </div>

        <div className="ft-col">
          <h4>Connect</h4>
          <a href="https://www.instagram.com/imageparadisephotography" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="https://www.facebook.com/imageparadisephotography" target="_blank" rel="noopener">
            Facebook
          </a>
          <a href="https://in.pinterest.com/imageparadisephotography" target="_blank" rel="noopener">
            Pinterest
          </a>
          <a
            href="https://wa.me/917708510143?text=Hi%20Hariharan%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20photography"
            target="_blank"
            rel="noopener"
          >
            WhatsApp (+91 7708510143)
          </a>
          <a href="mailto:imageparadise2020@gmail.com">
            imageparadise2020@gmail.com
          </a>
          <a href="/privacy">Privacy Notice</a>
          <a href="/referral-terms">Referral Terms</a>
        </div>
      </div>

      <div className="footer-btm">
        <p>
          &copy; 2026 IMAGE PARADISE · Creative Director: Hariharan R · No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu · All rights reserved
        </p>
        <img
          src="/images/Logo-opt.png"
          alt=""
          className="ft-btm-logo"
          loading="lazy"
          width={24}
          height={24}
        />
      </div>
    </footer>
  );
};
