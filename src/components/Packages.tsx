import React from 'react';
import { PackageTier } from '../types';

interface PackagesProps {
  packages: PackageTier[];
  onSelectPackage: (pkg: PackageTier) => void;
}

export const Packages: React.FC<PackagesProps> = ({ packages, onSelectPackage }) => {
  return (
    <section id="services">
      <header className="sec-head">
        <div className="sec-badge">
          <img src="/images/Logo-opt.png" alt="" loading="lazy" width="24" height="24" />
          Our Packages
        </div>
        <h2>Choose your <em>perfect</em> package</h2>
      </header>

      <div className="pkg-row">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`pkg ${pkg.featured ? 'featured' : ''} in`}
          >
            {pkg.featured && <div className="pkg-popular">Most Popular</div>}
            <div className="pkg-ico">{pkg.icon}</div>
            <div className="pkg-tier">{pkg.name}</div>
            <div className="pkg-price">{pkg.price}</div>
            <p>{pkg.description}</p>
            <ul>
              {pkg.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="pkg-cta"
              onClick={() => onSelectPackage(pkg)}
              style={{ width: '100%', border: 'none', cursor: 'pointer' }}
            >
              Enquire Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
