import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UtilityBar } from './components/UtilityBar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { DateCheckerWidget } from './components/DateCheckerWidget';
import { StoryBanner } from './components/StoryBanner';
import { Marquee } from './components/Marquee';
import { CategoryBar } from './components/CategoryBar';
import { Gallery } from './components/Gallery';
import { Lightbox } from './components/Lightbox';
import { WeddingStories } from './components/WeddingStories';
import { LeadCalculator } from './components/LeadCalculator';
import { About } from './components/About';
import { CraftPromise } from './components/CraftPromise';
import { Packages } from './components/Packages';
import { Films } from './components/Films';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Locations } from './components/Locations';
import { Journal } from './components/Journal';
import { ReferralBanner } from './components/ReferralBanner';
import { ReferralProgram } from './components/ReferralProgram';
import { ContactForm } from './components/ContactForm';
import { BrochureModal } from './components/BrochureModal';
import { CallbackModal } from './components/CallbackModal';
import { Footer } from './components/Footer';
import { MobileActionRail } from './components/MobileActionRail';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { BackToTop } from './components/BackToTop';
import { LocalLandingPage, LocalPageKey } from './components/LocalLandingPage';
import { BlogList } from './components/BlogList';
import { BlogPostView } from './components/BlogPostView';

import { SEOHead } from './components/SEOHead';

import { galleryItems } from './data/gallery';
import { packagesData } from './data/packages';
import { testimonialsData } from './data/testimonials';
import { faqsData } from './data/faqs';
import { PackageTier } from './types';

export const getPathForRoute = (route: string, slug?: string): string => {
  switch (route) {
    case 'chennai':
      return '/wedding-photographer-chennai';
    case 'tiruvallur':
      return '/wedding-photographer-tiruvallur';
    case 'avadi':
      return '/wedding-photographer-avadi';
    case 'ambattur':
      return '/wedding-photographer-ambattur';
    case 'pre-wedding':
      return '/pre-wedding-shoot-chennai';
    case 'videography':
      return '/wedding-videography-chennai';
    case 'referral':
      return '/refer-and-earn';
    case 'blog':
      return '/blog';
    case 'blog-post':
      return `/blog-post?slug=${slug || 'how-to-choose-best-wedding-photographer-chennai'}`;
    case 'home':
    default:
      return '/';
  }
};

export const parseRouteFromLocation = (): { route: string; slug?: string } => {
  const path = window.location.pathname.replace(/^\/|\/$/g, '');
  if (path === 'pre-wedding-shoot-chennai') return { route: 'pre-wedding' };
  if (path === 'wedding-photographer-chennai') return { route: 'chennai' };
  if (path === 'wedding-photographer-ambattur') return { route: 'ambattur' };
  if (path === 'wedding-photographer-avadi') return { route: 'avadi' };
  if (path === 'wedding-photographer-tiruvallur') return { route: 'tiruvallur' };
  if (path === 'wedding-videography-chennai') return { route: 'videography' };
  if (path === 'refer-and-earn' || path === 'referral') return { route: 'referral' };
  if (path === 'blog') return { route: 'blog' };
  if (path === 'blog-post') {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug') || 'how-to-choose-best-wedding-photographer-chennai';
    return { route: 'blog-post', slug };
  }
  return { route: 'home' };
};

export const App: React.FC = () => {
  const initial = parseRouteFromLocation();
  const [currentRoute, setCurrentRoute] = useState<string>(initial.route);
  const [blogSlug, setBlogSlug] = useState<string>(initial.slug || 'how-to-choose-best-wedding-photographer-chennai');
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [enquirySession, setEnquirySession] = useState<string>('Wedding Photography');
  const [enquiryBudget, setEnquiryBudget] = useState<string>('');
  const [enquiryMessage, setEnquiryMessage] = useState<string>('');
  const [brochureOpen, setBrochureOpen] = useState<boolean>(false);
  const [callbackOpen, setCallbackOpen] = useState<boolean>(false);

  // Handle URL path on first load and browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      setCurrentRoute(parsed.route);
      if (parsed.slug) {
        setBlogSlug(parsed.slug);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cur || !ring) return;
    // No custom cursor / animation loop on touch devices (saves battery, avoids jank)
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let rx = 0;
    let ry = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      cur.style.left = `${e.clientX}px`;
      cur.style.top = `${e.clientY}px`;
      rx += (e.clientX - rx) * 0.13;
      ry += (e.clientY - ry) * 0.13;
    };

    const loop = () => {
      rx += (parseFloat(cur.style.left || '0') - rx) * 0.13;
      ry += (parseFloat(cur.style.top || '0') - ry) * 0.13;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Escape closes the brochure / callback pop-ups; page scroll is locked while one is open
  useEffect(() => {
    if (!brochureOpen && !callbackOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBrochureOpen(false);
        setCallbackOpen(false);
      }
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [brochureOpen, callbackOpen]);

  const scrollToElement = (id: string) => {
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setEnquirySession('Wedding Photography');
    setEnquiryBudget(pkg.price);
    setEnquiryMessage(`Interested in the ${pkg.name} package (${pkg.price}). Please verify date availability.`);
    scrollToElement('contact');
  };

  const handleCustomizePackage = (_pkg: PackageTier) => {
    scrollToElement('calculator');
  };

  const handleQuoteFromCalculator = (summaryText: string, estimatedTotal: number) => {
    setEnquirySession('Wedding Photography');
    setEnquiryBudget(`₹${estimatedTotal.toLocaleString('en-IN')}`);
    setEnquiryMessage(summaryText);
    scrollToElement('contact');
  };

  const handleCheckDate = (date: string, city: string, eventType: string) => {
    setEnquirySession(eventType);
    setEnquiryMessage(`Checking availability for Date: ${date} at Location: ${city} (${eventType}).`);
  };

  const handleNavigate = (route: string, anchor?: string, slug?: string) => {
    const nextSlug = slug || blogSlug;
    if (slug) {
      setBlogSlug(slug);
    }
    setCurrentRoute(route);

    // Synchronize browser URL bar and history without page reload
    const newPath = getPathForRoute(route, nextSlug);
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== newPath) {
      window.history.pushState(null, '', newPath);
    }

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic SEO, Canonical & Schema.org Structured Data */}
      <SEOHead currentRoute={currentRoute} blogSlug={blogSlug} />

      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Custom Cursor */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Top utility announcement */}
      <UtilityBar />

      {/* Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <div id="main-content" tabIndex={-1} aria-hidden="false" />

      {/* Home Route */}
      {currentRoute === 'home' && (
        <main>
          <Hero
            onScrollTo={scrollToElement}
            onOpenBrochure={() => setBrochureOpen(true)}
          />

          {/* Social Proof & Trust Guarantee Bar */}
          <TrustBar />

          {/* Quick Date Availability Checker Card */}
          <section className="date-checker-section">
            <DateCheckerWidget
              onCheckDate={handleCheckDate}
              onOpenCallback={() => setCallbackOpen(true)}
            />
          </section>

          <StoryBanner onScrollToContact={() => scrollToElement('contact')} />
          <Marquee />

          <CategoryBar
            onSelectCategory={(cat) => setGalleryCategory(cat)}
            onScrollTo={scrollToElement}
          />

          <Gallery
            items={galleryItems}
            selectedCategory={galleryCategory}
            onSelectCategory={setGalleryCategory}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />

          {/* In-depth Real Wedding Stories / Case Studies */}
          <WeddingStories
            onEnquireForSimilar={(couple) => {
              setEnquiryMessage(`I loved the wedding story of ${couple} and want similar coverage for my day.`);
              scrollToElement('contact');
            }}
          />

          {/* Interactive Lead Calculator */}
          <LeadCalculator onQuoteRequested={handleQuoteFromCalculator} />

          {/* Flagship Cinematic Films Showcase with interactive video player */}
          <Films onScrollToContact={() => scrollToElement('contact')} />

          <About onScrollToContact={() => scrollToElement('contact')} />

          {/* The Gear, The Craft & The Sacred Promise */}
          <CraftPromise
            onOpenCallback={() => setCallbackOpen(true)}
            onScrollToContact={() => scrollToElement('contact')}
          />

          <Packages
            packages={packagesData}
            onSelectPackage={handleSelectPackage}
            onCustomizePackage={handleCustomizePackage}
          />

          <Testimonials testimonials={testimonialsData} />

          <FAQ faqs={faqsData} />

          <Locations onSelectLocationPage={(page) => handleNavigate(page)} />

          <Journal
            onScrollTo={scrollToElement}
            onOpenBlog={() => handleNavigate('blog')}
          />

          {/* Clean Referral Program Banner inviting visitors to the dedicated tab */}
          <ReferralBanner onOpenReferralTab={() => handleNavigate('referral')} />

          <ContactForm
            initialSessionType={enquirySession}
            initialBudget={enquiryBudget}
            initialMessage={enquiryMessage}
          />
        </main>
      )}

      {/* Dedicated Separate Tab: Referral & Partner Program */}
      {currentRoute === 'referral' && (
        <main style={{ paddingTop: '20px' }}>
          <ReferralProgram
            isFullPage
            onBackToHome={() => handleNavigate('home')}
          />
          <ContactForm
            initialSessionType="Referral Partner Inquiry"
            initialMessage={enquiryMessage}
          />
        </main>
      )}

      {/* Local SEO Landing Pages */}
      {[
        'chennai',
        'pre-wedding',
        'videography',
        'ambattur',
        'avadi',
        'tiruvallur'
      ].includes(currentRoute) && (
        <>
          <LocalLandingPage
            pageKey={currentRoute as LocalPageKey}
            onBackToHome={() => handleNavigate('home')}
            onEnquireNow={() => scrollToElement('contact')}
            onNavigate={handleNavigate}
          />
          <ContactForm
            initialSessionType={currentRoute === 'pre-wedding' ? 'Pre-Wedding Shoot' : 'Wedding Photography'}
            initialMessage={enquiryMessage}
          />
        </>
      )}

      {/* Blog Listing Page */}
      {currentRoute === 'blog' && (
        <BlogList
          onBackToHome={() => handleNavigate('home')}
          onSelectPost={(slug) => {
            handleNavigate('blog-post', undefined, slug);
          }}
        />
      )}

      {/* Individual Blog Post Page */}
      {currentRoute === 'blog-post' && (
        <BlogPostView
          slug={blogSlug}
          onBackToBlog={() => handleNavigate('blog')}
          onSelectPost={(slug) => {
            handleNavigate('blog-post', undefined, slug);
          }}
          onEnquireNow={() => scrollToElement('contact')}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
        />
      )}

      {/* 2026 Wedding Brochure Modal (Lead Magnet) */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      {/* Fast 15-Minute Callback Modal */}
      <CallbackModal
        isOpen={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />

      {/* Mobile Sticky Rail */}
      <MobileActionRail onEnquireClick={() => scrollToElement('contact')} />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
};
export default App;
