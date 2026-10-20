import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const origin = 'https://image-paradise-photography.vercel.app';
const instagram = 'https://www.instagram.com/imageparadisephotography';
const whatsapp = 'https://wa.me/917708510143';

const services = [
  ['wedding-photographer-chennai', 'Wedding Photographer in Chennai | Image Paradise Photography', 'Candid wedding photography, traditional ceremony coverage and cinematic wedding films in Chennai. Explore packages and enquire about your date.', 'Wedding Photography in Chennai that feels like your story.', 'Chennai', '/images/08-opt.jpg', [['Candid Photography', 'Natural moments, family emotions and details that make your wedding yours.'], ['Traditional Coverage', 'Important rituals, family portraits and ceremony moments photographed with care.'], ['Cinematic Films', 'Wedding films and highlights that help you revisit the atmosphere of your celebration.']]],
  ['wedding-photographer-tiruvallur', 'Wedding Photographer in Tiruvallur | Image Paradise Photography', 'Wedding photography and cinematic videography for weddings in Tiruvallur and nearby areas. Ask about coverage, packages and date availability.', 'Wedding photography for celebrations in Tiruvallur.', 'Tiruvallur', '/images/DSC06228-opt.JPG', [['Wedding Day Coverage', 'Discuss muhurtham, engagement, reception and other functions for your event plan.'], ['Photo and Film Options', 'Choose photography, videography or a combined package based on your requirements.'], ['Plan Your Enquiry', 'Share the date, venue and event timings to request a quotation.']]],
  ['wedding-photographer-avadi', 'Wedding Photographer in Avadi | Image Paradise Photography', 'Candid wedding photography, ceremony coverage and wedding films in Avadi, Chennai and nearby areas.', 'Wedding photographs that preserve the moments that matter.', 'Avadi', '/images/AR_02707-opt.JPG', [['Candid Moments', 'Photograph family reactions, couple portraits and small moments throughout the day.'], ['Ceremony and Reception', 'Plan coverage around rituals, group portraits and the reception schedule.'], ['Discuss Packages', 'Tell us the event date, venue and coverage needed before requesting a final quote.']]],
  ['wedding-photographer-ambattur', 'Wedding Photographer in Ambattur | Image Paradise Photography', 'Wedding photography, candid portraits and cinematic films in Ambattur and nearby Chennai areas.', 'Wedding photography for your Ambattur celebration.', 'Ambattur', '/images/DSC06422-opt.JPG', [['Wedding and Reception', 'Coverage can be planned around the function schedule and key rituals.'], ['Portraits and Candid Stories', 'Combine natural moments with family and couple portraits.'], ['Simple Enquiry Process', 'Share the date, venue and events to discuss a suitable coverage plan.']]],
  ['pre-wedding-shoot-chennai', 'Pre-Wedding Photoshoot in Chennai | Image Paradise Photography', 'Plan a pre-wedding photoshoot in Chennai around your preferred location, concept and style. Photography and cinematic film options available.', 'A pre-wedding story that feels like you.', 'Chennai', '/images/DSC06422-opt.JPG', [['Choose a Location', 'Discuss a beach, heritage location, garden, cafe or studio setting.'], ['Plan Your Style', 'Share whether you prefer candid, classic portrait or editorial-inspired photographs.'], ['Add a Film', 'Ask about moving-image coverage for a cinematic pre-wedding story.']]],
  ['wedding-videography-chennai', 'Wedding Videography in Chennai | Image Paradise Photography', 'Wedding videography and cinematic highlight films in Chennai and Tamil Nadu. Discuss event timings, coverage options and your final quotation.', 'Turn your wedding day into a film you can revisit.', 'Chennai', '/images/08-opt.jpg', [['Ceremony Coverage', 'Plan filming for important rituals, family moments and reception events.'], ['Cinematic Highlights', 'Discuss a highlight edit that reflects your celebration.'], ['Photo and Video Together', 'Combine still photography and videography when you want both kinds of coverage.']]]
];

const articles = [
  ['how-to-choose-best-wedding-photographer-chennai', 'How to Choose a Wedding Photographer in Chennai (2026 Guide)', 'A practical guide to comparing photography style, full galleries, coverage, delivery timelines and albums in Chennai.', '2026-02-15', '/images/DSC06228-opt.JPG', 'Compare full galleries, clarify event coverage and deliverables, confirm preview and full-gallery timelines, and discuss communication before booking.', [['Compare full galleries', 'Review a complete wedding gallery to judge consistency across ceremony lighting, portraits and family moments.'], ['Confirm deliverables', 'Clarify event hours, photographer and videographer coverage, edited images and any album inclusions in the quotation.'], ['Discuss timelines', 'Confirm preview, full-gallery and album delivery expectations before booking.']]],
  ['top-scenic-pre-wedding-shoot-locations-chennai', 'Scenic Pre-Wedding Shoot Locations in and Around Chennai', 'Ideas for a Chennai pre-wedding photoshoot, from coastal settings and heritage locations to gardens and studio sessions.', '2026-01-28', '/images/DSC06422-opt.JPG', 'Consider the light, travel time, access permissions and mood you want. Discuss the date, location, session duration and photo or video needs with your photographer.', [['Coastal settings', 'Check access, permissions and the best time of day before arranging a beach session.'], ['Heritage locations', 'Architectural details can create a timeless background where photography is permitted.'], ['Gardens and studios', 'Green spaces and studio sessions can create different looks for relaxed couple portraits.']]],
  ['tamil-wedding-muhurtham-photography-checklist', 'Tamil Wedding Muhurtham Photography Checklist', 'A checklist for planning photography around important Tamil wedding rituals, family portraits and ceremony timings.', '2026-01-10', '/images/AR_02707-opt.JPG', 'Share the ceremony schedule and priority moments with the photography team in advance, so the coverage plan fits the event.', [['Share the schedule', 'Provide timings for the main rituals, family gatherings and changes expected on the day.'], ['List priority moments', 'Tell the team which rituals, relatives and details are especially important to your family.'], ['Plan family portraits', 'Prepare a list of important family combinations and a convenient time for photographs.']]],
  ['top-wedding-venues-mandapams-chennai-2026', 'Planning a Wedding Venue in Chennai: A Photography Checklist', 'What to discuss with a venue and photographer in Chennai: lighting, ceremony layout, access and event timings.', '2025-12-20', '/images/08-opt.jpg', 'A venue affects guest comfort and the practical conditions for wedding photographs. Review the space with your event schedule and photography plan in mind.', [['Lighting and backdrop', 'Ask about stage lighting, ceremony layout and suitable light for portraits.'], ['Access and permissions', 'Confirm vendor access, photography restrictions, drone rules if relevant and extra fees.'], ['Timeline and space', 'Share the programme, venue layout and family portrait locations with your team.']]]
];

function esc(s) { return String(s).replace(/[&<>"']/g, function(c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); }); }
function setTitle(html, title) { return html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + esc(title) + '</title>'); }
function setMeta(html, attr, key, value) {
  const escaped = key.replace(/[.*+?^{}()|[\]\\]/g, '\\$&');
  const re = new RegExp('<meta\\s+[^>]*' + attr + '="' + escaped + '"[^>]*>', 'i');
  const tag = '<meta ' + attr + '="' + key + '" content="' + esc(value) + '">';
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', '  ' + tag + '\n</head>');
}
function canonical(html, url) {
  return html.replace(/<link\s+rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '">');
}
function business() {
  return {'@type':'LocalBusiness','@id':origin+'/#localbusiness','name':'Image Paradise Photography','url':origin+'/','description':'Wedding photography, candid photography, wedding videography, pre-wedding photography and wedding album design serving Chennai, Tiruvallur, Avadi, Ambattur and Tamil Nadu.','logo':origin+'/images/Logo.webp','image':origin+'/images/08-opt.jpg','telephone':'+91-7708510143','email':'imageparadise2020@gmail.com','priceRange':'₹35,000–₹1,50,000','address':{'@type':'PostalAddress','streetAddress':'No. 2/670, Kudiyanvur Street 87','addressLocality':'Veppampattu','postalCode':'602024','addressRegion':'Tamil Nadu','addressCountry':'IN'},'areaServed':['Chennai','Tiruvallur','Avadi','Ambattur','Kanchipuram','Tamil Nadu'],'sameAs':[instagram]};
}
function schemaFor(p) {
  const url = origin + (p.path ? '/' + p.path : '/');
  const graph = [
    business(),
    {'@type':'Organization','@id':origin+'/#organization','name':'Image Paradise Photography','url':origin+'/','logo':origin+'/images/Logo.webp','contactPoint':{'@type':'ContactPoint','telephone':'+91-7708510143','contactType':'customer service','availableLanguage':['English','Tamil']}},
    {'@type':'WebSite','@id':origin+'/#website','name':'Image Paradise Photography','url':origin+'/'},
    {'@type':'WebPage','@id':url+'#webpage','url':url,'name':p.title,'description':p.description,'isPartOf':{'@id':origin+'/#website'},'about':{'@id':origin+'/#localbusiness'}}
  ];
  if (p.path) {
    const crumbs = [{'@type':'ListItem','position':1,'name':'Home','item':origin+'/'}];
    if (p.path.startsWith('blog/')) crumbs.push({'@type':'ListItem','position':2,'name':'Blog','item':origin+'/blog'});
    crumbs.push({'@type':'ListItem','position':crumbs.length+1,'name':p.title,'item':url});
    graph.push({'@type':'BreadcrumbList','itemListElement':crumbs});
  }
  if (p.article) graph.push({'@type':'BlogPosting','headline':p.title,'description':p.description,'image':origin+p.image,'datePublished':p.publishedAt,'mainEntityOfPage':url,'author':{'@type':'Organization','name':'Image Paradise Photography'},'publisher':{'@type':'Organization','name':'Image Paradise Photography','logo':{'@type':'ImageObject','url':origin+'/images/Logo.webp'} }});
  if (!p.path) graph.push({'@type':'OfferCatalog','name':'Wedding Photography Packages','itemListElement':[{'@type':'Offer','name':'Essential Wedding Photography Package','price':'35000','priceCurrency':'INR'},{'@type':'Offer','name':'Premium Wedding Photography Package','price':'75000','priceCurrency':'INR'},{'@type':'Offer','name':'Luxury Wedding Photography Package','price':'150000','priceCurrency':'INR'}]});
  return {'@context':'https://schema.org','@graph':graph};
}
function wrapRoot(html, body) {
  if (!/<div id="root"><\/div>/.test(html)) throw new Error('Could not find empty React root in built HTML');
  return html.replace(/<div id="root"><\/div>/, '<div id="root">' + body + '</div>');
}
function prepare(template, p, body) {
  let h = template.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  h = setTitle(h, p.title);
  h = setMeta(h, 'name', 'description', p.description);
  h = setMeta(h, 'property', 'og:type', p.article ? 'article' : 'website');
  h = setMeta(h, 'property', 'og:url', origin + (p.path ? '/' + p.path : '/'));
  h = setMeta(h, 'property', 'og:title', p.title);
  h = setMeta(h, 'property', 'og:description', p.description);
  h = setMeta(h, 'property', 'og:image', origin + (p.image || '/og-image.png'));
  h = setMeta(h, 'property', 'og:image:width', '1200');
  h = setMeta(h, 'property', 'og:image:height', '630');
  h = setMeta(h, 'property', 'og:image:alt', p.title);
  h = setMeta(h, 'name', 'twitter:card', 'summary_large_image');
  h = setMeta(h, 'name', 'twitter:url', origin + (p.path ? '/' + p.path : '/'));
  h = setMeta(h, 'name', 'twitter:title', p.title);
  h = setMeta(h, 'name', 'twitter:description', p.description);
  h = setMeta(h, 'name', 'twitter:image', origin + (p.image || '/og-image.png'));
  h = setMeta(h, 'name', 'twitter:image:alt', p.title);
  h = canonical(h, origin + (p.path ? '/' + p.path : '/'));
  if (p.article) h = setMeta(h, 'property', 'article:published_time', p.publishedAt);
  h = h.replace('</head>', '<script type="application/ld+json">' + JSON.stringify(schemaFor(p)).replace(/</g, '\\u003c') + '</script>\n</head>');
  return wrapRoot(h, body);
}
function renderSections(sections) {
  return (sections || []).map(function(s) { return '<section><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p></section>'; }).join('');
}
function contactBlock() {
  return '<section><h2>Ask about your date</h2><p>Send your event date, function type and venue to discuss requirements and availability.</p><p><a href="'+whatsapp+'?text='+encodeURIComponent('Hi Image Paradise Photography, I would like to enquire about wedding photography. My event date and venue are:')+'">Enquire on WhatsApp: +91 7708510143</a></p><p><a href="mailto:imageparadise2020@gmail.com">Email the studio</a></p></section>';
}
function serviceBody(p) {
  const linkData = services.map(function(s){return '<li><a href="/'+s[0]+'">'+esc(s[4]+' wedding photography')+'</a></li>';}).join('');
  const blogLinks = articles.map(function(a){return '<li><a href="/blog/'+a[0]+'">'+esc(a[1])+'</a></li>';}).join('');
  return '<main class="seo-static-fallback" style="max-width:960px;margin:2rem auto;padding:1.5rem;font-family:Arial,sans-serif;line-height:1.7;color:#241b20"><nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; '+esc(p.title)+'</nav><article><p>'+esc(p.location || 'Image Paradise Photography')+'</p><h1>'+esc(p.heading)+'</h1><p>'+esc(p.description)+'</p><img src="'+p.image+'" alt="'+esc(p.heading)+'" width="900" height="600" loading="eager">'+renderSections(p.sections)+'<section><h2>Wedding photography packages</h2><p>Published packages: Essential ₹35,000, Premium ₹75,000 and Luxury ₹1,50,000. Final pricing depends on event date, location, coverage duration and selected deliverables. Contact the studio to confirm an exact quotation.</p></section>'+contactBlock()+'</article><nav aria-label="Other service pages"><h2>Explore service areas</h2><ul>'+linkData+'</ul></nav><nav aria-label="Photography guides"><h2>Photography planning guides</h2><ul>'+blogLinks+'<li><a href="/refer-and-earn">Referral &amp; Partner Program</a></li></ul></nav><footer><p>Image Paradise Photography · Veppampattu, Tamil Nadu · <a href="'+instagram+'">Instagram portfolio</a></p></footer></main>';
}
function blogBody(p) {
  const related = articles.filter(function(a){return a[0]!==p.path.replace(/^blog\//,'');}).map(function(a){return '<li><a href="/blog/'+a[0]+'">'+esc(a[1])+'</a></li>';}).join('');
  return '<main class="seo-static-fallback" style="max-width:900px;margin:2rem auto;padding:1.5rem;font-family:Arial,sans-serif;line-height:1.7;color:#241b20"><nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; '+esc(p.title)+'</nav><article><header><p>Image Paradise Journal · '+esc(p.publishedAt)+'</p><h1>'+esc(p.title)+'</h1><p>'+esc(p.description)+'</p></header><img src="'+p.image+'" alt="'+esc(p.title)+'" width="900" height="600" loading="eager"><p>'+esc(p.intro)+'</p>'+renderSections(p.sections)+'<p>Discuss the event date, venue, coverage hours and deliverables before confirming a final quotation.</p><p><a href="'+whatsapp+'?text='+encodeURIComponent('Hi Image Paradise Photography, I read your wedding photography guide and would like to enquire.')+'">Ask the studio a question</a></p></article><nav aria-label="Related guides"><h2>Related guides</h2><ul>'+related+'</ul></nav></main>';
}
function blogListingBody() {
  return '<main class="seo-static-fallback" style="max-width:1000px;margin:2rem auto;padding:1.5rem;font-family:Arial,sans-serif;line-height:1.7;color:#241b20"><nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; Blog</nav><h1>Wedding Photography Blog</h1><p>Planning guides for wedding photography, Tamil wedding rituals, pre-wedding shoots and choosing coverage in Chennai and Tamil Nadu.</p>'+articles.map(function(a){return '<article><h2><a href="/blog/'+a[0]+'">'+esc(a[1])+'</a></h2><p>'+esc(a[2])+'</p><p><a href="/blog/'+a[0]+'">Read guide →</a></p></article>';}).join('')+'</main>';
}
async function save(template, p, body) {
  const file = path.join(dist, p.path ? p.path + '.html' : 'index.html');
  await fs.mkdir(path.dirname(file), {recursive:true});
  await fs.writeFile(file, prepare(template,p,body),'utf8');
}
async function main() {
  const template = await fs.readFile(path.join(dist,'index.html'),'utf8');
  const home = {path:'',title:'Wedding Photographer in Chennai | Image Paradise Photography',description:'Candid wedding photography, cinematic wedding films, pre-wedding shoots and wedding albums in Chennai, Tiruvallur and nearby Tamil Nadu locations. Enquire: +91 7708510143.',heading:'Wedding Photography & Cinematic Films in Chennai',image:'/images/08-opt.jpg',sections:[['Wedding Photography','Discuss candid moments, ceremony coverage, couple portraits and family photographs.'],['Cinematic Wedding Films','Ask about video coverage and highlight film options for your event schedule.'],['Pre-Wedding Photography','Plan location, concept, timing and photography or video deliverables for your session.']]};
  await save(template,home,serviceBody(home));
  for (const row of services) {
    const p={path:row[0],title:row[1],description:row[2],heading:row[3],location:row[4],image:row[5],sections:row[6]};
    await save(template,p,serviceBody(p));
  }
  const listing={path:'blog',title:'Wedding Photography Blog | Image Paradise Photography',description:'Wedding photography planning guides for Chennai and Tamil Nadu, including Tamil wedding rituals, pre-wedding shoots, venues and choosing photography coverage.'};
  await fs.writeFile(path.join(dist,'blog.html'),prepare(template,listing,blogListingBody()),'utf8');
  const referral={path:'refer-and-earn',title:'Referral & Business Development Partner Program | Image Paradise Photography',description:'Refer wedding photography clients to Image Paradise Photography. Discuss a written commission agreement for eligible, confirmed bookings.',heading:'Refer a Client. Earn on Confirmed Bookings.',image:'/images/08-opt.jpg',sections:[['For individuals','Refer a genuine wedding, engagement or pre-wedding enquiry before they have already contacted or booked the studio.'],['For business development partners','Wedding planners, makeup artists, decorators, venues, event managers and freelance business developers can discuss long-term referral arrangements.'],['How reward eligibility works','The studio confirms the referral eligibility, commission amount or calculation and payout milestone in writing before accepting the referral. No fixed reward amount is promised on this page.'],['Register a referral','Use the on-page referral form to share your details and continue to WhatsApp. Obtain permission before sharing another person’s contact information.']]};
  await save(template,referral,serviceBody(referral));
  for (const row of articles) {
    const p={path:'blog/'+row[0],title:row[1],description:row[2],publishedAt:row[3],image:row[4],intro:row[5],sections:row[6],article:true};
    await save(template,p,blogBody(p));
  }
  console.log('Generated page-specific HTML for home, 6 local service pages, blog listing and 4 articles.');
}
main().catch(function(err){console.error('SEO page generation failed:',err);process.exitCode=1;});
