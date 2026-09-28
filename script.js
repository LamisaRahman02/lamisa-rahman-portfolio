// 1. Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================
// 2. Light / Dark Theme Toggle
// ==========================================
const rootElement = document.documentElement;
const themeButton = document.getElementById('themeToggle');

// Check if user already picked a theme before
let currentTheme = localStorage.getItem('jl-theme') || 'light';
setTheme(currentTheme);

// When the button is clicked, switch themes
themeButton.addEventListener('click', function() {
  if (rootElement.getAttribute('data-theme') === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

function setTheme(themeName) {
  rootElement.setAttribute('data-theme', themeName);
  localStorage.setItem('jl-theme', themeName); // Save for next visit
  
  // Change the button icon
  if (themeName === 'light') {
    themeButton.textContent = '◐';
  } else {
    themeButton.textContent = '◑';
  }
}

// ==========================================
// 3. Mobile Navigation Menu
// ==========================================
const burgerButton = document.getElementById('navBurger');
const navMenu = document.getElementById('navLinks');
const navMenuLinks = navMenu.querySelectorAll('a');

// Open/Close menu when burger icon is clicked
burgerButton.addEventListener('click', function() {
  navMenu.classList.toggle('open');
  
  if (navMenu.classList.contains('open')) {
    burgerButton.textContent = '✕'; // Show close icon
  } else {
    burgerButton.textContent = '☰'; // Show burger icon
  }
});

// Close menu when a link inside it is clicked
navMenuLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navMenu.classList.remove('open');
    burgerButton.textContent = '☰';
  });
});

// ==========================================
// 4. Resume Tabs (Education / Experience / Skills)
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    
    // Step 1: Remove "active" class from all buttons and panels
    tabButtons.forEach(function(btn) { btn.classList.remove('active'); });
    tabPanels.forEach(function(panel) { panel.classList.remove('active'); });
    
    // Step 2: Add "active" class to the clicked button
    button.classList.add('active');
    
    // Step 3: Find the matching panel using data-tab and show it
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    
    // Step 4: If skills tab is clicked, animate the progress bars
    if (tabId === 'skills') {
      const bars = document.querySelectorAll('.bar-fill');
      bars.forEach(function(bar) {
        const percentage = bar.getAttribute('data-pct');
        bar.style.width = percentage + '%';
      });
    }
  });
});

// ==========================================
// 5. Scroll Reveal Animation
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

// We use IntersectionObserver to detect when an element scrolls into view
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in'); // Adds CSS class that fades it in
      observer.unobserve(entry.target); // Stop observing once it appears
    }
  });
}, { threshold: 0.15 });

// Start observing every element with the class "reveal"
revealElements.forEach(function(element) {
  observer.observe(element);
});

// ==========================================
// 6. Active Nav Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let currentSection = 'top';
  
  // Find out which section is currently on screen
  sections.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 120) {
      currentSection = section.id;
    }
  });
  
  // Highlight the matching link in the navbar
  allNavLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// 7. Simple Form Submit
// ==========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop page from refreshing
  
  const nameInput = document.getElementById('name').value;
  
  // Show success message
  formStatus.textContent = "Thanks, " + nameInput + "! Your message looks good. (Demo form: no data sent.)";
  formStatus.classList.add('show');
  
  // Clear the form fields
  contactForm.reset();
});
