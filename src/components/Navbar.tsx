import React, { useState, useEffect } from 'react';
import { PhoneIcon, WhatsAppIcon } from './Icons';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, anchor?: string) => void;
  onOpenBrochure: () => void;
  onOpenCallback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenBrochure,
  onOpenCallback
}) => {
  const [isSlim, setIsSlim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSlim(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleLinkClick = (anchor: string) => {
    setMenuOpen(false);
    if (currentRoute !== 'home') {
      onNavigate('home', anchor);
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePageClick = (route: string) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(route);
  };

  return (
    <header className="navbar" role="banner">
      <nav id="nav" className={isSlim ? 'slim' : ''} role="navigation" aria-label="Main navigation">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => handlePageClick('home')}
          className="brand"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left'
          }}
          aria-label="Image Paradise Photography Home"
        >
          <img
            src="/images/Logo with Text Png.png"
            alt="Image Paradise Photography"
            width="160"
            height="34"
            style={{ objectFit: 'contain' }}
          />
        </button>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          id="hamburger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Backdrop for mobile drawer dismissal */}
        {menuOpen && (
          <div
            className="nav-backdrop open"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Navigation Links */}
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} id="navMenu" role="menubar">
          {/* Mobile Drawer Top Heading */}
          <li className="mobile-drawer-header" role="none">
            <span className="mdh-title">Image Paradise</span>
            <span className="mdh-sub">Chennai · Tiruvallur</span>
          </li>
          <li role="none">
            <button
              type="button"
              className={`nav-link-btn ${currentRoute === 'home' ? '' : ''}`}
              onClick={() => handleLinkClick('portfolio')}
              role="menuitem"
            >
              Portfolio
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => handleLinkClick('stories')}
              role="menuitem"
            >
              Real Stories
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => handleLinkClick('films')}
              role="menuitem"
            >
              Films
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => handleLinkClick('services')}
              role="menuitem"
            >
              Packages
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className={`nav-link-btn ${currentRoute === 'referral' ? 'active' : ''}`}
              onClick={() => handlePageClick('referral')}
              role="menuitem"
              style={{
                color: currentRoute === 'referral' ? 'var(--pk, #D81B60)' : undefined,
                fontWeight: currentRoute === 'referral' ? 700 : undefined
              }}
            >
              <span className="ref-nav-badge">NEW</span> Refer &amp; Earn
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => handleLinkClick('about')}
              role="menuitem"
            >
              About
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                setMenuOpen(false);
                onOpenBrochure();
              }}
              role="menuitem"
              style={{ color: '#D4AF37' }}
            >
              2026 Brochure
            </button>
          </li>
          {onOpenCallback && (
            <li role="none">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCallback();
                }}
                role="menuitem"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#D81B60' }}
              >
                <PhoneIcon size={13} color="#D81B60" />
                <span>Request Call</span>
              </button>
            </li>
          )}
          <li role="none">
            <button
              type="button"
              className={`nav-link-btn ${currentRoute === 'blog' ? 'active' : ''}`}
              onClick={() => handlePageClick('blog')}
              role="menuitem"
            >
              Journal
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              data-lead-event="check_date_click"
              className="nav-enquire"
              role="menuitem"
            >
              Check Availability
            </button>
          </li>

          {/* Direct Studio Connect for Mobile Drawer */}
          <li className="mobile-drawer-footer" role="none">
            <div className="mdf-actions">
              <a
                href="tel:+917708510143"
                className="mdf-btn mdf-call"
                aria-label="Call studio"
              >
                <PhoneIcon size={14} color="currentColor" />
                <span>+91 7708510143</span>
              </a>
              <a
                href="https://wa.me/917708510143?text=Hi%20Image%20Paradise!%20I%20am%20exploring%20your%20wedding%20photography%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="mdf-btn mdf-wa"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon size={15} color="#fff" />
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="mdf-note">Studio: Veppampattu, Chennai · Director: Hariharan R</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
