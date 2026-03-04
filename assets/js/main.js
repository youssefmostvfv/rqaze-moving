/**
 * ركاز لنقل العفش - Premium Furniture Moving Services Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initNavbar();
  initFAQ();
  initScrollAnimations();
  initSmoothScroll();
  initNavbarScroll();
  initCounters();
});

/**
 * Navbar Mobile Toggle
 */
function initNavbar() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = menu.querySelectorAll('.navbar__link');
    links.forEach(link => {
      link.addEventListener('click', function () {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
}

/**
 * FAQ Accordion
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Navbar scroll effect
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Counter Animation
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-card__number');

  if (counters.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const text = counter.textContent;

        // Extract number from text (e.g., "+2000" -> 2000, "98%" -> 98)
        const match = text.match(/[\d.]+/);
        if (match) {
          const target = parseFloat(match[0]);
          const suffix = text.replace(/[\d.]+/, '');
          animateCounter(counter, target, suffix);
        }

        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element, target, suffix) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const isDecimal = target % 1 !== 0;

  function updateCounter() {
    current += increment;
    if (current < target) {
      element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + suffix;
    }
  }

  updateCounter();
}
