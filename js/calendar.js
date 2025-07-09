// Calendar JavaScript - Japanese Rural Theme
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupCalendarNavigation();
});

function initializeCalendar() {
    updateCalendarDisplay();
    highlightToday();
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarDisplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarDisplay();
        });
    }
}

function updateCalendarDisplay() {
    updateMonthYear();
    generateCalendarDays();
}

function updateMonthYear() {
    const monthYearElement = document.getElementById('current-month-year');
    if (monthYearElement) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
}

function generateCalendarDays() {
    const calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) return;
    
    calendarDays.innerHTML = '';
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createDayElement(daysInPrevMonth - i, 'other-month');
        calendarDays.appendChild(dayElement);
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createDayElement(day, 'current-month');
        
        // Check if this is today
        const today = new Date();
        if (currentYear === today.getFullYear() && 
            currentMonth === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Check for special dates
        if (hasSpecialEvent(day, currentMonth + 1)) {
            dayElement.classList.add('special-date');
            dayElement.title = getSpecialEvent(day, currentMonth + 1);
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    // Next month's leading days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createDayElement(day, 'other-month');
        calendarDays.appendChild(dayElement);
    }
}

function createDayElement(day, monthType) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${monthType}`;
    dayElement.textContent = day;
    
    // Add click event for day selection
    dayElement.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked day
        if (monthType === 'current-month') {
            this.classList.add('selected');
            showDayDetails(day, currentMonth + 1, currentYear);
        }
    });
    
    return dayElement;
}

function highlightToday() {
    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
        const todayElement = document.querySelector('.calendar-day.today');
        if (todayElement) {
            todayElement.style.background = 'var(--accent-orange)';
            todayElement.style.color = 'var(--text-light)';
            todayElement.style.fontWeight = 'bold';
        }
    }
}

function hasSpecialEvent(day, month) {
    const specialDates = {
        '7-22': 'Toro\'s Birthday! 🎂',
        '12-3': 'Doko Demo Issyo Release Day 🎮',
        '2-22': 'Cat Day (Nyan Nyan Nyan) 🐱'
    };
    
    const dateKey = `${month}-${day}`;
    return specialDates.hasOwnProperty(dateKey);
}

function getSpecialEvent(day, month) {
    const specialDates = {
        '7-22': 'Toro\'s Birthday! 🎂',
        '12-3': 'Doko Demo Issyo Release Day 🎮',
        '2-22': 'Cat Day (Nyan Nyan Nyan) 🐱'
    };
    
    const dateKey = `${month}-${day}`;
    return specialDates[dateKey] || '';
}

function showDayDetails(day, month, year) {
    const event = getSpecialEvent(day, month);
    if (event) {
        ToroTheme.showNotification(`${month}/${day}/${year}: ${event}`, 'info');
    } else {
        ToroTheme.showNotification(`Selected: ${month}/${day}/${year}`, 'info');
    }
}

// Add special styling for special dates
const style = document.createElement('style');
style.textContent = `
    .calendar-day.special-date {
        background: rgba(205, 92, 92, 0.2) !important;
        border: 2px solid var(--accent-red) !important;
        font-weight: bold;
        position: relative;
    }
    
    .calendar-day.special-date::after {
        content: '🌟';
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 0.7rem;
    }
    
    .calendar-day.selected {
        background: var(--accent-green) !important;
        color: var(--text-light) !important;
        transform: scale(1.05);
    }
    
    .calendar-day:hover {
        background: rgba(143, 188, 143, 0.3) !important;
        cursor: pointer;
        transform: scale(1.02);
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);

// Keyboard navigation for calendar
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.calendar-container')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                document.getElementById('prev-month')?.click();
                break;
            case 'ArrowRight':
                e.preventDefault();
                document.getElementById('next-month')?.click();
                break;
        }
    }
});

