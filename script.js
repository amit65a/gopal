/**
 * PREMIUM PORTFOLIO CORE SCRIPT
 * - Magnetic Cursor
 * - Staggered Scroll Reveal (.reveal → .active)
 * - Vertical Timeline Progress + Item Reveal (.timeline-item → .revealed)
 */

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const timelineProgress = document.getElementById('timeline-progress');
const timelineContainer = document.querySelector('.timeline-container');
const timelineItems = document.querySelectorAll('.timeline-item');

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
let fX = 0, fY = 0;

// Silk Lerp Variables for Timeline
let targetTimelineProgress = 0;
let currentTimelineProgress = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor & Timeline Animation Loop
function animate() {
    // Magnetic Cursor Lerp
    if (cursor && follower) {
        posX += (mouseX - posX) * 0.2;
        posY += (mouseY - posY) * 0.2;
        fX += (mouseX - fX) * 0.1;
        fY += (mouseY - fY) * 0.1;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        follower.style.transform = `translate3d(${fX - 15}px, ${fY - 15}px, 0)`;
    }

    // Timeline Silk Lerp (High intensity, zero lag)
    if (timelineProgress) {
        currentTimelineProgress += (targetTimelineProgress - currentTimelineProgress) * 0.12;
        timelineProgress.style.height = `${currentTimelineProgress * 100}%`;
    }

    requestAnimationFrame(animate);
}
animate();

// Magnetic Effect for premium elements
const magElements = document.querySelectorAll('.mag');
magElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        follower.style.transform = `translate3d(${fX - 15}px, ${fY - 15}px, 0) scale(1.5)`;
        follower.style.borderColor = 'var(--primary)';
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate3d(0, 0, 0)`;
        follower.style.transform = `translate3d(${fX - 15}px, ${fY - 15}px, 0) scale(1)`;
        follower.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    });
});

// ─── Scroll Reveal for .reveal elements ───────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ─── Vertical Timeline ─────────────────────────────────────────────
// Stagger delays on timeline items
timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

timelineItems.forEach(item => timelineObserver.observe(item));

// Animate the vertical progress line on scroll
function updateTimelineLine() {
    if (!timelineContainer) return;
    const rect = timelineContainer.getBoundingClientRect();
    const winH = window.innerHeight;

    // How far the center of the viewport has traveled through the container
    const progress = (winH * 0.6 - rect.top) / rect.height;
    targetTimelineProgress = Math.max(0, Math.min(1, progress));
}

// ─── Active Navigation Scroll-Spy (Unified Desktop & Mobile) ───
const navLinks = document.querySelectorAll('.nav-links-reference a, .nav-overlay-links a');
const sections = document.querySelectorAll('section[id], #hero');

function updateActiveNav() {
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 150)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-pill');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}` || (currentSectionId === 'hero' && href === '#hero')) {
            link.classList.add('active-pill');
        }
    });
}

// ─── Sticky Header & Scroll Events (Optimized) ───
const navBar = document.querySelector('.nav-reference');
let isScrolling = false; // Guard to prevent scroll-spy flicker during clicks

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        requestAnimationFrame(() => {
            const scrollPos = window.scrollY;

            // Toggle sticky background
            if (scrollPos > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }

            // Experience Background Color Sync & Parallax
            const experienceSection = document.getElementById('experience');
            let activeColor = '#fcfbf7'; // Master base cream

            document.querySelectorAll('.timeline-item').forEach(item => {
                const rect = item.getBoundingClientRect();
                const winH = window.innerHeight;

                if (rect.top < winH * 0.7 && rect.bottom > winH * 0.3) {
                    activeColor = item.getAttribute('data-color') || '#fcfbf7';
                }

                const img = item.querySelector('.parallax-img');
                if (img) {
                    const pRect = img.parentElement.getBoundingClientRect();
                    if (pRect.top < winH && pRect.bottom > 0) {
                        const shift = (winH - pRect.top) * 0.12;
                        img.style.transform = `translate3d(0, -${shift}px, 0)`;
                    }
                }
            });

            if (experienceSection) {
                experienceSection.style.backgroundColor = activeColor;
            }

            updateActiveNav();
            updateTimelineLine();
        });
    }
}, { passive: true });

// Run on load to set initial state
updateActiveNav();
updateTimelineLine();

// ─── Smooth Scroll ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Disable scroll-spy during manual scroll
        isScrolling = true;

        // Instant visual feedback for click
        navLinks.forEach(link => link.classList.remove('active-pill'));
        this.classList.add('active-pill');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });

            // Re-enable scroll-spy after scroll animation finishes (~800ms)
            setTimeout(() => {
                isScrolling = false;
                updateActiveNav();
            }, 800);
        } else {
            isScrolling = false;
        }
    });
});

// ─── Mobile Menu Toggle ───────────────────────────────────────────
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');

function openNav() {
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeNav() {
    navOverlay.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scroll
}

if (menuOpen) menuOpen.addEventListener('click', openNav);
if (menuClose) menuClose.addEventListener('click', closeNav);

// Auto-close menu when a link is clicked
document.querySelectorAll('.nav-overlay-links a').forEach(link => {
    link.addEventListener('click', closeNav);
});

// ─── Parallax Giant Text ───────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    document.querySelectorAll('.giant-text').forEach((text, i) => {
        text.style.transform = `translate3d(0, ${scrollPos * 0.15}px, 0)`;
    });
}, { passive: true });

// ─── Contact Form — Silk & Steel Submission ────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successModal = document.getElementById('success-modal');

if (contactForm) {
    // Human Interaction Proof (Anti-Bot)
    let isHuman = false;
    contactForm.addEventListener('focusin', () => { isHuman = true; }, { once: true });
    contactForm.addEventListener('mousemove', () => { isHuman = true; }, { once: true });

    // Security Helper: Strip HTML tags to prevent XSS
    const sanitize = (str) => {
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[m]).trim();
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ── Anti-Bot: Reject if no human interaction ──
        if (!isHuman) {
            console.warn("Submission blocked: No human interaction detected.");
            return;
        }

        // ── CONFIG: Obfuscated Formspree ID to prevent basic bot scraping ──
        const FORMSPREE_ID = atob("bWxnb3puYmo=");
        const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

        const submitTextEl = submitBtn.querySelector('span');
        const submitIconEl = submitBtn.querySelector('i');
        const originalText = submitTextEl.innerText;

        submitTextEl.innerText = 'पठाउँदै...';
        submitIconEl.className = 'fas fa-spinner fa-spin';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        try {
            // Sanitize all inputs before sending
            const formData = new FormData(contactForm);
            const sanitizedData = new FormData();
            for (let [key, value] of formData.entries()) {
                sanitizedData.append(key, sanitize(value));
            }

            // Real Submission (using fetch)
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: sanitizedData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                contactForm.reset();
            } else {
                throw new Error('Formspree error');
            }

        } catch (error) {
            console.error('Submission error:', error);
            if (FORMSPREE_ID === "YOUR_ID_HERE") {
                successModal.classList.add('active');
                contactForm.reset();
            } else {
                alert('सन्देश पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोला।');
            }
        } finally {
            submitTextEl.innerText = originalText;
            submitIconEl.className = 'fas fa-paper-plane';
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'all';
        }
    });
}

function closeSuccessModal() {
    const sModal = document.getElementById('success-modal');
    if (sModal) {
        sModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// ─── Media Gallery — Cinematic Lightbox ───────────────────────────
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeLightbox = function () {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Only close when clicking the background or the close button
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.id === 'lightbox-close') {
            closeLightbox();
        }
    });
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) openLightbox(img.src);
    });
});
