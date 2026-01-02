// Scroll Animation Observer
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll reveal elements
  const scrollElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
  );
  
  scrollElements.forEach(el => observer.observe(el));

  return observer;
}

// Add staggered animation delays
export function addStaggerDelay(selector, baseDelay = 0, increment = 100) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.transitionDelay = `${baseDelay + (index * increment)}ms`;
  });
}

// Parallax effect
export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Mouse move parallax
export function initMouseParallax() {
  const parallaxElements = document.querySelectorAll('[data-mouse-parallax]');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.mouseParallax || 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}
