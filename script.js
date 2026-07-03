// Ember Coffee - Script for smooth scrolling and interactive elements
(function () {
  "use strict";

  // Smooth scrolling for anchor links
  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Account for fixed header
        behavior: 'smooth'
      });
    }
  }

  // Handle navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target === '#') return;
      smoothScrollTo(target);
    });
  });

  // Sticky header effect
  const header = document.querySelector('.site-header');
  let isScrolled = false;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50 && !isScrolled) {
      header.classList.add('scrolled');
      isScrolled = true;
    } else if (window.scrollY <= 50 && isScrolled) {
      header.classList.remove('scrolled');
      isScrolled = false;
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Also observe the roasts cards specifically
  document.querySelectorAll('.roast-card').forEach(card => {
    observer.observe(card);
  });

  // Initialize fade-in for hero section (since it's not in the DOM yet)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    setTimeout(() => {
      heroSection.classList.add('fade-in');
    }, 100);
  }

  // Also observe story section
  const storySection = document.querySelector('.story-section');
  if (storySection) {
    setTimeout(() => {
      storySection.classList.add('fade-in');
    }, 200);
  }

  // Observe roasts section
  const roastsSection = document.querySelector('.roasts-section');
  if (roastsSection) {
    setTimeout(() => {
      roastsSection.classList.add('fade-in');
    }, 300);
  }
})();