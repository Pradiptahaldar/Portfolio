// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Stagger siblings
document.querySelectorAll('.skills-grid, .projects-list, .edu-list').forEach(parent => {
  parent.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});