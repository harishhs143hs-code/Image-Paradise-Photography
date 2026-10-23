import React from 'react';
import { PhoneIcon } from './Icons';

interface MobileActionRailProps {
  onEnquireClick: () => void;
}

export const MobileActionRail: React.FC<MobileActionRailProps> = ({ onEnquireClick }) => {
  return (
    <nav className="mobile-action-rail" aria-label="Quick mobile actions">
      <a
        className="rail-call"
        href="tel:+917708510143"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
      >
        <PhoneIcon size={14} color="currentColor" />
        <span>Call Studio</span>
      </a>
      <button
        type="button"
        className="rail-enquire"
        onClick={onEnquireClick}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        Check Availability
      </button>
    </nav>
  );
};
export default MobileActionRail;
