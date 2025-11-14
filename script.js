// Hero typing effect with multiple roles
const typedElement = document.getElementById('typed-name');
if (typedElement) {
    const roles = [
        'a Full Stack Developer',
        'an ML Enthusiast'
    ];
    
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenRoles = 2000;
    const pauseAfterComplete = 1000;

    const type = () => {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting && charIndex <= currentRole.length) {
            // Typing forward
            typedElement.textContent = currentRole.substring(0, charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (!isDeleting && charIndex > currentRole.length) {
            // Pause after completing a role
            setTimeout(() => {
                isDeleting = true;
                type();
            }, pauseAfterComplete);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            charIndex--;
            typedElement.textContent = currentRole.substring(0, charIndex);
            setTimeout(type, deletingSpeed);
        } else if (isDeleting && charIndex === 0) {
            // Move to next role
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(type, pauseBetweenRoles);
        }
    };

    // Start typing
    type();
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll indicator click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Side animation observer - triggers every time section enters viewport
const sideAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            // Remove animate class when leaving viewport so it can animate again
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Apply side animations to sections
document.addEventListener('DOMContentLoaded', () => {
    // Apply alternating side animations to main sections
    const sections = document.querySelectorAll('#about, #journey, #projects, #contact');
    sections.forEach((section, index) => {
        // Alternate between left and right
        if (index % 2 === 0) {
            section.classList.add('slide-in-left');
        } else {
            section.classList.add('slide-in-right');
        }
        sideAnimationObserver.observe(section);
    });

    // Keep existing animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Reset when leaving viewport so it can animate again
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .journey-item, .skill-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(el);
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

