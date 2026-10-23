import React from 'react';
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from './Icons';

interface MobileActionRailProps {
  onEnquireClick: () => void;
}

export const MobileActionRail: React.FC<MobileActionRailProps> = ({ onEnquireClick }) => {
  return (
    <nav className="mobile-action-rail" aria-label="Quick mobile actions">
      <a
        className="rail-btn rail-call"
        href="tel:+917708510143"
        aria-label="Call studio direct at +91 7708510143"
      >
        <PhoneIcon size={16} color="currentColor" />
        <span>Call</span>
      </a>
      <a
        className="rail-btn rail-wa"
        href="https://wa.me/917708510143?text=Hi%20Image%20Paradise!%20I%20would%20like%20to%20enquire%20about%20wedding%20photography%20availability."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={17} color="#fff" />
        <span>WhatsApp</span>
      </a>
      <button
        type="button"
        className="rail-btn rail-enquire"
        onClick={onEnquireClick}
        aria-label="Check wedding date availability"
      >
        <CalendarIcon size={15} color="#fff" />
        <span>Check Date</span>
      </button>
    </nav>
  );
};
export default MobileActionRail;
