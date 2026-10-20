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

  const popularMuhurthams = [
    { label: 'Nov-Dec 2026 (Karthigai / Margazhi)', val: '2026-11-20', status: '2 Dates Left' },
    { label: 'Jan-Feb 2027 (Thai Muhurthams)', val: '2027-01-25', status: 'Bookings Open' },
    { label: 'May-Jun 2027 (Vaikasi / Aani)', val: '2027-05-15', status: 'Available' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setChecked(true);
    onCheckDate(date, city, eventType);
  };

  const selectAuspicious = (val: string) => {
    setDate(val);
    setChecked(true);
    onCheckDate(val, city, eventType);
  };

  const whatsappText = encodeURIComponent(
    `Vanakkam Image Paradise! Please verify availability for my wedding date.\nDate: ${date || 'Not decided yet'}\nLocation: ${city}\nCelebration: ${eventType}\nCreative Director: Hariharan R`
  );

  return (
    <div className="date-checker-card">
      <div className="date-checker-header">
        <div className="dc-badge">⚡ Live Date &amp; Muhurtham Availability</div>
        <h3>Check If Your Wedding Date Is Still Open</h3>
        <p>
          We strictly follow a <strong>1 Wedding Per Day</strong> policy with Creative Director Hariharan R personally on-site. Popular Tamil Muhurtham dates in Chennai book 6 to 12 months in advance.
        </p>

        {/* Quick Auspicious Months */}
        <div className="dc-quick-muhurtham">
          <span className="dc-qm-label">Popular 2026–2027 Muhurtham Windows:</span>
          <div className="dc-qm-tags">
            {popularMuhurthams.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="dc-qm-btn"
                onClick={() => selectAuspicious(item.val)}
              >
                <span>{item.label}</span>
                <span className="dc-qm-pill">{item.status}</span>
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
            <option value="Chennai">Chennai (Mylapore, Anna Nagar, OMR, ECR)</option>
            <option value="Veppampattu">Veppampattu (Local Studio Area)</option>
            <option value="Tiruvallur">Tiruvallur District</option>
            <option value="Avadi">Avadi / Poonamallee</option>
            <option value="Ambattur">Ambattur / Mogappair</option>
            <option value="Kanchipuram">Kanchipuram Temple Venues</option>
            <option value="ECR / Beach Resort">ECR / Mahabalipuram Beach Resorts</option>
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
            <option value="Muhurtham & Reception">Muhurtham &amp; Reception (Most Popular)</option>
            <option value="Full 2-Day Tamil Wedding">Full 2-Day Tamil Wedding (Vratham to Reception)</option>
            <option value="Reception Only">Reception Only</option>
            <option value="Pre-Wedding Shoot">Pre-Wedding Shoot (ECR Beach / Resort)</option>
            <option value="Engagement Ceremony">Engagement / Nischayathartham</option>
          </select>
        </div>

        <button type="submit" className="dc-submit-btn">
          Verify Availability Now →
        </button>
      </form>

      {checked && (
        <div className="dc-result-box">
          <div className="dc-result-icon">✨</div>
          <div className="dc-result-content">
            <h4>Good news! Date {date} has tentative availability.</h4>
            <p>
              We are currently accepting inquiries for this date. Because we only cover <strong>1 celebration per day</strong>, dates are locked strictly upon deposit confirmation with Director Hariharan R.
            </p>
            <div className="dc-result-actions">
              <a
                href={`https://wa.me/917708510143?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-wa-btn"
              >
                💬 Lock Date on WhatsApp (+91 7708510143)
              </a>
              {onOpenCallback && (
                <button
                  type="button"
                  className="dc-callback-btn"
                  onClick={onOpenCallback}
                >
                  📞 Request 10-Min Call
                </button>
              )}
              <button
                type="button"
                className="dc-form-btn"
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
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
