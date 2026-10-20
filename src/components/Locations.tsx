import React from 'react';

interface LocationsProps {
  onSelectLocationPage: (route: string) => void;
}

export const Locations: React.FC<LocationsProps> = ({ onSelectLocationPage }) => {
  return (
    <section id="xp-locations" className="xp-locations">
      <div className="xp-locations-inner">
        <div>
          <div className="xp-kicker">Where we create</div>
          <h2>From Chennai to <em>your story.</em></h2>
        </div>
        <div>
          <p>
            Home base in Chennai, with wedding photography and videography experiences across Tamil Nadu and destination celebrations by request.
          </p>
          <div className="xp-location-grid">
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('chennai')}
            >
              Chennai
            </button>
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('tiruvallur')}
            >
              Tiruvallur
            </button>
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('avadi')}
            >
              Avadi
            </button>
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('ambattur')}
            >
              Ambattur
            </button>
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('pre-wedding')}
            >
              Pre-Wedding
            </button>
            <button
              type="button"
              className="location-chip-btn"
              onClick={() => onSelectLocationPage('videography')}
            >
              Videography
            </button>
            <span className="location-tag">Tamil Nadu</span>
            <span className="location-tag">India</span>
            <span className="location-tag">Destination</span>
          </div>
        </div>
      </div>
    </section>
  );
};
