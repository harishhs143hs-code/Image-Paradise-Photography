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
            Image Paradise<br />Photography
          </h3>
          <p>
            Capturing love, preserving paradise.<br />
            Chennai · Available across India &amp; Beyond.
          </p>
        </div>

        <div className="ft-col">
          <h4>Explore</h4>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'portfolio')}>
            Portfolio
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'about')}>
            About
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'services')}>
            Packages
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'testimonials')}>
            Reviews
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('blog')}>
            Blog
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('home', 'contact')}>
            Contact
          </button>
        </div>

        <div className="ft-col">
          <h4>Locations</h4>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('chennai')}>
            Chennai
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('pre-wedding')}>
            Pre-Wedding
          </button>
          <button type="button" className="ft-link-btn" onClick={() => onNavigate('videography')}>
            Videography
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
            href="https://wa.me/917708510143?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20photography"
            target="_blank"
            rel="noopener"
          >
            WhatsApp
          </a>
          <a href="mailto:imageparadise2020@gmail.com">
            Email Us
          </a>
        </div>
      </div>

      <div className="footer-btm">
        <p>&copy; 2026 Image Paradise Photography · Chennai, India · All rights reserved</p>
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
