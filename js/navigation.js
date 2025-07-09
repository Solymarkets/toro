// Navigation JavaScript - Japanese Rural Theme
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    highlightCurrentPage();
});

function initializeNavigation() {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active state management for navigation
    const navLinks = document.querySelectorAll('.emoji-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add hover effects for better UX
    addHoverEffects();
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.emoji-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function addHoverEffects() {
    // Enhanced hover effects for navigation items
    const navItems = document.querySelectorAll('.emoji-nav li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        
        item.addEventListener('mouseenter', function() {
            link.style.transform = 'translateX(5px) scale(1.02)';
            link.style.boxShadow = '0 4px 8px rgba(139, 69, 19, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(0) scale(1)';
                link.style.boxShadow = 'none';
            }
        });
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 6px rgba(139, 69, 19, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Mobile navigation toggle (for responsive design)
function toggleMobileNav() {
    const sidebar = document.querySelector('.left-sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-visible');
        rightSidebar.classList.toggle('mobile-visible');
    }
}

// Handle responsive navigation
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.left-sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        sidebar.classList.remove('mobile-visible');
        rightSidebar.classList.remove('mobile-visible');
    }
});

// Breadcrumb navigation (if needed)
function updateBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageNames = {
        'index.html': 'Home',
        'about.html': 'About Toro',
        'thoughts.html': 'Digital Thoughts',
        'pictures.html': 'Gallery',
        'calendar.html': 'Calendar'
    };
    
    const pageName = pageNames[currentPage] || 'Unknown';
    breadcrumb.innerHTML = `
        <a href="index.html" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-item active">${pageName}</span>
    `;
}

// Initialize breadcrumb if it exists
document.addEventListener('DOMContentLoaded', updateBreadcrumb);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Alt + number keys for quick navigation
    if (e.altKey) {
        const navLinks = document.querySelectorAll('.emoji-nav a');
        const keyNum = parseInt(e.key);
        
        if (keyNum >= 1 && keyNum <= navLinks.length) {
            e.preventDefault();
            navLinks[keyNum - 1].click();
        }
    }
});

