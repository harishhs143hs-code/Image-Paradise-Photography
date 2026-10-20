import React from 'react';

interface CraftPromiseProps {
  onOpenCallback: () => void;
  onScrollToContact: () => void;
}

export const CraftPromise: React.FC<CraftPromiseProps> = ({ onOpenCallback, onScrollToContact }) => {
  return (
    <section className="craft-promise-section" id="craft-promise" aria-labelledby="craft-heading">
      <div className="craft-container">
        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            The Director's Commitment
          </div>
          <h2 id="craft-heading">
            The Craft, The Details &amp; <em>Our Approach</em>
          </h2>
          <p>
            We plan wedding coverage around your event schedule, venue, family priorities and the photographs or films you want to receive. Here is what to discuss with the studio before confirming your package.
          </p>
        </header>

        {/* 4 Pillars of Unmatched Trust */}
        <div className="craft-pillars-grid">
          <div className="craft-card">
            <div className="craft-card-icon">👑</div>
            <div className="craft-kicker">Coverage Planning</div>
            <h3>A Plan for Your Event</h3>
            <p>
              We discuss the day's schedule, key rituals, locations and the coverage you need before preparing the final plan.
            </p>
            <div className="craft-tag">Event-led planning</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">🛡️</div>
            <div className="craft-kicker">File Handling</div>
            <h3>Backup Workflow</h3>
            <p>
              We plan how files are checked, organized and backed up after the event. Ask about the workflow and delivery arrangements when receiving your quotation.
            </p>
            <div className="craft-tag">Discuss before booking</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">⚡</div>
            <div className="craft-kicker">Delivery Timeline</div>
            <h3>Preview and Gallery Delivery</h3>
            <p>
              A preview selection is typically aimed for within 24–48 hours; a full edited gallery is typically delivered within 4–6 weeks. Confirm the delivery schedule in your quotation.
            </p>
            <div className="craft-tag">Confirm in writing</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">📖</div>
            <div className="craft-kicker">Printed Albums</div>
            <h3>Album Design &amp; Print Options</h3>
            <p>
              Printed album options are available in selected packages. Album size, material, number of spreads, production time and any warranty are specified in your quotation.
            </p>
            <div className="craft-tag">Package dependent</div>
          </div>
        </div>

        {/* Studio Equipment Transparency Box */}
        <div className="gear-transparency-box">
          <div className="gear-header">
            <div className="gear-badge">⚙️ Equipment and Coverage Planning</div>
            <h3>Coverage Tools Matched to the Event</h3>
            <p>
              We discuss lighting, venue restrictions and coverage requirements before the event, then confirm the equipment and crew included in your booking.
            </p>
          </div>

          <div className="gear-items-grid">
            <div className="gear-item">
              <strong>Photography Equipment</strong>
              <span>The camera and lens setup is planned for ceremony, portrait and low-light conditions.</span>
            </div>
            <div className="gear-item">
              <strong>Lighting Support</strong>
              <span>Available lighting is planned around the venue and ceremony restrictions.</span>
            </div>
            <div className="gear-item">
              <strong>Video Stabilization</strong>
              <span>Video support and stabilization are selected for the planned film coverage.</span>
            </div>
            <div className="gear-item">
              <strong>Audio and Ceremony Sound</strong>
              <span>Audio capture requirements are discussed where the selected video package includes them.</span>
            </div>
          </div>
        </div>

        {/* Director Personal Sign-off & Direct Helpline */}
        <div className="director-signoff-banner">
          <div className="dsb-photo">
            <img
              src="/images/DSC05261.webp"
              alt="Creative Director Hariharan R"
              loading="lazy"
              width={180}
              height={220}
            />
          </div>
          <div className="dsb-content">
            <blockquote>
              "A wedding isn't just an assignment on our calendar — it is the single most sacred day in a family's history. When you look back at your album thirty years from now, you shouldn't just remember what your clothes looked like; you should feel the exact emotion of that second. That is my personal promise to every bride and groom."
            </blockquote>
            <div className="dsb-signature-row">
              <div>
                <strong>Hariharan R</strong>
                <span>Creative Director &amp; Lead Cinematographer, IMAGE PARADISE</span>
                <small>No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu</small>
              </div>
              <div className="dsb-actions">
                <button
                  type="button"
                  className="btn-pink"
                  onClick={onOpenCallback}
                >
                  📞 Request 10-Min Call
                </button>
                <a
                  href="https://wa.me/917708510143?text=Hi%20Hariharan%2C%20I%20read%20your%20director%27s%20promise%20and%20would%20love%20to%20discuss%20my%20wedding%20dates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text-gold"
                  style={{ textDecoration: 'none' }}
                >
                  Chat with Hariharan ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
