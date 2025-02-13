document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("goal-list")) {
        displayGoals();
    }
    if (document.getElementById("countdown")) {
        updateCountdown();
    }
});