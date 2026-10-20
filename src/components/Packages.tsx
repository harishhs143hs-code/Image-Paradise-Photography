import React from 'react';
import { PackageTier } from '../types';

interface PackagesProps {
  packages: PackageTier[];
  onSelectPackage: (pkg: PackageTier) => void;
  onCustomizePackage: (pkg: PackageTier) => void;
}

export const Packages: React.FC<PackagesProps> = ({
  packages,
  onSelectPackage,
  onCustomizePackage
}) => {
  return (
    <section id="services">
      <header className="sec-head">
        <div className="sec-badge">
          <img src="/images/Logo-opt.png" alt="" loading="lazy" width={24} height={24} />
          Our Packages
        </div>
        <h2>Choose your <em>perfect</em> package</h2>
        <p>Transparent pricing with zero hidden charges. All packages include high-res edited digital files &amp; sneak peek.</p>
      </header>

      <div className="pkg-row">
        {packages.map((pkg) => {
          const waMessage = encodeURIComponent(
            `Hi Image Paradise Photography! I am interested in your ${pkg.name} package (${pkg.price}). Please let me know if my wedding date is available.`
          );

          return (
            <div
              key={pkg.id}
              className={`pkg ${pkg.featured ? 'featured' : ''} in`}
            >
              {pkg.featured && <div className="pkg-popular">Most Popular in Chennai</div>}
              <div className="pkg-ico">{pkg.icon}</div>
              <div className="pkg-tier">{pkg.name}</div>
              <div className="pkg-price">{pkg.price}</div>
              <p>{pkg.description}</p>
              <ul>
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="pkg-cta"
                  onClick={() => onSelectPackage(pkg)}
                  style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                >
                  Enquire for Date →
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => onCustomizePackage(pkg)}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    ⚙️ Customize
                  </button>
                  <a
                    href={`https://wa.me/917708510143?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      background: 'rgba(37, 211, 102, 0.1)',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#075e54',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Guarantee Banner */}
      <div className="pkg-guarantee-strip">
        <div className="pg-item">
          <strong>⚡ 48-Hour Sneak Peek</strong>
          <span>Receive 30-50 high-res edited highlights right after the wedding.</span>
        </div>
        <div className="pg-item">
          <strong>🛡️ Full Day Redundancy</strong>
          <span>Dual memory card cameras, backup gear, and dedicated lighting kits.</span>
        </div>
        <div className="pg-item">
          <strong>📖 Lifetime Archival</strong>
          <span>Private cloud gallery hosting and flush-mount parent albums.</span>
        </div>
      </div>
    </section>
  );
};
