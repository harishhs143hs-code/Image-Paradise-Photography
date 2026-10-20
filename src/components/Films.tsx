import React from 'react';

interface FilmsProps {
  onScrollToContact: () => void;
}

export const Films: React.FC<FilmsProps> = ({ onScrollToContact }) => {
  return (
    <>
      <section className="film-strip" id="films">
        <div className="film-strip-inner">
          <div className="studio-kicker">CINEMATIC STORIES</div>
          <h2>Frames that <em>move.</em></h2>
          <div className="film-cards">
            <article className="film-card" style={{ ['--film-image' as any]: "url('/images/08.webp')" }}>
              <div className="film-card-content">
                <small>01 · Wedding Films</small>
                <h3>The day, in motion.</h3>
              </div>
            </article>
            <article className="film-card" style={{ ['--film-image' as any]: "url('/images/DSC06422-opt.JPG')" }}>
              <div className="film-card-content">
                <small>02 · Couple Stories</small>
                <h3>Before forever.</h3>
              </div>
            </article>
            <article className="film-card" style={{ ['--film-image' as any]: "url('/images/DSC06422-opt.JPG')" }}>
              <div className="film-card-content">
                <small>03 · Celebrations</small>
                <h3>Feel it again.</h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="xp-films" className="xp-faq">
        <div className="xp-faq-head">
          <div>
            <div className="xp-kicker">Motion &amp; emotion</div>
          </div>
          <div>
            <h2>Stories that <em>move.</em></h2>
            <p className="xp-faq-intro">
              Our photography is only one part of the story. Cinematic wedding films bring back the voices, movement and atmosphere of the day. Your portfolio and future film library can grow here without changing the experience.
            </p>
            <div style={{ marginTop: '28px' }}>
              <button
                type="button"
                onClick={onScrollToContact}
                className="btn-pink"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
              >
                Enquire for a Film <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
