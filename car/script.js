// Image Slideshow (if used)
const images = document.querySelectorAll(".hero img");
let index = 0;
let interval;

function showSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
}

function nextSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
    resetTimer();
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
    resetTimer();
}

function startSlideshow() {
    interval = setInterval(nextSlide, 3000);
}

function resetTimer() {
    clearInterval(interval);
    startSlideshow();
}

// Initialize slideshow if present
if (images.length > 0) {
    showSlide(index);
    startSlideshow();
}

// Toggle Login/Signup Forms
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

// Responsive Navbar
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Handle Signup
async function handleSignup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        alert(data.message || "Signup successful!");

        if (res.ok) {
            toggleForm(); // Switch to login form
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("Signup failed. Please try again.");
    }
}

// Handle Login
async function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        alert(data.message || "Login successful!");

        if (res.ok) {
            // Store user info if needed (e.g., for session)
            localStorage.setItem("user", JSON.stringify(data.user));

            // Hide login form and show logout button
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("logoutButton").style.display = "block";

            // Optionally, update the navigation (hide login link)
            document.getElementById("loginLink").style.display = "none";
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
    }
}

// Handle Logout
function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Show login form and hide logout button
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logoutButton").style.display = "none";

    // Optionally, update the navigation (show login link)
    document.getElementById("loginLink").style.display = "block";
}

// Check if user is already logged in on page load
window.onload = () => {
    const user = localStorage.getItem("user");
    
    // If user is logged in, hide the login form and show the logout button
    if (user) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("loginLink").style.display = "none";
    } else {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("loginLink").style.display = "block";
    }
}
