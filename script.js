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

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksMenu.classList.toggle('active');
        document.body.style.overflow = navLinksMenu.classList.contains('active') ? 'hidden' : 'auto';  
    });
}

//Smooth scroll for all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        //Close mobile menu
        menuToggle.classList.remove('active');
        navLinksMenu.classList.remove('active');
        document.body.style.overflow = 'auto';

        //Smooth scroll to section
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

//Logo click - scroll to top
const logo = document.querySelector('logo');
if (logo) {
    logo.addEventListener('click', () => {
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

//Intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

//Initialize elements for fade-in
document.querySelectorAll('.bento-box, .stat-card, .project-card, .cert-card, .skill-category, .tool-card, .soft-skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(element);
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
        const y = e.clientY - rect.top - seze / 2;

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
