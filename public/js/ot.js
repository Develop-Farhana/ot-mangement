// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, get, remove, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpBj6Dz9FZmiASt9d2PIGGNkYvtAzO1ww",
    authDomain: "ot-management-4e36f.firebaseapp.com",
    databaseURL: "https://ot-management-4e36f-default-rtdb.firebaseio.com",
    projectId: "ot-management-4e36f",
    storageBucket: "ot-management-4e36f.firebasestorage.app",
    messagingSenderId: "187994778339",
    appId: "1:187994778339:web:981d4f811b5462957773d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elements
const form = document.getElementById('operationForm');
const operationTypeInput = document.getElementById('operationType');
const scheduleTimeInput = document.getElementById('scheduleTime');
const surgeonInput = document.getElementById('surgeon');
const patientIdInput = document.getElementById('patientId');
const scheduleIdInput = document.getElementById('scheduleId');
const operationList = document.getElementById('operationList').getElementsByTagName('tbody')[0];

// Add or Update operation schedule
form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const scheduleId = scheduleIdInput.value;
    const operationType = operationTypeInput.value;
    const scheduleTime = scheduleTimeInput.value;
    const surgeon = surgeonInput.value;
    const patientId = patientIdInput.value;

    const scheduleRef = ref(database, 'operationSchedules/' + (scheduleId || Date.now())); // Use scheduleId if editing, else create a new one

    if (scheduleId) {
        // Update existing schedule
        await update(scheduleRef, {
            operationType,
            scheduleTime,
            surgeon,
            patientId
        });
        alert('Operation Schedule updated successfully');
    } else {
        // Add new schedule
        await set(scheduleRef, {
            operationType,
            scheduleTime,
            surgeon,
            patientId
        });
        alert('Operation Schedule added successfully');
    }

    form.reset();
    loadSchedules(); // Reload schedule list
});

// Load operation schedules from the database
async function loadSchedules() {
    const schedulesRef = ref(database, 'operationSchedules');
    const snapshot = await get(schedulesRef);
    operationList.innerHTML = ''; // Clear table

    if (snapshot.exists()) {
        const schedules = snapshot.val();
        Object.keys(schedules).forEach(scheduleId => {
            const data = schedules[scheduleId];
            const row = operationList.insertRow();

            row.innerHTML = `
                <td>${data.operationType}</td>
                <td>${data.scheduleTime}</td>
                <td>${data.surgeon}</td>
                <td>${data.patientId}</td>
                <td>
                    <button class="edit" onclick="editSchedule('${scheduleId}')">Edit</button>
                    <button class="delete" onclick="deleteSchedule('${scheduleId}')">Delete</button>
                </td>
            `;
        });
    }
}

// Edit operation schedule
function editSchedule(scheduleId) {
    const scheduleRef = ref(database, 'operationSchedules/' + scheduleId);
    get(scheduleRef).then(snapshot => {
        const data = snapshot.val();
        operationTypeInput.value = data.operationType;
        scheduleTimeInput.value = data.scheduleTime;
        surgeonInput.value = data.surgeon;
        patientIdInput.value = data.patientId;
        scheduleIdInput.value = scheduleId;
    });
}

// Delete operation schedule
async function deleteSchedule(scheduleId) {
    if (confirm('Are you sure you want to delete this operation schedule?')) {
        const scheduleRef = ref(database, 'operationSchedules/' + scheduleId);
        await remove(scheduleRef);
        alert('Operation Schedule deleted successfully');
        loadSchedules(); // Reload schedule list
    }
}

// Load operation schedules on page load
loadSchedules();