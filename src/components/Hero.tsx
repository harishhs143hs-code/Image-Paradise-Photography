import React, { useEffect, useRef, useState } from 'react';

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
    video.play().catch(() => {});

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && isPlaying) video.play().catch(() => {});
      else if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const muted = !isMuted;
    video.muted = muted;
    setIsMuted(muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="hero" className="ip-hero" aria-labelledby="hero-heading">
      <div className="hero-left">
        <p className="hero-eyebrow">WEDDING PHOTOGRAPHY &amp; CINEMATIC FILMS</p>
        <h1 id="hero-heading" className="hero-headline">
          Your story,<br /><em>beautifully preserved.</em>
        </h1>
        <p className="hero-body">
          Candid photography and cinematic wedding films for celebrations in Chennai, Tiruvallur and across Tamil Nadu.
        </p>

        <div className="hero-btns">
          <button type="button" onClick={() => onScrollTo('contact')} className="btn-pink" data-lead-event="check_date_click">
            Check Your Date <span aria-hidden="true">→</span>
          </button>
          <button type="button" onClick={() => onScrollTo('portfolio')} className="btn-outline">
            View Portfolio
          </button>
        </div>

        <div className="hero-meta" aria-label="Studio information">
          <span>Chennai · Tiruvallur</span>
          <span>Weddings · Pre-Weddings · Films</span>
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
              aria-label="Image Paradise Photography wedding film"
            >
              <source src="/videos/promo.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-controls" aria-label="Video controls">
              <button className="hero-video-control" type="button" onClick={toggleSound} aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}>
                {isMuted ? 'Sound off' : 'Sound on'}
              </button>
              <button className="hero-video-control" type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause film' : 'Play film'}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
            <div className="hero-film-label">A glimpse of the story</div>
          </div>
        </div>
      </div>

      <button type="button" className="hero-scroll" onClick={() => onScrollTo('portfolio')} aria-label="Scroll to portfolio">
        <span className="scroll-bar" />
        <span>Explore the work</span>
      </button>
    </section>
  );
};
