/* ══════════════════════════════════════════════════
   IMAGE PARADISE PHOTOGRAPHY — JAVASCRIPT
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HERO PROMO VIDEO ────────────────────────── */
  const heroVideo   = document.getElementById('heroVideo');
  const heroMuteBtn = document.getElementById('heroVideoMute');
  const heroMuteLbl = heroMuteBtn ? heroMuteBtn.querySelector('.hero-video-mute-label') : null;

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      const start = () => { heroVideo.play().catch(() => {}); };
      document.addEventListener('touchstart', start, { once: true });
      document.addEventListener('click',      start, { once: true });
    });
    if (heroMuteBtn) {
      heroMuteBtn.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        if (heroMuteLbl) heroMuteLbl.textContent = heroVideo.muted ? 'Sound off' : 'Sound on';
        heroMuteBtn.setAttribute('aria-label', heroVideo.muted ? 'Unmute promo video' : 'Mute promo video');
      });
    }
  }

  /* ── LOADER ──────────────────────────────────── */
  const loader   = document.getElementById('pageLoader');
  const fillEl   = document.getElementById('loaderFill');
  let pct = 0;
  const loadTimer = setInterval(() => {
    pct = Math.min(pct + Math.random() * 20, 95);
    if (fillEl) fillEl.style.width = pct + '%';
  }, 80);
  window.addEventListener('load', () => {
    clearInterval(loadTimer);
    if (fillEl) fillEl.style.width = '100%';
    if (loader) setTimeout(() => loader.classList.add('out'), 500);
  });

  /* ── CUSTOM CURSOR ───────────────────────────── */
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cur && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
      rx += (e.clientX - rx) * .13;
      ry += (e.clientY - ry) * .13;
    });
    (function loop() {
      rx += (parseFloat(cur.style.left||0) - rx) * .13;
      ry += (parseFloat(cur.style.top||0)  - ry) * .13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.chip,.g-item').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.style.width='18px'; cur.style.height='18px'; ring.style.width='56px'; ring.style.height='56px'; ring.style.opacity='.25'; });
      el.addEventListener('mouseleave', () => { cur.style.width='8px'; cur.style.height='8px'; ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='.5'; });
    });
  }

  /* ── NAVBAR ──────────────────────────────────── */
  const nav  = document.getElementById('nav');
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  const btt  = document.getElementById('btt');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('slim', window.scrollY > 60);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  if (ham && menu) {
    ham.setAttribute('aria-controls', 'navMenu');
    ham.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    const closeMenu = (returnFocus = false) => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      ham.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      if (returnFocus) ham.focus();
    };

    ham.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      ham.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      if (open) menu.querySelector('a')?.focus();
    });

    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));

    document.addEventListener('keydown', e => {
      if (!menu.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); return; }
      if (e.key !== 'Tab') return;
      const focusable = [...menu.querySelectorAll('a,button')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SMOOTH SCROLL ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 0), behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ───────────────────────────── */
  const revEls = document.querySelectorAll('[data-reveal]');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const delay = parseInt(en.target.dataset.delay || 0);
      setTimeout(() => en.target.classList.add('in'), delay);
      revObs.unobserve(en.target);
    });
  }, { threshold: 0.1 });
  revEls.forEach(el => revObs.observe(el));

  /* ── COUNTER ANIMATION ───────────────────────── */
  const countEls = document.querySelectorAll('.count');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseInt(el.dataset.to);
      let v = 0; const step = target / 70;
      const t = setInterval(() => {
        v = Math.min(v + step, target);
        el.textContent = Math.floor(v);
        if (v >= target) clearInterval(t);
      }, 20);
      cntObs.unobserve(el);
    });
  }, { threshold: .5 });
  countEls.forEach(el => cntObs.observe(el));

  /* ── GALLERY FILTER ──────────────────────────── */
  const chips  = document.querySelectorAll('.chip');
  const gItems = document.querySelectorAll('.g-item');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      const f = chip.dataset.f;
      gItems.forEach(item => {
        const match = f === 'all' || item.dataset.c === f;
        item.classList.toggle('hidden', !match);
        item.classList.toggle('visible', match);
      });
    });
  });

  /* ── LIGHTBOX ────────────────────────────────── */
  const lb      = document.getElementById('lightbox');
  const lbStage = document.getElementById('lbStage');
  const lbCap   = document.getElementById('lbCaption');
  const lbX     = document.getElementById('lbX');
  const lbL     = document.getElementById('lbL');
  const lbR     = document.getElementById('lbR');
  const itemArr = Array.from(gItems);
  let lbIdx = 0;

  function openLB(idx) {
    if (!lb || !lbStage) return;
    lbIdx = idx;
    const item = itemArr[lbIdx];
    const img  = item?.querySelector('img');
    const cap  = item?.querySelector('.g-overlay p');
    const sub  = item?.querySelector('.g-overlay span');
    lbStage.innerHTML = '';
    if (img) {
      const im = document.createElement('img');
      im.src = img.currentSrc || img.src; im.alt = img.alt || '';
      im.decoding = 'async';
      lbStage.appendChild(im);
    }
    if (lbCap) lbCap.textContent = (cap ? cap.textContent : '') + (sub ? ' · ' + sub.textContent : '');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbX?.focus();
  }
  function closeLB() { if (!lb) return; lb.classList.remove('open'); document.body.style.overflow = ''; }

  itemArr.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
  lbX?.setAttribute('aria-label', 'Close image viewer');
  lbL?.setAttribute('aria-label', 'Previous image');
  lbR?.setAttribute('aria-label', 'Next image');
  lbX?.addEventListener('click', closeLB);
  lbL?.addEventListener('click', e => { e.stopPropagation(); openLB((lbIdx - 1 + itemArr.length) % itemArr.length); });
  lbR?.addEventListener('click', e => { e.stopPropagation(); openLB((lbIdx + 1) % itemArr.length); });
  lb?.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') lbL?.click();
    if (e.key === 'ArrowRight') lbR?.click();
  });

  /* ── TESTIMONIAL SLIDER ──────────────────────── */
  const ttrack  = document.getElementById('ttrack');
  const tdotsEl = document.getElementById('tdots');
  const tcards  = ttrack ? ttrack.querySelectorAll('.tcard') : [];
  const tTotal  = tcards.length;
  let tCur = 0;
  if (ttrack && tdotsEl && tTotal) {
    for (let i = 0; i < tTotal; i++) {
      const d = document.createElement('div');
      d.className = 'tdot' + (i === 0 ? ' on' : '');
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.setAttribute('aria-label', `Show review ${i + 1}`);
      d.addEventListener('click', () => tGo(i));
      d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tGo(i); } });
      tdotsEl.appendChild(d);
    }
    function tGo(idx) {
      tCur = (idx + tTotal) % tTotal;
      const w = tcards[0].getBoundingClientRect().width + 24;
      ttrack.style.transform = `translateX(-${tCur * w}px)`;
      tdotsEl.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('on', i === tCur));
    }
    setInterval(() => tGo(tCur + 1), 4500);
    window.addEventListener('resize', () => tGo(tCur));
  }

  /* ── CONTACT FORM VALIDATION + AJAX FEEDBACK ─── */
  const eForm = document.getElementById('eForm');
  const fsubBtn = document.getElementById('fsub');
  let formStatus = document.getElementById('formStatus');
  if (eForm) {
    if (!formStatus) {
      formStatus = document.createElement('div');
      formStatus.id = 'formStatus';
      formStatus.setAttribute('role', 'status');
      formStatus.setAttribute('aria-live', 'polite');
      formStatus.style.cssText = 'margin-top:12px;font-size:.9rem;font-weight:600;';
      eForm.appendChild(formStatus);
    }

    function setErr(id, errId, msg) {
      const field = document.getElementById(id);
      const el = document.getElementById(errId);
      field?.classList.add('bad');
      field?.setAttribute('aria-invalid', 'true');
      if (el) { el.textContent = msg; el.setAttribute('role', 'alert'); }
    }
    function clrErr(id, errId) {
      const field = document.getElementById(id);
      const el = document.getElementById(errId);
      field?.classList.remove('bad');
      field?.removeAttribute('aria-invalid');
      if (el) el.textContent = '';
    }
    function validate() {
      let ok = true;
      const fname = document.getElementById('f_fname')?.value.trim();
      const lname = document.getElementById('f_lname')?.value.trim();
      const email = document.getElementById('f_email')?.value.trim();
      const session = document.getElementById('f_session')?.value;
      const msg = document.getElementById('f_msg')?.value.trim();
      if (!fname) { setErr('f_fname','fe_fname','Please enter your first name.'); ok=false; } else clrErr('f_fname','fe_fname');
      if (!lname) { setErr('f_lname','fe_lname','Please enter your last name.'); ok=false; } else clrErr('f_lname','fe_lname');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('f_email','fe_email','Please enter a valid email address.'); ok=false; } else clrErr('f_email','fe_email');
      if (!session) { setErr('f_session','fe_session','Please select a session type.'); ok=false; } else clrErr('f_session','fe_session');
      if (!msg || msg.length < 20) { setErr('f_msg','fe_msg','Please tell us a little more (minimum 20 characters).'); ok=false; } else clrErr('f_msg','fe_msg');
      return ok;
    }
    ['f_fname','f_lname','f_email','f_session','f_msg'].forEach(id => document.getElementById(id)?.addEventListener('blur', validate));

    eForm.addEventListener('submit', async e => {
      if (!validate()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (fsubBtn) { fsubBtn.disabled = true; fsubBtn.setAttribute('aria-busy', 'true'); }
      formStatus.textContent = 'Sending your enquiry…';
      formStatus.style.color = '#8D5B6E';
      try {
        const response = await fetch(eForm.action, { method: 'POST', body: new FormData(eForm), headers: { Accept: 'application/json' } });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) throw new Error('Submission failed');
        formStatus.textContent = 'Thank you! Your enquiry has been sent. We will get back to you soon.';
        formStatus.style.color = '#2e7d32';
        eForm.reset();
      } catch (err) {
        formStatus.textContent = 'We could not send the enquiry right now. Please WhatsApp us instead.';
        formStatus.style.color = '#b42318';
      } finally {
        if (fsubBtn) { fsubBtn.disabled = false; fsubBtn.removeAttribute('aria-busy'); }
      }
    }, true);
  }

  /* ── ACTIVE NAV HIGHLIGHT ────────────────────── */
  const secs = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-menu a:not(.nav-enquire)');
  secs.forEach(s => new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#'+en.target.id ? 'var(--pk)' : ''; });
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s));

  /* ── PERFORMANCE: IMAGE METADATA ─────────────── */
  document.querySelectorAll('img').forEach(img => {
    img.decoding = 'async';
    if (!img.hasAttribute('width') && img.naturalWidth) img.width = img.naturalWidth;
    if (!img.hasAttribute('height') && img.naturalHeight) img.height = img.naturalHeight;
  });

  /* ── ACCESSIBILITY: FOCUS STATES ─────────────── */
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `
    :where(a,button,input,select,textarea,[tabindex]):focus-visible{outline:3px solid #D81B60;outline-offset:3px;border-radius:4px}
    .nav-menu[aria-hidden="true"]{visibility:visible}
    #formStatus{min-height:1.4em}
    .whatsapp-audit-cta{position:fixed;right:18px;bottom:18px;z-index:1200;display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;background:#25D366;color:#fff;font:600 14px/1 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.18);text-decoration:none}
    .whatsapp-audit-cta:hover{transform:translateY(-2px)}
    @media(max-width:600px){.whatsapp-audit-cta{right:12px;bottom:12px;padding:11px 15px;font-size:13px}.whatsapp-audit-cta span{display:none}}
  `;
  document.head.appendChild(focusStyle);

  /* ── SEO / STRUCTURED DATA CLEANUP ───────────── */
  const SITE = 'https://image-paradise-photography.vercel.app/';
  const DESCRIPTION = 'Image Paradise Photography provides wedding photography, candid photography, cinematic wedding films, pre-wedding shoots, bridal portraits and album design in Chennai, Tiruvallur and across Tamil Nadu.';
  document.querySelectorAll('script[src*="G-XXXXXXXXXX"]').forEach(s => s.remove());
  document.querySelectorAll('script:not([src])').forEach(s => {
    if (s.textContent.includes('G-XXXXXXXXXX') || s.textContent.includes('YOUR_PIXEL_ID')) s.remove();
  });
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute(attr, value);
    el.setAttribute(attr === 'name' ? 'content' : 'content', value);
  };
  const setNamedMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  };
  const setPropertyMeta = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
    el.content = content;
  };
  document.title = 'Image Paradise Photography | Wedding Photographer in Chennai & Tamil Nadu';
  setNamedMeta('title', document.title);
  setNamedMeta('description', DESCRIPTION);
  setNamedMeta('twitter:title', document.title);
  setNamedMeta('twitter:description', DESCRIPTION);
  setPropertyMeta('og:title', document.title);
  setPropertyMeta('og:description', DESCRIPTION);
  setPropertyMeta('og:url', SITE);
  setNamedMeta('twitter:url', SITE);
  setPropertyMeta('og:image:alt', 'Image Paradise Photography wedding photography in Chennai');
  setNamedMeta('twitter:image:alt', 'Image Paradise Photography wedding photography in Chennai');
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = SITE;

  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => s.remove());
  const schema = {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'LocalBusiness',
        '@id':SITE+'#business',
        'name':'Image Paradise Photography',
        'url':SITE,
        'logo':SITE+'images/Logo.png',
        'image':SITE+'images/08.jpg',
        'telephone':'+91-7708510143',
        'email':'imageparadise2020@gmail.com',
        'description':DESCRIPTION,
        'priceRange':'₹₹₹',
        'address':{
          '@type':'PostalAddress',
          'streetAddress':'No. 2/670, Kudiyanvur Street 87',
          'addressLocality':'Veppampattu',
          'addressRegion':'Tamil Nadu',
          'postalCode':'602024',
          'addressCountry':'IN'
        },
        'areaServed':[
          {'@type':'City','name':'Chennai'},
          {'@type':'City','name':'Tiruvallur'},
          {'@type':'City','name':'Avadi'},
          {'@type':'City','name':'Ambattur'},
          {'@type':'State','name':'Tamil Nadu'}
        ],
        'sameAs':['https://www.instagram.com/imageparadisephotography'],
        'knowsLanguage':['English','Tamil']
      },
      {
        '@type':'Organization',
        '@id':SITE+'#organization',
        'name':'Image Paradise Photography',
        'url':SITE,
        'logo':SITE+'images/Logo.png',
        'contactPoint':{'@type':'ContactPoint','telephone':'+91-7708510143','contactType':'customer service','availableLanguage':['English','Tamil']}
      },
      {
        '@type':'WebSite',
        '@id':SITE+'#website',
        'name':'Image Paradise Photography',
        'url':SITE,
        'publisher':{'@id':SITE+'#organization'}
      },
      {
        '@type':'WebPage',
        '@id':SITE+'#webpage',
        'url':SITE,
        'name':document.title,
        'description':DESCRIPTION,
        'isPartOf':{'@id':SITE+'#website'},
        'about':{'@id':SITE+'#business'}
      },
      {
        '@type':'Service',
        'name':'Wedding Photography',
        'serviceType':'Wedding Photography',
        'provider':{'@id':SITE+'#business'},
        'areaServed':[
          {'@type':'City','name':'Chennai'},
          {'@type':'City','name':'Tiruvallur'},
          {'@type':'City','name':'Avadi'},
          {'@type':'City','name':'Ambattur'},
          {'@type':'State','name':'Tamil Nadu'}
        ]
      },
      {
        '@type':'Service','name':'Candid Photography','serviceType':'Candid Wedding Photography','provider':{'@id':SITE+'#business'},'areaServed':{'@type':'State','name':'Tamil Nadu'}
      },
      {
        '@type':'Service','name':'Wedding Videography','serviceType':'Wedding Videography','provider':{'@id':SITE+'#business'},'areaServed':{'@type':'State','name':'Tamil Nadu'}
      },
      {
        '@type':'Service','name':'Pre-Wedding Photography','serviceType':'Pre-Wedding Photography','provider':{'@id':SITE+'#business'},'areaServed':{'@type':'State','name':'Tamil Nadu'}
      },
      {
        '@type':'Service','name':'Bridal Portraits','serviceType':'Bridal Portrait Photography','provider':{'@id':SITE+'#business'},'areaServed':{'@type':'State','name':'Tamil Nadu'}
      },
      {
        '@type':'Service','name':'Album Design','serviceType':'Wedding Album Design','provider':{'@id':SITE+'#business'},'areaServed':{'@type':'State','name':'Tamil Nadu'}
      }
    ]
  };
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);

  /* ── BUSINESS CLAIMS + CTA CLEANUP ───────────── */
  const heroBody = document.querySelector('.hero-body');
  if (heroBody) heroBody.textContent = 'Wedding photography, candid moments and cinematic films crafted in Chennai for couples across Tamil Nadu.';
  const counters = document.querySelectorAll('.hero-counters .hc');
  if (counters.length >= 3) {
    counters[1].innerHTML = '<span class="hc-static">Chennai</span><label>Based In</label>';
    counters[2].innerHTML = '<span class="hc-static">Tamil Nadu</span><label>Coverage</label>';
  }
  const staticStyle = document.createElement('style');
  staticStyle.textContent = '.hc-static{font-family:var(--serif);font-size:1.45rem;font-weight:900;color:var(--pk);line-height:1.1}.hero-counters .hc label{display:block}';
  document.head.appendChild(staticStyle);

  /* ── CONTACT + WHATSAPP CONVERSION ───────────── */
  const phone = '917708510143';
  const waText = encodeURIComponent('Hi Image Paradise Photography, I would like to enquire about wedding photography.');
  document.querySelectorAll('.ci-row p').forEach(p => {
    if (p.textContent.replace(/\D/g,'').endsWith('7708510143')) {
      const a = document.createElement('a'); a.href = 'tel:+917708510143'; a.textContent = '+91 77085 10143'; a.style.color = 'inherit'; p.replaceWith(a);
    }
  });
  const office = [...document.querySelectorAll('.ci-row')].find(row => row.textContent.includes('Office'));
  if (office) {
    const p = office.querySelector('p');
    if (p) p.textContent = 'No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024';
  }
  document.querySelectorAll('a.soc').forEach(a => { if (a.getAttribute('href') === '#') a.remove(); });
  const wa = document.createElement('a');
  wa.className = 'whatsapp-audit-cta';
  wa.href = `https://wa.me/${phone}?text=${waText}`;
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat with Image Paradise Photography on WhatsApp');
  wa.innerHTML = '<span>WhatsApp</span> Enquire';
  document.body.appendChild(wa);

  /* ── IMAGE METADATA / ACCESSIBILITY ───────────── */
  document.querySelectorAll('img').forEach((img, i) => {
    img.decoding = 'async';
    if (i > 2 && !img.hasAttribute('loading')) img.loading = 'lazy';
    if (img.alt === undefined) img.alt = '';
  });
});
