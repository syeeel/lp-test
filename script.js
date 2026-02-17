// ========================================
// Hamburger Menu
// ========================================
const hamburger = document.getElementById('hamburger');
const gnavList = document.getElementById('gnav-list');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  gnavList.classList.toggle('active');
});

// Close menu on nav link click
gnavList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    gnavList.classList.remove('active');
  });
});

// ========================================
// Scroll-triggered Animations
// ========================================
const animItems = document.querySelectorAll('.anim-item');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animItems.forEach(el => animObserver.observe(el));

// ========================================
// Header scroll state + transparency
// ========================================
const header = document.querySelector('.header');
const fvSection = document.getElementById('fv');

const handleHeaderScroll = () => {
  const scrollY = window.scrollY;
  const fvHeight = fvSection ? fvSection.offsetHeight : 0;

  if (scrollY > fvHeight - 80) {
    header.classList.add('scrolled');
    header.classList.remove('header--transparent');
  } else if (scrollY > 40) {
    header.classList.add('scrolled');
    header.classList.remove('header--transparent');
  } else {
    header.classList.remove('scrolled');
    if (fvSection) {
      header.classList.add('header--transparent');
    }
  }
};

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

// ========================================
// Hero parallax
// ========================================
const fvBgImg = document.getElementById('fv-bg-img');

const handleParallax = () => {
  if (!fvBgImg || !fvSection) return;
  const scrollY = window.scrollY;
  const fvHeight = fvSection.offsetHeight;

  if (scrollY <= fvHeight) {
    const parallaxOffset = scrollY * 0.35;
    fvBgImg.style.transform = `translateY(${parallaxOffset}px) scale(1.02)`;

    // Fade out hero content on scroll
    const fvContent = fvSection.querySelector('.fv-content');
    const progress = Math.min(scrollY / (fvHeight * 0.6), 1);
    if (fvContent) {
      fvContent.style.opacity = 1 - progress * 0.8;
      fvContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  }
};

window.addEventListener('scroll', handleParallax, { passive: true });
handleParallax();

// ========================================
// Smooth scroll with header offset
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ========================================
// Counter animation for stats (hero)
// ========================================
const statNums = document.querySelectorAll('.fv-stat-num');
let statsAnimated = false;

const animateCounter = (el) => {
  const text = el.textContent.trim();

  // Only animate pure numbers
  const numMatch = text.replace(/,/g, '').match(/^(\d+)$/);
  if (!numMatch) return;

  const target = parseInt(numMatch[1]);
  const duration = 1800;
  const startTime = performance.now();
  const hasComma = text.includes(',');

  el.textContent = '0';

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.round(target * eased);

    el.textContent = hasComma ? current.toLocaleString() : String(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNums.forEach(el => animateCounter(el));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.fv-stats');
if (statsContainer) {
  statsObserver.observe(statsContainer);
}

// ========================================
// Counter animation for trust bar
// ========================================
const trustNums = document.querySelectorAll('.trust-num');
let trustAnimated = false;

const animateTrustCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target'));
  const hasComma = el.getAttribute('data-comma') === 'true';
  if (!target) return;

  const duration = 2000;
  const startTime = performance.now();
  el.textContent = '0';

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.round(target * eased);

    el.textContent = hasComma ? current.toLocaleString() : String(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const trustObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !trustAnimated) {
      trustAnimated = true;
      trustNums.forEach(el => animateTrustCounter(el));
      trustObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const trustBar = document.querySelector('.trust-bar');
if (trustBar) {
  trustObserver.observe(trustBar);
}

// ========================================
// Floating mobile CTA
// ========================================
const floatingCta = document.getElementById('floating-cta');
const ctaSection = document.getElementById('register');

if (floatingCta && fvSection && ctaSection) {
  const handleFloatingCta = () => {
    const scrollY = window.scrollY;
    const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
    const ctaTop = ctaSection.offsetTop - window.innerHeight;

    if (scrollY > fvBottom && scrollY < ctaTop) {
      floatingCta.classList.add('visible');
      floatingCta.setAttribute('aria-hidden', 'false');
    } else {
      floatingCta.classList.remove('visible');
      floatingCta.setAttribute('aria-hidden', 'true');
    }
  };

  window.addEventListener('scroll', handleFloatingCta, { passive: true });
  handleFloatingCta();
}

// ========================================
// Smooth FAQ accordion
// ========================================
document.querySelectorAll('.faq-item').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.faq-answer');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (details.open) {
      // Closing
      content.style.maxHeight = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
      });
      const onClose = () => {
        details.open = false;
        content.style.maxHeight = '';
        content.removeEventListener('transitionend', onClose);
      };
      content.addEventListener('transitionend', onClose);
    } else {
      // Opening
      details.open = true;
      const height = content.scrollHeight;
      content.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        content.style.maxHeight = height + 'px';
      });
      const onOpen = () => {
        content.style.maxHeight = '';
        content.removeEventListener('transitionend', onOpen);
      };
      content.addEventListener('transitionend', onOpen);
    }
  });
});
