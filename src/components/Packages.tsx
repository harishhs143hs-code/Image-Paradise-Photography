import React from 'react';
import { PackageTier } from '../types';
import { CheckIcon, WhatsAppIcon, ClockIcon, ShieldCheckIcon, BookOpenIcon, SettingsIcon } from './Icons';

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
    <section id="services" aria-labelledby="packages-heading">
      <header className="sec-head">
        <div className="sec-badge">
          <img src="/images/Logo-opt.png" alt="" loading="lazy" width={24} height={24} />
          Transparent Collections
        </div>
        <h2 id="packages-heading">Simple, <em>transparent</em> wedding packages</h2>
        <p>
          Honest pricing with zero hidden surcharges. All collections include color-graded master deliverables, same-week previews, and handcrafted print albums.
        </p>
      </header>

      <div className="pkg-row">
        {packages.map((pkg) => {
          const waMessage = encodeURIComponent(
            `Hi Image Paradise Photography! I am interested in your ${pkg.name} package (${pkg.price}). Please check if my wedding date is available.`
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
              
              <ul aria-label={`${pkg.name} inclusions`}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--pk, #D81B60)', marginTop: '2px', flexShrink: 0 }}>
                      <CheckIcon size={14} color="var(--pk, #D81B60)" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="pkg-cta"
                  onClick={() => onSelectPackage(pkg)}
                  style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                >
                  Check Date for Package →
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => onCustomizePackage(pkg)}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: '1px solid #dcd3d8',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <SettingsIcon size={13} color="var(--ink)" />
                    <span>Customize</span>
                  </button>
                  <a
                    href={`https://wa.me/917708510143?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      background: 'rgba(37, 211, 102, 0.1)',
                      border: '1px solid rgba(37, 211, 102, 0.35)',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#075e54',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <WhatsAppIcon size={14} color="#25D366" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Guarantee Banner */}
      <div className="pkg-guarantee-strip" aria-label="Studio guarantees">
        <div className="pg-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }}>
            <ClockIcon size={20} color="#D4AF37" />
          </div>
          <div>
            <strong>48-Hour Sneak Peek</strong>
            <span>Receive 30-50 high-res edited highlights right after your wedding celebration.</span>
          </div>
        </div>
        <div className="pg-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }}>
            <ShieldCheckIcon size={20} color="#D4AF37" />
          </div>
          <div>
            <strong>Full-Day Redundancy</strong>
            <span>Dual memory card cameras, backup gear bodies, and dedicated on-site lighting.</span>
          </div>
        </div>
        <div className="pg-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }}>
            <BookOpenIcon size={20} color="#D4AF37" />
          </div>
          <div>
            <strong>Lifetime Archival</strong>
            <span>Museum-grade lay-flat print binding with permanent private cloud gallery backup.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Packages;
