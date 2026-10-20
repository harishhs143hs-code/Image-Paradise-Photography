import React from 'react';

interface CategoryBarProps {
  onSelectCategory: (category: string) => void;
  onScrollTo: (elementId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ onSelectCategory, onScrollTo }) => {
  return (
    <div className="xp-category-bar">
      <div className="xp-category-label">Explore the studio</div>
      <nav className="xp-category-links" aria-label="Studio categories">
        <button
          type="button"
          onClick={() => {
            onSelectCategory('wedding');
            onScrollTo('portfolio');
          }}
          className="xp-link-btn"
        >
          Weddings
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectCategory('portrait');
            onScrollTo('portfolio');
          }}
          className="xp-link-btn"
        >
          Portraits
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectCategory('engagement');
            onScrollTo('portfolio');
          }}
          className="xp-link-btn"
        >
          Engagements
        </button>
        <button
          type="button"
          onClick={() => onScrollTo('services')}
          className="xp-link-btn"
        >
          Packages
        </button>
        <button
          type="button"
          onClick={() => onScrollTo('films')}
          className="xp-link-btn"
        >
          Films
        </button>
        <button
          type="button"
          onClick={() => onScrollTo('xp-locations')}
          className="xp-link-btn"
        >
          Locations
        </button>
        <button
          type="button"
          onClick={() => onScrollTo('contact')}
          className="xp-link-btn"
        >
          Check your date
        </button>
      </nav>
    </div>
  );
};
