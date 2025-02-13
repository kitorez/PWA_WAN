const START_DAYS = 10000;
const START_KEY = "countdownStartDay";

// Ensure getCurrentDay() is available
function getCurrentDay() {
    let now = new Date();
    let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
}

// Ensure we retrieve the correct stored start day
function getStoredStartDay() {
    let storedStartDay = localStorage.getItem(START_KEY);
    
    if (storedStartDay !== null) {
        let parsedDay = parseInt(storedStartDay, 10);
        if (!isNaN(parsedDay)) {
            return parsedDay;
        }
    }

    let currentDay = getCurrentDay();
    localStorage.setItem(START_KEY, currentDay);
    return currentDay;
}

let storedStartDay = getStoredStartDay();

function updateCountdown() {
    let today = getCurrentDay();
    let daysElapsed = today - storedStartDay;
    let daysRemaining = START_DAYS - daysElapsed;

    let countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.textContent = Math.max(daysRemaining, 0);
    }
}

// Ensure countdown updates properly
updateCountdown();