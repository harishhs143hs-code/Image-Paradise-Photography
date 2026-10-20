import React from 'react';

interface JournalProps {
  onScrollTo: (elementId: string) => void;
  onOpenBlog: () => void;
}

export const Journal: React.FC<JournalProps> = ({ onScrollTo, onOpenBlog }) => {
  return (
    <section className="studio-index" id="studio-index">
      <div className="studio-index-inner">
        <div className="studio-kicker"><i></i> THE IMAGE PARADISE JOURNAL</div>
        <h2>Stories <em>worth</em> remembering.</h2>
        <div className="studio-index-grid">
          <button
            type="button"
            className="studio-link"
            onClick={() => onScrollTo('portfolio')}
          >
            <small>01 · Visual Archive</small>
            <strong>Weddings</strong>
            <span>↗</span>
          </button>
          <button
            type="button"
            className="studio-link"
            onClick={() => onScrollTo('portfolio')}
          >
            <small>02 · Portrait Stories</small>
            <strong>Portraits</strong>
            <span>↗</span>
          </button>
          <button
            type="button"
            className="studio-link"
            onClick={() => onScrollTo('services')}
          >
            <small>03 · Signature Work</small>
            <strong>Experiences</strong>
            <span>↗</span>
          </button>
          <button
            type="button"
            className="studio-link"
            onClick={onOpenBlog}
          >
            <small>04 · Wedding Advice</small>
            <strong>Our Blog</strong>
            <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
