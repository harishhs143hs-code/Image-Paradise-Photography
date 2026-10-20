import React, { useState, useEffect } from 'react';

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`btt ${show ? 'show' : ''}`}
      id="btt"
      type="button"
      title="Back to top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};
