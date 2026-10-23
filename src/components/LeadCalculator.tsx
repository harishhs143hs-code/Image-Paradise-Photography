import React, { useState } from 'react';
import { WhatsAppIcon, CheckIcon } from './Icons';

interface EventOption {
  id: string;
  label: string;
  duration: string;
  base: number;
}

const EVENTS: EventOption[] = [
  { id: 'muhurtham', label: 'Muhurtham Ceremony', duration: 'Morning · 4-5 hrs', base: 25000 },
  { id: 'reception', label: 'Wedding Reception', duration: 'Evening · 4 hrs', base: 22000 },
  { id: 'prewedding', label: 'Pre-Wedding Shoot', duration: 'Half-Day · ECR or Studio', base: 18000 },
  { id: 'sangeet', label: 'Sangeet / Mehendi', duration: 'Evening · 3-4 hrs', base: 15000 },
  { id: 'engagement', label: 'Engagement Ring Ceremony', duration: 'Half-Day · 3 hrs', base: 14000 }
];

interface AddonOption {
  id: string;
  label: string;
  desc: string;
  price: number;
}

const ADDONS: AddonOption[] = [
  { id: 'drone', label: '4K Aerial Drone Coverage', desc: 'Sweeping venue & procession visuals', price: 8000 },
  { id: 'album_parent', label: 'Parent Archival Album', desc: 'Flush-mount heirloom edition for parents', price: 9000 },
  { id: 'film_highlight', label: 'Cinematic Teaser Reel', desc: 'Social-ready 60-sec teaser within 72 hrs', price: 6000 }
];

interface LeadCalculatorProps {
  onQuoteRequested: (summaryText: string, estimatedTotal: number) => void;
}

export const LeadCalculator: React.FC<LeadCalculatorProps> = ({ onQuoteRequested }) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['muhurtham', 'reception']);
  const [coverageType, setCoverageType] = useState<'both' | 'photo' | 'video'>('both');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['film_highlight']);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((e) => e !== id) : prev) : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Calculate estimate
  let eventSum = 0;
  EVENTS.forEach((e) => {
    if (selectedEvents.includes(e.id)) {
      eventSum += e.base;
    }
  });

  // Adjust for coverage
  let coverageMultiplier = 1.0;
  if (coverageType === 'photo') coverageMultiplier = 0.65;
  if (coverageType === 'video') coverageMultiplier = 0.65;
  if (coverageType === 'both') coverageMultiplier = 1.0;

  let addonsSum = 0;
  ADDONS.forEach((a) => {
    if (selectedAddons.includes(a.id)) {
      addonsSum += a.price;
    }
  });

  const estimatedTotal = Math.round((eventSum * coverageMultiplier + addonsSum) / 1000) * 1000;
  const lowerEstimate = Math.round(estimatedTotal * 0.95);
  const upperEstimate = Math.round(estimatedTotal * 1.05);

  const selectedEventLabels = EVENTS.filter((e) => selectedEvents.includes(e.id))
    .map((e) => e.label)
    .join(', ');
  const selectedAddonLabels = ADDONS.filter((a) => selectedAddons.includes(a.id))
    .map((a) => a.label)
    .join(', ');

  const summary = `Custom Wedding Plan: Events: [${selectedEventLabels}] · Coverage: [${
    coverageType === 'both' ? 'Photo + Cinematic Video' : coverageType === 'photo' ? 'Photography Only' : 'Videography Only'
  }] · Add-ons: [${selectedAddonLabels || 'None'}] · Est: ₹${lowerEstimate.toLocaleString('en-IN')} – ₹${upperEstimate.toLocaleString('en-IN')}`;

  const whatsappLink = `https://wa.me/917708510143?text=${encodeURIComponent(
    `Hi Image Paradise! I calculated my custom package on your website:\n${summary}\nPlease confirm availability and final quotation.`
  )}`;

  return (
    <section className="lead-calc-section" id="calculator" aria-labelledby="calc-heading">
      <div className="lead-calc-container">
        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            Custom Package Estimator
          </div>
          <h2 id="calc-heading">
            Design your <em>bespoke</em> wedding coverage
          </h2>
          <p>
            No two weddings are identical. Select your events and deliverables for an immediate, transparent estimate.
          </p>
        </header>

        <div className="calc-layout">
          {/* Step 1: Events */}
          <div className="calc-card">
            <div className="calc-step-label">Step 1 · Select Your Events</div>
            <div className="calc-event-grid">
              {EVENTS.map((ev) => {
                const active = selectedEvents.includes(ev.id);
                return (
                  <button
                    key={ev.id}
                    type="button"
                    className={`calc-event-btn ${active ? 'active' : ''}`}
                    onClick={() => toggleEvent(ev.id)}
                  >
                    <span className="calc-check">{active ? '✓' : '+'}</span>
                    <div className="calc-event-meta">
                      <strong>{ev.label}</strong>
                      <small>{ev.duration}</small>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step 2: Coverage Type */}
            <div className="calc-step-label" style={{ marginTop: '28px' }}>
              Step 2 · Coverage Style
            </div>
            <div className="calc-segmented">
              <button
                type="button"
                className={`calc-segment ${coverageType === 'both' ? 'active' : ''}`}
                onClick={() => setCoverageType('both')}
              >
                Photography + Cinematic Video
              </button>
              <button
                type="button"
                className={`calc-segment ${coverageType === 'photo' ? 'active' : ''}`}
                onClick={() => setCoverageType('photo')}
              >
                Photography Only
              </button>
              <button
                type="button"
                className={`calc-segment ${coverageType === 'video' ? 'active' : ''}`}
                onClick={() => setCoverageType('video')}
              >
                Videography Only
              </button>
            </div>

            {/* Step 3: Add-ons */}
            <div className="calc-step-label" style={{ marginTop: '28px' }}>
              Step 3 · Signature Add-ons
            </div>
            <div className="calc-addon-list">
              {ADDONS.map((ad) => {
                const active = selectedAddons.includes(ad.id);
                return (
                  <button
                    key={ad.id}
                    type="button"
                    className={`calc-addon-item ${active ? 'active' : ''}`}
                    onClick={() => toggleAddon(ad.id)}
                  >
                    <span className="calc-check">{active ? '✓' : '+'}</span>
                    <div className="calc-addon-text">
                      <strong>{ad.label}</strong>
                      <span>{ad.desc}</span>
                    </div>
                    <span className="calc-addon-price">+₹{ad.price.toLocaleString('en-IN')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Estimate Card */}
          <div className="calc-summary-card">
            <div className="summary-badge">Live Quotation Estimate</div>
            <div className="summary-price-wrap">
              <span className="summary-currency">₹</span>
              <span className="summary-price">
                {lowerEstimate.toLocaleString('en-IN')}
              </span>
              <span className="summary-range">
                – ₹{upperEstimate.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="summary-note">
              Based on {selectedEvents.length} events with {coverageType === 'both' ? 'Photo & Video' : coverageType}. Includes high-res digital gallery, color grading, and 48-hr sneak peek.
            </p>

            <div className="summary-inclusions">
              <div className="summary-inc-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon size={14} color="#D4AF37" />
                <span>Dedicated Senior Photographers</span>
              </div>
              <div className="summary-inc-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon size={14} color="#D4AF37" />
                <span>48-Hour Preview Gallery Guarantee</span>
              </div>
              <div className="summary-inc-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon size={14} color="#D4AF37" />
                <span>Archival Color Grading &amp; Retouching</span>
              </div>
              <div className="summary-inc-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon size={14} color="#D4AF37" />
                <span>High-Res Full Resolution Downloads</span>
              </div>
            </div>

            <div className="summary-actions">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="summary-wa-btn"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <WhatsAppIcon size={16} color="#fff" />
                <span>Lock In This Quote on WhatsApp →</span>
              </a>
              <button
                type="button"
                className="summary-form-btn"
                onClick={() => {
                  onQuoteRequested(summary, estimatedTotal);
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply to Enquiry Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LeadCalculator;
