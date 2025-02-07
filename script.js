// Constants
const START_DAYS = 10000;
const START_KEY = "countdownStartDay";
const GOALS_KEY = "userGoals";
const PROGRESS_KEY = "goalProgress";

// Get the current timestamp in days
function getCurrentDay() {
    let now = new Date();
    let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
}

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
    document.getElementById("countdown").textContent = Math.max(daysRemaining, 0);
}
updateCountdown();

// Function to Load Goals
function loadGoals() {
    return JSON.parse(localStorage.getItem(GOALS_KEY)) || [];
}

// Function to Save Goals
function saveGoals(goals) {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

// Function to Load Progress
function loadProgress() {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
}

// Function to Save Progress
function saveProgress(progress) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// Function to Display Goals
function displayGoals() {
    let goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    let goals = loadGoals();
    let progress = loadProgress();
    let today = getCurrentDay();

    if (goals.length === 0) {
        goalList.innerHTML = "<p>No goals set yet.</p>";
        return;
    }

    goals.forEach((goal, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${goal.name} - <strong>${goal.date}</strong>`;

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("toggle-buttons");

        let yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.classList.add("completed");
        yesButton.onclick = () => updateProgress(index, true);

        let noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.classList.add("not-completed");
        noButton.onclick = () => updateProgress(index, false);

        // Check if today's progress is already set
        if (progress[today] && progress[today][index] === true) {
            yesButton.style.opacity = "1";
            noButton.style.opacity = "0.5";
        } else if (progress[today] && progress[today][index] === false) {
            noButton.style.opacity = "1";
            yesButton.style.opacity = "0.5";
        }

        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        listItem.appendChild(buttonContainer);
        goalList.appendChild(listItem);
    });
}

// Function to Update Progress
function updateProgress(goalIndex, completed) {
    let today = getCurrentDay();
    let progress = loadProgress();

    if (!progress[today]) progress[today] = {};
    progress[today][goalIndex] = completed;
    saveProgress(progress);

    displayGoals();
}

// Function to Add Goal
function addGoal() {
    let goalName = document.getElementById("goal-name").value.trim();
    let goalDate = document.getElementById("goal-date").value;

    if (!goalName || !goalDate) {
        alert("Please enter a goal name and select a target date.");
        return;
    }

    let newGoal = { name: goalName, date: goalDate };
    let goals = loadGoals();
    goals.push(newGoal);
    saveGoals(goals);

    displayGoals();
}

// Load Goals on Page Load
document.addEventListener("DOMContentLoaded", displayGoals);