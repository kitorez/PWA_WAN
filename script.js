// Get the current timestamp in days
function getCurrentDay() {
    let now = new Date();
    let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
}

// Constants
const START_DAYS = 10000;
const START_KEY = "countdownStartDay";
const GOALS_KEY = "userGoals";

// Retrieve stored start day or initialize it
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

// Function to Add Goal
function addGoal() {
    let goalName = document.getElementById("goal-name").value.trim();
    let goalDate = document.getElementById("goal-date").value;

    if (!goalName || !goalDate) {
        alert("Please enter a goal name and select a target date.");
        return;
    }

    let newGoal = {
        name: goalName,
        date: goalDate
    };

    let goals = JSON.parse(localStorage.getItem(GOALS_KEY)) || [];
    goals.push(newGoal);
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));

    document.getElementById("goal-name").value = "";
    document.getElementById("goal-date").value = "";

    displayGoals();
}

// Function to Display Goals
function displayGoals() {
    let goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    let goals = JSON.parse(localStorage.getItem(GOALS_KEY)) || [];

    if (goals.length === 0) {
        goalList.innerHTML = "<p>No goals set yet.</p>";
        return;
    }

    goals.forEach((goal, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${goal.name} - <strong>${goal.date}</strong> 
        <button onclick="deleteGoal(${index})">X</button>`;
        goalList.appendChild(listItem);
    });
}

// Function to Delete Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem(GOALS_KEY)) || [];
    goals.splice(index, 1);
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    displayGoals();
}

// **Make sure goals reload properly**
document.addEventListener("DOMContentLoaded", () => {
    displayGoals();
});