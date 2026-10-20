import { PackageTier } from '../types';

export const packagesData: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹35,000',
    priceNum: 35000,
    icon: '◎',
    description: 'Perfect for intimate ceremonies and small celebrations',
    featured: false,
    features: [
      '4 hours of coverage',
      '1 photographer',
      '1 Videographer',
      '200+ Photos with printed album',
      'Private online gallery',
      'Digital downloads'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹75,000',
    priceNum: 75000,
    icon: '✦',
    description: 'Our most loved full wedding day package',
    featured: true,
    features: [
      '8 hours of coverage',
      '2 photographers',
      '1 Videographer',
      '400+ Photos with printed album',
      'Private online gallery',
      'Digital downloads',
      '2 premium printed albums',
      '3-min highlight video'
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: '₹1,50,000',
    priceNum: 150000,
    icon: '★',
    description: 'The complete experience for your most precious day',
    featured: false,
    features: [
      'Full day coverage',
      '2 photographers + assistant',
      '2 Videographers',
      'Unlimited Photos with printed album',
      'Private online gallery',
      'Digital downloads',
      'Post-Wedding shoot',
      'Pre-Wedding shoot',
      '3-min highlight video'
    ]
  }
];
