// Ensure getCurrentDay() is available
function getCurrentDay() {
    let now = new Date();
    let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    return Math.floor(utcDate.getTime() / (1000 * 60 * 60 * 24));
}

// Function to Display Goals
function displayGoals() {
    let goalList = document.getElementById("goal-list");
    if (!goalList) return;

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

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&times;"; // HTML entity for "×" symbol
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => removeGoal(index);

        if (progress[today] && progress[today][index] === true) {
            yesButton.style.opacity = "1";
            noButton.style.opacity = "0.5";
        } else if (progress[today] && progress[today][index] === false) {
            noButton.style.opacity = "1";
            yesButton.style.opacity = "0.5";
        }

        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        buttonContainer.appendChild(deleteButton);
        listItem.appendChild(buttonContainer);
        goalList.appendChild(listItem);
    });
}

// Function to Add Goal
window.addGoal = function () {
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

    // Clear input fields after adding a goal
    document.getElementById("goal-name").value = "";
    document.getElementById("goal-date").value = "";

    displayGoals();
};

window.removeGoal = function (index) {
    let goals = loadGoals();

    // Confirm deletion
    if (!confirm(`Are you sure you want to remove "${goals[index].name}"?`)) {
        return;
    }

    // Remove the goal at the given index
    goals.splice(index, 1);
    saveGoals(goals);

    // Refresh goal list
    displayGoals();
};

// Load goals on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("goals.js loaded!");
    
    // Ensure we load goals immediately
    displayGoals();

    // Attach event listener to "Add Goal" button
    let addGoalBtn = document.getElementById("add-goal-btn");
    if (addGoalBtn) {
        addGoalBtn.addEventListener("click", addGoal);
    }
});