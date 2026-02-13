// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and timeline items
const animatedElements = document.querySelectorAll(
    '.glass-card, .timeline-item, .skill-badge, .stat-card'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Skill bar animation
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const progress = skillProgress.getAttribute('data-progress');

            // Animate the skill bar
            setTimeout(() => {
                skillProgress.style.width = progress + '%';
            }, 100);

            // Stop observing after animation
            skillBarsObserver.unobserve(skillProgress);
        }
    });
}, {
    threshold: 0.5
});

// Observe all skill progress bars
const skillProgressBars = document.querySelectorAll('.skill-progress');
skillProgressBars.forEach(bar => {
    skillBarsObserver.observe(bar);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Copy to clipboard functionality for contact info
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach(link => {
    if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
        link.addEventListener('click', (e) => {
            const text = link.textContent;

            // Create temporary element for copying
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();

            try {
                document.execCommand('copy');

                // Visual feedback
                const originalText = link.textContent;
                link.textContent = 'Copied!';
                link.style.color = 'var(--color-success)';

                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }

            document.body.removeChild(tempInput);
        });
    }
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Skill badge interaction - add ripple effect
const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function (e) {
        this.style.transform = '';
    });
});

// Timeline items stagger animation
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Initial highlight
    highlightNavigation();

    // Optional: Add typing effect to subtitle
    // const subtitle = document.querySelector('.hero-subtitle');
    // const subtitleText = subtitle.textContent;
    // typeWriter(subtitle, subtitleText, 50);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}, 10));

// Add Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
    }
});

console.log('%c👋 Hello! Thanks for checking out the code!', 'font-size: 20px; color: #8b5cf6; font-weight: bold;');
console.log('%cBuilt with ❤️ and attention to detail', 'font-size: 14px; color: #3b82f6;');

// ============================================
// IT PROFESSIONAL TECH EFFECTS
// ============================================

// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 14;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0f0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Gradient effect - brighter at the bottom
            const opacity = Math.min(1, this.drops[i] / 20);
            this.ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix Rain
const matrixCanvas = document.getElementById('matrix-canvas');
if (matrixCanvas) {
    new MatrixRain(matrixCanvas);
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="neon-text">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect to elements with data-scramble attribute
document.querySelectorAll('[data-scramble]').forEach(el => {
    const fx = new TextScramble(el);
    let counter = 0;
    const originalText = el.innerText;
    
    const next = () => {
        fx.setText(originalText).then(() => {
            setTimeout(next, 3000);
        });
        counter = (counter + 1);
    };
    
    el.addEventListener('mouseenter', () => next());
});

// Binary Counter Animation
function animateBinaryCounter(element, targetValue, duration = 2000) {
    const startTime = performance.now();
    const chars = '01';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
            // Show random binary during animation
            let binary = '';
            for (let i = 0; i < targetValue.toString().length * 4; i++) {
                binary += chars[Math.floor(Math.random() * chars.length)];
            }
            element.textContent = binary;
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue;
        }
    }
    
    requestAnimationFrame(update);
}

// Animate stat numbers with binary effect
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberEl = entry.target.querySelector('.stat-number');
            if (numberEl && !numberEl.classList.contains('animated')) {
                numberEl.classList.add('animated');
                const originalText = numberEl.textContent;
                const numericValue = parseInt(originalText);
                
                if (!isNaN(numericValue)) {
                    animateBinaryCounter(numberEl, numericValue, 1500);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Terminal Typing Effect for Contact Section
function typeTerminalText(element, text, speed = 50) {
    element.classList.add('typing-cursor');
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
        }
    }
    
    type();
}

// Apply typing effect to terminal elements
document.querySelectorAll('.terminal-command').forEach(el => {
    const originalText = el.textContent;
    el.textContent = '';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeTerminalText(el, originalText, 30);
                observer.unobserve(el);
            }
        });
    });
    
    observer.observe(el);
});

// Add command line style to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.5)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Nav logo tech effect
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px var(--color-accent), 0 0 40px var(--color-accent)';
    });
    
    navLogo.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
    });
}

// Glitch effect on scroll for section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
        this.setAttribute('data-text', this.textContent);
    });
    
    title.addEventListener('mouseleave', function() {
        this.classList.remove('glitch');
    });
});

// Skill badges - add binary prefix on hover
document.querySelectorAll('.skill-badge').forEach(badge => {
    const originalText = badge.textContent;
    
    badge.addEventListener('mouseenter', function() {
        const hexCode = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
        this.textContent = `0x${hexCode}`;
        this.style.fontFamily = "'Fira Code', monospace";
    });
    
    badge.addEventListener('mouseleave', function() {
        this.textContent = originalText;
        this.style.fontFamily = '';
    });
});

// Add scanlines effect toggle (Easter egg)
let scanlinesEnabled = true;
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        scanlinesEnabled = !scanlinesEnabled;
        const scanlines = document.querySelector('.scanlines');
        if (scanlines) {
            scanlines.style.display = scanlinesEnabled ? 'block' : 'none';
        }
    }
});

// Console Easter Egg - Type 'help' in console
console.log('%c> System initialized...', 'color: #00ff00; font-family: monospace;');
console.log('%c> Type help() for available commands', 'color: #6272a4; font-family: monospace;');

window.help = function() {
    console.log('%cAvailable Commands:', 'color: #ff79c6; font-weight: bold;');
    console.log('%c  about()       - Display profile information', 'color: #8be9fd;');
    console.log('%c  skills()      - List technical skills', 'color: #8be9fd;');
    console.log('%c  contact()     - Get contact information', 'color: #8be9fd;');
    console.log('%c  matrix()      - Toggle matrix rain intensity', 'color: #8be9fd;');
};

window.about = function() {
    console.log('%c> Osamah Al-Saleh - Lead QA Automation Engineer', 'color: #00ff00;');
    console.log('%c> 10+ years experience in test automation', 'color: #f1fa8c;');
    console.log('%c> Expertise: Selenium, C#, Java, Azure DevOps', 'color: #f1fa8c;');
};

window.skills = function() {
    console.log('%c> Technical Skills:', 'color: #ff79c6;');
    const skills = ['C# .NET', 'Selenium WebDriver', 'Java', 'Azure DevOps', 'CI/CD', 'API Testing'];
    skills.forEach(skill => console.log(`%c  [✓] ${skill}`, 'color: #50fa7b;'));
};

window.contact = function() {
    console.log('%c> Contact Information:', 'color: #ff79c6;');
    console.log('%c  Email: alsaleh.osama.k@gmail.com', 'color: #8be9fd;');
    console.log('%c  LinkedIn: linkedin.com/in/osama-alsaleh', 'color: #8be9fd;');
    console.log('%c  GitHub: github.com/samsal81', 'color: #8be9fd;');
};

window.matrix = function() {
    console.log('%c> Matrix rain intensity adjusted', 'color: #00ff00;');
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.style.opacity = canvas.style.opacity === '0.3' ? '0.15' : '0.3';
    }
};
