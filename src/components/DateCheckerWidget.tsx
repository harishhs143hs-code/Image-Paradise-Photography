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

  const quickDates = [
    { label: 'Nov–Dec 2026 · Karthigai / Margazhi', val: '2026-11-20' },
    { label: 'Jan–Feb 2027 · Thai Muhurthams', val: '2027-01-25' },
    { label: 'May–Jun 2027 · Vaikasi / Aani', val: '2027-05-15' }
  ];

  const submitDate = (value: string) => {
    if (!value) return;
    setDate(value);
    setChecked(true);
    onCheckDate(value, city, eventType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDate(date);
  };

  const whatsappText = encodeURIComponent(
    `Vanakkam Image Paradise! Please verify availability for my wedding date.\nDate: ${date || 'Not decided yet'}\nLocation: ${city}\nCelebration: ${eventType}`
  );

  return (
    <div className="date-checker-card">
      <div className="date-checker-header">
        <div className="dc-badge">DATE AVAILABILITY</div>
        <h3>Check Your Wedding Date</h3>
        <p>
          Select your date and celebration details. This form sends a request to the studio; the date is not confirmed until Image Paradise verifies availability with you.
        </p>

        <div className="dc-quick-muhurtham">
          <span className="dc-qm-label">Popular Muhurtham windows</span>
          <div className="dc-qm-tags">
            {quickDates.map((item) => (
              <button
                key={item.val}
                type="button"
                className="dc-qm-btn"
                onClick={() => submitDate(item.val)}
              >
                <span>{item.label}</span>
                <span className="dc-qm-pill">Select</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="date-checker-form">
        <div className="dc-field">
          <label htmlFor="dc-date">Your Wedding Date *</label>
          <input
            id="dc-date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setChecked(false);
            }}
            required
            aria-label="Wedding Date"
          />
        </div>

        <div className="dc-field">
          <label htmlFor="dc-city">Location / Venue City</label>
          <select
            id="dc-city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setChecked(false);
            }}
          >
            <option value="Chennai">Chennai</option>
            <option value="Veppampattu">Veppampattu</option>
            <option value="Tiruvallur">Tiruvallur District</option>
            <option value="Avadi">Avadi / Poonamallee</option>
            <option value="Ambattur">Ambattur / Mogappair</option>
            <option value="Kanchipuram">Kanchipuram</option>
            <option value="ECR / Beach Resort">ECR / Mahabalipuram</option>
            <option value="Destination Wedding">Other South India / Destination</option>
          </select>
        </div>

        <div className="dc-field">
          <label htmlFor="dc-event">Celebration Type</label>
          <select
            id="dc-event"
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
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

        <button type="submit" className="dc-submit-btn">Request Date Check →</button>
      </form>

      {checked && (
        <div className="dc-result-box" role="status" aria-live="polite">
          <div className="dc-result-content">
            <h4>Availability request ready for {date}</h4>
            <p>
              Your request has been prepared. Please contact the studio to verify the date. A date is confirmed only after Image Paradise confirms availability and the booking process is completed.
            </p>
            <div className="dc-result-actions">
              <a
                href={`https://wa.me/917708510143?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-wa-btn"
              >
                WhatsApp the Studio
              </a>
              {onOpenCallback && (
                <button type="button" className="dc-callback-btn" onClick={onOpenCallback}>
                  Request a Call
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
