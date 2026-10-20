import React, { useEffect, useRef, useState } from 'react';

interface FilmsProps {
  onScrollToContact: () => void;
}

export const Films: React.FC<FilmsProps> = ({ onScrollToContact }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="films-section" id="films" aria-labelledby="films-heading">
      <div className="films-copy">
        <p className="section-kicker">CINEMATIC FILMS</p>
        <h2 id="films-heading">See the day.<br /><em>Feel it again.</em></h2>
        <p>Wedding films that preserve the voices, movement and atmosphere behind the photographs.</p>
        <button type="button" className="btn-pink" onClick={onScrollToContact}>Enquire for Films <span aria-hidden="true">→</span></button>
      </div>

      <div className="films-player">
        <video
          ref={videoRef}
          className="films-video"
          poster="/images/08-opt.jpg"
          preload="metadata"
          muted
          loop
          playsInline
          controls={false}
          aria-label="Image Paradise cinematic wedding film preview"
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
        </video>
        <div className="films-player-overlay">
          <span>Wedding film preview</span>
          <button type="button" className="films-play" onClick={togglePlay} aria-label={playing ? 'Pause film' : 'Play film'}>
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </section>
  );
};
