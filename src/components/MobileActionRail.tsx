import React from 'react';

interface MobileActionRailProps {
  onEnquireClick: () => void;
}

export const MobileActionRail: React.FC<MobileActionRailProps> = ({ onEnquireClick }) => {
  return (
    <nav className="mobile-action-rail" aria-label="Quick actions">
      <a className="rail-call" href="tel:+917708510143">
        Call
      </a>
      <button
        type="button"
        className="rail-enquire"
        onClick={onEnquireClick}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        Enquire Now
      </button>
    </nav>
  );
};
