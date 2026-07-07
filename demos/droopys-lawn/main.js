// Greenhaven — shared interactivity across all pages of the Standard demo.

/* ---------- Mobile nav ---------- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ---------- Graceful image fallback ----------
   If a stock photo fails to load, fade in a leafy gradient instead. */
document.querySelectorAll('.ph img').forEach((img) => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.classList.add('img-fallback');
  });
});

/* ---------- Reveal on scroll ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---------- Contact form (contact page only) ----------
   Demo handler: validates, then shows an inline success message.
   For a real client we point form.action at Formspree/Web3Forms and POST. */
(function () {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status ' + (type || '');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      setStatus('Please add your name, a valid email, and a few details.', 'error');
      return;
    }
    // Demo: no real backend wired up. Confirm to the visitor and reset.
    setStatus("Thanks, " + name + "! This is a demo form — on a live site this would land in the owner's inbox. We'll be in touch within one business day.", 'success');
    form.reset();
  });
})();
