import { defineConfig } from 'vite';

const SITE = 'https://image-paradise-photography.vercel.app';
const BRAND = 'Image Paradise Photography';

function seoSchemaPlugin() {
  return {
    name: 'image-paradise-seo-schema',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      let output = html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

      // Remove unverified legacy social-profile anchors if present.
      output = output.replace(/<a\b[^>]*href=["']https?:\/\/(?:www\.)?facebook\.com\/imageparadisephotography[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');
      output = output.replace(/<a\b[^>]*href=["']https?:\/\/(?:in\.)?pinterest\.com\/imageparadisephotography[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

      const rawPath = (ctx.path || '/').replace(/\.html$/, '');
      const pagePath = rawPath === '/index' || rawPath === '' ? '/' : rawPath;
      const titleMatch = output.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const imageMatch = output.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["'][^>]*>/i);
      const title = titleMatch ? titleMatch[1].trim() : BRAND;
      const image = imageMatch ? imageMatch[1] : `${SITE}/og-image.png`;
      const schemas = [];

      if (pagePath === '/') {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${SITE}/#localbusiness`,
          name: BRAND,
          description: 'Wedding photography, candid photography, wedding videography, pre-wedding photography, bridal portraits and album design.',
          url: `${SITE}/`,
          logo: `${SITE}/images/Logo.png`,
          image: `${SITE}/og-image.png`,
          telephone: '+91-7708510143',
          email: 'imageparadise2020@gmail.com',
          priceRange: '₹₹₹',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chennai',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'IN'
          },
          areaServed: [
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'City', name: 'Tiruvallur' },
            { '@type': 'City', name: 'Avadi' },
            { '@type': 'City', name: 'Ambattur' },
            { '@type': 'State', name: 'Tamil Nadu' }
          ],
          serviceType: [
            'Wedding Photography',
            'Candid Photography',
            'Wedding Videography',
            'Pre-Wedding Photography',
            'Bridal Portraits',
            'Engagement Photography',
            'Album Design'
          ],
          sameAs: ['https://www.instagram.com/imageparadisephotography']
        });

        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE}/#organization`,
          name: BRAND,
          url: `${SITE}/`,
          logo: `${SITE}/images/Logo.png`
        });

        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          name: BRAND,
          url: `${SITE}/`
        });
      } else if (pagePath !== '/404') {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${SITE}${pagePath}#article`,
          headline: title,
          image: [image],
          author: { '@type': 'Organization', name: BRAND, url: `${SITE}/` },
          publisher: {
            '@type': 'Organization',
            name: BRAND,
            logo: { '@type': 'ImageObject', url: `${SITE}/images/Logo.png` }
          },
          mainEntityOfPage: `${SITE}${pagePath}`
        });
      }

      if (pagePath !== '/' && pagePath !== '/404') {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: title.replace(/\s*\|.*$/, '').trim(), item: `${SITE}${pagePath}` }
          ]
        });
      }

      const jsonLd = schemas
        .map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
        .join('\n');

      return output.replace('</head>', `${jsonLd}\n</head>`);
    }
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [seoSchemaPlugin()],
  server: {
    port: 9091,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: 9091,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        notFound: '404.html',
        blog: 'blog.html',
        blogPost: 'blog-post.html',
        preWedding: 'pre-wedding-shoot-chennai.html',
        chennai: 'wedding-photographer-chennai.html',
        ambattur: 'wedding-photographer-ambattur.html',
        avadi: 'wedding-photographer-avadi.html',
        tiruvallur: 'wedding-photographer-tiruvallur.html',
        videography: 'wedding-videography-chennai.html',
      },
    },
  },
});
