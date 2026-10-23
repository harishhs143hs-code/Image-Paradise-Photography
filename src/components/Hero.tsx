import React, { useRef, useState, useEffect } from 'react';
import { StarIcon, DownloadIcon, PlayIcon, PauseIcon, VolumeHighIcon, VolumeXIcon } from './Icons';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
  onOpenBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo, onOpenBrochure }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

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
        {/* Social Proof Header Tag */}
        <div className="hero-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '2px', color: '#D4AF37' }}>
            <StarIcon size={13} color="#D4AF37" />
            <StarIcon size={13} color="#D4AF37" />
            <StarIcon size={13} color="#D4AF37" />
            <StarIcon size={13} color="#D4AF37" />
            <StarIcon size={13} color="#D4AF37" />
          </div>
          <span>5-Star Rated Experience · Chennai &amp; Tamil Nadu Celebrations</span>
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
            aria-label="Download 2026 pricing guide brochure"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <DownloadIcon size={15} color="#D4AF37" />
            <span>2026 Price Guide</span>
          </button>
        </div>

        <div className="hero-counters" aria-label="Our achievements">
          <div className="hc">
            <span className="count">150+</span>
            <label>Weddings Documented</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">48h</span>
            <label>Preview Guarantee</label>
          </div>
          <div className="hc-div" aria-hidden="true"></div>
          <div className="hc">
            <span className="count">100%</span>
            <label>Heirloom Album Delivery</label>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-collage" style={{ position: 'relative' }}>
          <div className="hc-main hc-video-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
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
              aria-label="Image Paradise Photography promo wedding film"
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Live Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(17, 19, 23, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#fff',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 3
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#D4AF37',
                  boxShadow: '0 0 8px #D4AF37',
                  display: 'inline-block'
                }}
              />
              <span>4K Cinema</span>
            </div>

            {/* Video Controls Overlay */}
            <div className="hero-video-controls" style={{ zIndex: 4 }}>
              <button
                className="hero-video-mute"
                id="heroVideoMute"
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute promo video' : 'Mute promo video'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {isMuted ? (
                  <VolumeXIcon size={14} color="#fff" />
                ) : (
                  <VolumeHighIcon size={14} color="#fff" />
                )}
                <span className="hero-video-mute-label">{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>
              <button
                className="hero-video-play"
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause promo video' : 'Play promo video'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {isPlaying ? <PauseIcon size={13} color="#fff" /> : <PlayIcon size={13} color="#fff" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          <div className="hero-badge" aria-label="Wedding photography and cinematic films">
            <div className="badge-star" aria-hidden="true" style={{ color: '#D4AF37' }}>✦</div>
            <div>
              <strong>Image Paradise</strong>
              <span>Wedding Photography &amp; Films · Chennai</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true" onClick={() => onScrollTo('calculator')} style={{ cursor: 'pointer' }}>
        <div className="scroll-bar"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};
