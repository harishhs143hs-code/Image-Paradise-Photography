from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('Chennai, Tamil Nadu, India', 'No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024')
s = re.sub(r'<label>Email</label>\s*<p>[^<]*</p>', '<label>WhatsApp</label><p>+91 77085 10143</p>', s, count=1, flags=re.I)
s = re.sub(r'<div class="ci-icon">✉</div>', '<div class="ci-icon">💬</div>', s, count=1)
s = re.sub(r'<a[^>]*href=["\']mailto:[^"\']*["\'][^>]*>.*?</a>', '', s, flags=re.I|re.S)
s = re.sub(r'<div class="soc-row">.*?</div>', '''<div class="soc-row">
        <a href="https://www.instagram.com/image_paradise_photography/" class="soc">Instagram</a>
        <a href="https://www.linkedin.com/company/image-paradise/" class="soc">LinkedIn</a>
        <a href="https://www.youtube.com/@imageparadisephotography6251" class="soc">YouTube</a>
      </div>''', s, count=1, flags=re.S)
s = re.sub(r'<a[^>]*>Pinterest</a>', '', s, flags=re.I)
s = s.replace('<div><strong>5.0</strong><span>Google Reviews</span></div>', '<div><strong>Client</strong><span>Reviews &amp; feedback</span></div>')
s = re.sub(r'imageparadise2020@gmail\.com', '', s, flags=re.I)
s = s.replace('Chennai · Available across India &amp; Beyond.', 'Chennai · Tiruvallur · Avadi · Ambattur.')

preview_replacements = {
    'images/gallery2.jpg': 'images/DSC06228-opt.JPG',
    'images/gallery1.jpg': 'images/DSC09905-opt.JPG',
    'images/gallery5.jpg': 'images/MPS_6098-opt.JPG',
    'images/gallery6.jpg': 'images/AR_02707-opt.JPG',
}
for old, new in preview_replacements.items():
    s = s.replace(old, new)

# Add a crawlable, human-readable AEO/GEO content layer. It is intentionally concise,
# locally specific and linked to the site's service/location pages.
seo_block = '''
<section class="ai-seo-content" aria-label="Wedding photography information">
  <div class="ai-seo-inner">
    <p class="ai-eyebrow">IMAGE PARADISE PHOTOGRAPHY · CHENNAI</p>
    <h1>Wedding Photographer in Chennai for Candid, Traditional &amp; Cinematic Wedding Stories</h1>
    <p class="ai-direct-answer"><strong>Image Paradise Photography is a wedding photography and videography service based in Veppampattu near Avadi, serving Chennai, Tiruvallur and Ambattur.</strong> We photograph weddings, engagements, pre-wedding sessions and family celebrations with candid, traditional and cinematic coverage. Couples can enquire on WhatsApp, discuss their event date and location, and choose coverage based on the size and style of their celebration.</p>

    <h2>What wedding photography services do we offer?</h2>
    <p>Our core services include candid wedding photography, traditional wedding photography, wedding videography, bridal portraits, engagement photography, pre-wedding photography and wedding album design. Coverage can be planned for intimate ceremonies, full wedding days or multi-event celebrations.</p>
    <ul>
      <li><a href="/wedding-photographer-chennai">Wedding photography in Chennai</a> for candid and traditional celebrations.</li>
      <li><a href="/wedding-photographer-avadi">Wedding photography in Avadi</a> and nearby western Chennai areas.</li>
      <li><a href="/wedding-photographer-tiruvallur.html">Wedding photography in Tiruvallur</a> and surrounding towns.</li>
      <li><a href="/wedding-photographer-ambattur.html">Wedding photography in Ambattur</a> for weddings and engagements.</li>
      <li><a href="/wedding-videography-chennai">Wedding videography in Chennai</a> with cinematic highlight coverage.</li>
      <li><a href="/pre-wedding-shoot-chennai.html">Pre-wedding photography in Chennai</a> with location and concept planning.</li>
    </ul>

    <h2>How much does wedding photography cost in Chennai?</h2>
    <p>Our published package examples start at <strong>₹35,000</strong> for essential coverage, with a <strong>₹75,000</strong> premium example and a <strong>₹1,50,000</strong> luxury example. Final pricing depends on coverage hours, number of photographers and videographers, album requirements, travel and additional events, so the final quote is confirmed after discussing the wedding plan.</p>
    <ul>
      <li><strong>Essential:</strong> example package at ₹35,000 for shorter coverage.</li>
      <li><strong>Premium:</strong> example package at ₹75,000 with broader photo/video coverage.</li>
      <li><strong>Luxury:</strong> example package at ₹1,50,000 for full-day and expanded coverage.</li>
    </ul>

    <h2>How does the wedding photography booking process work?</h2>
    <ol>
      <li>Share your name, mobile number, event date, location and event type on WhatsApp.</li>
      <li>Discuss the coverage, photography style, video requirements and album needs.</li>
      <li>Receive a package recommendation and final quotation based on your event.</li>
      <li>Confirm availability and booking details for your wedding date.</li>
    </ol>

    <h2>Why choose a local wedding photographer in Chennai?</h2>
    <p>A local photography team can plan around Chennai and Tiruvallur venues, travel times and common wedding schedules. Image Paradise Photography is based in Veppampattu and serves Chennai, Tiruvallur, Avadi, Ambattur and other Tamil Nadu locations, with destination coverage available by prior arrangement.</p>

    <h2>What makes candid wedding photography different?</h2>
    <p>Candid wedding photography focuses on genuine moments rather than only posed portraits. The approach records reactions, family interactions, rituals, laughter and quiet emotional moments as they happen, while traditional portraits can be planned around the couple, family and ceremony.</p>

    <h2>How quickly are wedding photos delivered?</h2>
    <p>The published service information states that preview selections can be provided within 24–48 hours, while full edited galleries are typically delivered within 4–6 weeks. Album design and printing can require additional time depending on the selected album and approval process.</p>

    <p class="ai-takeaway"><strong>Planning a wedding in Chennai, Avadi or Tiruvallur?</strong> Start by sharing your event date and location on WhatsApp so the team can check availability and recommend suitable photography and videography coverage.</p>
  </div>
</section>
'''
# Keep the visual homepage first and give the page a semantic main landmark.
if '<main id="main-content">' not in s:
    navbar_start = s.find('<header class="navbar">')
    navbar_end = s.find('</header>', navbar_start)
    footer_start = s.find('<footer>')
    if navbar_start >= 0 and navbar_end > navbar_start and footer_start > navbar_end:
        after_nav = navbar_end + len('</header>')
        s = s[:after_nav] + '\n<main id="main-content">' + s[after_nav:footer_start] + '\n</main>\n' + s[footer_start:]

if 'class="ai-seo-content"' not in s:
    if '</main>' in s:
        s = s.replace('</main>', seo_block + '\n</main>', 1)
    else:
        s = s.replace('</body>', seo_block + '\n</body>', 1)

# Remove reveal attributes from above-the-fold hero content so the H1 is not hidden while JS loads.
hero_start = s.find('<section id="hero"')
hero_end = s.find('<!-- MARQUEE -->', hero_start)
if hero_start >= 0 and hero_end > hero_start:
    hero = s[hero_start:hero_end]
    hero = re.sub(r'\s+data-reveal=["\'][^"\']*["\']', '', hero)
    hero = re.sub(r'\s+data-delay=["\']\d+["\']', '', hero)
    s = s[:hero_start] + hero + s[hero_end:]

# Update the homepage snippet and point social previews at a real image asset.
s = s.replace('<title>Wedding Photographer in Chennai | Image Paradise</title>', '<title>Wedding Photographer Chennai | Image Paradise Photography</title>')
s = s.replace('content="Wedding Photographer in Chennai | Image Paradise"', 'content="Wedding Photographer Chennai | Image Paradise Photography"')
s = s.replace('Wedding photography and videography near Avadi, Chennai and across Tiruvallur. Explore candid photography, packages, pre-wedding shoots and WhatsApp booking.', 'Wedding photography in Chennai, Avadi and Tiruvallur. Explore candid photos, videography packages and book on WhatsApp.')
s = s.replace('https://www.imageparadisephotography.online/og-image.png', 'https://www.imageparadisephotography.online/images/08.jpg')
s = re.sub(r'\s*"https://www\.facebook\.com/imageparadisephotography",?', '', s)

# Remove the unconfigured Meta Pixel loader: it fetched a third-party script without a configured ID.
pixel_marker = '<!-- Meta Pixel - Add your Pixel ID -->'
if pixel_marker in s:
    pixel_start = s.index(pixel_marker)
    pixel_script_start = s.find('<script>', pixel_start)
    pixel_script_end = s.find('</script>', pixel_script_start)
    if pixel_script_start >= 0 and pixel_script_end >= 0:
        s = s[:pixel_start] + s[pixel_script_end + len('</script>'):]

# Add useful standard pages to the homepage footer.
old_copy = '<p>&copy; 2026 Image Paradise Photography · Chennai, India · All rights reserved</p>'
new_copy = '<p>&copy; 2026 Image Paradise Photography · Chennai, India · All rights reserved <span class="footer-legal-links"><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/packages.html">Packages</a><a href="/privacy-policy.html">Privacy</a><a href="/sitemap.xml">Sitemap</a></span></p>'
s = s.replace(old_copy, new_copy)

# Keep this section's CSS external so it does not add another inline style block.
seo_css = '''
.ai-seo-content{background:#fff;color:#1b1b1b;padding:52px 20px}
.ai-seo-inner{max-width:1080px;margin:0 auto}
.ai-seo-content h2{font-family:Georgia,serif;font-size:clamp(23px,3vw,34px);line-height:1.2;margin:38px 0 12px}
.ai-seo-content p,.ai-seo-content li{font-size:17px;line-height:1.75}
.ai-seo-content ul,.ai-seo-content ol{padding-left:26px}
.ai-seo-content a{text-decoration:underline;text-underline-offset:3px}
.ai-eyebrow{font-size:12px!important;letter-spacing:.16em;text-transform:uppercase;font-weight:700}
.ai-direct-answer{font-size:19px!important;max-width:950px}
.ai-takeaway{margin-top:34px;padding:20px 22px;border-left:4px solid currentColor}
.ai-seo-content strong{font-weight:700}
@media(max-width:768px){.ai-seo-content{padding:34px 18px}.ai-seo-content p,.ai-seo-content li{font-size:16px;line-height:1.65}.ai-direct-answer{font-size:18px!important}}
'''
seo_css_path = Path('geo-homepage.css')
seo_css_existing = seo_css_path.read_text(encoding='utf-8')
if '.ai-seo-content{' not in seo_css_existing and '.ai-seo-content {' not in seo_css_existing:
    seo_css_path.write_text(seo_css_existing + '\n' + seo_css + '\n', encoding='utf-8')

# Add HowTo schema for the booking workflow if it is not already present.
howto = '''\n<script id="geo-howto-schema" type="application/ld+json">\n{\n  "@context":"https://schema.org",\n  "@type":"HowTo",\n  "name":"How to book wedding photography with Image Paradise Photography",\n  "description":"Four simple steps to enquire about wedding photography and videography in Chennai, Avadi or Tiruvallur.",\n  "step":[\n    {"@type":"HowToStep","position":1,"name":"Share event details","text":"Share your name, mobile number, event date, location and event type on WhatsApp."},\n    {"@type":"HowToStep","position":2,"name":"Discuss coverage","text":"Discuss photography style, coverage hours, video requirements and album needs."},\n    {"@type":"HowToStep","position":3,"name":"Choose a package","text":"Receive a package recommendation and quotation based on the event plan."},\n    {"@type":"HowToStep","position":4,"name":"Confirm the booking","text":"Confirm availability and booking details for the wedding date."}\n  ]\n}\n</script>\n'''
if 'id="geo-howto-schema"' not in s:
    s = s.replace('</head>', howto + '\n</head>', 1)

p.write_text(s, encoding='utf-8')

js = Path('script.js')
j = js.read_text(encoding='utf-8')
old = '''  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      const start = () => { heroVideo.play().catch(() => {}); };
      document.addEventListener('touchstart', start, { once: true });
      document.addEventListener('click',      start, { once: true });
    });'''
new = '''  if (heroVideo) {
    heroVideo.muted = true;
    const loadHeroVideo = () => {
      const sources = heroVideo.querySelectorAll('source[data-src]');
      sources.forEach(source => {
        if (!source.getAttribute('src')) source.setAttribute('src', source.dataset.src);
      });
      heroVideo.load();
      heroVideo.play().catch(() => {});
    };
    window.addEventListener('load', () => setTimeout(loadHeroVideo, 1200), { once: true });'''
if old in j:
    j = j.replace(old, new, 1)
js.write_text(j, encoding='utf-8')
