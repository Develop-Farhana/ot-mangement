// Get all sections and links
const homeLink = document.getElementById('home-link');
const doctorLink = document.getElementById('doctor-link');
const surgeryLink = document.getElementById('surgery-link');
const schedulerLink = document.getElementById('scheduler-link');

const bannerSection = document.getElementById('banner');
const doctorSection = document.getElementById('doctor-info');
const surgerySection = document.getElementById('surgery-info');
const schedulerSection = document.getElementById('scheduler-info');

// Function to hide all sections
function hideAllSections() {
    bannerSection.style.display = 'none';
    doctorSection.style.display = 'none';
    surgerySection.style.display = 'none';
    schedulerSection.style.display = 'none';
}

// Event Listeners for Each Link
homeLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    hideAllSections();
    bannerSection.style.display = 'flex'; // Show banner slider
});

doctorLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    hideAllSections();
    doctorSection.style.display = 'block'; // Show Doctor Info
    // Load doctor data manually or use static content
    loadDoctorData(); // This is a placeholder, you can populate it with static content or mock data
});

surgeryLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    hideAllSections();
    surgerySection.style.display = 'block'; // Show Surgery Info
});

schedulerLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    hideAllSections();
    schedulerSection.style.display = 'block'; // Show Scheduler Info
});

// Function to load doctor data (replace with static content or mock data)
function loadDoctorData() {
    const doctorSection = document.getElementById('doctor-info');
    // Static content for demonstration purposes
    const doctors = [
        { name: "Dr. John Doe", specialty: "Cardiology", phone: "123-456-7890" },
        { name: "Dr. Jane Smith", specialty: "Dermatology", phone: "987-654-3210" }
    ];

    if (doctors.length === 0) {
        doctorSection.innerHTML = "<p>No doctors available.</p>";
    } else {
        doctorSection.innerHTML = ""; // Clear existing content
        doctors.forEach((doctor) => {
            // Create the HTML content for each doctor
            const doctorHTML = `
                <div class="doctor-card">
                    <h3>${doctor.name}</h3>
                    <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                    <p><strong>Phone:</strong> ${doctor.phone}</p>
                </div>
            `;
            // Append the doctor details to the doctor section
            doctorSection.innerHTML += doctorHTML;
        });
    }
}

// Load the banner by default on page load
document.addEventListener("DOMContentLoaded", () => {
    bannerSection.style.display = 'flex'; // Show banner slider by default
});