import React, { useState } from 'react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenLightbox: (index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  onOpenLightbox
}) => {
  const filteredIndices: number[] = [];
  items.forEach((item, index) => {
    if (selectedCategory === 'all' || item.category === selectedCategory) {
      filteredIndices.push(index);
    }
  });

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading">
      <header className="sec-head">
        <div className="sec-badge">
          <img src="/images/Logo-opt.png" alt="" aria-hidden="true" loading="lazy" width="24" height="24" />
          Our Portfolio
        </div>
        <h2 id="portfolio-heading">Stories we've <em>beautifully told</em></h2>
        <p>Every photograph is a love letter to the moment - Wedding photography in Chennai</p>
      </header>

      <div className="filter-row" role="tablist" aria-label="Filter gallery by category">
        <button
          className={`chip ${selectedCategory === 'all' ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedCategory === 'all'}
          onClick={() => onSelectCategory('all')}
        >
          All
        </button>
        <button
          className={`chip ${selectedCategory === 'wedding' ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedCategory === 'wedding'}
          onClick={() => onSelectCategory('wedding')}
        >
          Weddings
        </button>
        <button
          className={`chip ${selectedCategory === 'portrait' ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedCategory === 'portrait'}
          onClick={() => onSelectCategory('portrait')}
        >
          Portraits
        </button>
        <button
          className={`chip ${selectedCategory === 'engagement' ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedCategory === 'engagement'}
          onClick={() => onSelectCategory('engagement')}
        >
          Engagement
        </button>
        <button
          className={`chip ${selectedCategory === 'family' ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedCategory === 'family'}
          onClick={() => onSelectCategory('family')}
        >
          Family
        </button>
      </div>

      <div className="gallery" id="gallery" role="tabpanel">
        {items.map((item, originalIndex) => {
          const isVisible = selectedCategory === 'all' || item.category === selectedCategory;
          if (!isVisible) return null;

          return (
            <div
              key={item.id}
              className={`g-item ${item.layoutClass || ''} in`}
              onClick={() => onOpenLightbox(originalIndex)}
              style={{ cursor: 'pointer' }}
            >
              <div className="g-wrap">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                />
                <div className="g-overlay">
                  <p>{item.title}</p>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
