(function () {
  'use strict';

  // ===== DOM Elements =====
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const portfolioGrid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.portfolio__filter-btn');
  const prevReview = document.getElementById('prevReview');
  const nextReview = document.getElementById('nextReview');
  const reviewsTrack = document.getElementById('reviewsTrack');
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  let reviewIndex = 0;

  // ===== Header scroll =====
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu =====
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== Smooth scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== Intersection Observer (fade-in & portfolio) =====
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .portfolio__item').forEach(el => {
    observer.observe(el);
  });

  // ===== Portfolio filter =====
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const items = portfolioGrid.querySelectorAll('.portfolio__item');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.classList.remove('visible');
          void item.offsetHeight;
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
          item.style.display = 'none';
        }
      });
    });
  });

  // ===== Lightbox =====
  portfolioGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.portfolio__item');
    if (!item) return;
    const img = item.querySelector('img');
    if (img) openLightbox(img.src);
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxFn() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightboxFn);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxFn();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightboxFn();
  });

  // ===== Reviews slider =====
  function updateReviews() {
    const slideWidth = reviewsTrack.parentElement.clientWidth;
    reviewsTrack.style.transform = `translateX(-${reviewIndex * slideWidth}px)`;
  }

  function reviewCountFn() {
    return document.querySelectorAll('.review-card').length;
  }

  prevReview.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewCountFn()) % reviewCountFn();
    updateReviews();
  });

  nextReview.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewCountFn();
    updateReviews();
  });

  window.addEventListener('resize', updateReviews);
  updateReviews();

  // Auto-advance
  setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviewCountFn();
    updateReviews();
  }, 5000);

  // ===== Booking form =====
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());

    // Simulate Telegram notification
    const message = `Новая заявка с лендинга:%0AИмя: ${encodeURIComponent(data.name)}%0AТелефон: ${encodeURIComponent(data.phone)}%0AДата: ${encodeURIComponent(data.date)}%0AПакет: ${encodeURIComponent(data.package)}`;

    // In production: replace with real bot token
    // const token = 'YOUR_BOT_TOKEN';
    // const chatId = 'YOUR_CHAT_ID';
    // await fetch(\`https://api.telegram.org/bot\${token}/sendMessage?chat_id=\${chatId}&text=\${message}\`);

    console.log('Telegram message (simulated):', decodeURIComponent(message));

    bookingForm.reset();
    formSuccess.hidden = false;
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  });

  // ===== Parallax Hero =====
  const heroImg = document.querySelector('.hero__bg img');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
      }
    }, { passive: true });
  }
})();
