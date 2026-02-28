// ===== NEON CODE — Elyorbek Olimov Portfolio =====

// Theme Toggle
function toggleTheme() {
    const body = document.documentElement;
    const current = body.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    document.getElementById('themeToggle').textContent = next === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', next);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').textContent = savedTheme === 'light' ? '🌙' : '☀️';

let currentLang = 'uz';

// Language Toggle
function toggleLang() {
    currentLang = currentLang === 'uz' ? 'en' : 'uz';
    document.getElementById('langToggle').textContent = currentLang === 'uz' ? 'EN' : 'UZ';

    document.querySelectorAll('[data-uz]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    document.querySelectorAll('[data-uz-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
    });
}

// Mobile Menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelector('.skill-fill')) {
                const fill = entry.target.querySelector('.skill-fill');
                fill.style.width = fill.style.width;
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-in, .skill-card, .project-card, .cert-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.style.borderBottomColor = 'rgba(0, 150, 255, 0.2)';
    } else {
        navbar.style.borderBottomColor = '';
    }
    lastScroll = scrollTop;
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => { fill.style.width = width; }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) skillObserver.observe(skillsSection);

// Contact form
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = currentLang === 'uz' ? 'Yuborildi!' : 'Sent!';
    btn.style.background = '#10B981';
    setTimeout(() => {
        btn.textContent = currentLang === 'uz' ? 'Yuborish' : 'Send Message';
        btn.style.background = '';
        e.target.reset();
    }, 2000);
}

// Staggered animation delays
document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.hero .animate-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
});
