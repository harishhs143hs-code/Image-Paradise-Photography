import React, { useEffect, useState } from 'react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, anchor?: string) => void;
  onOpenBrochure: () => void;
  onOpenCallback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenBrochure }) => {
  const [isSlim, setIsSlim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSlim(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (anchor: string) => {
    setMenuOpen(false);
    if (currentRoute !== 'home') onNavigate('home', anchor);
    else document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const page = (route: string) => {
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="navbar" role="banner">
      <nav id="nav" className={isSlim ? 'slim' : ''} aria-label="Main navigation">
        <button type="button" className="brand" onClick={() => page('home')} aria-label="Image Paradise Photography home">
          <img src="/images/Logo with Text Png.png" alt="Image Paradise Photography" width="160" height="34" />
        </button>

        <button
          className="hamburger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`} id="navMenu">
          <li><button type="button" className="nav-link-btn" onClick={() => page('home')}>Home</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go('portfolio')}>Portfolio</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go('films')}>Films</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go('services')}>Packages</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go('about')}>About</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => page('blog')}>Journal</button></li>
          <li>
            <button type="button" className={`nav-link-btn referral-nav-link ${currentRoute === 'referral' ? 'active' : ''}`} onClick={() => page('referral')}>
              Refer &amp; Earn
            </button>
          </li>
          <li><button type="button" className="nav-enquire" onClick={() => go('contact')}>Check Your Date</button></li>
        </ul>
      </nav>
    </header>
  );
};
