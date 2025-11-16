// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === 'index.html' && (href === '/' || href === 'index.html')) || (href && currentPage.includes(href.replace('.html','')))) {
      link.classList.add('active');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initMobileMenu();
  });
} else {
  setActiveNavLink();
  initMobileMenu();
}

