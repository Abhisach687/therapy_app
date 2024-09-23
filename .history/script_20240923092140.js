/* script.js */

// Navigation Links
const homeLink = document.getElementById("homeLink");
const moodTrackerLink = document.getElementById("moodTrackerLink");
const exercisesLink = document.getElementById("exercisesLink");
const progressLink = document.getElementById("progressLink");
const resourcesLink = document.getElementById("resourcesLink");

// Main Content Area
const mainContent = document.getElementById("mainContent");

// Event Listeners for Navigation
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  setActiveLink(homeLink);
  loadHome();
});
moodTrackerLink.addEventListener("click", (e) => {
  e.preventDefault();
  setActiveLink(moodTrackerLink);
  loadMoodTracker();
});
exercisesLink.addEventListener("click", (e) => {
  e.preventDefault();
  setActiveLink(exercisesLink);
  loadExercises();
});
progressLink.addEventListener("click", (e) => {
  e.preventDefault();
  setActiveLink(progressLink);
  loadProgress();
});
resourcesLink.addEventListener("click", (e) => {
  e.preventDefault();
  setActiveLink(resourcesLink);
  loadResources();
});

// Load Home Page on Initial Load
window.onload = () => {
  setActiveLink(homeLink);
  loadHome();
};

// Function to set active link
function setActiveLink(activeLink) {
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

// Load Home Content
function loadHome() {
  mainContent.innerHTML = `
        <h2>Welcome to MyTherapyApp</h2>
        <p>Welcome to MyTherapyApp, your personal companion for mental well-being. This app provides evidence-based exercises and tools to help you manage anxiety and depression.</p>
        <p>Get started by tracking your mood or engaging in therapeutic exercises.</p>
    `;
}

// Load Mood Tracker
function loadMoodTracker() {
  mainContent.innerHTML = `
        <h2>Mood Tracker</h2>
        <form id="moodForm">
            <label for="mood">How are you feeling today?</label>
            <select id="mood" required>
                <option value="">Select your mood</option>
                <option value="5">Very Happy</option>
                <option value="4">Happy</option>
                <option value="3">Neutral</option>
                <option value="2">Sad</option>
                <option value="1">Very Sad</option>
            </select>
            <label for="notes">Notes:</label>
            <textarea id="notes" rows="4" placeholder="Add any notes..."></textarea>
            <button type="submit">Save Entry</button>
        </form>
        <div id="entries"></div>
    `;
  const moodForm = document.getElementById("moodForm");
  moodForm.addEventListener("submit", saveMoodEntry);
  displayMoodEntries();
}

// Save Mood Entry
function saveMoodEntry(e) {
  e.preventDefault();
  const mood = document.getElementById("mood").value;
  const notes = document.getElementById("notes").value;
  const date = new Date().toLocaleDateString();
  let entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  entries.push({ date, mood, notes });
  localStorage.setItem("moodEntries", JSON.stringify(entries));
  alert("Mood entry saved!");
  loadMoodTracker();
}

// Display Mood Entries
function displayMoodEntries() {
  const entriesDiv = document.getElementById("entries");
  let entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  if (entries.length === 0) {
    entriesDiv.innerHTML = "<p>No entries yet.</p>";
    return;
  }
  entriesDiv.innerHTML = "<h3>Your Entries:</h3>";
  entries.reverse().forEach((entry) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";
    entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Mood:</strong> ${getMoodText(entry.mood)}</p>
            <p><strong>Notes:</strong> ${entry.notes}</p>
        `;
    entriesDiv.appendChild(entryDiv);
  });
}

// Convert Mood Value to Text
function getMoodText(moodValue) {
  switch (moodValue) {
    case "5":
      return "Very Happy";
    case "4":
      return "Happy";
    case "3":
      return "Neutral";
    case "2":
      return "Sad";
    case "1":
      return "Very Sad";
    default:
      return "";
  }
}

// Load Exercises
function loadExercises() {
  mainContent.innerHTML = `
        <h2>Exercises</h2>
        <p>Select an exercise to begin:</p>
        <ul class="exercise-list">
            <li><button onclick="startCBTExercise()">Cognitive Behavioral Therapy (CBT) Exercise</button></li>
            <li><button onclick="startBAExercise()">Behavioral Activation (BA) Exercise</button></li>
            <li><button onclick="startMIExercise()">Motivational Interviewing (MI) Exercise</button></li>
            <li><button onclick="startPSTExercise()">Problem-Solving Therapy Exercise</button></li>
            <li><button onclick="startSFTExercise()">Solution-Focused Therapy Exercise</button></li>
        </ul>
        <div id="exerciseContent"></div>
    `;
}

// [Include the JavaScript functions for exercises as provided in the previous code.]

/* Due to space limitations, the full JavaScript code for the exercises is the same as provided in the previous answer. Please make sure to copy all the JavaScript code from the previous script.js file into your updated script.js file. */
