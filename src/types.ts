export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: 'wedding' | 'portrait' | 'engagement' | 'family';
  layoutClass?: 'g-tall' | 'g-wide' | '';
  width: number;
  height: number;
}

export interface PackageTier {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  icon: string;
  description: string;
  featured?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  names: string;
  event: string;
  quote: string;
  rating: number;
  avatarBg: string;
  initials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  readingTime?: string;
  tags: string[];
}

export interface EnquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sessionType: string;
  eventDate: string;
  budget: string;
  message: string;
}
