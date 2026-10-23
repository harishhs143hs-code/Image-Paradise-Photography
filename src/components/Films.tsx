import React, { useRef, useState } from 'react';
import { PlayIcon, PauseIcon, VolumeHighIcon, VolumeXIcon, FilmIcon, WhatsAppIcon } from './Icons';

interface FilmsProps {
  onScrollToContact: () => void;
}

interface FilmStory {
  id: string;
  title: string;
  couple: string;
  venue: string;
  duration: string;
  tag: string;
  poster: string;
  videoSrc: string;
}

const FILM_STORIES: FilmStory[] = [
  {
    id: 'film-1',
    title: 'The Eternal Vows',
    couple: 'Swathi & Karthik',
    venue: 'Mayor Ramanathan Chettiar Hall, MRC Nagar, Chennai',
    duration: '3:45 Min 4K Highlight',
    tag: 'Traditional Muhurtham',
    poster: '/images/08.jpg',
    videoSrc: '/videos/promo.mp4'
  },
  {
    id: 'film-2',
    title: 'Golden Sunset Tide',
    couple: 'Divya & Ashwin',
    venue: 'Taj Fisherman’s Cove Resort, ECR, Chennai',
    duration: '2:15 Min Cinema Teaser',
    tag: 'Coastal Sunset & Sangeet',
    poster: '/images/DSC06422-opt.JPG',
    videoSrc: '/videos/promo.mp4'
  },
  {
    id: 'film-3',
    title: 'Sacred Rituals & Joy',
    couple: 'Pooja & Vignesh',
    venue: 'Sri Raghavendra Kalyana Mandapam, Tiruvallur',
    duration: '60-Sec Instagram Reel',
    tag: 'Candid Cinema Reel',
    poster: '/images/gallery1.jpeg',
    videoSrc: '/videos/promo.mp4'
  }
];

export const Films: React.FC<FilmsProps> = ({ onScrollToContact }) => {
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFilm, setActiveFilm] = useState<FilmStory>(FILM_STORIES[0]);
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  const toggleFeaturedPlay = () => {
    if (featuredVideoRef.current) {
      if (featuredVideoRef.current.paused) {
        featuredVideoRef.current.play();
        setIsPlaying(true);
      } else {
        featuredVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFeaturedMute = () => {
    if (featuredVideoRef.current) {
      const nextMuted = !isMuted;
      featuredVideoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleOpenFilm = (film: FilmStory) => {
    setActiveFilm(film);
    setCinemaModalOpen(true);
  };

  return (
    <>
      <section className="films-showcase-section" id="films" aria-labelledby="films-heading">
        <div className="films-container">
          <header className="sec-head light-text">
            <div className="sec-badge light" style={{ color: '#D4AF37', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              <FilmIcon size={14} color="#D4AF37" />
              <span>Cinematic Wedding Films</span>
            </div>
            <h2 id="films-heading" style={{ color: '#ffffff' }}>
              Where sacred moments turn into <em>timeless cinema</em>
            </h2>
            <p style={{ color: '#b3b3b3' }}>
              Wedding photography captures the split-second tear; cinematic films bring back the laughter, whispered vows, and the electric energy of your day. Personally directed by Hariharan R using 4K cinema cameras and aerial drone visuals.
            </p>
          </header>

          {/* Featured Cinema Theater Box */}
          <div className="featured-theater-wrap">
            <div className="cinema-frame">
              <video
                ref={featuredVideoRef}
                className="cinema-video"
                poster={activeFilm.poster}
                playsInline
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
                onClick={toggleFeaturedPlay}
              >
                <source src={activeFilm.videoSrc} type="video/mp4" />
              </video>

              {/* Theater Dark Vignette & Play Overlay */}
              {!isPlaying && (
                <div className="cinema-poster-overlay" onClick={toggleFeaturedPlay}>
                  <button
                    type="button"
                    className="cinema-play-hero-btn"
                    aria-label="Play featured wedding film"
                  >
                    <PlayIcon size={28} color="#0f1115" />
                  </button>
                  <div className="cinema-poster-meta">
                    <span className="cpm-tag">{activeFilm.tag}</span>
                    <h3>{activeFilm.title} · {activeFilm.couple}</h3>
                    <p>{activeFilm.venue}</p>
                  </div>
                </div>
              )}

              {/* Cinema Control Floating Bar */}
              <div className="cinema-controls-bar">
                <button
                  type="button"
                  className="cinema-ctrl-btn"
                  onClick={toggleFeaturedPlay}
                  aria-label={isPlaying ? 'Pause film' : 'Play film'}
                >
                  {isPlaying ? <PauseIcon size={14} color="#fff" /> : <PlayIcon size={14} color="#fff" />}
                  <span>{isPlaying ? 'Pause' : 'Play Film'}</span>
                </button>

                <button
                  type="button"
                  className="cinema-ctrl-btn"
                  onClick={toggleFeaturedMute}
                  aria-label={isMuted ? 'Unmute film' : 'Mute film'}
                >
                  {isMuted ? <VolumeXIcon size={14} color="#fff" /> : <VolumeHighIcon size={14} color="#fff" />}
                  <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                </button>

                <div className="cinema-specs-badge">
                  <span>4K UHD · 24FPS CINEMA · S-LOG3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Film Selection Strip */}
          <div className="film-stories-grid">
            {FILM_STORIES.map((film) => {
              const isCurrent = activeFilm.id === film.id;
              return (
                <article
                  key={film.id}
                  className={`film-story-card ${isCurrent ? 'active' : ''}`}
                  onClick={() => handleOpenFilm(film)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOpenFilm(film);
                  }}
                  aria-label={`Watch ${film.title} for ${film.couple}`}
                >
                  <div className="fsc-thumbnail" style={{ backgroundImage: `url(${film.poster})` }}>
                    <div className="fsc-overlay">
                      <span className="fsc-play-pill">
                        <PlayIcon size={14} color="#111" />
                        <span>Watch Film</span>
                      </span>
                    </div>
                    <span className="fsc-duration">{film.duration}</span>
                  </div>

                  <div className="fsc-info">
                    <span className="fsc-tag">{film.tag}</span>
                    <h4>{film.couple}</h4>
                    <p>{film.venue}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Film Enquiry Strip */}
          <div className="film-cta-strip">
            <div>
              <h3>Want your wedding documented like a feature film?</h3>
              <p>Every Image Paradise film package includes drone aerials, multi-cam coverage, and professional audio recording of vows and muhurtham mantras.</p>
            </div>
            <div className="film-cta-actions">
              <button
                type="button"
                onClick={onScrollToContact}
                className="btn-pink"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                Enquire for Wedding Film →
              </button>
              <a
                href="https://wa.me/917708510143?text=Hi%20Hariharan!%20I%20am%20interested%20in%20your%20cinematic%20wedding%20films%20coverage."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text-gold"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <WhatsAppIcon size={15} color="#25D366" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Cinema Modal */}
      {cinemaModalOpen && (
        <div
          className="modal-backdrop cinema-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Cinema viewer for ${activeFilm.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setCinemaModalOpen(false);
          }}
        >
          <div className="cinema-modal-card">
            <button
              type="button"
              className="modal-close-btn light"
              onClick={() => setCinemaModalOpen(false)}
              aria-label="Close cinema viewer"
            >
              &times;
            </button>
            <div className="cinema-modal-video-wrap">
              <video
                src={activeFilm.videoSrc}
                poster={activeFilm.poster}
                controls
                autoPlay
                playsInline
                className="cinema-modal-video"
              />
            </div>
            <div className="cinema-modal-footer">
              <div>
                <span className="cpm-tag">{activeFilm.tag}</span>
                <h4>{activeFilm.title} · {activeFilm.couple}</h4>
                <p>{activeFilm.venue}</p>
              </div>
              <button
                type="button"
                className="btn-pink"
                onClick={() => {
                  setCinemaModalOpen(false);
                  onScrollToContact();
                }}
              >
                Book Similar Coverage →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Films;
