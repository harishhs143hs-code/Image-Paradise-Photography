import React, { useState } from 'react';
import { FaqItem } from '../types';

interface FAQProps {
  faqs: FaqItem[];
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="xp-faq" id="faq">
      <div className="xp-faq-head">
        <div>
          <div className="xp-kicker">Before we begin</div>
        </div>
        <div>
          <h2>Frequently <em>asked.</em></h2>
          <p className="xp-faq-intro">A few quick answers before you plan your session.</p>
        </div>
      </div>

      <div className="xp-faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`xp-faq-item ${isOpen ? 'open' : ''}`}>
              <button
                className="xp-faq-q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
              >
                <span>{faq.question}</span>
                <span>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="xp-faq-a" style={{ display: 'block' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
