// Portfolio Website JavaScript — multi-page layout

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

function initNetworkBackground() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const particleCount = 40;
    const connectionDistance = 130;
    const particleColor = 'rgba(120, 113, 108, 0.3)';
    const lineColor = 'rgba(249, 115, 22, 0.06)';

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1 + 0.5
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
            if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', debounce(() => {
        resize();
        createParticles();
    }, 200));

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}

function initActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;

    const pageLinks = {
        home: 'index.html',
        about: 'about.html',
        experience: 'experience.html',
        projects: 'projects.html',
        research: 'research.html',
        skills: 'skills.html',
        education: 'education.html',
        contact: 'contact.html'
    };

    const target = pageLinks[page];
    if (!target) return;

    document.querySelectorAll('.sidebar-link, .mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === target || (page === 'home' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

function initScrollReveal() {
    const cards = document.querySelectorAll('.experience-card, .research-card, .project-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(card => observer.observe(card));
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const charCounter = document.getElementById('char-counter');
    const messageField = document.getElementById('message');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 254;
    const MAX_SUBJECT_LENGTH = 200;
    const MAX_MESSAGE_LENGTH = 1000;

    const ALLOWED_EMAIL_DOMAINS = [
        'gmail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.ca', 'yahoo.in',
        'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'bing.com',
        'icloud.com', 'me.com', 'mac.com',
        'aol.com', 'protonmail.com', 'proton.me',
        'zoho.com', 'yandex.com', 'mail.com',
        'gmx.com', 'gmx.net', 'fastmail.com',
        'purdue.edu', 'edu'
    ];

    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        if (inputElement) {
            inputElement.style.borderColor = '#F87171';
            inputElement.style.boxShadow = '0 0 0 3px rgba(248, 113, 113, 0.15)';
        }
    }

    function hideError(inputElement, errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
        if (inputElement) {
            inputElement.style.borderColor = '';
            inputElement.style.boxShadow = '';
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address format.' };
        }
        if (email.length > MAX_EMAIL_LENGTH) {
            return { valid: false, message: `Email must be ${MAX_EMAIL_LENGTH} characters or less.` };
        }
        const domain = email.split('@')[1].toLowerCase();
        const isAllowed = ALLOWED_EMAIL_DOMAINS.some(allowed => {
            if (allowed === 'edu') return domain.endsWith('.edu');
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

    if (messageField && charCounter) {
        messageField.addEventListener('input', function () {
            const len = this.value.length;
            charCounter.textContent = `${len}/${MAX_MESSAGE_LENGTH}`;
            charCounter.style.color = len >= MAX_MESSAGE_LENGTH ? '#F87171'
                : len >= MAX_MESSAGE_LENGTH * 0.9 ? '#FBBF24' : '';
            if (len > 0 && len <= MAX_MESSAGE_LENGTH) hideError(messageField, messageError);
        });
    }

    if (nameField) {
        nameField.addEventListener('input', function () {
            if (this.value.length > MAX_NAME_LENGTH) {
                showError(nameField, nameError, `Name must be ${MAX_NAME_LENGTH} characters or less.`);
            } else hideError(nameField, nameError);
        });
        nameField.addEventListener('blur', function () {
            if (!this.value.trim()) showError(nameField, nameError, 'Name is required.');
        });
    }

    if (emailField) {
        emailField.addEventListener('blur', function () {
            const val = this.value.trim();
            if (!val) showError(emailField, emailError, 'Email is required.');
            else {
                const result = validateEmail(val);
                if (!result.valid) showError(emailField, emailError, result.message);
                else hideError(emailField, emailError);
            }
        });
        emailField.addEventListener('input', () => hideError(emailField, emailError));
    }

    if (subjectField) {
        subjectField.addEventListener('input', function () {
            if (this.value.length > MAX_SUBJECT_LENGTH) {
                showError(subjectField, subjectError, `Subject must be ${MAX_SUBJECT_LENGTH} characters or less.`);
            } else hideError(subjectField, subjectError);
        });
        subjectField.addEventListener('blur', function () {
            if (!this.value.trim()) showError(subjectField, subjectError, 'Subject is required.');
        });
    }

    if (messageField) {
        messageField.addEventListener('blur', function () {
            if (!this.value.trim()) showError(messageField, messageError, 'Message is required.');
        });
        messageField.addEventListener('input', function () {
            if (this.value.trim().length > 0 && this.value.length <= MAX_MESSAGE_LENGTH) {
                hideError(messageField, messageError);
            }
        });
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        hideError(nameField, nameError);
        hideError(emailField, emailError);
        hideError(subjectField, subjectError);
        hideError(messageField, messageError);
        formStatus.classList.add('hidden');

        let hasErrors = false;
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();

        if (!name) { showError(nameField, nameError, 'Name is required.'); hasErrors = true; }
        else if (name.length > MAX_NAME_LENGTH) {
            showError(nameField, nameError, `Name must be ${MAX_NAME_LENGTH} characters or less.`);
            hasErrors = true;
        }

        if (!email) { showError(emailField, emailError, 'Email is required.'); hasErrors = true; }
        else {
            const emailResult = validateEmail(email);
            if (!emailResult.valid) { showError(emailField, emailError, emailResult.message); hasErrors = true; }
        }

        if (!subject) { showError(subjectField, subjectError, 'Subject is required.'); hasErrors = true; }
        else if (subject.length > MAX_SUBJECT_LENGTH) {
            showError(subjectField, subjectError, `Subject must be ${MAX_SUBJECT_LENGTH} characters or less.`);
            hasErrors = true;
        }

        if (!message) { showError(messageField, messageError, 'Message is required.'); hasErrors = true; }
        else if (message.length > MAX_MESSAGE_LENGTH) {
            showError(messageField, messageError, `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`);
            hasErrors = true;
        }

        if (hasErrors) {
            formStatus.textContent = 'Please fix the highlighted errors above before submitting.';
            formStatus.style.color = '#F87171';
            formStatus.classList.remove('hidden');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.color = '#22C55E';
                formStatus.classList.remove('hidden');
                contactForm.reset();
                charCounter.textContent = '0/1000';
                setTimeout(() => formStatus.classList.add('hidden'), 5000);
            } else {
                const data = await response.json();
                if (data.errors) throw new Error(data.errors.map(err => err.message).join(', '));
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Form error:', error);
            formStatus.textContent = 'Something went wrong. Please try again later.';
            formStatus.style.color = '#F87171';
            formStatus.classList.remove('hidden');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initNetworkBackground();
    initActiveNav();
    initMobileMenu();
    initScrollReveal();
    initContactForm();

    console.log('%cHello! Welcome to my portfolio.', 'color: #F97316; font-size: 16px; font-weight: bold;');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (link && link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});
