/**
 * مؤسسة سوسن أحمد صالح العسلي للتكييف والتبريد - Main Interactive & Parallax Engine
 * Susan Ahmed Saleh Al-Asali Establishment for AC & Appliance Repair - Makkah
 * Tel: 059 837 9204 | WhatsApp: 966598379204
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Menu Toggle with Frosted Backdrop
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('is-active', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      mobileToggle.innerHTML = isActive 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events:none;"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events:none;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events:none;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });

    // Close on navigation link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events:none;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events:none;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });
  }

  // 2. Sticky Header with Scroll Effect & Scroll-to-Top Button
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 25) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollPos > 320) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Staggered Scroll Reveal Animations
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .service-card, .review-card, .process-card, .trust-item, .brand-card, .gallery-card, .nh-card, .calc-card, .warranty-banner'
  );
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      el.classList.add('reveal-ready');
      el.style.transitionDelay = `${(index % 4) * 0.06}s`;
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Subtle 3D Card Tilt Effect on Hover (Desktop)
  if (window.matchMedia('(min-width: 992px)').matches) {
    const tiltCards = document.querySelectorAll('.hero-img-box, .service-card, .gallery-card, .warranty-banner');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 5. Scroll Parallax for Hero Live Badge & Floating Decor
  const heroLiveBadge = document.querySelector('.hero-live-badge');
  const heroImgBox = document.querySelector('.hero-img-box');

  if (heroLiveBadge && heroImgBox && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        heroLiveBadge.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    }, { passive: true });
  }

  // 6. Quick Symptom Chips click-to-WhatsApp
  const symptomChips = document.querySelectorAll('.symptom-chip, .chip');
  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
      const symptomText = chip.getAttribute('data-symptom') || chip.textContent.trim();
      let message = '';
      if (isEnglish) {
        message = `Hello Susan Al-Asali Establishment for AC & Appliance Repair,\nI have an issue with (${symptomText}) in Makkah and need an immediate technician without prior appointment.`;
      } else {
        message = `مرحباً مؤسسة سوسن أحمد صالح العسلي للتكييف والتبريد،\nأواجه مشكلة في (${symptomText}) بمكة المكرمة وأحتاج فني صيانة بالمنزل فوراً بضمان معتمد.`;
      }
      const url = `https://wa.me/966598379204?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // 7. Neighborhood Card Click -> Book for that specific neighborhood
  const nhCards = document.querySelectorAll('.nh-card[data-district]');
  nhCards.forEach(card => {
    card.addEventListener('click', () => {
      const districtName = card.getAttribute('data-district') || 'الشوقية';
      const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
      let message = '';
      if (isEnglish) {
        message = `Hello Susan Al-Asali Establishment for AC & Appliance Repair,\nI would like to request an in-home technician in (${districtName}), Makkah.`;
      } else {
        message = `مرحباً مؤسسة سوسن أحمد صالح العسلي للتكييف والتبريد،\nأرغب في طلب فني صيانة لمنزلي في حي (${districtName}) بمكة المكرمة. أرجو تأكيد موعد الوصول.`;
      }
      const url = `https://wa.me/966598379204?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 9. Animated Numeric Counters
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isDecimal = target % 1 !== 0;
      const duration = 1200;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = target * easeProgress;

        if (isDecimal) {
          counter.innerText = currentVal.toFixed(1);
        } else {
          counter.innerText = Math.floor(currentVal);
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.querySelector('.hero-stats, .stats-strip');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    runCounters();
  }

  // 10. Auto Dynamic Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
