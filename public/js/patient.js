// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, get, remove, child, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const form = document.getElementById('patientForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const medicalHistoryInput = document.getElementById('medicalHistory');
const patientIdInput = document.getElementById('patientId');
const patientList = document.getElementById('patientList').getElementsByTagName('tbody')[0];

// Add or Update patient
form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const patientId = patientIdInput.value;
    const name = nameInput.value;
    const age = ageInput.value;
    const medicalHistory = medicalHistoryInput.value;

    const patientRef = ref(database, 'patients/' + (patientId || Date.now())); // Use patientId if editing, else create a new one

    if (patientId) {
        // Update existing patient
        await update(patientRef, {
            name,
            age,
            medicalHistory
        });
        alert('Patient updated successfully');
    } else {
        // Add new patient
        await set(patientRef, {
            name,
            age,
            medicalHistory
        });
        alert('Patient added successfully');
    }

    form.reset();
    loadPatients(); // Reload patients list
});

// Load patients from the database
async function loadPatients() {
    const patientsRef = ref(database, 'patients');
    const snapshot = await get(patientsRef);
    patientList.innerHTML = ''; // Clear table

    if (snapshot.exists()) {
        const patients = snapshot.val();
        Object.keys(patients).forEach(patientId => {
            const data = patients[patientId];
            const row = patientList.insertRow();

            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.medicalHistory}</td>
                <td>
                    <button class="edit" onclick="editPatient('${patientId}')">Edit</button>
                    <button class="delete" onclick="deletePatient('${patientId}')">Delete</button>
                </td>
            `;
        });
    }
}

// Edit patient
// Edit patient
window.editPatient = async function(patientId) {
    const patientRef = ref(database, 'patients/' + patientId);

    try {
        const snapshot = await get(patientRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            nameInput.value = data.name;
            ageInput.value = data.age;
            medicalHistoryInput.value = data.medicalHistory;
            patientIdInput.value = patientId; // Set patient ID to the hidden input for editing
        } else {
            alert('Patient not found.');
        }
    } catch (error) {
        console.error('Error fetching patient data:', error);
        alert('Failed to fetch patient data. Please try again.');
    }
};


window.deletePatient = async function(patientId) {
    if (confirm('Are you sure you want to delete this patient?')) {
        const patientRef = ref(database, 'patients/' + patientId);
        try {
            await remove(patientRef);
            alert('Patient deleted successfully');
            loadPatients(); // Reload patients list
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient. Please try again.');
        }
    }
};

// Load patients on page load
loadPatients();