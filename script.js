// Language toggle functionality
let currentLang = 'ar';

// Set initial language
document.body.setAttribute('data-lang', currentLang);

// Language toggle button
const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.body.setAttribute('data-lang', currentLang);
    langText.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    
    // Update document direction
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
});

// Progress bar animation
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');

function updateProgress() {
    // Simulate progress from 0 to 85%
    let progress = 0;
    const targetProgress = 85;
    const increment = 1;
    
    const progressInterval = setInterval(() => {
        progress += increment;
        if (progress >= targetProgress) {
            progress = targetProgress;
            clearInterval(progressInterval);
        }
        
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
    }, 50);
}

// Countdown timer
function initCountdown() {
    // Set target date (30 days from now)
    //const targetDate = new Date();
    //targetDate.setDate(targetDate.getDate() + 30);
    const targetDate = new Date('2025-06-23T23:59:59'); // Example target date
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Countdown finished
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Add floating animation to gears
function animateGears() {
    const gears = document.querySelectorAll('.gear');
    
    gears.forEach((gear, index) => {
        // Add random floating movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            gear.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Date.now() / (1000 + index * 500)}deg)`;
        }, 3000 + index * 1000);
    });
}

// Smooth scroll and page load animations
function initAnimations() {
    // Add entrance animation delay to elements
    const elements = document.querySelectorAll('.logo, .main-title, .description, .progress-container, .countdown-container, .contact-info');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Particle effect for background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    initCountdown();
    animateGears();
    initAnimations();
    createParticles();
    
    // Add smooth transition effects
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Recalculate animations if needed
    const gears = document.querySelectorAll('.gear');
    gears.forEach(gear => {
        gear.style.transition = 'all 0.3s ease';
    });
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    const gears = document.querySelectorAll('.gear');
    if (document.hidden) {
        gears.forEach(gear => {
            gear.style.animationPlayState = 'paused';
        });
    } else {
        gears.forEach(gear => {
            gear.style.animationPlayState = 'running';
        });
    }
});