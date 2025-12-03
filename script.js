// =============== Navbar Functionality ==================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksMenu = document.querySelector('.nav-links');

//Navbar scroll effect with progress bar
window.addEventListener('scroll', () => {
    // Add scrolled class
    if (window.scrollY > 50){
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }

    //Highlight active section
    highlightActiveSection();
})

//Highlight active section in navbar
function highlightActiveSection() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if ( href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Highlight "Projects" nav link when on overview page
document.querySelectorAll('.nav-links a').forEach(link => {
    if(link.href.includes('projects')) {
        link.classList.add('active');
    }
});

// ==================== MOBILE MENU WITH OVERLAY ====================

// Create overlay element
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

// Add overlay styles
const overlayStyle = document.createElement('style');
overlayStyle.textContent = `
    .menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 998; /* Below navbar (999) but above content */
        pointer-events: none;
    }
    
    .menu-overlay.active {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;
document.head.appendChild(overlayStyle);


// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

// Function to toggle menu
function toggleMenu() {
    const isActive = navLinksMenu.classList.contains('active');
    
    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Function to open menu
function openMenu() {
    menuToggle.classList.add('active');
    navLinksMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    //Force solid background for mobile menu
    navLinksMenu.style.background = ' hsla(220, 96%, 10%, 0.8)';
}

// Function to close menu
function closeMenu() {
    menuToggle.classList.remove('active');
    navLinksMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';

    //Remove inline style to let CSS handle it
    navLinksMenu.style.background = '';
}

// Close menu when clicking overlay
menuOverlay.addEventListener('click', () => {
    closeMenu();
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Close mobile menu
        closeMenu();

        // Smooth scroll to section
        const href = link.getAttribute('href');
        const targetSection = document.querySelector(href);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SWIPE TO CLOSE MENU ====================

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Detect swipe gestures on the navigation menu
if (navLinksMenu) {
    navLinksMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    navLinksMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });
}

function handleSwipeGesture() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Check if it's primarily a horizontal swipe (not vertical scroll)
    if (Math.abs(horizontalDistance) > verticalDistance) {
        // Swipe right detected
        if (horizontalDistance > swipeThreshold && navLinksMenu.classList.contains('active')) {
            closeMenu();
        }
    }
}

// Close mobile menu on window resize to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

//Logo click - scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================== HERO SECTION =====================

// Typing Animations 
const typingText = document.getElementById('typingText');
const roles = [
    'Cybersecurity Professional',
    'Network Defender',
    'Security Enthusiast',
    'Penetration Tester'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    }
    else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
    else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ==================== SCROLL ANIMATIONS ===================

//Intersection Observer for SECTIONS
const sectionObserverOptions = {
    thershold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((enteries) => {
    enteries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
        else {
            entry.target.classList.remove('section-visible');
        }
    });
}, sectionObserverOptions);

//Observe section, not individual elements
const sectionsToAnimate = document.querySelectorAll('section, .about-me, .skills-section, .projects, .certifications, footer');

sectionsToAnimate.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add CSS class for hidden/visible state
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(80px);
        transition: opacity 1s ease, transform 1s ease;
    }
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(sectionStyle);

// =================== INDIVIDUAL ITEMS ANIMATION =============
const itemObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Animate in
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // staggered delay
        }
        else {
            //Reset when out of view
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
        }
    });
}, itemObserverOptions);

// Apply animation styles and observe
document.querySelectorAll('.bento-box, .skill-category, .project-card, .cert-card, .tool-card, .soft-skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    itemObserver.observe(element);
});

// Only animate items INSIDE sections (with delays)
document.querySelectorAll('.bento-box, .skill-category, .project-card, .cert-card, .tool-card, .soft-skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    itemObserver.observe(element);
});

// ==================== SKILLS SECTION ======================

//Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        //Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        //Add active class to clicked tab
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        //Animate progress bars when technical tab is shown
        if (tabId === 'technical') {
            animateProgressBars();
        }
    });
});

// Animate skill progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Initial animation for progress bars
const skillsSection = document.querySelector('.skills-section');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            animateProgressBars();
            skillsObserver.disconnect();
        }
    });
}, { threshold: 0.3});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==================== PROJECTS SECTION ====================

// Filter button functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        //Filter logic 
        const filter = btn.textContent.trim();
        projectCards.forEach(card => {
            if (filter === 'All Projects') {
                card.style.display = 'flex';
            }
            else {
                //Add custom filter logic here
                card.style.display = 'flex';
            }
        });
    });
});

// Project button interactions 
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Project button clicked:', this.textContent.trim());
        //Add project button logic here (open Github, live demo, etc.)
    });
});

// GitHub button
const githubBtn = document.querySelector('.github-btn');
if (githubBtn) {
    githubBtn.addEventListener('click', () => {
        window.open('myprofile', '_blank');
    })
}

// ==================== CERTIFICATIONS SECTION ================

// Certification card click
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Certification clicked');
        // Add modal or redirect logic here
    });
});

// Certification links
document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        // Add credential verification link here
    });
});

// =================== FOOTER ===========================

//Contact items click
document.querySelectorAll('.footer-contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('.contact-text').textContent;
        if (text.includes('@')) {
            window.location.href = `mailto:${text}`;
        } else if (text.includes('LinkedIn')) {
            window.open('https://linkedin.com/in/yourprofile', '_blank');
        } else if (text.includes('GitHub')) {
            window.open('https://github.com/yourprofile', '_blank');
        }
    });
});

//Footer links smooth scroll
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================= BUTTON INTERACTION ===============

//Ripple effect on all buttons 
document.querySelectorAll('button, .hero-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

         ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animatiion to style sheet 
const rippleStyle = document.createElement('style');
rippleStyle.textcontent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

//Resume buttons 
document.querySelectorAll('.resume-btn, .cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Add resume url
        window.open('resume-url', '_blank');
    });
});

// Hero CTA Buttons 
const heroBtns = document.querySelectorAll('.hero-btn');
heroBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelectorAll('.hero-btn');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== PARALAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// =================== ANIMATED COUNTER ====================

//Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
        else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

//Triger counter animation when stats are visible
const statsObserver = new IntersectionObserver((enteries) => {
    enteries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const text = num.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    num.textContent = '0';
                    animateCounter(num, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

document.querySelectorAll('.stat-box, .stats-grid').forEach(stats => {
    statsObserver.observe(stats);
});

// ===================== CONSOLE MESSAGE ====================
console.log('%c👋 Welcome to Sheilah Akinyi\'s Portfolio!', 'color: #03D7F7; font-size: 20px; font-weight: bold;');
console.log('%c🛡️ Cybersecurity Enthusiast | Network Defense | System Security', 'color: #00D9FF; font-size: 14px;');
console.log('%cPortfolio loaded successfully! ✨', 'color: #03D7F7; font-size: 12px;');


// ===================== INITIALIZATION =====================

//Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveSection();
    console.log('✅ Portfolio JavaScript initialized successfully!');

    //Trigger initial animations
    setTimeout(() => {
        animateProgressBars();
    }, 1000);
});

//Prevent body scroll when mobile menu is open
navLinksMenu.addEventListener('transitioned', () => {
    if (navLinksMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    }
});

// ==================== RESPONSIVE ADJUSTMENTS ================

//Adjust parallax on resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = 'none';
        }
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        menuToggle.classList.remove('active');
        navLinksMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});