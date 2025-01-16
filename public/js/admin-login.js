// Import Firebase modules (v9+ modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration object (replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "AIzaSyBpBj6Dz9FZmiASt9d2PIGGNkYvtAzO1ww",
    authDomain: "ot-management-4e36f.firebaseapp.com",
    projectId: "ot-management-4e36f",
    storageBucket: "ot-management-4e36f.firebasestorage.app",
    messagingSenderId: "187994778339",
    appId: "1:187994778339:web:981d4f811b5462957773d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the form elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Add event listener to the login form
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get email and password values
    const email = emailInput.value;
    const password = passwordInput.value;

    // Perform Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // If login is successful, redirect to the admin dashboard
            window.location.href = "admin-dash.html";
        })
        .catch((error) => {
            // Handle errors during login
            const errorCode = error.code;
            const errorMessageText = error.message;
            errorMessage.textContent = `Error: ${errorMessageText}`;
        });
});