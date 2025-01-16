// Import Firebase and Firebase Database functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Get reference to the doctor list container
const doctorList = document.getElementById("doctor-list");

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

// Render doctors list as cards
function renderDoctorList(doctors) {
    doctorList.innerHTML = ''; // Clear the card container

    for (let id in doctors) {
        const doctor = doctors[id];

        const card = document.createElement("div");
        card.classList.add("doctor-card");

        card.innerHTML = `
            <h4><strong>Doctor:</strong>v${doctor.name}</h4>
            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
            <p><strong>Phone Number:</strong> ${doctor.phone}</p>
        `;

        doctorList.appendChild(card);
    }
}

// Initial fetch of doctors
fetchDoctors();