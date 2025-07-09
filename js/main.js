// Main JavaScript - Japanese Rural Theme
document.addEventListener('DOMContentLoaded', function() {
    console.log('Toro\'s Japanese World loaded! 🐱');
    
    // Initialize all components
    initializeAnimations();
    initializeInteractivity();
});

// Initialize subtle animations for PS2 era feel
function initializeAnimations() {
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.pastel-box, .card-wood, .card-light');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add gentle floating animation to decorative elements
    const floatingElements = document.querySelectorAll('.ambient-decor');
    floatingElements.forEach((element, index) => {
        element.style.animation = `gentleFloat ${3 + (index % 3)}s ease-in-out infinite`;
    });
}

// Initialize interactive elements
function initializeInteractivity() {
    // Enhanced navigation highlighting
    const navLinks = document.querySelectorAll('.emoji-nav a, .social-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Add click effects
    const clickableElements = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(139, 69, 19, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Gentle floating animation keyframes (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes gentleFloat {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility functions for theme
window.ToroTheme = {
    // Show notification with Japanese aesthetic
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} fade-in`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.maxWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // Toggle theme elements
    toggleElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.toggle('hidden');
        }
    },
    
    // Smooth scroll with Japanese aesthetic
    smoothScrollTo: function(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

