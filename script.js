
// Prevent multiple navigations
let isNavigating = false;

// Simple navigation function
function navigateTo(url) {
    // Prevent multiple navigations
    if (isNavigating) return;
    
    // Don't navigate if it's the same page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (url === currentPage) return;
    
    isNavigating = true;
    window.location.href = url;
}

// Initialize navigation links using event delegation to prevent duplicates
function initNavigation() {
    // Remove any existing listeners by using event delegation on document
    document.removeEventListener('click', handleNavClick);
    document.addEventListener('click', handleNavClick);
}

function handleNavClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip external links, email, phone, and anchors
    if (!href || 
        href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href.startsWith('#') ||
        link.target === '_blank') {
        return;
    }
    
    // Only handle navigation links (nav, logo, or contact links)
    const isNavLink = link.closest('.nav-links') !== null;
    const isLogo = link.classList.contains('logo');
    const isContactLink = link.classList.contains('contact-link');
    
    if (!isNavLink && !isLogo && !isContactLink) {
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    // Handle relative paths
    let url = href;
    if (href === 'index.html' || href === './index.html' || href === '/' || href === '') {
        url = 'index.html';
    } else if (!href.includes('.html')) {
        url = href + '.html';
    }
    
    navigateTo(url);
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === 'index.html' && (href === '/' || href === 'index.html')) ||
            (currentPage.includes('about') && href.includes('about')) ||
            (currentPage.includes('experience') && href.includes('experience')) ||
            (currentPage.includes('projects') && href.includes('projects')) ||
            (currentPage.includes('skills') && href.includes('skills')) ||
            (currentPage.includes('awards') && href.includes('awards')) ||
            (currentPage.includes('contact') && href.includes('contact'))) {
            link.classList.add('active');
        }
    });
}

// Fade-in on scroll
function handleScroll() {
    const elements = document.querySelectorAll('.card, .project-card, .skill-category, .award-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
    });
}


// Initialize on page load
let initialized = false;
function initialize() {
    if (initialized) return;
    initialized = true;
    
    initNavigation();
    setActiveNavLink();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

// Use both DOMContentLoaded and load events, but only initialize once
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

