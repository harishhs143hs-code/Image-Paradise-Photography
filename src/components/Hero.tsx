import React, { useRef, useState, useEffect } from 'react';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      const handleUserTouch = () => {
        video.play().catch(() => {});
      };
      document.addEventListener('touchstart', handleUserTouch, { once: true });
      document.addEventListener('click', handleUserTouch, { once: true });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-left">
        <div className="hero-tag">
          <span className="pulse-dot" aria-hidden="true"></span> Wedding &amp; Portrait Photography · Chennai
        </div>
        <h1 id="hero-heading" className="hero-headline">
          <span>We don't just</span>
          <em>capture moments,</em>
          <span>we <b>craft</b> memories.</span>
        </h1>
        <p className="hero-body">
          Candid wedding photography and cinematic films, crafted in Chennai for couples across Tamil Nadu and beyond. Every frame tells your love story, forever. Serving couples across Tamil Nadu including Tiruvallur, Avadi, and Ambattur.
        </p>
        <div className="hero-btns">
          <button
            type="button"
            onClick={() => onScrollTo('portfolio')}
            className="btn-pink"
            data-lead-event="portfolio_click"
            aria-label="View our wedding photography portfolio"
          >
            View Our Work{' '}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('contact')}
            className="btn-outline"
            aria-label="Book wedding photography session"
          >
            Check Your Date
          </button>
        </div>
        <div className="hero-counters" aria-label="Our achievements">
          <div className="hc">
            <span className="count">Real</span>
            <label>Wedding Stories</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">Candid</span>
            <label>Wedding Photography</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">Personal</span>
            <label>Client Experience</label>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-collage">
          <div className="hc-main hc-video-wrap">
            <video
              ref={videoRef}
              id="heroVideo"
              className="hc-video"
              poster="/images/08-opt.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Image Paradise Photography promo video"
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>
            <button
              className="hero-video-mute"
              id="heroVideoMute"
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute promo video' : 'Mute promo video'}
            >
              <span className="hero-video-mute-label">{isMuted ? 'Sound off' : 'Sound on'}</span>
            </button>
          </div>
          <div className="hero-badge" aria-label="Wedding photography and cinematic films">
            <div className="badge-star" aria-hidden="true">✦</div>
            <div>
              <strong>Image Paradise</strong>
              <span>Wedding Photography &amp; Films</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true" onClick={() => onScrollTo('portfolio')} style={{ cursor: 'pointer' }}>
        <div className="scroll-bar"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};
