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
import { ReferralProgram } from './components/ReferralProgram';
import { ContactForm } from './components/ContactForm';
import { BrochureModal } from './components/BrochureModal';
import { CallbackModal } from './components/CallbackModal';
import { Footer } from './components/Footer';
import { MobileActionRail } from './components/MobileActionRail';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { BackToTop } from './components/BackToTop';
import { AiChat } from './components/AiChat';
import { LocalLandingPage, LocalPageKey } from './components/LocalLandingPage';
import { BlogList } from './components/BlogList';
import { BlogPostView } from './components/BlogPostView';

import { galleryItems } from './data/gallery';
import { packagesData } from './data/packages';
import { testimonialsData } from './data/testimonials';
import { faqsData } from './data/faqs';
import { PackageTier } from './types';

const PATH_BY_ROUTE: Record<string, string> = {
  home: '/',
  chennai: '/wedding-photographer-chennai',
  'pre-wedding': '/pre-wedding-shoot-chennai',
  videography: '/wedding-videography-chennai',
  ambattur: '/wedding-photographer-ambattur',
  avadi: '/wedding-photographer-avadi',
  tiruvallur: '/wedding-photographer-tiruvallur',
  blog: '/blog',
  referral: '/refer-and-earn'
};

const readLocationRoute = (): { route: string; slug?: string } => {
  const path = window.location.pathname.split('/').filter(Boolean).join('/');
  if (path === 'blog') return { route: 'blog' };
  if (path === 'refer-and-earn') return { route: 'referral' };
  if (path.startsWith('blog/')) return { route: 'blog-post', slug: decodeURIComponent(path.slice(5)) };
  if (path === 'blog-post') {
    const slug = new URLSearchParams(window.location.search).get('slug') || undefined;
    return { route: 'blog-post', slug };
  }
  const entry = Object.entries(PATH_BY_ROUTE).find(([, url]) => url.split('/').filter(Boolean).join('/') === path);
  return entry ? { route: entry[0] } : { route: 'home' };
};

const pathForRoute = (route: string, slug?: string): string => {
  if (route === 'blog-post') return slug ? '/blog/' + encodeURIComponent(slug) : '/blog';
  return PATH_BY_ROUTE[route] || '/';
};

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [blogSlug, setBlogSlug] = useState<string>('how-to-choose-best-wedding-photographer-chennai');
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [enquirySession, setEnquirySession] = useState<string>('Wedding Photography');
  const [enquiryBudget, setEnquiryBudget] = useState<string>('');
  const [enquiryMessage, setEnquiryMessage] = useState<string>('');
  const [brochureOpen, setBrochureOpen] = useState<boolean>(false);
  const [callbackOpen, setCallbackOpen] = useState<boolean>(false);

  // Keep direct links, in-app navigation and the browser back/forward buttons in sync.
  useEffect(() => {
    const syncRoute = () => {
      const current = readLocationRoute();
      setCurrentRoute(current.route);
      if (current.slug) setBlogSlug(current.slug);
    };
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cur || !ring) return;

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

  const scrollToElement = (id: string) => {
    if (currentRoute !== 'home') {
      handleNavigate('home');
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

  const handleCustomizePackage = (pkg: PackageTier) => {
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

  const handleNavigate = (route: string, anchor?: string) => {
    const nextPath = pathForRoute(route);
    if (window.location.pathname !== nextPath || window.location.search) {
      window.history.pushState({}, '', nextPath);
    }
    setCurrentRoute(route);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectBlogPost = (slug: string) => {
    const nextPath = pathForRoute('blog-post', slug);
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setBlogSlug(slug);
    setCurrentRoute('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
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

          <ContactForm
            initialSessionType={enquirySession}
            initialBudget={enquiryBudget}
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
          />
          <ContactForm
            initialSessionType={currentRoute === 'pre-wedding' ? 'Pre-Wedding Shoot' : 'Wedding Photography'}
            initialMessage={enquiryMessage}
          />
        </>
      )}

      {/* Standalone referral and business development program */}
      {currentRoute === 'referral' && <ReferralProgram />}

      {/* Blog Listing Page */}
      {currentRoute === 'blog' && (
        <BlogList
          onBackToHome={() => handleNavigate('home')}
          onSelectPost={handleSelectBlogPost}
        />
      )}

      {/* Individual Blog Post Page */}
      {currentRoute === 'blog-post' && (
        <BlogPostView
          slug={blogSlug}
          onBackToBlog={() => handleNavigate('blog')}
          onSelectPost={handleSelectBlogPost}
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

      {/* Image Paradise AI Assistant */}
      <AiChat />
    </div>
  );
};
export default App;
