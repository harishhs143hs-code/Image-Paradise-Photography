import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, anchor?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isSlim, setIsSlim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSlim(window.scrollY > 60);
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
        <button
          type="button"
          onClick={() => handlePageClick('home')}
          className="brand"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label="Image Paradise Photography Home"
        >
          <img
            src="/images/Logo with Text Png.png"
            alt="Image Paradise Photography - Wedding Photographer Chennai"
            width="150"
            height="30"
          />
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
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} id="navMenu" role="menubar">
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
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
              onClick={() => handleLinkClick('services')}
              role="menuitem"
            >
              Packages
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => handleLinkClick('testimonials')}
              role="menuitem"
            >
              Reviews
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className={`nav-link-btn ${currentRoute === 'blog' ? 'active' : ''}`}
              onClick={() => handlePageClick('blog')}
              role="menuitem"
            >
              Blog
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
              Enquire Now
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
