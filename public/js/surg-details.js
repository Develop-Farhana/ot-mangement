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

// Elements
const surgeryCardsContainer = document.getElementById('surgeryCards');

// Load Surgery Details from Firebase
async function loadSurgeryDetails() {
    const surgeryRef = ref(database, 'surgeryDetails');
    const snapshot = await get(surgeryRef);
    surgeryCardsContainer.innerHTML = ''; // Clear previous cards

    if (snapshot.exists()) {
        const surgeries = snapshot.val();
        Object.keys(surgeries).forEach(surgeryId => {
            const data = surgeries[surgeryId];

            // Create a card element
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>Surgery Type: ${data.surgeryType}</h3>
                <p><strong>Date:</strong> ${data.surgeryDate}</p>
                <p><strong>Surgeon:</strong> ${data.surgeon}</p>
                <p><strong>Anesthesia Type:</strong> ${data.anesthesiaType}</p>
                <p><strong>Duration:</strong> ${data.surgeryDuration}</p>
            `;

            // Append the card to the container
            surgeryCardsContainer.appendChild(card);
        });
    } else {
        surgeryCardsContainer.innerHTML = '<p>No surgery details available.</p>';
    }
}

// Load surgery details on page load
loadSurgeryDetails();