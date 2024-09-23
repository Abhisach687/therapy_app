/* script.js */

// Navigation Links
const homeLink = document.getElementById("homeLink");
const moodTrackerLink = document.getElementById("moodTrackerLink");
const exercisesLink = document.getElementById("exercisesLink");
const progressLink = document.getElementById("progressLink");

// Main Content Area
const mainContent = document.getElementById("mainContent");

// Event Listeners for Navigation
homeLink.addEventListener("click", loadHome);
moodTrackerLink.addEventListener("click", loadMoodTracker);
exercisesLink.addEventListener("click", loadExercises);
progressLink.addEventListener("click", loadProgress);

// Load Home Page on Initial Load
window.onload = loadHome;

// Load Home Content
function loadHome() {
  mainContent.innerHTML = `
        <h2>Home</h2>
        <p>Welcome to MyTherapyApp, your personal companion for mental well-being. Navigate through the app to track your mood, engage in therapeutic exercises, and monitor your progress.</p>
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
        <ul>
            <li><button onclick="startCBTExercise()">Cognitive Behavioral Therapy (CBT) Exercise</button></li>
            <li><button onclick="startBAExercise()">Behavioral Activation (BA) Exercise</button></li>
            <li><button onclick="startMIExercise()">Motivational Interviewing (MI) Exercise</button></li>
            <li><button onclick="startPSTExercise()">Problem-Solving Therapy Exercise</button></li>
            <li><button onclick="startSFTExercise()">Solution-Focused Therapy Exercise</button></li>
        </ul>
        <div id="exerciseContent"></div>
    `;
}

// CBT Exercise
function startCBTExercise() {
  const exerciseContent = document.getElementById("exerciseContent");
  exerciseContent.innerHTML = `
        <h3>CBT Thought Record</h3>
        <form id="cbtForm">
            <label for="situation">Situation:</label>
            <textarea id="situation" rows="2" required></textarea>
            <label for="thoughts">Automatic Thoughts:</label>
            <textarea id="thoughts" rows="2" required></textarea>
            <label for="feelings">Feelings:</label>
            <textarea id="feelings" rows="2" required></textarea>
            <label for="challenge">Challenge Negative Thoughts:</label>
            <textarea id="challenge" rows="2" required></textarea>
            <button type="submit">Save Exercise</button>
        </form>
    `;
  const cbtForm = document.getElementById("cbtForm");
  cbtForm.addEventListener("submit", saveCBTExercise);
}

// Save CBT Exercise
function saveCBTExercise(e) {
  e.preventDefault();
  const situation = document.getElementById("situation").value;
  const thoughts = document.getElementById("thoughts").value;
  const feelings = document.getElementById("feelings").value;
  const challenge = document.getElementById("challenge").value;
  let cbtExercises = JSON.parse(localStorage.getItem("cbtExercises")) || [];
  cbtExercises.push({ situation, thoughts, feelings, challenge });
  localStorage.setItem("cbtExercises", JSON.stringify(cbtExercises));
  alert("CBT Exercise saved!");
  loadExercises();
}

// BA Exercise
function startBAExercise() {
  const exerciseContent = document.getElementById("exerciseContent");
  exerciseContent.innerHTML = `
        <h3>Behavioral Activation Activity Planning</h3>
        <form id="baForm">
            <label for="activity">Activity:</label>
            <input type="text" id="activity" required>
            <label for="date">Scheduled Date:</label>
            <input type="date" id="date" required>
            <button type="submit">Save Activity</button>
        </form>
    `;
  const baForm = document.getElementById("baForm");
  baForm.addEventListener("submit", saveBAExercise);
}

// Save BA Exercise
function saveBAExercise(e) {
  e.preventDefault();
  const activity = document.getElementById("activity").value;
  const date = document.getElementById("date").value;
  let baActivities = JSON.parse(localStorage.getItem("baActivities")) || [];
  baActivities.push({ activity, date });
  localStorage.setItem("baActivities", JSON.stringify(baActivities));
  alert("Activity saved!");
  loadExercises();
}

// MI Exercise
function startMIExercise() {
  const exerciseContent = document.getElementById("exerciseContent");
  exerciseContent.innerHTML = `
        <h3>Motivational Interviewing Goal Setting</h3>
        <form id="miForm">
            <label for="goal">Your Goal:</label>
            <textarea id="goal" rows="2" required></textarea>
            <label for="reasons">Reasons for Change:</label>
            <textarea id="reasons" rows="2" required></textarea>
            <label for="steps">Next Steps:</label>
            <textarea id="steps" rows="2" required></textarea>
            <button type="submit">Save Goal</button>
        </form>
    `;
  const miForm = document.getElementById("miForm");
  miForm.addEventListener("submit", saveMIExercise);
}

// Save MI Exercise
function saveMIExercise(e) {
  e.preventDefault();
  const goal = document.getElementById("goal").value;
  const reasons = document.getElementById("reasons").value;
  const steps = document.getElementById("steps").value;
  let miGoals = JSON.parse(localStorage.getItem("miGoals")) || [];
  miGoals.push({ goal, reasons, steps });
  localStorage.setItem("miGoals", JSON.stringify(miGoals));
  alert("Goal saved!");
  loadExercises();
}

// Problem-Solving Therapy Exercise
function startPSTExercise() {
  const exerciseContent = document.getElementById("exerciseContent");
  exerciseContent.innerHTML = `
        <h3>Problem-Solving Exercise</h3>
        <form id="pstForm">
            <label for="problem">Define the Problem:</label>
            <textarea id="problem" rows="2" required></textarea>
            <label for="solutions">Possible Solutions:</label>
            <textarea id="solutions" rows="2" required></textarea>
            <label for="actionPlan">Action Plan:</label>
            <textarea id="actionPlan" rows="2" required></textarea>
            <button type="submit">Save Plan</button>
        </form>
    `;
  const pstForm = document.getElementById("pstForm");
  pstForm.addEventListener("submit", savePSTExercise);
}

// Save PST Exercise
function savePSTExercise(e) {
  e.preventDefault();
  const problem = document.getElementById("problem").value;
  const solutions = document.getElementById("solutions").value;
  const actionPlan = document.getElementById("actionPlan").value;
  let pstPlans = JSON.parse(localStorage.getItem("pstPlans")) || [];
  pstPlans.push({ problem, solutions, actionPlan });
  localStorage.setItem("pstPlans", JSON.stringify(pstPlans));
  alert("Plan saved!");
  loadExercises();
}

// Solution-Focused Therapy Exercise
function startSFTExercise() {
  const exerciseContent = document.getElementById("exerciseContent");
  exerciseContent.innerHTML = `
        <h3>Solution-Focused Exercise</h3>
        <form id="sftForm">
            <label for="miracleQuestion">Miracle Question:</label>
            <textarea id="miracleQuestion" rows="2" required></textarea>
            <label for="exceptions">Exceptions:</label>
            <textarea id="exceptions" rows="2" required></textarea>
            <button type="submit">Save Exercise</button>
        </form>
    `;
  const sftForm = document.getElementById("sftForm");
  sftForm.addEventListener("submit", saveSFTExercise);
}

// Save SFT Exercise
function saveSFTExercise(e) {
  e.preventDefault();
  const miracleQuestion = document.getElementById("miracleQuestion").value;
  const exceptions = document.getElementById("exceptions").value;
  let sftExercises = JSON.parse(localStorage.getItem("sftExercises")) || [];
  sftExercises.push({ miracleQuestion, exceptions });
  localStorage.setItem("sftExercises", JSON.stringify(sftExercises));
  alert("Solution-Focused Exercise saved!");
  loadExercises();
}

// Load Progress
function loadProgress() {
  mainContent.innerHTML = `
        <h2>Your Progress</h2>
        <div id="progressContent"></div>
    `;
  displayProgress();
}

// Display Progress Data
function displayProgress() {
  const progressContent = document.getElementById("progressContent");
  // Display Mood Entries
  let entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  if (entries.length > 0) {
    progressContent.innerHTML += "<h3>Mood Tracker Entries:</h3>";
    entries.reverse().forEach((entry) => {
      progressContent.innerHTML += `
                <p><strong>Date:</strong> ${
                  entry.date
                } - <strong>Mood:</strong> ${getMoodText(entry.mood)}</p>
            `;
    });
  }
  // Display other exercises as desired
}
