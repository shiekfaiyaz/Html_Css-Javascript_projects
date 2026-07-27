document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------
    // 1. Sidebar Tab Switching Engine
    // ------------------------------------
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".content-section");

    navButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Clear previous active states
            navButtons.forEach(btn => btn.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("active"));

            // Set current clicked button as active
            button.classList.add("active");

            // Display target section
            const target = button.getAttribute("data-target");
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // ------------------------------------
    // 2. Settings - Dark Mode Toggle
    // ------------------------------------
    const darkModeBtn = document.getElementById("darkModeToggle");

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            
            if (document.body.classList.contains("dark-theme")) {
                darkModeBtn.textContent = "On";
                darkModeBtn.classList.add("active");
            } else {
                darkModeBtn.textContent = "Off";
                darkModeBtn.classList.remove("active");
            }
        });
    }

    // Settings - Notification Toggle
    const notifBtn = document.getElementById("notifToggle");
    if(notifBtn) {
        notifBtn.addEventListener("click", () => {
            notifBtn.classList.toggle("active");
            notifBtn.textContent = notifBtn.classList.contains("active") ? "On" : "Off";
        });
    }

    // ------------------------------------
    // 3. Chart.js Implementation
    // ------------------------------------
    // Line Chart - Traffic Analytics
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Visitors',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Doughnut Chart - Device Breakdown
    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
        new Chart(deviceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#6c5ce7', '#00b894', '#fdcb6e']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});




// ------------------------------------
// Sidebar Menu Toggle (Mobile)
// ------------------------------------
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function toggleSidebar() {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("active");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
}

if (menuToggle && sidebar) {
    // Hamburger button click
    menuToggle.addEventListener("click", toggleSidebar);

    // Close when clicking outside overlay
    sidebarOverlay.addEventListener("click", closeSidebar);

    // Close sidebar when clicking any navigation link (Mobile UX)
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
}