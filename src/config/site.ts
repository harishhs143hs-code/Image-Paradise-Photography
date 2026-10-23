/**
 * Site configuration and SEO metadata registry for Image Paradise Photography
 * Primary Market: Chennai, Tiruvallur, Avadi, Ambattur, Kanchipuram and Tamil Nadu
 */

export const SITE_CONFIG = {
  name: 'Image Paradise Photography',
  alternateName: 'IMAGE PARADISE',
  domain: 'https://image-paradise-photography.vercel.app',
  director: 'Hariharan R',
  jobTitle: 'Creative Director',
  phone: '+91 7708510143',
  phoneDisplay: '+91 7708510143',
  email: 'imageparadise2020@gmail.com',
  address: {
    street: 'No. 2/670, Kudiyanvur Street 87',
    locality: 'Veppampattu',
    postalCode: '602024',
    region: 'Tamil Nadu',
    country: 'IN'
  },
  openingHours: 'Mo-Su 08:00-21:30',
  defaultOgImage: 'https://image-paradise-photography.vercel.app/og-image.png',
  social: {
    instagram: 'https://www.instagram.com/imageparadisephotography',
    facebook: 'https://www.facebook.com/imageparadisephotography',
    pinterest: 'https://in.pinterest.com/imageparadisephotography'
  }
};

export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  breadcrumbName: string;
}

export const ROUTE_SEO: Record<string, PageMetadata> = {
  home: {
    path: '/',
    title: 'Wedding Photographer Chennai | Image Paradise Photography',
    description:
      'Candid wedding photography and cinematic wedding films in Chennai and Tamil Nadu by Image Paradise Photography. Explore real weddings, packages, and date availability.',
    keywords:
      'wedding photographer chennai, candid wedding photography chennai, wedding videographer chennai, wedding photographer tiruvallur, wedding photographer avadi, wedding photographer ambattur, pre wedding shoot chennai, tamil wedding photography',
    ogImage: 'https://image-paradise-photography.vercel.app/og-image.png',
    breadcrumbName: 'Home'
  },
  chennai: {
    path: '/wedding-photographer-chennai',
    title: 'Wedding Photographer in Chennai | Image Paradise Photography',
    description:
      'Candid wedding photography and cinematic wedding films in Chennai by Image Paradise Photography. Explore real weddings, packages and availability.',
    keywords:
      'wedding photographer in chennai, best candid wedding photographer chennai, chennai wedding photography, muhurtham photography chennai',
    ogImage: 'https://image-paradise-photography.vercel.app/images/08-opt.jpg',
    breadcrumbName: 'Wedding Photographer Chennai'
  },
  tiruvallur: {
    path: '/wedding-photographer-tiruvallur',
    title: 'Wedding Photographer in Tiruvallur | Image Paradise Photography',
    description:
      'Candid and traditional wedding photography in Tiruvallur and surrounding areas by Image Paradise Photography. Book your date consultation.',
    keywords:
      'wedding photographer tiruvallur, wedding photography tiruvallur, wedding videographer tiruvallur, marriage photography tiruvallur',
    ogImage: 'https://image-paradise-photography.vercel.app/images/MPS_6098-opt.JPG',
    breadcrumbName: 'Wedding Photographer Tiruvallur'
  },
  avadi: {
    path: '/wedding-photographer-avadi',
    title: 'Wedding Photographer in Avadi | Image Paradise Photography',
    description:
      'Professional wedding photography, cinematic films, and bridal portraits in Avadi by Image Paradise Photography. Check package options and date availability.',
    keywords:
      'wedding photographer avadi, wedding photography avadi, poonamallee wedding photographer, candid photographer avadi',
    ogImage: 'https://image-paradise-photography.vercel.app/images/AR_02707-opt.JPG',
    breadcrumbName: 'Wedding Photographer Avadi'
  },
  ambattur: {
    path: '/wedding-photographer-ambattur',
    title: 'Wedding Photographer in Ambattur | Image Paradise Photography',
    description:
      'Exceptional candid wedding photography and cinematic videography in Ambattur by Image Paradise Photography. Discover our customized packages.',
    keywords:
      'wedding photographer ambattur, wedding photography ambattur, candid wedding photoshoot ambattur, mogappair wedding photographer',
    ogImage: 'https://image-paradise-photography.vercel.app/images/DSC06228-opt.JPG',
    breadcrumbName: 'Wedding Photographer Ambattur'
  },
  'pre-wedding': {
    path: '/pre-wedding-shoot-chennai',
    title: 'Pre-Wedding Shoot Chennai | Image Paradise Photography',
    description:
      'Scenic and editorial pre-wedding shoots across Chennai, ECR beaches, and heritage locations by Image Paradise Photography. Reserve your couple session.',
    keywords:
      'pre wedding shoot chennai, ecr pre wedding shoot, mahabalipuram photoshoot couple, outdoor pre wedding photography chennai',
    ogImage: 'https://image-paradise-photography.vercel.app/images/gallery1.jpeg',
    breadcrumbName: 'Pre-Wedding Shoot Chennai'
  },
  videography: {
    path: '/wedding-videography-chennai',
    title: 'Wedding Videography Chennai | Image Paradise Photography',
    description:
      '4K cinematic wedding films and emotional storytelling highlights in Chennai and Tamil Nadu by Image Paradise Photography. View our films.',
    keywords:
      'wedding videography chennai, cinematic wedding film chennai, 4k wedding video chennai, wedding teaser chennai',
    ogImage: 'https://image-paradise-photography.vercel.app/images/08.jpg',
    breadcrumbName: 'Wedding Videography Chennai'
  },
  blog: {
    path: '/blog',
    title: 'Wedding Photography Journal & Guides | Image Paradise Photography',
    description:
      'Expert wedding planning advice, Chennai mandapam guides, Muhurtham checklists, and pre-wedding shoot inspiration from Image Paradise Photography.',
    keywords:
      'wedding photography blog chennai, tamil wedding muhurtham checklist, chennai wedding venues guide, pre wedding locations chennai',
    ogImage: 'https://image-paradise-photography.vercel.app/og-image.png',
    breadcrumbName: 'Journal & Guides'
  },
  referral: {
    path: '/refer-and-earn',
    title: 'Refer & Earn Partner Program | Image Paradise Photography',
    description:
      'Recommend weddings to Image Paradise Photography and earn up to ₹5,000 cash via UPI or luxury parent keepsake albums. Sign up today.',
    keywords:
      'wedding photography referral program, refer and earn wedding chennai, image paradise partner program',
    ogImage: 'https://image-paradise-photography.vercel.app/og-image.png',
    breadcrumbName: 'Refer & Earn'
  }
};
