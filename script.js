// Get the current timestamp in days
function getCurrentDay() {
    let now = new Date();
    let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
}

// Constants
const START_DAYS = 10000;
const START_KEY = "countdownStartDay";

// Retrieve stored start day or initialize it
function getStoredStartDay() {
    let storedStartDay = localStorage.getItem(START_KEY);
    
    if (storedStartDay !== null) {
        let parsedDay = parseInt(storedStartDay, 10);
        if (!isNaN(parsedDay)) {
            return parsedDay; // Use existing stored start day
        }
    }

    let currentDay = getCurrentDay();
    localStorage.setItem(START_KEY, currentDay);
    return currentDay;
}

// Initialize the correct countdown start day
let storedStartDay = getStoredStartDay();

// Function to update countdown display
function updateCountdown() {
    let today = getCurrentDay();
    let daysElapsed = today - storedStartDay;
    let daysRemaining = START_DAYS - daysElapsed;
    daysRemaining = Math.max(daysRemaining, 0); // Ensure it never goes below 0
    document.getElementById("countdown").textContent = daysRemaining;
}

// Run update function on load
updateCountdown();