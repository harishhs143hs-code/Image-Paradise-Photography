import React, { useState, useEffect, useRef } from 'react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials">
      <div className="testi-glow"></div>
      <header className="sec-head">
        <div className="sec-badge">
          <img src="/images/Logo-opt.png" alt="" loading="lazy" width="24" height="24" />
          Kind Words
        </div>
        <h2>What our couples <em>say</em></h2>
      </header>

      <div className="tslider">
        <div
          className="ttrack"
          id="ttrack"
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="tcard"
              style={{ minWidth: '100%', boxSizing: 'border-box' }}
            >
              <div className="tquote">&#10077;</div>
              <div className="tstars">{'★'.repeat(item.rating)}</div>
              <p>"{item.quote}"</p>
              <div className="tauthor">
                <div className="tav" style={{ background: item.avatarBg }}>
                  {item.initials}
                </div>
                <div>
                  <strong>{item.names}</strong>
                  <span>{item.event}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tdots" id="tdots">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`tdot ${idx === currentIndex ? 'on' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              style={{ cursor: 'pointer' }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
