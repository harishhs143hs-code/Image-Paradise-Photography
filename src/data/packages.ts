import { PackageTier } from '../types';

export const packagesData: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹35,000',
    priceNum: 35000,
    icon: '◎',
    description: 'Ideal for intimate ceremonies, engagements & small family weddings',
    featured: false,
    features: [
      '4 Hours Dedicated Coverage',
      '1 Senior Candid Photographer + 1 Traditional Videographer',
      '200+ Color-Graded High-Resolution Photos',
      'Handcrafted Hardcover Keepsake Album (30 Pages)',
      '48-Hour Sneak Peek (30 Highlight Frames)',
      'Private Online Gallery with Full-Res Downloads'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹75,000',
    priceNum: 75000,
    icon: '✦',
    description: 'Our most loved complete full-day wedding experience across Chennai',
    featured: true,
    features: [
      '8 Hours Full-Day Coverage (Morning Muhurtham + Evening Reception)',
      '2 Senior Candid Photographers + 1 Cinematic Videographer',
      '400+ Color-Graded Photos + 3-4 Min 4K Highlight Film',
      '2 Premium Flush-Mount Archival Albums (Couple + Parents)',
      '48-Hour Sneak Peek Gallery for Instant Social Sharing',
      'Raw Footage & Permanent Cloud Archival Storage'
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury Signature',
    price: '₹1,50,000',
    priceNum: 150000,
    icon: '★',
    description: 'The pinnacle multi-day experience personally directed by Hariharan R',
    featured: false,
    features: [
      'Complete 2-Day Coverage (Vratham, Sangeet, Muhurtham & Reception)',
      '3 Candid Photographers + 2 Cinematographers + Aerial 4K Drone',
      'Complimentary Pre-Wedding or Post-Wedding Shoot (ECR Beach/Resort)',
      'Unlimited Curated Photos + 5-7 Min 4K Cinematic Film + Teaser Reel',
      '3 Luxury Handcrafted Italian Leather Lay-Flat Heirloom Albums',
      'Personally Directed on Location by Creative Director Hariharan R'
    ]
  }
];
