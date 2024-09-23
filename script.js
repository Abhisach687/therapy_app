/* script.js */

// Navigation Links
const homeLink = document.getElementById('homeLink');
const moodTrackerLink = document.getElementById('moodTrackerLink');
const exercisesLink = document.getElementById('exercisesLink');
const progressLink = document.getElementById('progressLink');
const resourcesLink = document.getElementById('resourcesLink');

// Main Content Area
const mainContent = document.getElementById('mainContent');

// Event Listeners for Navigation
homeLink.addEventListener('click', (e) => { e.preventDefault(); setActiveLink(homeLink); loadHome(); });
moodTrackerLink.addEventListener('click', (e) => { e.preventDefault(); setActiveLink(moodTrackerLink); loadMoodTracker(); });
exercisesLink.addEventListener('click', (e) => { e.preventDefault(); setActiveLink(exercisesLink); loadExercises(); });
progressLink.addEventListener('click', (e) => { e.preventDefault(); setActiveLink(progressLink); loadProgress(); });
resourcesLink.addEventListener('click', (e) => { e.preventDefault(); setActiveLink(resourcesLink); loadResources(); });

// Load Home Page on Initial Load
window.onload = () => {
    setActiveLink(homeLink);
    loadHome();
};

// Function to set active link
function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
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
    const moodForm = document.getElementById('moodForm');
    moodForm.addEventListener('submit', saveMoodEntry);
    displayMoodEntries();
}

// Save Mood Entry
function saveMoodEntry(e) {
    e.preventDefault();
    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value;
    const date = new Date().toLocaleDateString();
    let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    entries.push({ date, mood, notes });
    localStorage.setItem('moodEntries', JSON.stringify(entries));
    alert('Mood entry saved!');
    loadMoodTracker();
}

// Display Mood Entries
function displayMoodEntries() {
    const entriesDiv = document.getElementById('entries');
    let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    if (entries.length === 0) {
        entriesDiv.innerHTML = '<p>No entries yet.</p>';
        return;
    }
    entriesDiv.innerHTML = '<h3>Your Entries:</h3>';
    entries.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
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
    switch(moodValue) {
        case '5': return 'Very Happy';
        case '4': return 'Happy';
        case '3': return 'Neutral';
        case '2': return 'Sad';
        case '1': return 'Very Sad';
        default: return '';
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
            <li><button onclick="startPositiveReframingExercise()">Positive Reframing Exercise</button></li>
            <li><button onclick="startSavoringExercise()">Savoring Moments Exercise</button></li>
            <li><button onclick="startGratitudeExercise()">Gratitude Journaling Exercise</button></li>
        </ul>
        <div id="exerciseContent"></div>
    `;
}

// CBT Exercise
function startCBTExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
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
        <div id="cbtEntries"></div>
    `;
    const cbtForm = document.getElementById('cbtForm');
    cbtForm.addEventListener('submit', saveCBTExercise);
    displayCBTEntries();
}

// Save CBT Exercise
function saveCBTExercise(e) {
    e.preventDefault();
    const situation = document.getElementById('situation').value;
    const thoughts = document.getElementById('thoughts').value;
    const feelings = document.getElementById('feelings').value;
    const challenge = document.getElementById('challenge').value;
    const date = new Date().toLocaleDateString();
    let cbtExercises = JSON.parse(localStorage.getItem('cbtExercises')) || [];
    cbtExercises.push({ date, situation, thoughts, feelings, challenge });
    localStorage.setItem('cbtExercises', JSON.stringify(cbtExercises));
    alert('CBT Exercise saved!');
    startCBTExercise();
}

// Display CBT Entries
function displayCBTEntries() {
    const cbtEntriesDiv = document.getElementById('cbtEntries');
    let cbtExercises = JSON.parse(localStorage.getItem('cbtExercises')) || [];
    if (cbtExercises.length === 0) {
        cbtEntriesDiv.innerHTML = '<p>No CBT exercises saved yet.</p>';
        return;
    }
    cbtEntriesDiv.innerHTML = '<h3>Your CBT Exercises:</h3>';
    cbtExercises.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Situation:</strong> ${entry.situation}</p>
            <p><strong>Automatic Thoughts:</strong> ${entry.thoughts}</p>
            <p><strong>Feelings:</strong> ${entry.feelings}</p>
            <p><strong>Challenge:</strong> ${entry.challenge}</p>
        `;
        cbtEntriesDiv.appendChild(entryDiv);
    });
}

// BA Exercise
function startBAExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
    exerciseContent.innerHTML = `
        <h3>Behavioral Activation Activity Planning</h3>
        <form id="baForm">
            <label for="activity">Activity:</label>
            <input type="text" id="activity" required>
            <label for="date">Scheduled Date:</label>
            <input type="date" id="date" required>
            <button type="submit">Save Activity</button>
        </form>
        <div id="baEntries"></div>
    `;
    const baForm = document.getElementById('baForm');
    baForm.addEventListener('submit', saveBAExercise);
    displayBAEntries();
}

// Save BA Exercise
function saveBAExercise(e) {
    e.preventDefault();
    const activity = document.getElementById('activity').value;
    const date = document.getElementById('date').value;
    let baActivities = JSON.parse(localStorage.getItem('baActivities')) || [];
    baActivities.push({ activity, date });
    localStorage.setItem('baActivities', JSON.stringify(baActivities));
    alert('Activity saved!');
    startBAExercise();
}

// Display BA Entries
function displayBAEntries() {
    const baEntriesDiv = document.getElementById('baEntries');
    let baActivities = JSON.parse(localStorage.getItem('baActivities')) || [];
    if (baActivities.length === 0) {
        baEntriesDiv.innerHTML = '<p>No activities planned yet.</p>';
        return;
    }
    baEntriesDiv.innerHTML = '<h3>Your Planned Activities:</h3>';
    baActivities.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Activity:</strong> ${entry.activity}</p>
            <p><strong>Date:</strong> ${entry.date}</p>
        `;
        baEntriesDiv.appendChild(entryDiv);
    });
}

// MI Exercise
function startMIExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
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
        <div id="miEntries"></div>
    `;
    const miForm = document.getElementById('miForm');
    miForm.addEventListener('submit', saveMIExercise);
    displayMIEntries();
}

// Save MI Exercise
function saveMIExercise(e) {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    const reasons = document.getElementById('reasons').value;
    const steps = document.getElementById('steps').value;
    const date = new Date().toLocaleDateString();
    let miGoals = JSON.parse(localStorage.getItem('miGoals')) || [];
    miGoals.push({ date, goal, reasons, steps });
    localStorage.setItem('miGoals', JSON.stringify(miGoals));
    alert('Goal saved!');
    startMIExercise();
}

// Display MI Entries
function displayMIEntries() {
    const miEntriesDiv = document.getElementById('miEntries');
    let miGoals = JSON.parse(localStorage.getItem('miGoals')) || [];
    if (miGoals.length === 0) {
        miEntriesDiv.innerHTML = '<p>No goals set yet.</p>';
        return;
    }
    miEntriesDiv.innerHTML = '<h3>Your Goals:</h3>';
    miGoals.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Goal:</strong> ${entry.goal}</p>
            <p><strong>Reasons:</strong> ${entry.reasons}</p>
            <p><strong>Next Steps:</strong> ${entry.steps}</p>
        `;
        miEntriesDiv.appendChild(entryDiv);
    });
}

// Problem-Solving Therapy Exercise
function startPSTExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
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
        <div id="pstEntries"></div>
    `;
    const pstForm = document.getElementById('pstForm');
    pstForm.addEventListener('submit', savePSTExercise);
    displayPSTEntries();
}

// Save PST Exercise
function savePSTExercise(e) {
    e.preventDefault();
    const problem = document.getElementById('problem').value;
    const solutions = document.getElementById('solutions').value;
    const actionPlan = document.getElementById('actionPlan').value;
    const date = new Date().toLocaleDateString();
    let pstPlans = JSON.parse(localStorage.getItem('pstPlans')) || [];
    pstPlans.push({ date, problem, solutions, actionPlan });
    localStorage.setItem('pstPlans', JSON.stringify(pstPlans));
    alert('Plan saved!');
    startPSTExercise();
}

// Display PST Entries
function displayPSTEntries() {
    const pstEntriesDiv = document.getElementById('pstEntries');
    let pstPlans = JSON.parse(localStorage.getItem('pstPlans')) || [];
    if (pstPlans.length === 0) {
        pstEntriesDiv.innerHTML = '<p>No problem-solving exercises saved yet.</p>';
        return;
    }
    pstEntriesDiv.innerHTML = '<h3>Your Problem-Solving Exercises:</h3>';
    pstPlans.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Problem:</strong> ${entry.problem}</p>
            <p><strong>Possible Solutions:</strong> ${entry.solutions}</p>
            <p><strong>Action Plan:</strong> ${entry.actionPlan}</p>
        `;
        pstEntriesDiv.appendChild(entryDiv);
    });
}

// Solution-Focused Therapy Exercise
function startSFTExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
    exerciseContent.innerHTML = `
        <h3>Solution-Focused Exercise</h3>
        <form id="sftForm">
            <label for="miracleQuestion">Miracle Question:</label>
            <textarea id="miracleQuestion" rows="2" required></textarea>
            <label for="exceptions">Exceptions:</label>
            <textarea id="exceptions" rows="2" required></textarea>
            <button type="submit">Save Exercise</button>
        </form>
        <div id="sftEntries"></div>
    `;
    const sftForm = document.getElementById('sftForm');
    sftForm.addEventListener('submit', saveSFTExercise);
    displaySFTEntries();
}

// Save SFT Exercise
function saveSFTExercise(e) {
    e.preventDefault();
    const miracleQuestion = document.getElementById('miracleQuestion').value;
    const exceptions = document.getElementById('exceptions').value;
    const date = new Date().toLocaleDateString();
    let sftExercises = JSON.parse(localStorage.getItem('sftExercises')) || [];
    sftExercises.push({ date, miracleQuestion, exceptions });
    localStorage.setItem('sftExercises', JSON.stringify(sftExercises));
    alert('Solution-Focused Exercise saved!');
    startSFTExercise();
}

// Display SFT Entries
function displaySFTEntries() {
    const sftEntriesDiv = document.getElementById('sftEntries');
    let sftExercises = JSON.parse(localStorage.getItem('sftExercises')) || [];
    if (sftExercises.length === 0) {
        sftEntriesDiv.innerHTML = '<p>No solution-focused exercises saved yet.</p>';
        return;
    }
    sftEntriesDiv.innerHTML = '<h3>Your Solution-Focused Exercises:</h3>';
    sftExercises.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Miracle Question Response:</strong> ${entry.miracleQuestion}</p>
            <p><strong>Exceptions:</strong> ${entry.exceptions}</p>
        `;
        sftEntriesDiv.appendChild(entryDiv);
    });
}

// Positive Reframing Exercise
function startPositiveReframingExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
    exerciseContent.innerHTML = `
        <h3>Positive Reframing Exercise</h3>
        <form id="prForm">
            <label for="negativeEvent">Describe a Negative Event or Thought:</label>
            <textarea id="negativeEvent" rows="2" required></textarea>
            <label for="reframe">Positive Reframe:</label>
            <textarea id="reframe" rows="2" required></textarea>
            <button type="submit">Save Exercise</button>
        </form>
        <div id="prEntries"></div>
    `;
    const prForm = document.getElementById('prForm');
    prForm.addEventListener('submit', savePositiveReframingExercise);
    displayPositiveReframingEntries();
}

// Save Positive Reframing Exercise
function savePositiveReframingExercise(e) {
    e.preventDefault();
    const negativeEvent = document.getElementById('negativeEvent').value;
    const reframe = document.getElementById('reframe').value;
    const date = new Date().toLocaleDateString();
    let prExercises = JSON.parse(localStorage.getItem('prExercises')) || [];
    prExercises.push({ date, negativeEvent, reframe });
    localStorage.setItem('prExercises', JSON.stringify(prExercises));
    alert('Positive Reframing Exercise saved!');
    startPositiveReframingExercise();
}

// Display Positive Reframing Entries
function displayPositiveReframingEntries() {
    const prEntriesDiv = document.getElementById('prEntries');
    let prExercises = JSON.parse(localStorage.getItem('prExercises')) || [];
    if (prExercises.length === 0) {
        prEntriesDiv.innerHTML = '<p>No positive reframing exercises saved yet.</p>';
        return;
    }
    prEntriesDiv.innerHTML = '<h3>Your Positive Reframing Exercises:</h3>';
    prExercises.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Negative Event/Thought:</strong> ${entry.negativeEvent}</p>
            <p><strong>Positive Reframe:</strong> ${entry.reframe}</p>
        `;
        prEntriesDiv.appendChild(entryDiv);
    });
}

// Savoring Moments Exercise
function startSavoringExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
    exerciseContent.innerHTML = `
        <h3>Savoring Moments Exercise</h3>
        <form id="savoringForm">
            <label for="moment">Describe a Positive Experience:</label>
            <textarea id="moment" rows="2" required></textarea>
            <label for="senses">What Did You Notice with Your Senses?</label>
            <textarea id="senses" rows="2" required></textarea>
            <label for="feelings">How Did It Make You Feel?</label>
            <textarea id="feelings" rows="2" required></textarea>
            <button type="submit">Save Exercise</button>
        </form>
        <div id="savoringEntries"></div>
    `;
    const savoringForm = document.getElementById('savoringForm');
    savoringForm.addEventListener('submit', saveSavoringExercise);
    displaySavoringEntries();
}

// Save Savoring Exercise
function saveSavoringExercise(e) {
    e.preventDefault();
    const moment = document.getElementById('moment').value;
    const senses = document.getElementById('senses').value;
    const feelings = document.getElementById('feelings').value;
    const date = new Date().toLocaleDateString();
    let savoringExercises = JSON.parse(localStorage.getItem('savoringExercises')) || [];
    savoringExercises.push({ date, moment, senses, feelings });
    localStorage.setItem('savoringExercises', JSON.stringify(savoringExercises));
    alert('Savoring Moments Exercise saved!');
    startSavoringExercise();
}

// Display Savoring Entries
function displaySavoringEntries() {
    const savoringEntriesDiv = document.getElementById('savoringEntries');
    let savoringExercises = JSON.parse(localStorage.getItem('savoringExercises')) || [];
    if (savoringExercises.length === 0) {
        savoringEntriesDiv.innerHTML = '<p>No savoring moments exercises saved yet.</p>';
        return;
    }
    savoringEntriesDiv.innerHTML = '<h3>Your Savoring Moments Exercises:</h3>';
    savoringExercises.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Positive Experience:</strong> ${entry.moment}</p>
            <p><strong>Sensory Details:</strong> ${entry.senses}</p>
            <p><strong>Feelings:</strong> ${entry.feelings}</p>
        `;
        savoringEntriesDiv.appendChild(entryDiv);
    });
}

// Gratitude Journaling Exercise
function startGratitudeExercise() {
    const exerciseContent = document.getElementById('exerciseContent');
    exerciseContent.innerHTML = `
        <h3>Gratitude Journaling Exercise</h3>
        <form id="gratitudeForm">
            <label for="gratitudeEntry">Write down three things you're grateful for today:</label>
            <textarea id="gratitudeEntry" rows="4" required></textarea>
            <button type="submit">Save Entry</button>
        </form>
        <div id="gratitudeEntries"></div>
    `;
    const gratitudeForm = document.getElementById('gratitudeForm');
    gratitudeForm.addEventListener('submit', saveGratitudeExercise);
    displayGratitudeEntries();
}

// Save Gratitude Exercise
function saveGratitudeExercise(e) {
    e.preventDefault();
    const gratitudeEntry = document.getElementById('gratitudeEntry').value;
    const date = new Date().toLocaleDateString();
    let gratitudeExercises = JSON.parse(localStorage.getItem('gratitudeExercises')) || [];
    gratitudeExercises.push({ date, gratitudeEntry });
    localStorage.setItem('gratitudeExercises', JSON.stringify(gratitudeExercises));
    alert('Gratitude entry saved!');
    startGratitudeExercise();
}

// Display Gratitude Entries
function displayGratitudeEntries() {
    const gratitudeEntriesDiv = document.getElementById('gratitudeEntries');
    let gratitudeExercises = JSON.parse(localStorage.getItem('gratitudeExercises')) || [];
    if (gratitudeExercises.length === 0) {
        gratitudeEntriesDiv.innerHTML = '<p>No gratitude entries saved yet.</p>';
        return;
    }
    gratitudeEntriesDiv.innerHTML = '<h3>Your Gratitude Entries:</h3>';
    gratitudeExercises.reverse().forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Gratitude Entry:</strong><br>${entry.gratitudeEntry.replace(/\n/g, '<br>')}</p>
        `;
        gratitudeEntriesDiv.appendChild(entryDiv);
    });
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
    const progressContent = document.getElementById('progressContent');
    // Display Mood Entries
    let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    if (entries.length > 0) {
        progressContent.innerHTML += '<h3>Mood Tracker Entries:</h3>';
        entries.reverse().forEach(entry => {
            progressContent.innerHTML += `
                <p><strong>Date:</strong> ${entry.date} - <strong>Mood:</strong> ${getMoodText(entry.mood)}</p>
            `;
        });
    } else {
        progressContent.innerHTML += '<p>No mood entries yet.</p>';
    }
    // Display other exercises counts
    let cbtExercises = JSON.parse(localStorage.getItem('cbtExercises')) || [];
    let baActivities = JSON.parse(localStorage.getItem('baActivities')) || [];
    let miGoals = JSON.parse(localStorage.getItem('miGoals')) || [];
    let pstPlans = JSON.parse(localStorage.getItem('pstPlans')) || [];
    let sftExercises = JSON.parse(localStorage.getItem('sftExercises')) || [];
    let prExercises = JSON.parse(localStorage.getItem('prExercises')) || [];
    let savoringExercises = JSON.parse(localStorage.getItem('savoringExercises')) || [];
    let gratitudeExercises = JSON.parse(localStorage.getItem('gratitudeExercises')) || [];

    progressContent.innerHTML += `
        <h3>Exercises Completed:</h3>
        <p><strong>CBT Exercises:</strong> ${cbtExercises.length}</p>
        <p><strong>BA Activities:</strong> ${baActivities.length}</p>
        <p><strong>MI Goals:</strong> ${miGoals.length}</p>
        <p><strong>PST Exercises:</strong> ${pstPlans.length}</p>
        <p><strong>SFT Exercises:</strong> ${sftExercises.length}</p>
        <p><strong>Positive Reframing Exercises:</strong> ${prExercises.length}</p>
        <p><strong>Savoring Moments Exercises:</strong> ${savoringExercises.length}</p>
        <p><strong>Gratitude Entries:</strong> ${gratitudeExercises.length}</p>
    `;
}

// Load Resources
function loadResources() {
    mainContent.innerHTML = `
        <h2>Resources</h2>
        <p>Here are some helpful resources for managing anxiety and depression:</p>
        <ul>
            <li><a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders/index.shtml" target="_blank">Anxiety Disorders - National Institute of Mental Health</a></li>
            <li><a href="https://www.nimh.nih.gov/health/topics/depression/index.shtml" target="_blank">Depression - National Institute of Mental Health</a></li>
            <li><a href="https://www.mind.org.uk/" target="_blank">Mind - For Better Mental Health</a></li>
            <li><a href="https://www.psychologytools.com/" target="_blank">Psychology Tools - Free CBT Worksheets</a></li>
        </ul>
    `;
}
