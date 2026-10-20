import { BlogPost } from '../types';

export const blogCategories = [
  { id: 'all', name: 'All Posts', slug: 'all' },
  { id: 'wedding-tips', name: 'Wedding Tips', slug: 'wedding-photography-tips' },
  { id: 'venues', name: 'Venues', slug: 'wedding-venues' },
  { id: 'pre-wedding', name: 'Pre-Wedding', slug: 'pre-wedding' },
  { id: 'bride-groom', name: 'Bride & Groom', slug: 'bride-groom-guide' }
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Choose the Best Wedding Photographer in Chennai (2026 Guide)',
    slug: 'how-to-choose-best-wedding-photographer-chennai',
    excerpt: 'Key factors every couple in Tamil Nadu must consider: style, portfolio consistency, delivery timelines, albums, and cultural rapport.',
    content: `
      <p>Planning a wedding in Chennai is a whirlwind of traditions, color, and heartfelt emotions. From the sacred rituals of the Muhurtham to the electric glamour of an evening reception, your photographs are the only tangible legacy that survives long after the flower garlands have faded.</p>
      
      <h2>1. Determine Your Preferred Photography Style</h2>
      <p>Before interviewing photographers, decide whether your heart lies with <strong>candid storytelling</strong>, traditional portraiture, or a balanced blend of both. Candid photography focuses on raw, unposed emotions—the bride's quiet smile during her bridal entry, a father's tearful blessing, or burst of laughter among cousins.</p>
      
      <h2>2. Look for Full Wedding Gallery Consistency</h2>
      <p>Anyone can capture 5 beautiful shots during golden hour. But can the team handle the challenging tungsten lighting in traditional mandapams? Ask to review a full wedding gallery delivered to a past client rather than just an Instagram highlight reel.</p>
      
      <h2>3. Understand Turnaround and Album Printing</h2>
      <p>At Image Paradise Photography, we pride ourselves on providing <em>same-day or 24–48 hour previews</em> so couples can share high-res frames with family while the celebration is still fresh. Full edited collections arrive within 4–6 weeks, followed by handcrafted archival flush-mount albums.</p>

      <h2>4. Chemistry and Rapport</h2>
      <p>Your photography team will spend more time with you on your wedding day than almost any other vendor. A calm, unobtrusive presence ensures you remain relaxed and present in the moment.</p>
    `,
    featuredImage: '/images/DSC06228-opt.JPG',
    category: 'Wedding Tips',
    categorySlug: 'wedding-photography-tips',
    publishedAt: '2026-02-15',
    readingTime: '5 min read',
    tags: ['Chennai Weddings', 'Candid Photography', 'Wedding Tips', 'Photography Guide']
  },
  {
    id: 'post-2',
    title: 'Top 7 Scenic Pre-Wedding Shoot Locations in and Around Chennai',
    slug: 'top-scenic-pre-wedding-shoot-locations-chennai',
    excerpt: 'From the golden beaches of ECR and heritage architecture of Mahabalipuram to lush botanical sanctuaries and modern studios.',
    content: `
      <p>A pre-wedding shoot is the perfect opportunity to shake off camera shyness, celebrate your relationship, and produce breathtaking portraits to display at your reception or wedding website.</p>
      
      <h2>1. Covelong & East Coast Road (ECR) Beaches</h2>
      <p>Sunrise on ECR offers soft pastel skies and golden waters with minimal crowds. Perfect for breezy flowy dresses and romantic coastal strolls.</p>

      <h2>2. Mahabalipuram Heritage Shore & Rock Reliefs</h2>
      <p>For timeless, majestic South Indian heritage portraits, the ancient monolithic rock sanctuaries and stone carvings in Mahabalipuram provide unparalleled architectural drama.</p>

      <h2>3. Semmozhi Poonga & Botanical Parks</h2>
      <p>If you adore verdant green canopies, bamboo groves, and lush tropical foliage in the heart of Chennai, a garden session provides natural elegance.</p>

      <h2>4. Besant Nagar & British Era Architecture</h2>
      <p>For couples seeking an intimate vintage aesthetic, quiet tree-lined avenues, cafe backdrops, and colonial architecture lend a sophisticated, editorial touch.</p>
    `,
    featuredImage: '/images/gallery1.jpeg',
    category: 'Pre-Wedding',
    categorySlug: 'pre-wedding',
    publishedAt: '2026-01-28',
    readingTime: '4 min read',
    tags: ['Pre-Wedding', 'Locations', 'ECR', 'Couples']
  },
  {
    id: 'post-3',
    title: 'The Ultimate Tamil Wedding Muhurtham Photography Checklist',
    slug: 'tamil-wedding-muhurtham-photography-checklist',
    excerpt: 'Essential moments you must capture during the Kasi Yatra, Oonjal, Kanyadaanam, Mangalyadharanam, and Saptapadi.',
    content: `
      <p>Tamil Brahmin and traditional South Indian weddings are packed with sacred rituals that move at a rapid pace. Here is how our team captures every crucial milestone without disrupting the sanctum of the ceremony.</p>

      <h2>The Key Milestones</h2>
      <ul>
        <li><strong>Kasi Yatra & Malai Maatral:</strong> The joyful garland exchange and friendly family banter.</li>
        <li><strong>Oonjal:</strong> The bride and groom seated on the decorated swing with celebratory singing and warding off evil eyes.</li>
        <li><strong>Kanyadaanam:</strong> The profound emotional handover and father-daughter bond.</li>
        <li><strong>Mangalyadharanam:</strong> The supreme moment the sacred Thali is tied amidst chanting and showering of akshatai.</li>
        <li><strong>Saptapadi & Pori Iduthal:</strong> The seven sacred steps around the holy Agni fire.</li>
      </ul>
      <p>Having two photographers ensures one focuses closely on the couple while the second captures the tearful smiles and blessings of grandparents and parents.</p>
    `,
    featuredImage: '/images/AR_02707-opt.JPG',
    category: 'Bride & Groom',
    categorySlug: 'bride-groom-guide',
    publishedAt: '2026-01-10',
    readingTime: '6 min read',
    tags: ['Muhurtham', 'Tamil Wedding', 'Rituals', 'Tradition']
  },
  {
    id: 'post-4',
    title: 'Top Wedding Venues and Mandapams in Chennai for 2026',
    slug: 'top-wedding-venues-mandapams-chennai-2026',
    excerpt: 'A photographer’s perspective on venues with outstanding natural light, spacious stage setups, and grand ambiance.',
    content: `
      <p>Selecting the right venue dictates not only your guest comfort but also the acoustic, aesthetic, and lighting possibilities of your wedding photography.</p>

      <h2>What Photographers Look For:</h2>
      <p>High ceilings, neutral-toned mandap backdrops, ample stage depth for prime lens work, and dedicated air-conditioned bridal preparation suites with plenty of soft window lighting.</p>
      
      <h2>Recommended Styles:</h2>
      <p>Whether you choose a grand beach resort along ECR or a traditional kalyana mandapam in Mylapore or T. Nagar, coordinating your floral colors and stage lighting with your photography team ensures stunning results.</p>
    `,
    featuredImage: '/images/08.jpg',
    category: 'Venues',
    categorySlug: 'wedding-venues',
    publishedAt: '2025-12-20',
    readingTime: '4 min read',
    tags: ['Venues', 'Mandapams', 'Chennai', 'Planning']
  }
];
