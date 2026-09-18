document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.getElementById('hero');
  const portfolio=document.getElementById('portfolio');
  if(!hero||!portfolio)return;

  const utility=document.createElement('div');
  utility.className='xp-utility';
  utility.innerHTML='<b>Wedding stories • Portraits • Films</b><span>Chennai · Tamil Nadu · India & beyond</span><span>Private enquiries now open</span>';
  document.body.insertBefore(utility,document.body.firstElementChild);

  const manifesto=document.createElement('section');
  manifesto.className='xp-manifesto';
  manifesto.setAttribute('aria-labelledby','xp-manifesto-title');
  manifesto.innerHTML=`<div><div class="xp-kicker">The Image Paradise approach</div><div class="xp-rule"></div></div><div><h2 id="xp-manifesto-title">Your day, told with <em>intention.</em></h2><p class="xp-manifesto-copy">From the quiet details to the loudest celebrations, we document the atmosphere, people and emotions that make your story yours. Explore our work, discover the experience, then tell us what you are planning.</p></div>`;
  hero.insertAdjacentElement('afterend',manifesto);

  const category=document.createElement('div');
  category.className='xp-category-bar';
  category.innerHTML=`<div class="xp-category-label">Explore the studio</div><nav class="xp-category-links" aria-label="Studio categories"><a href="#portfolio" data-filter="wedding">Weddings</a><a href="#portfolio" data-filter="portrait">Portraits</a><a href="#portfolio" data-filter="engagement">Engagements</a><a href="#services">Packages</a><a href="#xp-films">Films</a><a href="#xp-locations">Locations</a><a href="#contact">Check your date</a></nav>`;
  portfolio.parentNode.insertBefore(category,portfolio);

  const films=document.createElement('section');
  films.id='xp-films';
  films.className='xp-faq';
  films.innerHTML=`<div class="xp-faq-head"><div><div class="xp-kicker">Motion & emotion</div></div><div><h2>Stories that <em>move.</em></h2><p class="xp-faq-intro">Our photography is only one part of the story. Cinematic wedding films bring back the voices, movement and atmosphere of the day. Your portfolio and future film library can grow here without changing the experience.</p><div style="margin-top:28px"><a href="#contact" class="btn-pink">Enquire for a Film <span aria-hidden="true">→</span></a></div></div></div>`;
  portfolio.insertAdjacentElement('afterend',films);

  const faq=document.createElement('section');
  faq.className='xp-faq';
  faq.id='xp-faq';
  faq.innerHTML=`<div class="xp-faq-head"><div><div class="xp-kicker">Before we begin</div></div><div><h2>Frequently <em>asked.</em></h2><p class="xp-faq-intro">A few quick answers before you plan your session.</p></div></div><div class="xp-faq-list"><div class="xp-faq-item"><button class="xp-faq-q" type="button" aria-expanded="false"><span>What areas do you cover?</span><span>+</span></button><div class="xp-faq-a">We are based in Chennai and cover weddings and portrait sessions across Tamil Nadu, with travel available for celebrations beyond the region.</div></div><div class="xp-faq-item"><button class="xp-faq-q" type="button" aria-expanded="false"><span>Can we customise a package?</span><span>+</span></button><div class="xp-faq-a">Yes. Tell us your event type, coverage needs and priorities through the enquiry form and we can discuss the right combination of photography, films and albums.</div></div><div class="xp-faq-item"><button class="xp-faq-q" type="button" aria-expanded="false"><span>How do we enquire?</span><span>+</span></button><div class="xp-faq-a">Use the enquiry form, WhatsApp or the booking button. Share your date and event details and the team can take it from there.</div></div></div>`;
  films.insertAdjacentElement('afterend',faq);
  faq.querySelectorAll('.xp-faq-q').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.parentElement;const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open)}));

  const locations=document.createElement('section');
  locations.id='xp-locations';
  locations.className='xp-locations';
  locations.innerHTML=`<div class="xp-locations-inner"><div><div class="xp-kicker">Where we create</div><h2>From Chennai to <em>your story.</em></h2></div><div><p>Home base in Chennai, with photography experiences across Tamil Nadu and destination celebrations by request.</p><div class="xp-location-grid"><span>Chennai</span><span>Tiruvallur</span><span>Avadi</span><span>Ambattur</span><span>Tamil Nadu</span><span>India</span><span>Destination</span></div></div></div>`;
  faq.insertAdjacentElement('afterend',locations);

  /* Additional flagship modules: editorial journal, cinematic cards and a final FAQ. */
  const studio=document.createElement('section');
  studio.className='studio-index';
  studio.id='studio-index';
  studio.innerHTML=`<div class="studio-index-inner"><div class="studio-kicker"><i></i> THE IMAGE PARADISE JOURNAL</div><h2>Stories <em>worth</em> remembering.</h2><div class="studio-index-grid"><a class="studio-link" href="#portfolio"><small>01 · Visual Archive</small><strong>Weddings</strong><span>↗</span></a><a class="studio-link" href="#portfolio"><small>02 · Portrait Stories</small><strong>Portraits</strong><span>↗</span></a><a class="studio-link" href="#services"><small>03 · Signature Work</small><strong>Experiences</strong><span>↗</span></a><a class="studio-link" href="#contact"><small>04 · Begin Here</small><strong>Book Us</strong><span>↗</span></a></div></div>`;
  portfolio.insertAdjacentElement('afterend',studio);

  const story=document.createElement('section');
  story.className='story-banner';
  story.innerHTML=`<div class="story-banner-inner"><div class="studio-kicker"><i></i> MORE THAN A PHOTOSHOOT <i></i></div><h2>Your wedding.<br><em>Your story.</em></h2><p>We don't direct your memories. We create the space for real emotion to happen — then turn those fleeting seconds into photographs and films you'll return to for decades.</p><a href="#contact" class="btn-pink">Tell Us Your Story <span aria-hidden="true">→</span></a></div>`;
  hero.insertAdjacentElement('afterend',story);

  const filmGrid=document.createElement('section');
  filmGrid.className='film-strip';
  filmGrid.id='films';
  filmGrid.innerHTML=`<div class="film-strip-inner"><div class="studio-kicker">CINEMATIC STORIES</div><h2>Frames that <em>move.</em></h2><div class="film-cards"><article class="film-card" style="--film-image:url('images/08.jpg')"><div class="film-card-content"><small>01 · Wedding Films</small><h3>The day, in motion.</h3></div></article><article class="film-card" style="--film-image:url('images/DSC06422-opt.JPG')"><div class="film-card-content"><small>02 · Couple Stories</small><h3>Before forever.</h3></div></article><article class="film-card" style="--film-image:url('images/gallery1.jpeg')"><div class="film-card-content"><small>03 · Celebrations</small><h3>Feel it again.</h3></div></article></div></div>`;
  document.getElementById('testimonials')?.before(filmGrid);

  /* The interactive FAQ above is the single FAQ experience. Avoid duplicating the same content later on the page. */
  faq.id='faq';

  const contact=document.getElementById('contact');
  if (contact) {
    contact.setAttribute('data-contact-section','true');
  }

  const navLinks=document.querySelectorAll('.xp-category-links a[href^="#"]');
  navLinks.forEach(a=>a.addEventListener('click',e=>{
    const targetSelector=a.getAttribute('href');
    const t=document.querySelector(targetSelector);
    if(!t)return;
    e.preventDefault();
    if(a.dataset.filter){
      const chip=document.querySelector(`.chip[data-f="${a.dataset.filter}"]`);
      chip?.click();
    }
    window.scrollTo({top:t.getBoundingClientRect().top+scrollY-80,behavior:'smooth'});
  }));
});
