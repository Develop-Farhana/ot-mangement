// Get the links and content sections
const manageDoctorsLink = document.getElementById('manage-doctors-link');
const managePatientsLink = document.getElementById('manage-patients-link');
const manageSurgeriesLink = document.getElementById('manage-surgeries-link');
const manageDoctorsSection = document.getElementById('manage-doctors');
const managePatientsSection = document.getElementById('manage-patients');
const manageSurgerySection = document.getElementById('manage-surgeries');

// Function to hide all content sections
function hideAllSections() {
    manageDoctorsSection.style.display = 'none';
    managePatientsSection.style.display = 'none';
    manageSurgerySection.style.display = 'none'; // Hide Manage Surgery section
}

// Show Manage Doctors content when the link is clicked
manageDoctorsLink.addEventListener('click', () => {
    hideAllSections(); // Hide all sections first
    manageDoctorsSection.style.display = 'block'; // Show Manage Doctors section
});

// Show Manage Patients content when the link is clicked
managePatientsLink.addEventListener('click', () => {
    hideAllSections(); // Hide all sections first
    managePatientsSection.style.display = 'block'; // Show Manage Patients section
});

// Show Manage Surgery content when the link is clicked
manageSurgeriesLink.addEventListener('click', () => {
    hideAllSections(); // Hide all sections first
    manageSurgerySection.style.display = 'block'; // Show Manage Surgery section
});

// Initially hide all sections (only display on link click)
hideAllSections();

// Get the logout link
const logoutLink = document.getElementById('logout-link');

// Function to handle logout
function handleLogout() {
    // Hide all sections if necessary
    hideAllSections(); // Optionally, hide all sections
    // Redirect to login page or handle logout logic
    window.location.href = 'admin-login.html'; // Redirect to login page (update URL as needed)
}

// Add event listener for logout link
logoutLink.addEventListener('click', handleLogout);