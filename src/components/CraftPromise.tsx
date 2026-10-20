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
            The Craft, The Gear &amp; <em>Our Sacred Promise</em>
          </h2>
          <p>
            We don't believe in factory-line wedding photography where a faceless agency sends whoever is free on a weekend. Here is what happens behind the lens when you trust Hariharan R and Image Paradise.
          </p>
        </header>

        {/* 4 Pillars of Unmatched Trust */}
        <div className="craft-pillars-grid">
          <div className="craft-card">
            <div className="craft-card-icon">👑</div>
            <div className="craft-kicker">Exclusivity Guarantee</div>
            <h3>1 Wedding Per Day</h3>
            <p>
              Your wedding date receives our undivided focus. Creative Director Hariharan R leads the team on-site personally. We strictly refuse multiple bookings on the same calendar day.
            </p>
            <div className="craft-tag">Personal Direction</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">🛡️</div>
            <div className="craft-kicker">Data Security</div>
            <h3>Zero-Loss Dual Backup</h3>
            <p>
              Every shutter actuation writes to two high-speed memory cards simultaneously in real-time. Immediately post-event, footage is archived across dual NVMe drives and offsite cloud storage.
            </p>
            <div className="craft-tag">Triple Redundancy</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">⚡</div>
            <div className="craft-kicker">Speed &amp; Excitement</div>
            <h3>48-Hour Sneak Peek</h3>
            <p>
              Don't wait months to relive the magic. Within 48 hours of your wedding reception, receive a curated gallery of 25–40 high-resolution color-graded frames ready for sharing.
            </p>
            <div className="craft-tag">Same-Week Delivery</div>
          </div>

          <div className="craft-card">
            <div className="craft-card-icon">📖</div>
            <div className="craft-kicker">Generational Heirlooms</div>
            <h3>75-Year Archival Albums</h3>
            <p>
              We craft museum-grade, lay-flat flush-mount albums using premium Italian leatherette and non-tear silk matte pages that resist humidity and yellowing for generations.
            </p>
            <div className="craft-tag">Lifetime Warranty</div>
          </div>
        </div>

        {/* Studio Equipment Transparency Box */}
        <div className="gear-transparency-box">
          <div className="gear-header">
            <div className="gear-badge">⚙️ Professional Equipment Roster</div>
            <h3>World-Class Gear for Unforgiving Mandapam Lighting</h3>
            <p>
              Traditional South Indian mandapams and beach receptions require top-tier low-light sensitivity and optical perfection. We bring industry-standard cinema and still systems:
            </p>
          </div>

          <div className="gear-items-grid">
            <div className="gear-item">
              <strong>Sony Alpha A7 IV &amp; A7S III</strong>
              <span>Full-frame 33MP hybrid bodies with 15+ stops dynamic range for rich silk saree tones &amp; jewel details.</span>
            </div>
            <div className="gear-item">
              <strong>Sony G-Master Primes (35mm &amp; 85mm f/1.4)</strong>
              <span>Creamy cinematic bokeh and razor-sharp candid portraits even under dim evening reception chandeliers.</span>
            </div>
            <div className="gear-item">
              <strong>DJI RS3 Pro &amp; 4K HDR Aerial Drone</strong>
              <span>Buttery smooth cinematic movement for baraat processions, mangalyadharanam, and majestic venue vistas.</span>
            </div>
            <div className="gear-item">
              <strong>Godox &amp; Profoto Studio Off-Camera Flash</strong>
              <span>Soft, flattering editorial portrait lighting that enhances natural skin tones without harsh shadows.</span>
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
