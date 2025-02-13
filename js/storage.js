function loadGoals() {
    return JSON.parse(localStorage.getItem("userGoals")) || [];
}

function saveGoals(goals) {
    localStorage.setItem("userGoals", JSON.stringify(goals));
}

function loadProgress() {
    return JSON.parse(localStorage.getItem("goalProgress")) || {};
}

function saveProgress(progress) {
    localStorage.setItem("goalProgress", JSON.stringify(progress));
}