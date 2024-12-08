document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const welcomeMessage = document.getElementById('welcome-message'); // Optional welcome message

    // Check login state from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Retrieve the logged-in user

    // Function to update navigation buttons
    function updateNavButtons() {
        if (isLoggedIn && loggedInUser) {
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            if (welcomeMessage) {
                welcomeMessage.textContent = `Welcome to GrndZero Apparel, ${loggedInUser.username}!`;
                welcomeMessage.style.display = 'block';
                welcomeMessage.classList.add('animated-welcome');
            }
        } else {
            loginBtn.style.display = 'block';
            registerBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            if (welcomeMessage) {
                welcomeMessage.textContent = '';
                welcomeMessage.style.display = 'none';
            }
        }
    }

    // Initialize navigation buttons
    updateNavButtons();

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear login state and logged-in user from localStorage
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('loggedInUser');
            alert('You have been logged out.');
            updateNavButtons();
            window.location.href = "Homepage.html"; // Redirect to homepage after logout
        });
    }
});

// Login Functionality
function handleLogin(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve the registered user details from localStorage
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    // Validate the inputs
    if (!username || !password) {
        alert("Please fill in both username and password fields.");
        return;
    }

    // Check if the input matches the registered user
    if (
        registeredUser &&
        username === registeredUser.username &&
        password === registeredUser.password
    ) {
        // Save the login state and user information
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        alert(`Login successful! Welcome back, ${username}.`);
        window.location.href = "Homepage.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Register Functionality
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    // Store the user details in localStorage
    const user = { username, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(user));

    alert(`Registration successful! Welcome, ${username}.`);
    window.location.href = "login.html";
}
