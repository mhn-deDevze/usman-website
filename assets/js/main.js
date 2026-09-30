/**
 * مؤسسة بوابة غرناطة للسباكة والكهرباء والدهانات بالرياض - Main Interactive & Animation Engine
 * Bawabat Garnada Est. - Plumbing, Electrical, Painting & Renovation Services
 * شارع خالد بن الوليد، الرياض 13241 | هاتف: 054 660 1168 | واتساب: 966546601168
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Menu Toggle with Backdrop
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
    '.reveal-up, .reveal-fade, .service-card, .review-card, .process-card, .trust-item, .brand-card, .gallery-card, .nh-card, .calc-card, .warranty-banner, .feature-box'
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

  // 5. Hardware-Accelerated 60fps Parallax Controller
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
  const parallaxOrbs = document.querySelectorAll('.parallax-orb');
  const floatingSpecBadges = document.querySelectorAll('.hero-spec-badge');
  const heroLiveBadge = document.querySelector('.hero-live-badge');

  if (window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let latestScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
      // 1. Elements with explicit data-parallax-speed
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
        const rect = el.getBoundingClientRect();
        const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        el.style.transform = `translate3d(0, ${centerOffset * speed}px, 0)`;
      });

      // 2. Ambient background glow orbs
      parallaxOrbs.forEach((orb, i) => {
        const speed = (i % 2 === 0) ? 0.08 : -0.06;
        orb.style.transform = `translate3d(0, ${latestScrollY * speed}px, 0)`;
      });

      // 3. Hero Spec Badges gentle offset
      if (latestScrollY < 800) {
        floatingSpecBadges.forEach((badge, i) => {
          const speed = (i === 0) ? 0.06 : -0.05;
          badge.style.transform = `translate3d(0, ${latestScrollY * speed}px, 0)`;
        });
        if (heroLiveBadge) {
          heroLiveBadge.style.transform = `translate3d(0, ${latestScrollY * 0.08}px, 0)`;
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      latestScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial calculation
    window.requestAnimationFrame(updateParallax);
  }

  // 6. Quick Service Chips click-to-WhatsApp
  const symptomChips = document.querySelectorAll('.symptom-chip, .chip');
  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
      const symptomText = chip.getAttribute('data-symptom') || chip.textContent.trim();
      let message = '';
      if (isEnglish) {
        message = `Hello Bawabat Garnada Plumbing & Electrical Riyadh,\nI need immediate assistance with (${symptomText}) in Riyadh. Please confirm technician availability.`;
      } else {
        message = `مرحباً مؤسسة بوابة غرناطة للسباكة والكهرباء بالرياض،\nأحتاج فني متخصص فوراً لخدمة (${symptomText}) بالرياض بضمان معتمد. أرجو التواصل وتأكيد الموعد.`;
      }
      const url = `https://wa.me/966546601168?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // 7. Riyadh Neighborhood Card Click -> WhatsApp Booking for that specific district
  const nhCards = document.querySelectorAll('.nh-card[data-district]');
  nhCards.forEach(card => {
    card.addEventListener('click', () => {
      const districtName = card.getAttribute('data-district') || 'العقيق';
      const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
      let message = '';
      if (isEnglish) {
        message = `Hello Bawabat Garnada Est.,\nI would like to request an on-site technician (plumber / electrician / painter) in (${districtName}), Riyadh.`;
      } else {
        message = `مرحباً مؤسسة بوابة غرناطة للسباكة والكهرباء،\nأرغب في طلب فني صيانة لمنزلي في حي (${districtName}) بالرياض (سباكة / كهرباء / دهانات). أرجو تأكيد موعد الوصول.`;
      }
      const url = `https://wa.me/966546601168?text=${encodeURIComponent(message)}`;
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

  // 11. Interactive Real Project Videos Player Engine
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const video = card.querySelector('.work-video');
    const wrap = card.querySelector('.video-player-wrap');
    if (!video || !wrap) return;

    // Hover or tap to play/pause
    const togglePlay = () => {
      if (video.paused) {
        video.play().then(() => {
          wrap.classList.remove('paused');
        }).catch(() => {});
      } else {
        video.pause();
        wrap.classList.add('paused');
      }
    };

    wrap.addEventListener('click', togglePlay);

    // Desktop hover auto-preview
    if (window.matchMedia('(min-width: 992px)').matches) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
        wrap.classList.remove('paused');
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
        wrap.classList.add('paused');
      });
    }
  });

  // 12. Interactive Radial Spotlight / Cursor Glow on Bespoke Cards
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const spotlightCards = document.querySelectorAll(
      '.service-card, .feature-card-alt, .workflow-card, .video-card, .calc-card, .district-detail-card, .review-card, .nh-card'
    );
    
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // 13. Interactive Riyadh District Filter Tabs
  const districtTabs = document.querySelectorAll('.filter-tab-btn');
  const districtCards = document.querySelectorAll('.nh-card');

  if (districtTabs.length > 0 && districtCards.length > 0) {
    districtTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        districtTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter') || 'all';

        districtCards.forEach(card => {
          const region = card.getAttribute('data-region') || '';
          if (filter === 'all' || region === filter) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});


