
// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

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

// Navbar functionality
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupMobileMenuLinks();
    }

    setupScrollEffect() {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', debounce(handleScroll, 10));
    }

    setupMobileMenu() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
            this.animateHamburger();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.mobileMenu.contains(event.target) && 
                !this.mobileMenuBtn.contains(event.target)) {
                this.mobileMenu.classList.add('hidden');
                this.resetHamburger();
            }
        });
    }

    setupMobileMenuLinks() {
        const mobileLinks = this.mobileMenu.querySelectorAll('button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.add('hidden');
                this.resetHamburger();
            });
        });
    }

    animateHamburger() {
        const hamburgers = this.mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }

    resetHamburger() {
        const hamburgers = this.mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
}

// Hero section animations
class HeroAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createFloatingParticles();
        this.animateHeroContent();
    }

    createFloatingParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(59, 130, 246, 0.2);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-fadeIn');
        }
    }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateOnScroll();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('.features, .demo, .docs');
        sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    animateElement(element) {
        if (element.classList.contains('features')) {
            this.animateFeatures(element);
        } else if (element.classList.contains('demo')) {
            this.animateDemo(element);
        } else if (element.classList.contains('docs')) {
            this.animateDocs(element);
        }
    }

    animateFeatures(section) {
        const header = section.querySelector('.features-header');
        const cards = section.querySelectorAll('.feature-card');

        if (header) {
            header.classList.add('animate-fadeInUp');
        }

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fadeInUp');
            }, index * 150);
        });
    }

    animateDemo(section) {
        const header = section.querySelector('.demo-header');
        const widget = section.querySelector('.chat-widget');

        if (header) {
            header.classList.add('animate-fadeInUp');
        }

        if (widget) {
            setTimeout(() => {
                widget.classList.add('animate-fadeInUp');
            }, 300);
        }
    }

    animateDocs(section) {
        const header = section.querySelector('.docs-header');
        const cards = section.querySelectorAll('.doc-card');
        const faqSection = section.querySelector('.faq-section');

        if (header) {
            header.classList.add('animate-fadeInUp');
        }

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fadeInUp');
            }, index * 100);
        });

        if (faqSection) {
            setTimeout(() => {
                faqSection.classList.add('animate-fadeInUp');
            }, 600);
        }
    }

    animateOnScroll() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        
        fadeElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Chat functionality
class ChatWidget {
    constructor() {
        this.messages = [
            { type: 'bot', content: "Hi! I'm SPARKChat AI. Try asking me anything about web development, AI, or how I can help your website!" }
        ];
        
        this.responses = [
            "That's a great question! SPARKChat AI can be customized to match your brand and handle complex conversations.",
            "I can help with customer support, lead generation, FAQs, and much more. What's your use case?",
            "Setting up is incredibly simple - just copy one line of code and paste it into your website. No backend required!",
            "Yes! I support multiple languages and can be trained on your specific business data for better responses.",
            "I can integrate with popular APIs like OpenAI, Claude, or even run with local AI models for privacy.",
            "Absolutely! I work perfectly on mobile devices and automatically adapt to your website's design."
        ];

        this.init();
    }

    init() {
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.messagesContainer = document.getElementById('chat-messages');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const inputValue = this.chatInput.value.trim();
        if (!inputValue) return;

        // Add user message
        this.addMessage('user', inputValue);
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)];
            this.addMessage('bot', randomResponse);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const avatarIcon = type === 'user' 
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="m14 12-4 4 4 4"/></svg>';
        
        avatarDiv.innerHTML = avatarIcon;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8V4H8"/>
                    <rect width="16" height="12" x="4" y="8" rx="2"/>
                    <path d="m14 12-4 4 4 4"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = this.messagesContainer.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// FAQ functionality
class FAQController {
    constructor() {
        this.init();
    }

    init() {
        this.setupFAQToggle();
        this.setupFAQSearch();
    }

    setupFAQToggle() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const isOpen = faqItem.classList.contains('open');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('open');
                });
                
                // Open clicked item if it wasn't already open
                if (!isOpen) {
                    faqItem.classList.add('open');
                }
            });
        });
    }

    setupFAQSearch() {
        const searchInput = document.getElementById('faq-search');
        const faqItems = document.querySelectorAll('.faq-item');

        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300));
    }
}

// Enhanced feature cards with interactive effects
class FeatureCards {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.createParticleEffects();
    }

    setupHoverEffects() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverParticles(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverParticles(card);
            });
        });
    }

    createHoverParticles(card) {
        const particleCount = 3;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'hover-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                border-radius: 50%;
                left: ${20 + i * 30}%;
                top: ${20 + i * 20}%;
                animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
                animation-delay: ${i * 200}ms;
                z-index: 10;
            `;
            
            card.appendChild(particle);
        }
    }

    removeHoverParticles(card) {
        const particles = card.querySelectorAll('.hover-particle');
        particles.forEach(particle => particle.remove());
    }

    createParticleEffects() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ping {
                75%, 100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Page initialization
class SPARKChatApp {
    constructor() {
        this.init();
    }

    init() {
        // Ensure page starts from top
        window.scrollTo(0, 0);
        
        // Initialize all components
        this.navbar = new NavbarController();
        this.heroAnimations = new HeroAnimations();
        this.scrollAnimations = new ScrollAnimations();
        this.chatWidget = new ChatWidget();
        this.faqController = new FAQController();
        this.featureCards = new FeatureCards();
        
        // Setup global event listeners
        this.setupGlobalEventListeners();
    }

    setupGlobalEventListeners() {
        // Smooth scroll for all anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                scrollToSection(targetId);
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            // Recalculate animations if needed
            this.handleResize();
        }, 250));

        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Resume animations
                this.resumeAnimations();
            } else {
                // Pause animations for performance
                this.pauseAnimations();
            }
        });
    }

    handleResize() {
        // Handle responsive behavior
        const mobileMenu = document.getElementById('mobile-menu');
        if (window.innerWidth > 768) {
            mobileMenu.classList.add('hidden');
            this.navbar.resetHamburger();
        }
    }

    resumeAnimations() {
        // Resume CSS animations
        document.body.style.animationPlayState = 'running';
    }

    pauseAnimations() {
        // Pause CSS animations for better performance
        document.body.style.animationPlayState = 'paused';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SPARKChatApp();
});

// Export functions to global scope for HTML onclick handlers
window.scrollToSection = scrollToSection;

// Performance optimization: Preload critical resources
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical assets during idle time
        const criticalAssets = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        ];
        
        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset;
            link.as = 'style';
            document.head.appendChild(link);
        });
    });
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added later for offline functionality
        console.log('SPARKChat AI loaded successfully!');
    });
}
