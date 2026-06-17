// Piedmondo — base interactivity

/* ---------- Mobile nav toggle ---------- */
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu after clicking a link (mobile)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Contact form ----------
   No backend yet, so we open the visitor's email client (mailto) with the
   message pre-filled. To collect submissions straight to an inbox instead,
   swap this for a Formspree/Web3Forms endpoint (see README).
*/
const form = document.getElementById('quote-form');
const status = form ? form.querySelector('.form-status') : null;

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const business = (data.get('business') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    // Minimal validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !message) {
      setStatus('Please fill in your name, a valid email, and a message.', 'error');
      return;
    }

    const to = form.dataset.contactEmail || '';
    const subject = `Website quote request — ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || '—'}\n` +
      `Business / Website: ${business || '—'}\n\n` +
      `What they need:\n${message}\n`;

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setStatus("Opening your email app… if nothing happens, email us directly at " + to + ".", 'success');
    form.reset();
  });
}

function setStatus(msg, type) {
  if (!status) return;
  status.textContent = msg;
  status.className = 'form-status ' + (type || '');
}

/* ---------- Scroll reveal + count-up ---------- */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supported = 'IntersectionObserver' in window;

  // Elements that fade/slide in as they enter the viewport
  const revealEls = document.querySelectorAll(
    '.section-head, .card, .price-card, .step, .faq-item, .pitch, .templates-inner, .stat'
  );

  if (reduce || !supported) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    revealEls.forEach((el) => {
      el.classList.add('reveal');
      // Stagger items that share a parent (e.g. cards in a grid)
      const siblings = Array.from(el.parentElement.children);
      const i = siblings.indexOf(el);
      el.style.transitionDelay = Math.min(i * 0.07, 0.42) + 's';
    });

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
    revealEls.forEach((el) => io.observe(el));
  }

  // Count-up for stat numbers with data-count
  const counters = document.querySelectorAll('.stat-num[data-count]');

  function countUp(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (reduce || !supported) {
      counters.forEach((el) => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
      });
    } else {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              countUp(entry.target);
              io2.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => io2.observe(el));
    }
  }
})();
