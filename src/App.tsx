import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UtilityBar } from './components/UtilityBar';
import { Hero } from './components/Hero';
import { StoryBanner } from './components/StoryBanner';
import { Marquee } from './components/Marquee';
import { CategoryBar } from './components/CategoryBar';
import { Gallery } from './components/Gallery';
import { Lightbox } from './components/Lightbox';
import { About } from './components/About';
import { Packages } from './components/Packages';
import { Films } from './components/Films';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Locations } from './components/Locations';
import { Journal } from './components/Journal';
import { ContactForm } from './components/ContactForm';
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

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [blogSlug, setBlogSlug] = useState<string>('how-to-choose-best-wedding-photographer-chennai');
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [enquirySession, setEnquirySession] = useState<string>('');
  const [enquiryBudget, setEnquiryBudget] = useState<string>('');

  // Handle URL path on first load or browser navigation
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'pre-wedding-shoot-chennai') setCurrentRoute('pre-wedding');
    else if (path === 'wedding-photographer-chennai') setCurrentRoute('chennai');
    else if (path === 'wedding-photographer-ambattur') setCurrentRoute('ambattur');
    else if (path === 'wedding-photographer-avadi') setCurrentRoute('avadi');
    else if (path === 'wedding-photographer-tiruvallur') setCurrentRoute('tiruvallur');
    else if (path === 'wedding-videography-chennai') setCurrentRoute('videography');
    else if (path === 'blog') setCurrentRoute('blog');
    else if (path === 'blog-post') {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get('slug');
      if (slug) setBlogSlug(slug);
      setCurrentRoute('blog-post');
    }
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
      rx += ((parseFloat(cur.style.left || '0')) - rx) * 0.13;
      ry += ((parseFloat(cur.style.top || '0')) - ry) * 0.13;
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
    scrollToElement('contact');
  };

  const handleNavigate = (route: string, anchor?: string) => {
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

  return (
    <div className="app-container">
      {/* Custom Cursor */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Top utility announcement */}
      <UtilityBar />

      {/* Navbar */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Home Route */}
      {currentRoute === 'home' && (
        <main>
          <Hero onScrollTo={scrollToElement} />
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
          <Films onScrollToContact={() => scrollToElement('contact')} />
          <About onScrollToContact={() => scrollToElement('contact')} />
          <Packages packages={packagesData} onSelectPackage={handleSelectPackage} />
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
          />
        </>
      )}

      {/* Blog Listing Page */}
      {currentRoute === 'blog' && (
        <BlogList
          onBackToHome={() => handleNavigate('home')}
          onSelectPost={(slug) => {
            setBlogSlug(slug);
            setCurrentRoute('blog-post');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Individual Blog Post Page */}
      {currentRoute === 'blog-post' && (
        <BlogPostView
          slug={blogSlug}
          onBackToBlog={() => handleNavigate('blog')}
          onSelectPost={(slug) => {
            setBlogSlug(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
