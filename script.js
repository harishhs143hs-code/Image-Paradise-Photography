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
  if (cur && ring) {
    let rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
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
  const nav      = document.getElementById('nav');
  const ham      = document.getElementById('hamburger');
  const menu     = document.getElementById('navMenu');
  const btt      = document.getElementById('btt');

  /* Mobile menu visual fix: the nav uses backdrop-filter, which can trap a fixed child.
     Disable that containing context while the full-screen mobile menu is open. */
  if (nav && ham && menu) {
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
      @media (max-width: 768px) {
        #nav.menu-open { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: #fff !important; }
        #nav.menu-open .hamburger { position: relative; z-index: 1003; }
        #nav.menu-open .brand { z-index: 1003; }
        .nav-menu.open {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100dvh !important;
          min-height: 100vh !important;
          display: flex !important;
          z-index: 1002 !important;
          background: #fff !important;
          overflow-y: auto !important;
          padding: 6.5rem 1.5rem 2.5rem !important;
          justify-content: flex-start !important;
          gap: 0 !important;
        }
        .nav-menu.open li { width: min(100%, 520px); }
        .nav-menu.open a {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1.05rem 0;
          border-bottom: 1px solid rgba(216,27,96,.12);
          font-family: var(--serif);
          font-size: 1.45rem !important;
          font-weight: 500 !important;
          color: var(--ink) !important;
        }
        .nav-menu.open a::after { display: none !important; }
        .nav-menu.open .nav-enquire {
          justify-content: center !important;
          margin-top: 1.5rem;
          padding: .95rem 1.4rem !important;
          border: 0 !important;
          border-radius: 999px !important;
          color: #fff !important;
          background: var(--pk) !important;
          font-family: var(--sans) !important;
          font-size: 1rem !important;
        }
        .hamburger.is-open { gap: 0; }
        .hamburger.is-open span { background: var(--pk); }
        .hamburger.is-open span:nth-child(1) { transform: translateY(1.5px) rotate(45deg); }
        .hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.is-open span:nth-child(3) { transform: translateY(-1.5px) rotate(-45deg); }
      }
    `;
    document.head.appendChild(mobileMenuStyle);
  }

  if (nav) window.addEventListener('scroll', () => {
    nav.classList.toggle('slim', window.scrollY > 60);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  function syncMenuState() {
    const open = !!(menu && menu.classList.contains('open'));
    if (nav) nav.classList.toggle('menu-open', open);
    if (ham) {
      ham.classList.toggle('is-open', open);
      ham.setAttribute('aria-expanded', String(open));
      ham.setAttribute('aria-label', open ? 'Close menu' : 'Toggle menu');
    }
  }

  if (ham && menu) ham.addEventListener('click', () => {
    menu.classList.toggle('open');
    syncMenuState();
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  if (menu) menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { menu.classList.remove('open'); syncMenuState(); document.body.style.overflow = ''; });
  });
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── REFER & EARN NAV TAB ───────────────────── */
  if (menu && !menu.querySelector('a[href="/refer-earn.html"]')) {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    li.innerHTML = '<a href="/refer-earn.html" role="menuitem" class="nav-refer">Refer &amp; Earn</a>';
    const enquire = menu.querySelector('.nav-enquire')?.closest('li');
    if (enquire) menu.insertBefore(li, enquire); else menu.appendChild(li);
  }

  /* ── SMOOTH SCROLL ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target || !nav) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ───────────────────────────── */
  const revEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const delay = parseInt(en.target.dataset.delay || 0);
        setTimeout(() => en.target.classList.add('in'), delay);
        revObs.unobserve(en.target);
      });
    }, { threshold: 0.1 });
    revEls.forEach(el => revObs.observe(el));
  } else revEls.forEach(el => el.classList.add('in'));

  /* ── COUNTER ANIMATION ───────────────────────── */
  const countEls = document.querySelectorAll('.count');
  if ('IntersectionObserver' in window) {
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.dataset.to || '0', 10);
        let v = 0; const step = target / 70;
        const t = setInterval(() => { v = Math.min(v + step, target); el.textContent = Math.floor(v); if (v >= target) clearInterval(t); }, 20);
        cntObs.unobserve(el);
      });
    }, { threshold: .5 });
    countEls.forEach(el => cntObs.observe(el));
  }

  /* ── GALLERY FILTER ──────────────────────────── */
  const chips = document.querySelectorAll('.chip');
  const gItems = document.querySelectorAll('.g-item');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active')); chip.classList.add('active');
    const f = chip.dataset.f;
    gItems.forEach(item => { const match = f === 'all' || item.dataset.c === f; item.classList.toggle('hidden', !match); item.classList.toggle('visible', match); });
  }));

  /* ── LIGHTBOX ────────────────────────────────── */
  const lb = document.getElementById('lightbox');
  const lbStage = document.getElementById('lbStage');
  const lbCap = document.getElementById('lbCaption');
  const lbX = document.getElementById('lbX');
  const lbL = document.getElementById('lbL');
  const lbR = document.getElementById('lbR');
  const itemArr = Array.from(gItems);
  let lbIdx = 0;
  function openLB(idx) {
    if (!lb || !lbStage) return;
    lbIdx = idx; const item = itemArr[lbIdx]; if (!item) return;
    const img = item.querySelector('img'); const cap = item.querySelector('.g-overlay p'); const sub = item.querySelector('.g-overlay span');
    lbStage.innerHTML = '';
    if (img) { const im = document.createElement('img'); im.src = img.src; im.alt = img.alt || ''; lbStage.appendChild(im); }
    if (lbCap) lbCap.textContent = (cap ? cap.textContent : '') + (sub ? ' · ' + sub.textContent : '');
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeLB() { if (lb) lb.classList.remove('open'); document.body.style.overflow = ''; }
  itemArr.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
  if (lbX) lbX.addEventListener('click', closeLB);
  if (lbL) lbL.addEventListener('click', e => { e.stopPropagation(); if (itemArr.length) openLB((lbIdx - 1 + itemArr.length) % itemArr.length); });
  if (lbR) lbR.addEventListener('click', e => { e.stopPropagation(); if (itemArr.length) openLB((lbIdx + 1) % itemArr.length); });
  if (lb) lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (!lb || !lb.classList.contains('open')) return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft' && lbL) lbL.click(); if (e.key === 'ArrowRight' && lbR) lbR.click(); });

  /* ── TESTIMONIAL SLIDER ──────────────────────── */
  const ttrack = document.getElementById('ttrack');
  const tdotsEl = document.getElementById('tdots');
  if (ttrack && tdotsEl) {
    const tcards = ttrack.querySelectorAll('.tcard'); const tTotal = tcards.length; let tCur = 0;
    for (let i = 0; i < tTotal; i++) { const d = document.createElement('div'); d.className = 'tdot' + (i === 0 ? ' on' : ''); d.addEventListener('click', () => tGo(i)); tdotsEl.appendChild(d); }
    function tGo(idx) { tCur = (idx + tTotal) % tTotal; const w = tcards[0].getBoundingClientRect().width + 24; ttrack.style.transform = `translateX(-${tCur * w}px)`; tdotsEl.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('on', i === tCur)); }
    setInterval(() => tGo(tCur + 1), 4500); window.addEventListener('resize', () => tGo(tCur));
  }

  /* ── CONTACT FORM ────────────────────────────── */
  const eForm = document.getElementById('eForm'); const fsubBtn = document.getElementById('fsub');
  function setErr(id, errId, msg) { document.getElementById(id)?.classList.add('bad'); const el = document.getElementById(errId); if (el) el.textContent = msg; }
  function clrErr(id, errId) { document.getElementById(id)?.classList.remove('bad'); const el = document.getElementById(errId); if (el) el.textContent = ''; }
  function validate() {
    let ok = true; const fname = document.getElementById('f_fname')?.value.trim(); const lname = document.getElementById('f_lname')?.value.trim(); const email = document.getElementById('f_email')?.value.trim(); const session = document.getElementById('f_session')?.value; const msg = document.getElementById('f_msg')?.value.trim();
    if (!fname) { setErr('f_fname','fe_fname','Required'); ok=false; } else clrErr('f_fname','fe_fname');
    if (!lname) { setErr('f_lname','fe_lname','Required'); ok=false; } else clrErr('f_lname','fe_lname');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('f_email','fe_email','Valid email required'); ok=false; } else clrErr('f_email','fe_email');
    if (!session) { setErr('f_session','fe_session','Select one'); ok=false; } else clrErr('f_session','fe_session');
    if (!msg || msg.length < 20) { setErr('f_msg','fe_msg','Minimum 20 characters'); ok=false; } else clrErr('f_msg','fe_msg');
    return ok;
  }
  ['f_fname','f_lname','f_email','f_session','f_msg'].forEach(id => document.getElementById(id)?.addEventListener('blur', validate));
  if (eForm) eForm.addEventListener('submit', e => { if (!validate()) { e.preventDefault(); return; } if (fsubBtn) fsubBtn.disabled = true; });

  /* ── ACTIVE NAV HIGHLIGHT ────────────────────── */
  const secs = document.querySelectorAll('section[id]'); const navAs = document.querySelectorAll('.nav-menu a:not(.nav-enquire):not(.nav-refer)');
  if ('IntersectionObserver' in window) secs.forEach(s => new IntersectionObserver(entries => { entries.forEach(en => { if (en.isIntersecting) navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#'+en.target.id ? 'var(--pk)' : ''; }); }); }, { rootMargin: '-40% 0px -55% 0px' }).observe(s));

  /* ── PERFORMANCE: LAZY LOAD IMAGES ─────────── */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (!entry.isIntersecting) return; const img = entry.target; if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); } img.onload = () => img.classList.add('loaded'); img.onerror = () => { img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FCE4EC" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23D81B60" font-family="sans-serif">Image%3C/text%3E%3C/svg%3E'; }; observer.unobserve(img); }); }, { rootMargin: '50px 0px' });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  /* ── ACCESSIBILITY: ARROW KEY NAVIGATION ───── */
  const menuLinks = menu?.querySelectorAll('a');
  if (menuLinks) Array.from(menuLinks).forEach((link,index,links) => link.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); links[(index+1)%links.length]?.focus(); } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); links[(index-1+links.length)%links.length]?.focus(); } }));

  /* ── PERFORMANCE: BASIC OBSERVABILITY ──────── */
  if ('PerformanceObserver' in window) { try { const lcpObserver = new PerformanceObserver(list => { const entries=list.getEntries(); const lastEntry=entries[entries.length-1]; if(lastEntry) console.log('LCP:',lastEntry.startTime.toFixed(2),'ms'); }); lcpObserver.observe({type:'largest-contentful-paint',buffered:true}); } catch(e) {} }

});
