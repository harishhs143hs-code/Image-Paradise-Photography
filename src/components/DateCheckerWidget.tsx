import React, { useState } from 'react';

interface DateCheckerWidgetProps {
  onCheckDate: (date: string, city: string, eventType: string) => void;
  onOpenCallback?: () => void;
}

export const DateCheckerWidget: React.FC<DateCheckerWidgetProps> = ({ onCheckDate, onOpenCallback }) => {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('Chennai');
  const [eventType, setEventType] = useState('Muhurtham & Reception');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!date) return;
    onCheckDate(date, city, eventType);
    setChecked(true);
  };

  const whatsappText = encodeURIComponent(
    'Vanakkam Image Paradise Photography! Please confirm availability for my event.\n' +
    'Date: ' + (date || 'Not decided yet') + '\n' +
    'Location: ' + city + '\n' +
    'Celebration: ' + eventType
  );

  return (
    <div className="date-checker-card">
      <div className="date-checker-header">
        <div className="dc-badge">Wedding Date Enquiry</div>
        <h3>Ask About Your Wedding Date</h3>
        <p>
          Enter your date and location to prepare an enquiry. This tool does not check a live booking calendar;
          the studio must confirm availability directly before you make a booking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="date-checker-form">
        <div className="dc-field">
          <label htmlFor="dc-date">Your Event Date *</label>
          <input
            id="dc-date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setChecked(false);
            }}
            required
            aria-label="Event date"
          />
        </div>

        <div className="dc-field">
          <label htmlFor="dc-city">Location / Venue City</label>
          <select
            id="dc-city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setChecked(false);
            }}
          >
            <option value="Chennai">Chennai</option>
            <option value="Veppampattu">Veppampattu</option>
            <option value="Tiruvallur">Tiruvallur</option>
            <option value="Avadi">Avadi</option>
            <option value="Ambattur">Ambattur</option>
            <option value="Kanchipuram">Kanchipuram</option>
            <option value="ECR / Mahabalipuram">ECR / Mahabalipuram</option>
            <option value="Other Tamil Nadu location">Other Tamil Nadu location</option>
          </select>
        </div>

        <div className="dc-field">
          <label htmlFor="dc-event">Celebration Type</label>
          <select
            id="dc-event"
            value={eventType}
            onChange={(event) => {
              setEventType(event.target.value);
              setChecked(false);
            }}
          >
            <option value="Muhurtham & Reception">Muhurtham &amp; Reception</option>
            <option value="Full 2-Day Tamil Wedding">Full 2-Day Tamil Wedding</option>
            <option value="Reception Only">Reception Only</option>
            <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
            <option value="Engagement Ceremony">Engagement / Nischayathartham</option>
          </select>
        </div>

        <button type="submit" className="dc-submit-btn">
          Prepare Date Enquiry →
        </button>
      </form>

      {checked && (
        <div className="dc-result-box" role="status">
          <div className="dc-result-icon">✓</div>
          <div className="dc-result-content">
            <h4>Your enquiry details are ready</h4>
            <p>
              The date has not been checked against a live calendar. Send the details to Image Paradise Photography
              so the studio can confirm availability and discuss coverage.
            </p>
            <div className="dc-result-actions">
              <a
                href={'https://wa.me/917708510143?text=' + whatsappText}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-wa-btn"
              >
                💬 Ask About This Date on WhatsApp
              </a>
              {onOpenCallback && (
                <button type="button" className="dc-callback-btn" onClick={onOpenCallback}>
                  Request a Callback
                </button>
              )}
              <button
                type="button"
                className="dc-form-btn"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Send Formal Enquiry ↓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
