/* ============================================
   NAVIGATION ACTIVE LINK
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const width = skillLevel.style.width;
            skillLevel.style.width = '0';
            
            // Trigger animation
            setTimeout(() => {
                skillLevel.style.transition = 'width 0.6s ease';
                skillLevel.style.width = width;
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill levels
document.querySelectorAll('.skill-level').forEach(skillLevel => {
    observer.observe(skillLevel);
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-item');

const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

/* ============================================
   NAVBAR BACKGROUND ON SCROLL
   ============================================ */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(42, 48, 82, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(42, 48, 82, 1)';
    }
});

console.log('Portfolio script loaded successfully!');
