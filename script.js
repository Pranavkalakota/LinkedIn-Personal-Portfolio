// Portfolio Website JavaScript

// ===== NETWORK BACKGROUND ANIMATION =====
(function initNetworkBackground() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    const nodeCount = 80;
    const connectionDistance = 150;

    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Node class
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            // Colors: blue, cyan, green variations
            const colors = [
                { r: 0, g: 150, b: 255 },    // Blue
                { r: 0, g: 200, b: 200 },    // Cyan
                { r: 0, g: 255, b: 150 },    // Green-cyan
                { r: 0, g: 180, b: 230 },    // Light blue
                { r: 0, g: 220, b: 180 },    // Teal
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Keep in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Initialize nodes
    function initNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }

    // Draw connections between nearby nodes
    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.5;

                    // Gradient line
                    const gradient = ctx.createLinearGradient(
                        nodes[i].x, nodes[i].y,
                        nodes[j].x, nodes[j].y
                    );
                    gradient.addColorStop(0, `rgba(${nodes[i].color.r}, ${nodes[i].color.g}, ${nodes[i].color.b}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${nodes[j].color.r}, ${nodes[j].color.g}, ${nodes[j].color.b}, ${opacity})`);

                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Draw grid pattern
    function drawGrid() {
        const gridSize = 60;
        ctx.strokeStyle = 'rgba(0, 100, 150, 0.1)';
        ctx.lineWidth = 0.5;

        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Diagonal lines for geometric pattern
        ctx.strokeStyle = 'rgba(0, 150, 200, 0.05)';
        for (let x = -canvas.height; x < canvas.width + canvas.height; x += gridSize * 2) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + canvas.height, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + canvas.height, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
    }

    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clear with slight fade for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGrid();
        drawConnections();

        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initNodes();
    });

    // Start
    resizeCanvas();
    initNodes();
    animate();
})();

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

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const charCounter = document.getElementById('char-counter');
    const messageField = document.getElementById('message');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Validation limits
    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 254;
    const MAX_SUBJECT_LENGTH = 200;
    const MAX_MESSAGE_LENGTH = 1000;

    // Allowed email domains
    const ALLOWED_EMAIL_DOMAINS = [
        'gmail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.ca', 'yahoo.in',
        'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'bing.com',
        'icloud.com', 'me.com', 'mac.com',
        'aol.com', 'protonmail.com', 'proton.me',
        'zoho.com', 'yandex.com', 'mail.com',
        'gmx.com', 'gmx.net', 'fastmail.com',
        'purdue.edu', 'edu' // Allow .edu domains
    ];

    // Helper function to show error and highlight field
    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        if (inputElement) {
            inputElement.classList.add('border-red-500', 'ring-2', 'ring-red-200');
            inputElement.classList.remove('border-gray-300');
        }
    }

    // Helper function to hide error and reset field
    function hideError(inputElement, errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
        if (inputElement) {
            inputElement.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            inputElement.classList.add('border-gray-300');
        }
    }

    // Helper function to validate email format and domain
    function validateEmail(email) {
        // Basic email format regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address format.' };
        }

        // Check email length
        if (email.length > MAX_EMAIL_LENGTH) {
            return { valid: false, message: `Email must be ${MAX_EMAIL_LENGTH} characters or less.` };
        }

        // Extract domain
        const domain = email.split('@')[1].toLowerCase();

        // Check if domain is allowed (either exact match or ends with .edu)
        const isAllowed = ALLOWED_EMAIL_DOMAINS.some(allowed => {
            if (allowed === 'edu') {
                return domain.endsWith('.edu');
            }
            return domain === allowed;
        });

        if (!isAllowed) {
            return {
                valid: false,
                message: 'Please use a valid email provider (Gmail, Yahoo, Outlook, etc.) or .edu email.'
            };
        }

        return { valid: true };
    }

    // Character counter for message field
    if (messageField && charCounter) {
        messageField.addEventListener('input', function () {
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength}/${MAX_MESSAGE_LENGTH}`;

            // Change color when approaching limit
            if (currentLength >= MAX_MESSAGE_LENGTH) {
                charCounter.className = 'text-sm text-red-400';
            } else if (currentLength >= MAX_MESSAGE_LENGTH * 0.9) {
                charCounter.className = 'text-sm text-yellow-500';
            } else {
                charCounter.className = 'text-sm text-gray-400';
            }

            // Hide error if user is fixing it
            if (currentLength > 0 && currentLength <= MAX_MESSAGE_LENGTH) {
                hideError(messageField, messageError);
            }
        });
    }

    // Real-time validation on input and blur
    if (nameField) {
        // Clear error on input
        nameField.addEventListener('input', function () {
            if (this.value.length > MAX_NAME_LENGTH) {
                showError(nameField, nameError, `Name must be ${MAX_NAME_LENGTH} characters or less.`);
            } else {
                hideError(nameField, nameError);
            }
        });

        // specific check on blur
        nameField.addEventListener('blur', function () {
            if (!this.value.trim()) {
                showError(nameField, nameError, 'Name is required.');
            }
        });
    }

    if (emailField) {
        emailField.addEventListener('blur', function () {
            const emailVal = this.value.trim();
            if (!emailVal) {
                showError(emailField, emailError, 'Email is required.');
            } else {
                const result = validateEmail(emailVal);
                if (!result.valid) {
                    showError(emailField, emailError, result.message);
                } else {
                    hideError(emailField, emailError);
                }
            }
        });

        emailField.addEventListener('input', function () {
            hideError(emailField, emailError);
        });
    }

    if (subjectField) {
        subjectField.addEventListener('input', function () {
            if (this.value.length > MAX_SUBJECT_LENGTH) {
                showError(subjectField, subjectError, `Subject must be ${MAX_SUBJECT_LENGTH} characters or less.`);
            } else {
                hideError(subjectField, subjectError);
            }
        });

        // Add blur listener for required check
        subjectField.addEventListener('blur', function () {
            if (!this.value.trim()) {
                showError(subjectField, subjectError, 'Subject is required.');
            }
        });
    }

    // Add validation for message field on blur
    if (messageField) {
        messageField.addEventListener('blur', function () {
            if (!this.value.trim()) {
                showError(messageField, messageError, 'Message is required.');
            }
        });

        // Note: Input listener for message is already handled in the character counter block above
        // We need to ensure it also hides the "required" error if user starts typing
        const existingInputHandler = messageField.oninput; // This might not capture addEventListener, but we can just add another listener
        messageField.addEventListener('input', function () {
            if (this.value.trim().length > 0 && this.value.length <= MAX_MESSAGE_LENGTH) {
                hideError(messageField, messageError);
            }
        });
    }

    // Form submission with validation
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Clear all previous errors visually first
            hideError(nameField, nameError);
            hideError(emailField, emailError);
            hideError(subjectField, subjectError);
            hideError(messageField, messageError);
            formStatus.classList.add('hidden');

            let hasErrors = false;

            // Validate name
            const name = nameField.value.trim();
            if (!name) {
                showError(nameField, nameError, 'Name is required.');
                hasErrors = true;
            } else if (name.length > MAX_NAME_LENGTH) {
                showError(nameField, nameError, `Name must be ${MAX_NAME_LENGTH} characters or less.`);
                hasErrors = true;
            }

            // Validate email
            const email = emailField.value.trim();
            if (!email) {
                showError(emailField, emailError, 'Email is required.');
                hasErrors = true;
            } else {
                const emailResult = validateEmail(email);
                if (!emailResult.valid) {
                    showError(emailField, emailError, emailResult.message);
                    hasErrors = true;
                }
            }

            // Validate subject (Required)
            const subject = subjectField.value.trim();
            if (!subject) {
                showError(subjectField, subjectError, 'Subject is required.');
                hasErrors = true;
            } else if (subject.length > MAX_SUBJECT_LENGTH) {
                showError(subjectField, subjectError, `Subject must be ${MAX_SUBJECT_LENGTH} characters or less.`);
                hasErrors = true;
            }

            // Validate message
            const message = messageField.value.trim();
            if (!message) {
                showError(messageField, messageError, 'Message is required.');
                hasErrors = true;
            } else if (message.length > MAX_MESSAGE_LENGTH) {
                showError(messageField, messageError, `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`);
                hasErrors = true;
            }

            // Don't submit if there are errors
            if (hasErrors) {
                formStatus.textContent = '⚠ Please fix the highlighted errors above before submitting.';
                formStatus.className = 'text-center text-sm mt-4 text-red-500 font-medium';
                formStatus.classList.remove('hidden');
                return;
            }

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'text-center text-sm mt-4 text-green-400 font-medium';
                    formStatus.classList.remove('hidden');
                    contactForm.reset();
                    charCounter.textContent = '0/1000';
                    charCounter.className = 'text-sm text-gray-400';

                    // Removing success highlight if any remain (shouldn't happen on success but good practice)
                    hideError(nameField, nameError);
                    hideError(emailField, emailError);
                    hideError(subjectField, subjectError);
                    hideError(messageField, messageError);

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.classList.add('hidden');
                    }, 5000);
                } else {
                    // Error from server
                    const data = await response.json();
                    if (data.errors) {
                        // Formspree validation errors
                        throw new Error(data.errors.map(err => err.message).join(", "));
                    }
                    throw new Error('Server error');
                }
            } catch (error) {
                // Show error message
                console.error("Form error:", error);
                formStatus.textContent = '✗ Something went wrong. Please try again later.';
                formStatus.className = 'text-center text-sm mt-4 text-red-400';
                formStatus.classList.remove('hidden');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
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