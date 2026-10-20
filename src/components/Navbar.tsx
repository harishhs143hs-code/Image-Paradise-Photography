import React, { useState, useEffect } from 'react';

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
    const handleScroll = () => setIsSlim(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (anchor: string) => {
    setMenuOpen(false);
    if (currentRoute !== 'home') onNavigate('home', anchor);
    else document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageClick = (route: string) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(route);
  };

  return (
    <header className="navbar" role="banner">
      <nav id="nav" className={isSlim ? 'slim' : ''} role="navigation" aria-label="Main navigation">
        <button
          type="button"
          onClick={() => handlePageClick('home')}
          className="brand"
          aria-label="Image Paradise Photography Home"
        >
          <img src="/images/Logo with Text Png.png" alt="Image Paradise Photography" width="160" height="34" />
        </button>

        <button
          className="hamburger"
          id="hamburger"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} id="navMenu" role="menubar">
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('portfolio')} role="menuitem">Portfolio</button></li>
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('stories')} role="menuitem">Real Stories</button></li>
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('services')} role="menuitem">Packages</button></li>
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('calculator')} role="menuitem">Estimate Quote</button></li>
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('craft-promise')} role="menuitem">Our Gear &amp; Promise</button></li>
          <li role="none"><button type="button" className="nav-link-btn" onClick={() => handleLinkClick('testimonials')} role="menuitem">Reviews</button></li>
          <li role="none">
            <button
              type="button"
              className={`nav-link-btn referral-nav-link ${currentRoute === 'referral' ? 'active' : ''}`}
              onClick={() => handlePageClick('referral')}
              role="menuitem"
              aria-current={currentRoute === 'referral' ? 'page' : undefined}
            >
              Refer &amp; Earn
            </button>
          </li>
          <li role="none">
            <button type="button" className="nav-link-btn" onClick={() => { setMenuOpen(false); onOpenBrochure(); }} role="menuitem" style={{ color: '#D4AF37' }}>
              2026 Brochure
            </button>
          </li>
          {onOpenCallback && (
            <li role="none">
              <button type="button" className="nav-link-btn" onClick={() => { setMenuOpen(false); onOpenCallback(); }} role="menuitem" style={{ color: '#D81B60' }}>
                📞 Request Call
              </button>
            </li>
          )}
          <li role="none">
            <button type="button" className={`nav-link-btn ${currentRoute === 'blog' ? 'active' : ''}`} onClick={() => handlePageClick('blog')} role="menuitem">Blog</button>
          </li>
          <li role="none">
            <button type="button" onClick={() => handleLinkClick('contact')} data-lead-event="check_date_click" className="nav-enquire" role="menuitem">Check Your Date</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
