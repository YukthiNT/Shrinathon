// Helper functions for storing and retrieving user data
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Show forms
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.add('hidden');
}

function showSignUp() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-password-form').classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('forgot-password-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
}

// Login functionality
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.role === role);

    if (user) {
        if (user.password === password) {
            alert(`Welcome, ${user.email}`);
            // Redirect based on role
            if (role === 'user') window.location.href = 'user-dashboard.html';
            else if (role === 'service-provider') window.location.href = 'service-provider-dashboard.html';
            else if (role === 'admin') window.location.href = 'admin-dashboard.html';
        } else {
            document.getElementById('loginError').textContent = 'Invalid password. Forgot password?';
            document.getElementById('loginError').onclick = showForgotPassword;
        }
    } else {
        document.getElementById('loginError').textContent = 'No account found. Please sign up.';
    }
}

// Sign-up functionality
function signUp() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    const users = getUsers();

    if (users.find(u => u.email === email && u.role === role)) {
        document.getElementById('signupError').textContent = 'Account already exists.';
        return;
    }

    users.push({ email, password, role });
    saveUsers(users);
    alert('Sign-up successful. Please log in.');
    showLogin();
}

// Reset password functionality
function resetPassword() {
    const email = document.getElementById('resetEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        user.password = newPassword;
        saveUsers(users);
        alert('Password reset successful. Please log in.');
        showLogin();
    } else {
        document.getElementById('resetError').textContent = 'No account found with this email.';
    }
}
