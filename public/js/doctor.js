// Import Firebase and Firebase Database functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Get references
const doctorForm = document.getElementById("doctor-form");
const doctorName = document.getElementById("doctor-name");
const doctorSpecialty = document.getElementById("doctor-specialty");
const doctorPhone = document.getElementById("doctor-phone");
const doctorList = document.getElementById("doctor-list");
const doctorId = document.getElementById("doctor-id");

// Add doctor to Firebase
function addDoctorToFirebase(name, specialty, phone) {
    const doctorRef = ref(database, 'doctors/' + Date.now());
    set(doctorRef, {
        name: name,
        specialty: specialty,
        phone: phone
    });
}

// Delete doctor from Firebase
function deleteDoctorFromFirebase(id) {
    const doctorRef = ref(database, 'doctors/' + id);
    remove(doctorRef);
}

// Render doctors list as a table
function renderDoctorList(doctors) {
    doctorList.innerHTML = ''; // Clear the table body
    for (let id in doctors) {
        const doctor = doctors[id];
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${doctor.name}</td>
            <td>${doctor.specialty}</td>
            <td>${doctor.phone}</td>
            <td>
                <button class="delete-btn" data-id="${id}">Delete</button>
            </td>
        `;

        // Add event listener to the delete button
        const deleteButton = tr.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteDoctor(id);
        });

        doctorList.appendChild(tr);
    }
}

// Delete doctor
function deleteDoctor(id) {
    deleteDoctorFromFirebase(id);
    // After deletion, re-fetch and render the list
    fetchDoctors();
}

// Handle form submission
doctorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = doctorId.value;
    const name = doctorName.value;
    const specialty = doctorSpecialty.value;
    const phone = doctorPhone.value;

    if (id) {
        updateDoctorInFirebase(id, name, specialty, phone);
        document.getElementById("submit-btn").textContent = "Add Doctor";
        doctorId.value = '';
    } else {
        addDoctorToFirebase(name, specialty, phone);
    }

    doctorName.value = '';
    doctorSpecialty.value = '';
    doctorPhone.value = '';
});

// Fetch doctors from Firebase
function fetchDoctors() {
    const doctorsRef = ref(database, 'doctors');
    get(doctorsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const doctors = snapshot.val();
            renderDoctorList(doctors);
        }
    });
}

// Initial fetch of doctors
fetchDoctors();