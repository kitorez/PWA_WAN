// Ensure the DOM is fully loaded before running script
document.addEventListener("DOMContentLoaded", () => {
    // Get the current timestamp in days
    function getCurrentDay() {
        let now = new Date();
        let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
    }

    const START_DAYS = 10000;
    const START_KEY = "countdownStartDay";
    const COUNTDOWN_KEY = "countdownRemaining"; // Stores last countdown value

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
        daysRemaining = Math.max(daysRemaining, 0);

        // Store the countdown in localStorage for syncing across devices
        localStorage.setItem(COUNTDOWN_KEY, daysRemaining);

        // Update the UI
        let countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.textContent = daysRemaining;
        }
    }

    // Run update function once when the page loads
    updateCountdown();

    // ✅ Update every minute instead of waiting a full day
    setInterval(() => {
        let lastStoredCountdown = parseInt(localStorage.getItem(COUNTDOWN_KEY), 10);
        updateCountdown();

        // If the countdown changed (a new day started), refresh UI
        if (parseInt(localStorage.getItem(COUNTDOWN_KEY), 10) !== lastStoredCountdown) {
            console.log("New day detected, updating countdown...");
        }
    }, 60000); // Check every minute (60,000 ms)
});