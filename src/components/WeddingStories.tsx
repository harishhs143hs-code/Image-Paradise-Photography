import React, { useState } from 'react';

interface WeddingStory {
  id: string;
  couple: string;
  venue: string;
  date: string;
  eventType: string;
  quote: string;
  leadImage: string;
  gallery: string[];
  summary: string;
  packageUsed: string;
}

const STORIES: WeddingStory[] = [
  {
    id: 'story-1',
    couple: 'Swathi & Karthik',
    venue: 'Mayor Ramanathan Chettiar Hall, MRC Nagar, Chennai',
    date: 'December 2024',
    eventType: 'Traditional Tamil Brahmin Wedding & Reception',
    quote: 'Image Paradise captured our wedding so naturally. We cry every time we open the album.',
    leadImage: '/images/DSC06228-opt.JPG',
    gallery: [
      '/images/DSC06228-opt.JPG',
      '/images/AR_02707-opt.JPG',
      '/images/DSC06422-opt.JPG',
      '/images/DSC09905-opt.JPG'
    ],
    summary:
      'A multi-event Tamil celebration featuring joyful Oonjal rituals, an emotional Kanyadaanam, and a glittering evening reception. 2 candid photographers and 1 cinematic videographer captured over 650 heirloom frames.',
    packageUsed: 'Premium Collection + 4K Highlight Film'
  },
  {
    id: 'story-2',
    couple: 'Divya & Ashwin',
    venue: 'Taj Fisherman’s Cove, ECR, Chennai',
    date: 'February 2025',
    eventType: 'Coastal Beachside Wedding & Reception',
    quote: 'The team was completely unobtrusive. Our guests were amazed at how effortless and warm they were.',
    leadImage: '/images/08.jpg',
    gallery: [
      '/images/08.jpg',
      '/images/DSC06422-opt.JPG',
      '/images/DSC07067-opt.JPG',
      '/images/DSC05261.webp'
    ],
    summary:
      'Set against the ocean breeze on East Coast Road. Drone aerials combined with candid sunset couple portraiture and a 3-minute highlight film scored to the couple’s favorite acoustic track.',
    packageUsed: 'Luxury Full-Day Coverage + Pre-Wedding Session'
  },
  {
    id: 'story-3',
    couple: 'Pooja & Vignesh',
    venue: 'Sri Raghavendra Kalyana Mandapam, Tiruvallur',
    date: 'January 2025',
    eventType: 'Muhurtham & Family Ceremony',
    quote: 'Delivered our preview within 24 hours while all the relatives were still at home!',
    leadImage: '/images/MPS_6098-opt.JPG',
    gallery: [
      '/images/MPS_6098-opt.JPG',
      '/images/DSC01915-opt.JPG',
      '/images/AR_02707-opt.JPG',
      '/images/DSC06228-opt.JPG'
    ],
    summary:
      'Focused on timeless ritual authenticity and intimate family portraits spanning three generations. Delivered with two archival parent flush-mount albums.',
    packageUsed: 'Essential Plus + Parent Heirloom Albums'
  }
];

interface WeddingStoriesProps {
  onEnquireForSimilar: (coupleStory: string) => void;
}

export const WeddingStories: React.FC<WeddingStoriesProps> = ({ onEnquireForSimilar }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const story = STORIES[activeStoryIndex];

  return (
    <section className="wedding-stories-section" id="stories" aria-labelledby="stories-title">
      <div className="wedding-stories-inner">
        <header className="sec-head">
          <div className="sec-badge">
            <img src="/images/Logo-opt.png" alt="" width={24} height={24} loading="lazy" />
            Real Love Stories
          </div>
          <h2 id="stories-title">
            Step inside our <em>featured</em> celebrations
          </h2>
          <p>
            Explore real wedding galleries from iconic Chennai mandapams, ECR beachside resorts, and Tiruvallur heritage halls.
          </p>
        </header>

        {/* Story Selector Tabs */}
        <div className="stories-tab-bar" role="tablist" aria-label="Select real wedding story">
          {STORIES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={idx === activeStoryIndex}
              className={`story-tab-btn ${idx === activeStoryIndex ? 'active' : ''}`}
              onClick={() => setActiveStoryIndex(idx)}
            >
              <strong>{s.couple}</strong>
              <small>{s.venue.split(',')[0]}</small>
            </button>
          ))}
        </div>

        {/* Active Story Spotlight */}
        <div className="story-spotlight-card">
          <div className="story-media-col">
            <div className="story-hero-frame">
              <img src={story.leadImage} alt={`${story.couple} Wedding`} />
            </div>
            <div className="story-thumbs-strip">
              {story.gallery.map((imgSrc, i) => (
                <div key={i} className="story-thumb-box">
                  <img src={imgSrc} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="story-content-col">
            <div className="story-kicker">{story.eventType}</div>
            <h3 className="story-couple-title">{story.couple}</h3>
            <div className="story-location-meta">
              📍 {story.venue} · {story.date}
            </div>

            <blockquote className="story-quote">
              "{story.quote}"
            </blockquote>

            <p className="story-summary-text">{story.summary}</p>

            <div className="story-package-tag">
              Package Selected: <strong>{story.packageUsed}</strong>
            </div>

            <div className="story-cta-row">
              <button
                type="button"
                className="btn-pink"
                onClick={() => onEnquireForSimilar(story.couple)}
              >
                Book Similar Coverage →
              </button>
              <a
                href={`https://wa.me/917708510143?text=${encodeURIComponent(
                  `Hi Image Paradise! I was viewing the wedding story of ${story.couple} at ${story.venue}. I love this style of photography and would like to check availability for my wedding.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="story-wa-link"
              >
                Discuss on WhatsApp 💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
