// HAA Lab Static Website JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      
      // Toggle icon
      const icon = this.querySelector('svg');
      if (mobileMenu.classList.contains('open')) {
        icon.innerHTML = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
      } else {
        icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
      });
    });
  }
  
  // Set active navigation link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === 'index.html') || (currentPath === '/index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Publications filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const publicationYears = document.querySelectorAll('.publication-year-section');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Show/hide publications based on category
        publicationYears.forEach(yearSection => {
          const publications = yearSection.querySelectorAll('.publication-card');
          let hasVisiblePublications = false;
          
          publications.forEach(pub => {
            const pubCategory = pub.getAttribute('data-category');
            
            if (category === 'all' || pubCategory === category) {
              pub.style.display = 'block';
              hasVisiblePublications = true;
            } else {
              pub.style.display = 'none';
            }
          });
          
          // Show/hide the year section if it has visible publications
          if (hasVisiblePublications) {
            yearSection.style.display = 'block';
          } else {
            yearSection.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Form submission handling (contact form)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
  
  // Update footer year
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
