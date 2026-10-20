import React, { useEffect, useRef } from 'react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 55) {
      if (delta < 0) {
        onNavigate((currentIndex + 1) % items.length);
      } else {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    }
  };

  return (
    <div
      className="lightbox open"
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="lb-x"
        id="lbX"
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
      >
        &times;
      </button>

      <button
        className="lb-l"
        id="lbL"
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }}
      >
        &#8592;
      </button>

      <div className="lb-stage" id="lbStage">
        <img src={currentItem.src} alt={currentItem.alt || currentItem.title} />
      </div>

      <button
        className="lb-r"
        id="lbR"
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % items.length);
        }}
      >
        &#8594;
      </button>

      <div className="lb-caption" id="lbCaption">
        {currentItem.title} · {currentItem.subtitle} ({currentIndex + 1} of {items.length})
      </div>
    </div>
  );
};
