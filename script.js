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
  
  console.log('Viewport width:', window.innerWidth);
  console.log('Hamburger element:', hamburger);
  console.log('Nav menu element:', navMenu);
  console.log('Hamburger display:', window.getComputedStyle(hamburger)?.display);
  
  if (!hamburger || !navMenu) {
    console.warn('Hamburger or nav menu not found');
    return;
  }
  
  // Prevent default behavior and toggle menu
  hamburger.addEventListener('click', (e) => {
    console.log('Hamburger clicked!');
    e.preventDefault();
    e.stopPropagation();
    const isActive = navMenu.classList.contains('active');
    console.log('Menu currently active:', isActive, '-> toggling to', !isActive);
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      navMenu.classList.remove('active');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initMobileMenu();
  });
} else {
  setActiveNavLink();
  initMobileMenu();
}

