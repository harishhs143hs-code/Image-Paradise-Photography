import React from 'react';

export type LocalPageKey =
  | 'chennai'
  | 'pre-wedding'
  | 'videography'
  | 'ambattur'
  | 'avadi'
  | 'tiruvallur';

interface LocalPageConfig {
  eyebrow: string;
  title: string;
  description: string;
  whatsappMessage: string;
  gridTitle: string;
  cards: { title: string; desc: string }[];
  sectionTitle: string;
  sectionCopy: string;
  bulletPoints: string[];
  ctaTitle: string;
  ctaCopy: string;
  ctaButtonText: string;
}

const PAGE_CONFIGS: Record<LocalPageKey, LocalPageConfig> = {
  chennai: {
    eyebrow: 'Chennai Wedding Photography',
    title: 'Wedding Photography in Chennai that feels like your story.',
    description:
      'Image Paradise Photography captures the emotion, people and atmosphere of your wedding through candid photography, traditional coverage and cinematic films.',
    whatsappMessage: 'Hi Image Paradise Photography, I would like to check availability for my wedding in Chennai.',
    gridTitle: 'A complete Chennai wedding photography experience',
    cards: [
      {
        title: 'Candid Photography',
        desc: 'Natural moments, reactions, family emotions and the small details that make your wedding yours.'
      },
      {
        title: 'Traditional Coverage',
        desc: 'Important rituals, family portraits and key ceremony moments photographed with care and clarity.'
      },
      {
        title: 'Cinematic Films',
        desc: 'Wedding films and highlights designed to bring the energy and emotion of the day back to life.'
      }
    ],
    sectionTitle: 'Why couples choose a local Chennai team',
    sectionCopy:
      'Your photographer should understand the rhythm of Tamil weddings, ceremony timelines, family groupings and the realities of Chennai venues. We plan coverage around your actual event schedule rather than forcing every wedding into the same formula.',
    bulletPoints: [
      'Coverage planned around your ceremony and reception timings.',
      'Photography and videography options that can be combined around your needs.',
      'Pre-wedding and engagement coverage available.',
      'Service across Chennai and nearby areas including Tiruvallur, Avadi and Ambattur.'
    ],
    ctaTitle: 'Planning your wedding in Chennai?',
    ctaCopy: 'Send your date, venue and the events you need covered. We will help you choose the right coverage.',
    ctaButtonText: 'Start Your Enquiry'
  },
  'pre-wedding': {
    eyebrow: 'Pre-Wedding Photography Chennai',
    title: 'A pre-wedding story that actually feels like you.',
    description:
      'Choose a location, mood and concept that fit your relationship. We create relaxed couple portraits, candid frames and optional cinematic films across Chennai and nearby locations.',
    whatsappMessage: 'Hi Image Paradise, I want to plan a pre-wedding shoot in Chennai. Preferred date: Location:',
    gridTitle: 'Build the shoot around your personality',
    cards: [
      {
        title: 'Location',
        desc: 'Share the kind of setting you like—beach, city, greenery, heritage, cafe or a more editorial setup.'
      },
      {
        title: 'Style',
        desc: 'We can plan a natural candid session, classic portraits, fashion-inspired frames or a mix.'
      },
      {
        title: 'Film',
        desc: 'Add cinematic moving images when you want your pre-wedding story to feel more like a short film.'
      }
    ],
    sectionTitle: 'What to send us',
    sectionCopy:
      'When planning your pre-wedding session with our team, sharing a few initial preferences helps us design a bespoke concept and scout the ideal lighting and timing.',
    bulletPoints: [
      'Preferred date or date range',
      'Preferred location or the type of location you want (ECR beach, heritage, studio, cafe)',
      'How many hours you want to shoot',
      'Whether you need photography, video or both',
      'Your preferred overall style (relaxed casual, traditional, or editorial glamour)'
    ],
    ctaTitle: "Let's create your concept",
    ctaCopy: 'Tell us what you have in mind and we will take it from there.',
    ctaButtonText: 'Message on WhatsApp'
  },
  videography: {
    eyebrow: 'Wedding Videography Chennai',
    title: 'Turn your wedding day into a film you will want to watch again.',
    description:
      'Our wedding videography approach focuses on real emotion, movement, atmosphere and the people who made your day memorable—from the first preparations to the reception.',
    whatsappMessage: 'Hi Image Paradise, I want cinematic wedding videography in Chennai. Date: Venue:',
    gridTitle: 'Wedding films built around your celebration',
    cards: [
      {
        title: 'Full-Day Coverage',
        desc: 'Capture the important parts of the wedding day from preparations through the main events and reception.'
      },
      {
        title: 'Highlight Film',
        desc: 'A concise cinematic edit designed to bring back the feeling, energy and emotion of your celebration.'
      },
      {
        title: 'Photo + Film',
        desc: 'Combine photography and videography so your memories are preserved as both still images and moving stories.'
      }
    ],
    sectionTitle: 'Before we quote your coverage',
    sectionCopy:
      'We prefer to understand the actual wedding schedule first. Send your date, venue and events such as mehendi, engagement, muhurtham, reception or other functions. We can then suggest coverage that fits the day.',
    bulletPoints: [
      'Multi-camera 4K cinematography with gimbal stabilization and drone options.',
      'Crystal-clear audio capture of vows, mantras, laughter, and family speeches.',
      'Colour graded with our signature warm, cinematic color palette.',
      'Teaser reel delivered within days, full feature wedding film in high resolution.'
    ],
    ctaTitle: "Let's plan your wedding film",
    ctaCopy: 'Share the basics on WhatsApp and we will continue from there.',
    ctaButtonText: 'Start Film Enquiry'
  },
  ambattur: {
    eyebrow: 'Ambattur Wedding Photography',
    title: 'Beautifully documented weddings for couples in Ambattur.',
    description:
      'Image Paradise Photography combines candid storytelling with essential traditional coverage, couple portraits and cinematic wedding films for weddings and receptions in Ambattur.',
    whatsappMessage: 'Hi Image Paradise, please check my Ambattur wedding date. Date: Venue:',
    gridTitle: 'Choose coverage around your day',
    cards: [
      {
        title: 'Wedding Day',
        desc: 'Coverage for ceremonies, rituals, couple portraits, family groups and reception moments.'
      },
      {
        title: 'Candid Story',
        desc: 'Unposed moments and emotional details that give your gallery a natural narrative.'
      },
      {
        title: 'Wedding Film',
        desc: 'Cinematic highlights that preserve the feeling and energy of the celebration.'
      }
    ],
    sectionTitle: 'A simple enquiry process',
    sectionCopy:
      'We make booking your Ambattur wedding stress-free. Whether your celebration is in a local hall, mandapam, or outdoor resort, we are on site with full technical redundancy.',
    bulletPoints: [
      'Send your date and Ambattur venue.',
      'Tell us which events need coverage (engagement, muhurtham, reception).',
      'We recommend a suitable photography/videography combination.',
      'Confirm the package and reserve the date.'
    ],
    ctaTitle: 'Planning your Ambattur wedding?',
    ctaCopy: 'Start with a quick WhatsApp enquiry or date check.',
    ctaButtonText: 'Check Ambattur Availability'
  },
  avadi: {
    eyebrow: 'Avadi Wedding Photography',
    title: 'Your Avadi wedding, photographed with emotion and intention.',
    description:
      'Candid moments, traditional rituals, couple portraits and cinematic films—planned around your actual wedding schedule rather than a one-size-fits-all package.',
    whatsappMessage: 'Hi Image Paradise, please check my Avadi wedding date. Date: Venue:',
    gridTitle: 'Photography for every part of the celebration',
    cards: [
      {
        title: 'Candid',
        desc: 'Real expressions, family interactions and spontaneous moments without making the day feel staged.'
      },
      {
        title: 'Traditional',
        desc: 'Important rituals, relatives, group portraits and ceremony details documented clearly.'
      },
      {
        title: 'Cinematic',
        desc: 'Wedding films and highlight edits that preserve the sound, movement and emotion of your celebration.'
      }
    ],
    sectionTitle: 'Planning an Avadi wedding?',
    sectionCopy:
      'Share your wedding date, venue and events. We can help you decide how many hours and which combination of photography and videography makes sense for your celebration.',
    bulletPoints: [
      'Engagement and pre-wedding photography across Avadi and Chennai.',
      'Muhurtham and reception coverage with full family portraits.',
      'Candid and documentary wedding photography.',
      'Wedding videography and cinematic highlights.'
    ],
    ctaTitle: "Let's check your date",
    ctaCopy: 'Send your details on WhatsApp and start the conversation.',
    ctaButtonText: 'Enquire on WhatsApp'
  },
  tiruvallur: {
    eyebrow: 'Tiruvallur Wedding Photography',
    title: 'Wedding photographs that preserve the people, rituals and emotions of your Tiruvallur celebration.',
    description:
      'From intimate family functions to full-day weddings and receptions, Image Paradise Photography provides candid, traditional and cinematic coverage planned around your event.',
    whatsappMessage: 'Hi Image Paradise, I want to check availability for my Tiruvallur wedding. Date: Venue:',
    gridTitle: 'Coverage for the moments that matter',
    cards: [
      {
        title: 'Muhurtham & Rituals',
        desc: 'Focused coverage of ceremony details, family interactions and important traditions.'
      },
      {
        title: 'Reception',
        desc: 'Couple portraits, family groups, stage moments, guests and the atmosphere of your reception.'
      },
      {
        title: 'Candid + Film',
        desc: 'Natural expressions and cinematic storytelling for couples who want more than posed pictures.'
      }
    ],
    sectionTitle: 'Serving Tiruvallur and nearby areas',
    sectionCopy:
      'We can plan coverage for weddings across Tiruvallur and nearby Chennai-side locations. Share your venue and schedule so we can recommend the right team and hours.',
    bulletPoints: [
      'Engagement and pre-wedding sessions in Tiruvallur and Chennai.',
      'Wedding and reception photography with same-day previews.',
      'Traditional and candid coverage with seasoned lead photographers.',
      'Cinematic wedding videography and highlight reels.',
      'Handcrafted premium album design and home delivery.'
    ],
    ctaTitle: 'Have a Tiruvallur wedding date?',
    ctaCopy: 'Send your date, venue and events on WhatsApp for availability and package guidance.',
    ctaButtonText: 'Send Wedding Details'
  }
};

interface LocalLandingPageProps {
  pageKey: LocalPageKey;
  onBackToHome: () => void;
  onEnquireNow: () => void;
}

export const LocalLandingPage: React.FC<LocalLandingPageProps> = ({
  pageKey,
  onBackToHome,
  onEnquireNow
}) => {
  const config = PAGE_CONFIGS[pageKey] || PAGE_CONFIGS.chennai;
  const whatsappUrl = `https://wa.me/917708510143?text=${encodeURIComponent(config.whatsappMessage)}`;

  return (
    <main style={{ minHeight: '80vh', paddingTop: '80px', background: '#fff' }}>
      <section
        style={{
          padding: '72px 7% 54px',
          background: 'linear-gradient(135deg, #fff, #fff4f7)',
          borderBottom: '1px solid #f0e6eb'
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onBackToHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--pk)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Back to Main Studio
            </button>
          </div>
          <div
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#d8225f',
              fontWeight: 700,
              fontSize: '13px',
              marginBottom: '12px'
            }}
          >
            {config.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(36px, 6vw, 68px)',
              lineHeight: 1.08,
              maxWidth: '850px',
              color: '#181418',
              margin: '0 0 20px'
            }}
          >
            {config.title}
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              maxWidth: '780px',
              color: '#5f575d',
              marginBottom: '28px'
            }}
          >
            {config.description}
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                display: 'inline-block',
                background: '#d8225f',
                color: '#fff',
                padding: '14px 24px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px'
              }}
            >
              Check Availability on WhatsApp
            </a>
            <button
              type="button"
              onClick={onEnquireNow}
              style={{
                display: 'inline-block',
                padding: '13px 22px',
                border: '1px solid #ddd',
                borderRadius: '999px',
                background: '#fff',
                color: '#181418',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 7%' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 38px)',
              marginBottom: '32px',
              color: '#191519'
            }}
          >
            {config.gridTitle}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {config.cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  padding: '28px',
                  border: '1px solid #eee',
                  borderRadius: '20px',
                  background: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '22px',
                    marginBottom: '12px',
                    color: '#191519'
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: '#5d565c', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 7% 70px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 36px)',
              marginBottom: '16px',
              color: '#191519'
            }}
          >
            {config.sectionTitle}
          </h2>
          <p style={{ color: '#5d565c', fontSize: '17px', lineHeight: 1.8, marginBottom: '20px', maxWidth: '850px' }}>
            {config.sectionCopy}
          </p>
          <ul style={{ paddingLeft: '24px', color: '#5d565c', fontSize: '16px', lineHeight: 1.9, marginBottom: '36px' }}>
            {config.bulletPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          <div
            style={{
              padding: '18px 24px',
              background: '#faf8f9',
              border: '1px solid rgba(216, 27, 96, 0.15)',
              borderRadius: '16px',
              margin: '28px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <strong style={{ color: '#181418', fontSize: '14px' }}>
              IMAGE PARADISE · Creative Director: Hariharan R
            </strong>
            <span style={{ color: '#666', fontSize: '13px' }}>
              Studio: No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu · Direct Helpline: <a href="tel:+917708510143" style={{ color: '#d8225f', fontWeight: 600 }}>+91 7708510143</a>
            </span>
          </div>

          <div
            style={{
              background: '#191519',
              color: '#fff',
              borderRadius: '24px',
              padding: '40px',
              marginTop: '20px'
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(26px, 3.5vw, 34px)',
                color: '#fff',
                marginBottom: '12px'
              }}
            >
              {config.ctaTitle}
            </h2>
            <p style={{ color: '#ddd', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '650px' }}>
              {config.ctaCopy}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#d8225f',
                color: '#fff',
                padding: '14px 26px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px'
              }}
            >
              {config.ctaButtonText} →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
