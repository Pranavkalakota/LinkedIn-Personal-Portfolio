// Portfolio Website JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 64; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Intersection Observer for fade-in animations with better timing
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger animations for child elements with stagger
                const children = entry.target.querySelectorAll('.experience-card, .research-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150); // Increased delay for smoother stagger
                });

                // Animate skill tags
                const skillTags = entry.target.querySelectorAll('#skills .flex.flex-wrap span');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.animationPlayState = 'running';
                    }, index * 30);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-fade-in');
        observer.observe(section);
    });

    // Observe project cards individually for staggered effect
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset + 100;

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    const targetTop = target.offsetTop;
                    const targetBottom = targetTop + target.offsetHeight;

                    if (scrollPosition >= targetTop && scrollPosition < targetBottom) {
                        // Remove active from all links
                        navLinks.forEach(l => l.classList.remove('active'));
                        // Add active to current link
                        link.classList.add('active');
                    }
                }
            }
        });
    });

    // Handle resume download tracking (optional)
    const resumeLinks = document.querySelectorAll('a[href*="resume"]');
    resumeLinks.forEach(link => {
        link.addEventListener('click', function () {
            // You can add analytics tracking here
            console.log('Resume download initiated');
        });
    });

    // Add loading state for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.remove('loading');
        });

        img.addEventListener('error', function () {
            console.log('Image failed to load:', this.src);
        });
    });

    // Form validation (if contact form is added later)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }

    // Parallax effect for hero section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.fade-in a[href=\"#projects\"]');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', function () {
            button.style.transform = '';
        });
    });

    // Smooth reveal for about section stats
    const statsCards = document.querySelectorAll('#about .grid > div');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    statsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        statsObserver.observe(card);
    });

    // Smooth hover effect for skill cards
    const skillCards = document.querySelectorAll('#skills > div > div > div > div');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // Console message
    console.log('%c👋 Hello! Welcome to my portfolio.', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in collaborating? Reach out via the contact section!', 'color: #6b7280; font-size: 12px;');
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(function () {
    // Add any scroll-based logic here
}, 100);

window.addEventListener('scroll', handleScroll);

// Handle external links
document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        // External link clicked
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Lazy loading for images (if not using native lazy loading)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}