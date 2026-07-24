// ProtectX — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  /* nav scroll state */
  const nav = document.querySelector('.nav');
  const onScroll = () => { if(nav) nav.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll); onScroll();

  /* mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); toggle.textContent = '☰';
    }));
  }

  /* scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:.15 });
    revealEls.forEach(el => io.observe(el));

    const sweepEls = document.querySelectorAll('.sweep');
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('swept'), 150); io2.unobserve(e.target); } });
    }, { threshold:.4 });
    sweepEls.forEach(el => io2.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* animated counters */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if(cur >= target){ el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  };
  if(counters.length && 'IntersectionObserver' in window){
    const io3 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ animateCounter(e.target); io3.unobserve(e.target); } });
    }, { threshold:.6 });
    counters.forEach(el => io3.observe(el));
  }

  /* before/after sliders */
  document.querySelectorAll('.ba').forEach(ba => {
    const after = ba.querySelector('.after-img');
    const handle = ba.querySelector('.handle');
    let dragging = false;

    const setPos = (clientX) => {
      const rect = ba.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    };

    handle.addEventListener('pointerdown', (e) => { dragging = true; handle.setPointerCapture(e.pointerId); });
    window.addEventListener('pointerup', () => dragging = false);
    ba.addEventListener('pointermove', (e) => { if(dragging) setPos(e.clientX); });
    ba.addEventListener('click', (e) => setPos(e.clientX));
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* gallery filters */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galItems = document.querySelectorAll('.gal-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      galItems.forEach(item => {
        item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
      });
    });
  });

  /* year */
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  /* active nav link by path */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  /* booking form (static demo submit) */
  const form = document.querySelector('#booking-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if(feedback){
        feedback.textContent = 'Demande envoyée. Nous vous recontactons sous 24h — ou écrivez-nous directement sur WhatsApp pour une réponse immédiate.';
        feedback.style.display = 'block';
      }
      form.reset();
    });
  }
});
