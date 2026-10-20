import React, { useRef, useState, useEffect } from 'react';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
  onOpenBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo, onOpenBrochure }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (isPlaying) video.play().catch(() => {});
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
  }, [isPlaying]);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-left">
        <div className="hero-tag">
          <span style={{ color: '#EAA023', marginRight: '6px' }} aria-hidden="true">✦</span>
          <span>Candid Wedding Photography · Cinematic Films · Chennai &amp; Tamil Nadu</span>
        </div>

        <h1 id="hero-heading" className="hero-headline">
          <span>We don't just</span>
          <em>capture moments,</em>
          <span>we <b>craft</b> memories.</span>
        </h1>

        <p className="hero-body">
          Candid wedding photography and cinematic films, crafted in Chennai for couples across Tamil Nadu and beyond. Every frame preserves the tears, laughter, and timeless rituals of your celebration.
        </p>

        <div className="hero-btns">
          <button
            type="button"
            onClick={() => onScrollTo('calculator')}
            className="btn-pink"
            data-lead-event="estimate_click"
            aria-label="Calculate your wedding photography package quote"
          >
            Calculate Your Package Quote{' '}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('portfolio')}
            className="btn-outline"
            aria-label="View our wedding photography portfolio"
          >
            View Portfolio
          </button>
          <button
            type="button"
            onClick={onOpenBrochure}
            className="btn-text-gold"
            aria-label="Download pricing guide brochure"
          >
            📥 2026 Price Guide (PDF)
          </button>
        </div>

        <div className="hero-counters" aria-label="Photography services and planning">
          <div className="hc">
            <span className="count">Photo + Film</span>
            <label>Coverage Options</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">24–48h</span>
            <label>Typical Preview Window</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">₹35,000+</span>
            <label>Published Packages</label>
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
              muted
              loop
              playsInline
              preload="none"
              aria-label="Image Paradise Photography promo wedding film"
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>

            {/* Video Controls Overlay */}
            <div className="hero-video-controls">
              <button
                className="hero-video-mute"
                id="heroVideoMute"
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute promo video' : 'Mute promo video'}
              >
                <span className="hero-video-mute-label">{isMuted ? '🔇 Sound off' : '🔊 Sound on'}</span>
              </button>
              <button
                className="hero-video-play"
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause promo video' : 'Play promo video'}
              >
                <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
              </button>
            </div>
          </div>

          <div className="hero-badge" aria-label="Wedding photography and cinematic films">
            <div className="badge-star" aria-hidden="true">✦</div>
            <div>
              <strong>Image Paradise</strong>
              <span>Wedding Photography &amp; Films · Chennai</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true" onClick={() => onScrollTo('calculator')} style={{ cursor: 'pointer' }}>
        <div className="scroll-bar"></div>
        <span>Scroll to Plan</span>
      </div>
    </section>
  );
};
