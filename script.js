/* ══════════════════════════════════════════════════
   IMAGE PARADISE PHOTOGRAPHY — JAVASCRIPT
   ══════════════════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ──────────────────────────────────── */
  const loader   = document.getElementById('pageLoader');
  const fillEl   = document.getElementById('loaderFill');
  let pct = 0;
  const loadTimer = setInterval(() => {
    pct = Math.min(pct + Math.random() * 20, 95);
    fillEl.style.width = pct + '%';
  }, 80);
  window.addEventListener('load', () => {
    clearInterval(loadTimer);
    fillEl.style.width = '100%';
    setTimeout(() => loader.classList.add('out'), 500);
  });

  /* ── CUSTOM CURSOR ───────────────────────────── */
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cur) {
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
      el.addEventListener('mouseleave', () => { cur.style.width='8px';  cur.style.height='8px';  ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='.5'; });
    });
  }

  /* ── NAVBAR ──────────────────────────────────── */
  const nav      = document.getElementById('nav');
  const ham      = document.getElementById('hamburger');
  const menu     = document.getElementById('navMenu');
  const btt      = document.getElementById('btt');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('slim', window.scrollY > 60);
    btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  ham.addEventListener('click', () => {
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { menu.classList.remove('open'); document.body.style.overflow = ''; });
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SMOOTH SCROLL ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      fetch('/api/contact')
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ───────────────────────────── */
  const revEls = document.querySelectorAll('[data-reveal]');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
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
  const chips    = document.querySelectorAll('.chip');
  const gItems   = document.querySelectorAll('.g-item');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
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
    lbIdx = idx;
    const item = itemArr[lbIdx];
    const img  = item.querySelector('img');
    const cap  = item.querySelector('.g-overlay p');
    const sub  = item.querySelector('.g-overlay span');
    lbStage.innerHTML = '';
    if (img) {
      const im = document.createElement('img');
      im.src = img.src; im.alt = img.alt || '';
      lbStage.appendChild(im);
    }
    lbCap.textContent = (cap ? cap.textContent : '') + (sub ? ' · ' + sub.textContent : '');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  itemArr.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
  lbX.addEventListener('click', closeLB);
  lbL.addEventListener('click', e => { e.stopPropagation(); openLB((lbIdx - 1 + itemArr.length) % itemArr.length); });
  lbR.addEventListener('click', e => { e.stopPropagation(); openLB((lbIdx + 1) % itemArr.length); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') lbL.click();
    if (e.key === 'ArrowRight') lbR.click();
  });

  /* ── TESTIMONIAL SLIDER ──────────────────────── */
  const ttrack   = document.getElementById('ttrack');
  const tdotsEl  = document.getElementById('tdots');
  const tcards   = ttrack.querySelectorAll('.tcard');
  const tTotal   = tcards.length;
  let tCur = 0;

  for (let i = 0; i < tTotal; i++) {
    const d = document.createElement('div');
    d.className = 'tdot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => tGo(i));
    tdotsEl.appendChild(d);
  }
  function tGo(idx) {
    tCur = (idx + tTotal) % tTotal;
    const w = tcards[0].getBoundingClientRect().width + 24;
    ttrack.style.transform = `translateX(-${tCur * w}px)`;
    tdotsEl.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('on', i === tCur));
  }
  const tAuto = setInterval(() => tGo(tCur + 1), 4500);
  window.addEventListener('resize', () => tGo(tCur));

  /* ── CONTACT FORM ────────────────────────────── */
  const eForm   = document.getElementById('eForm');
  const fSuc    = document.getElementById('fSuccess');
  const fsubBtn = document.getElementById('fsub');

  function setErr(id, errId, msg) {
    document.getElementById(id)?.classList.add('bad');
    const e = document.getElementById(errId); if (e) e.textContent = msg;
  }
  function clrErr(id, errId) {
    document.getElementById(id)?.classList.remove('bad');
    const e = document.getElementById(errId); if (e) e.textContent = '';
  }

  function validate() {
    let ok = true;
    const fname   = document.getElementById('f_fname')?.value.trim();
    const lname   = document.getElementById('f_lname')?.value.trim();
    const email   = document.getElementById('f_email')?.value.trim();
    const session = document.getElementById('f_session')?.value;
    const msg     = document.getElementById('f_msg')?.value.trim();

    if (!fname)  { setErr('f_fname','fe_fname','First name required'); ok=false; } else clrErr('f_fname','fe_fname');
    if (!lname)  { setErr('f_lname','fe_lname','Last name required');  ok=false; } else clrErr('f_lname','fe_lname');
    if (!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('f_email','fe_email','Valid email required'); ok=false; } else clrErr('f_email','fe_email');
    if (!session) { setErr('f_session','fe_session','Please select a session'); ok=false; } else clrErr('f_session','fe_session');
    if (!msg||msg.length<20) { setErr('f_msg','fe_msg','Write at least 20 characters'); ok=false; } else clrErr('f_msg','fe_msg');
    return ok;
  }

  ['f_fname','f_lname','f_email','f_session','f_msg'].forEach(id => {
    document.getElementById(id)?.addEventListener('blur', validate);
  });

eForm.addEventListener('submit', e => {

if (!validate()) {
e.preventDefault();
return;
}

fsubBtn.disabled = true;

});
    const payload = {
      firstName:   document.getElementById('f_fname').value.trim(),
      lastName:    document.getElementById('f_lname').value.trim(),
      email:       document.getElementById('f_email').value.trim(),
      phone:       document.getElementById('f_phone').value.trim(),
      sessionType: document.getElementById('f_session').value,
      date:        document.getElementById('f_date').value.trim(),
      budget:      document.getElementById('f_budget').value,
      message:     document.getElementById('f_msg').value.trim(),
      newsletter:  document.getElementById('f_news').checked,
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      await res.json();
    } catch(_) {}

    eForm.style.display = 'none';
    fSuc.classList.add('on');
    fsubBtn.disabled = false;
  });

  /* ── ACTIVE NAV HIGHLIGHT ────────────────────── */
  const secs = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-menu a:not(.nav-enquire)');
  new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting)
        navAs.forEach(a => { a.style.color = a.getAttribute('href')==='#'+en.target.id ? 'var(--pk)' : ''; });
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe && secs.forEach(s => new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) navAs.forEach(a => { a.style.color = a.getAttribute('href')==='#'+en.target.id?'var(--pk)':''; }); });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s));

});
