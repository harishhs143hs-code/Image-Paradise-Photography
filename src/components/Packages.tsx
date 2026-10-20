import React from 'react';
import { PackageTier } from '../types';

interface PackagesProps {
  packages: PackageTier[];
  onSelectPackage: (pkg: PackageTier) => void;
  onCustomizePackage: (pkg: PackageTier) => void;
}

export const Packages: React.FC<PackagesProps> = ({ packages, onSelectPackage }) => {
  return (
    <section id="services" className="packages-section" aria-labelledby="packages-heading">
      <header className="sec-head packages-head">
        <p className="section-kicker">PACKAGES</p>
        <h2 id="packages-heading">Simple choices.<br /><em>Beautiful coverage.</em></h2>
        <p>Three clear options. Choose the coverage that fits your celebration, then talk to us about your date.</p>
      </header>

      <div className="pkg-row">
        {packages.map((pkg) => (
          <article key={pkg.id} className={`pkg ${pkg.featured ? 'featured' : ''} in`}>
            {pkg.featured && <div className="pkg-popular">Most popular</div>}
            <div className="pkg-tier">{pkg.name}</div>
            <div className="pkg-price">{pkg.price}</div>
            <p>{pkg.description}</p>
            <ul>
              {pkg.features.slice(0, 4).map((feature, idx) => <li key={idx}>{feature}</li>)}
            </ul>
            <button type="button" className="pkg-cta" onClick={() => onSelectPackage(pkg)}>
              Check availability <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
      <p className="packages-note">Need something different? We can tailor coverage around your wedding schedule.</p>
    </section>
  );
};
