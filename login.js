document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Perform a simple check (you can replace this with actual authentication logic)
            if (username === 'user' && password === 'password') {
                // Redirect to the dashboard page
                window.location.href = 'dashboard.html';
                alert("GET IN");
            } else {
                alert('Invalid login credentials! Please try again.');
            }
            
        });
    }
});