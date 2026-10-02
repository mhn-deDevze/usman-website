/**
 * مؤسسة بوابة غرناطة للسباكة والكهرباء والدهانات بالرياض - High-Performance Interactive Engine
 * Bawabat Garnada Est. - Ultra-Fast, Zero-Lag Architecture (No Scroll Blockers)
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

  // 2. Lightweight Sticky Header & Scroll-to-Top Button
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY;
        if (scrollPos > 30) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }

        if (scrollPos > 400) {
          scrollTopBtn?.classList.add('visible');
        } else {
          scrollTopBtn?.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  // 3. Make all content immediately visible (Zero Lag, No Reveal Delays)
  document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-ready').forEach(el => {
    el.classList.add('is-visible');
  });

  // 4. Quick Service Chips click-to-WhatsApp
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

  // 5. Riyadh Neighborhood Card Click -> WhatsApp Booking for that specific district
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

  // 6. FAQ Accordion
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

  // 7. Stat Counters (Display exact targets instantly)
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = counter.getAttribute('data-target');
    if (target) {
      counter.innerText = target;
    }
  });

  // 8. Auto Dynamic Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 9. Interactive Real Project Videos Player Engine
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const video = card.querySelector('.work-video');
    const wrap = card.querySelector('.video-player-wrap');
    if (!video || !wrap) return;

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

  // 10. Interactive Riyadh District Filter Tabs
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
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
