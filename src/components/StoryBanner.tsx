import React from 'react';

interface StoryBannerProps {
  onScrollToContact: () => void;
}

export const StoryBanner: React.FC<StoryBannerProps> = ({ onScrollToContact }) => {
  return (
    <>
      <section className="story-banner">
        <div className="story-banner-inner">
          <div className="studio-kicker"><i></i> MORE THAN A PHOTOSHOOT <i></i></div>
          <h2>Your wedding.<br /><em>Your story.</em></h2>
          <p>
            We don't direct your memories. We create the space for real emotion to happen — then turn those fleeting seconds into photographs and films you'll return to for decades.
          </p>
          <button
            type="button"
            onClick={onScrollToContact}
            className="btn-pink"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
          >
            Tell Us Your Story <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="xp-manifesto" aria-labelledby="xp-manifesto-title">
        <div>
          <div className="xp-kicker">The Image Paradise approach</div>
          <div className="xp-rule"></div>
        </div>
        <div>
          <h2 id="xp-manifesto-title">Your day, told with <em>intention.</em></h2>
          <p className="xp-manifesto-copy">
            From the quiet details to the loudest celebrations, we document the atmosphere, people and emotions that make your story yours. Explore our work, discover the experience, then tell us what you are planning.
          </p>
        </div>
      </section>
    </>
  );
};
