// ==================== MENU TOGGLE ====================
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('active');
});

navLinksItems.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ==================== SCROLL REVEAL (Enhanced with Stagger) ====================
const revealElements = document.querySelectorAll(
  '.reveal, section, .project-card, .grid-card, .about img'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));


// ==================== HEADER FADE ON SCROLL ====================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    header.style.transition = 'background 0.4s ease';
  } else {
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
});

// ==================== PARALLAX IMAGE (ABOUT) ====================
window.addEventListener('scroll', () => {
  const aboutImg = document.querySelector('.about img');
  if (aboutImg) {
    const offset = window.scrollY * 0.08;
    aboutImg.style.transform = `translateY(${offset}px) scale(1.02)`;
  }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== 3D CARD INTERACTION ====================
// Add slight tilt following mouse movement for interactivity
function tiltCard(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 15).toFixed(2);
    const rotateY = ((centerX - x) / 15).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

// Apply to all project and grid cards
document.querySelectorAll('.project-card, .grid-card').forEach(card => tiltCard(card));
