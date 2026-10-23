import React, { useState } from 'react';
import { BookOpenIcon, CheckIcon, WhatsAppIcon } from './Icons';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingMonth, setWeddingMonth] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setDownloaded(true);

    // Trigger WhatsApp notification for the studio
    const text = encodeURIComponent(
      `Hi Image Paradise! I just downloaded your 2026 Wedding Photography & Pricing Guide.\nName: ${name}\nPhone: ${phone}\nWedding Month: ${weddingMonth || 'Late 2026/2027'}`
    );
    window.open(`https://wa.me/917708510143?text=${text}`, '_blank');
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Download 2026 Wedding Pricing Guide"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="brochure-modal-card">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {!downloaded ? (
          <>
            <div className="brochure-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BookOpenIcon size={13} color="#D4AF37" />
              <span>2026 Client Collection</span>
            </div>
            <h3>Download Our Wedding Guide &amp; Package Brochure</h3>
            <p className="brochure-sub">
              Everything you need to know about wedding photography in Chennai, typical event schedules, album styles, and complete pricing breakdowns.
            </p>

            <form onSubmit={handleSubmit} className="brochure-form">
              <div className="b-field">
                <label htmlFor="b-name">Your Name *</label>
                <input
                  id="b-name"
                  type="text"
                  placeholder="e.g. Priyadarshini"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="b-field">
                <label htmlFor="b-phone">WhatsApp Number *</label>
                <input
                  id="b-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="b-field">
                <label htmlFor="b-month">Tentative Wedding Month / Year</label>
                <input
                  id="b-month"
                  type="text"
                  placeholder="e.g. November 2026"
                  value={weddingMonth}
                  onChange={(e) => setWeddingMonth(e.target.value)}
                />
              </div>

              <button type="submit" className="brochure-submit-btn">
                Instant Access to Guide →
              </button>
              <small className="b-privacy">
                We respect your privacy. No spam. You will receive instant access and a direct copy on WhatsApp.
              </small>
            </form>
          </>
        ) : (
          <div className="brochure-success">
            <div style={{ color: '#D4AF37', marginBottom: '12px' }}>
              <CheckIcon size={40} color="#D4AF37" />
            </div>
            <h3>Your 2026 Wedding Guide is Ready!</h3>
            <p>
              Thank you, {name}! We have opened a direct chat with our studio on WhatsApp and your guide preview is active below.
            </p>

            <div className="guide-preview-box">
              <div className="g-preview-header">
                <strong>Image Paradise Photography — 2026 Client Collection</strong>
                <span>Chennai · Tamil Nadu</span>
              </div>
              <ul className="g-preview-list">
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckIcon size={13} color="#D81B60" />
                  <span>Essential (₹35,000) — 4 hrs coverage, 1 Photo, 1 Video, 200+ prints, online gallery</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckIcon size={13} color="#D81B60" />
                  <span>Premium (₹75,000) — 8 hrs coverage, 2 Photos, 1 Video, 2 printed albums, highlight reel</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckIcon size={13} color="#D81B60" />
                  <span>Luxury (₹1,50,000) — Full day, 2 Photos + assistant, 2 Videos, drone, pre &amp; post-wedding shoots</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckIcon size={13} color="#D81B60" />
                  <span>48-Hour Sneak Peek Guarantee for all celebrations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckIcon size={13} color="#D81B60" />
                  <span>High-end flush-mount archival binding with lifetime warranty</span>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a
                href="https://wa.me/917708510143?text=Hi%20Image%20Paradise!%20I%20have%20questions%20about%20your%202026%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <WhatsAppIcon size={15} color="#fff" />
                <span>Chat on WhatsApp Now</span>
              </a>
              <button
                type="button"
                className="btn-outline"
                onClick={onClose}
              >
                Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BrochureModal;
