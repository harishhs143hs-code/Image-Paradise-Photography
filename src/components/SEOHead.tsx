import React, { useEffect } from 'react';
import { SITE_CONFIG, ROUTE_SEO, PageMetadata } from '../config/site';
import { fallbackBlogPosts } from '../data/blogs';
import { faqsData } from '../data/faqs';

interface SEOHeadProps {
  currentRoute: string;
  blogSlug?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentRoute, blogSlug }) => {
  let meta: PageMetadata;

  if (currentRoute === 'blog-post' && blogSlug) {
    const post = fallbackBlogPosts.find((p) => p.slug === blogSlug) || fallbackBlogPosts[0];
    meta = {
      path: `/blog-post?slug=${post.slug}`,
      title: `${post.title} | ${SITE_CONFIG.name}`,
      description: post.excerpt,
      keywords: post.tags.join(', '),
      ogImage: post.featuredImage.startsWith('http')
        ? post.featuredImage
        : `${SITE_CONFIG.domain}${post.featuredImage}`,
      breadcrumbName: post.title
    };
  } else {
    meta = ROUTE_SEO[currentRoute] || ROUTE_SEO.home;
  }

  const canonicalUrl = `${SITE_CONFIG.domain}${meta.path === '/' ? '/' : meta.path}`;
  const ogImageUrl = meta.ogImage || SITE_CONFIG.defaultOgImage;

  useEffect(() => {
    // 1. Update Document Title
    document.title = meta.title;

    // Helper to safely set or create a <meta> tag
    const setMetaTag = (attribute: 'name' | 'property', name: string, content: string) => {
      let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'title', meta.title);
    setMetaTag('name', 'description', meta.description);
    if (meta.keywords) {
      setMetaTag('name', 'keywords', meta.keywords);
    }

    // 3. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:type', currentRoute === 'blog-post' ? 'article' : 'website');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    setMetaTag('property', 'og:locale', 'en_IN');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // 6. JSON-LD Structured Data
    const structuredDataItems: Record<string, any>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.domain}/#website`,
        url: SITE_CONFIG.domain,
        name: SITE_CONFIG.name,
        publisher: {
          '@id': `${SITE_CONFIG.domain}/#localbusiness`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_CONFIG.domain}/#localbusiness`,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.alternateName,
        founder: {
          '@type': 'Person',
          name: SITE_CONFIG.director,
          jobTitle: SITE_CONFIG.jobTitle
        },
        description:
          'Wedding photographer in Chennai and Tamil Nadu specializing in candid wedding photography, cinematic videography, pre-wedding shoots, bridal portraits and handcrafted heirloom albums.',
        url: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/images/Logo.png`,
        image: `${SITE_CONFIG.domain}/images/08-opt.jpg`,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        priceRange: '₹₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.locality,
          postalCode: SITE_CONFIG.address.postalCode,
          addressRegion: SITE_CONFIG.address.region,
          addressCountry: SITE_CONFIG.address.country
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '21:30'
        },
        areaServed: [
          { '@type': 'City', name: 'Chennai' },
          { '@type': 'City', name: 'Veppampattu' },
          { '@type': 'City', name: 'Tiruvallur' },
          { '@type': 'City', name: 'Avadi' },
          { '@type': 'City', name: 'Ambattur' },
          { '@type': 'City', name: 'Kanchipuram' },
          { '@type': 'State', name: 'Tamil Nadu' }
        ],
        serviceType: [
          'Wedding Photography',
          'Candid Photography',
          'Wedding Videography',
          'Cinematic Wedding Films',
          'Pre-Wedding Photography',
          'Bridal Portraits',
          'Engagement Photography',
          'Heirloom Album Design'
        ],
        sameAs: [
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.pinterest
        ]
      }
    ];

    // BreadcrumbList Schema
    const breadcrumbList: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_CONFIG.domain}/`
        }
      ]
    };

    if (currentRoute !== 'home') {
      if (currentRoute === 'blog-post' && blogSlug) {
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          position: 2,
          name: 'Journal',
          item: `${SITE_CONFIG.domain}/blog`
        });
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          position: 3,
          name: meta.breadcrumbName,
          item: canonicalUrl
        });
      } else {
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          position: 2,
          name: meta.breadcrumbName,
          item: canonicalUrl
        });
      }
    }
    structuredDataItems.push(breadcrumbList);

    // FAQPage schema for home page
    if (currentRoute === 'home' && faqsData.length > 0) {
      structuredDataItems.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqsData.slice(0, 6).map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    // BlogPosting schema for individual article
    if (currentRoute === 'blog-post' && blogSlug) {
      const post = fallbackBlogPosts.find((p) => p.slug === blogSlug);
      if (post) {
        structuredDataItems.push({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: ogImageUrl,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: SITE_CONFIG.director
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_CONFIG.domain}/images/Logo.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
          }
        });
      }
    }

    // Inject or update JSON-LD script
    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(structuredDataItems, null, 2);
  }, [currentRoute, blogSlug, meta, canonicalUrl, ogImageUrl]);

  return null;
};

export default SEOHead;
