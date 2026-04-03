/* ============================================================
   AURA TRAVEL – Main JavaScript
   ============================================================ */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes
const animateElements = document.querySelectorAll(
  '.brand-grid, .pacchetto-hero, .hotel-card-featured, .ristorante-card, .gallery-item, .perche-card, .testi-card, .contatti-grid, .day-card, .incluso-item'
);

animateElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
  observer.observe(el);
});

// Visible class trigger
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);

// ===== FORM SUBMISSION =====
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');

  // Simulate form submission
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;

  setTimeout(() => {
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }, 1500);
}

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption h4');

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.92);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      cursor: zoom-out; padding: 24px;
    `;

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.style.cssText = `
      max-width: 90vw; max-height: 80vh;
      object-fit: contain; border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;

    const titleEl = document.createElement('p');
    titleEl.textContent = caption ? caption.textContent : '';
    titleEl.style.cssText = `
      color: rgba(255,255,255,0.8); margin-top: 20px;
      font-family: 'Playfair Display', serif; font-size: 1.2rem;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 24px;
      background: rgba(255,255,255,0.15); border: none;
      color: white; width: 44px; height: 44px;
      border-radius: 50%; font-size: 1.1rem; cursor: pointer;
      transition: background 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.3)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255,255,255,0.15)';

    overlay.appendChild(imgEl);
    overlay.appendChild(titleEl);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    const close = () => document.body.removeChild(overlay);
    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });

    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('it-IT') + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent;
        if (text.includes('5.000')) animateCounter(el, 5000, '+');
        else if (text.includes('15')) animateCounter(el, 15, '+');
        else if (text.includes('98')) animateCounter(el, 98, '%');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const brandStats = document.querySelector('.brand-stats');
if (brandStats) statsObserver.observe(brandStats);

// ===== SET MIN DATE FOR DATE INPUT =====
const dateInput = document.getElementById('data');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
