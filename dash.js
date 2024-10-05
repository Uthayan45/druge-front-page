document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const errorMessage = document.getElementById('error-message');

    // Check if user is logged in on the dashboard
    if (window.location.pathname.includes('dash.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'intext.html'; // Redirect to login if not authenticated
        }

        // Handle logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.href = 'intext.html'; // Redirect to login page on logout
            });
        }
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulate an API call for authentication
            const response = await fakeLoginAPI(username, password);

            if (response.success) {
                localStorage.setItem('token', 'your-unique-token'); // Store token in localStorage
                window.location.href = 'dash.html'; // Redirect to dashboard
            } else {
                errorMessage.textContent = response.message || 'Invalid login credentials.';
            }
        });
    }

    // Simulated login function (replace with actual API call)
    async function fakeLoginAPI(username, password) {
        // You can replace this with real API authentication logic
        if (username === 'user' && password === 'password') {
            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    }
});