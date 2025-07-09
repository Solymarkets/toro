// Clock JavaScript - Japanese Rural Theme
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    updateFooterTimestamp();
});

function updateClock() {
    const now = new Date();
    
    // Update current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            weekday: 'short'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Update current time
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
}

function updateFooterTimestamp() {
    const now = new Date();
    const footerTimestamp = document.getElementById('footer-timestamp');
    
    if (footerTimestamp) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        footerTimestamp.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Japanese-style time display (optional enhancement)
function getJapaneseTimeGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return "おはよう (Good Morning)";
    } else if (hour >= 12 && hour < 17) {
        return "こんにちは (Good Afternoon)";
    } else if (hour >= 17 && hour < 21) {
        return "こんばんは (Good Evening)";
    } else {
        return "おやすみ (Good Night)";
    }
}

// Update cat message with time-based greetings
function updateCatMessage() {
    const catMessageElements = document.querySelectorAll('.cat-message');
    const messages = [
        "Toro says nyaa! 🐱",
        "Toro is napping... 😴",
        "Toro found a sunny spot! ☀️",
        "Toro is dreaming of fish... 🐟",
        "Toro says: " + getJapaneseTimeGreeting()
    ];
    
    catMessageElements.forEach(element => {
        if (Math.random() < 0.1) { // 10% chance to change message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            element.textContent = randomMessage;
        }
    });
}

// Update cat messages occasionally
setInterval(updateCatMessage, 30000); // Every 30 seconds

