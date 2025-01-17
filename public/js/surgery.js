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
const form = document.getElementById('surgeryForm');
const surgeryTypeInput = document.getElementById('surgeryType');
const surgeryDateInput = document.getElementById('surgeryDate');
const surgeonInput = document.getElementById('surgeon');
const anesthesiaTypeInput = document.getElementById('anesthesiaType');
const surgeryDurationInput = document.getElementById('surgeryDuration');
const surgeryIdInput = document.getElementById('surgeryId');
const surgeryTable = document.getElementById('surgeryTable').getElementsByTagName('tbody')[0];

// Add or Update Surgery Details
form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const surgeryId = surgeryIdInput.value;
    const surgeryType = surgeryTypeInput.value;
    const surgeryDate = surgeryDateInput.value;
    const surgeon = surgeonInput.value;
    const anesthesiaType = anesthesiaTypeInput.value;
    const surgeryDuration = surgeryDurationInput.value;

    const surgeryRef = ref(database, 'surgeryDetails/' + (surgeryId || Date.now()));

    if (surgeryId) {
        // Update existing surgery
        await update(surgeryRef, {
            surgeryType,
            surgeryDate,
            surgeon,
            anesthesiaType,
            surgeryDuration
        });
        alert('Surgery Details updated successfully');
    } else {
        // Add new surgery
        await set(surgeryRef, {
            surgeryType,
            surgeryDate,
            surgeon,
            anesthesiaType,
            surgeryDuration
        });
        alert('Surgery Details added successfully');
    }

    form.reset();
    loadSurgeryDetails(); // Reload surgery details
});

// Load Surgery Details from Firebase
async function loadSurgeryDetails() {
    const surgeryRef = ref(database, 'surgeryDetails');
    const snapshot = await get(surgeryRef);
    surgeryTable.innerHTML = ''; // Clear table

    if (snapshot.exists()) {
        const surgeries = snapshot.val();
        Object.keys(surgeries).forEach(surgeryId => {
            const data = surgeries[surgeryId];
            const row = surgeryTable.insertRow();

            row.innerHTML = `
                <td>${data.surgeryType}</td>
                <td>${data.surgeryDate}</td>
                <td>${data.surgeon}</td>
                <td>${data.anesthesiaType}</td>
                <td>${data.surgeryDuration}</td>
                <td>
                    <button class="edit" onclick="editSurgery('${surgeryId}')">Edit</button>
                    <button class="delete" onclick="deleteSurgery('${surgeryId}')">Delete</button>
                </td>
            `;
        });
    }
}

// Edit surgery details
window.editSurgery = async function(surgeryId) {
    const surgeryRef = ref(database, 'surgeryDetails/' + surgeryId);
    try {
        const snapshot = await get(surgeryRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            surgeryTypeInput.value = data.surgeryType;
            surgeryDateInput.value = data.surgeryDate;
            surgeonInput.value = data.surgeon;
            anesthesiaTypeInput.value = data.anesthesiaType;
            surgeryDurationInput.value = data.surgeryDuration;
            surgeryIdInput.value = surgeryId; // Set surgery ID for updating
        } else {
            alert('Surgery not found.');
        }
    } catch (error) {
        console.error('Error fetching surgery data:', error);
        alert('Failed to fetch surgery data. Please try again.');
    }
};

// Delete surgery details
window.deleteSurgery = async function(surgeryId) {
    if (confirm('Are you sure you want to delete this surgery?')) {
        const surgeryRef = ref(database, 'surgeryDetails/' + surgeryId);
        try {
            await remove(surgeryRef);
            alert('Surgery deleted successfully');
            loadSurgeryDetails(); // Reload surgery details after deletion
        } catch (error) {
            console.error('Error deleting surgery:', error);
            alert('Failed to delete surgery. Please try again.');
        }
    }
};

// Load surgery details on page load
loadSurgeryDetails();