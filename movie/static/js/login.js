// movie/static/js/login.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = { username, password };

    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const result = await response.json();
        // Store token and role in localStorage
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('user_role', result.role);
        if (result.role === 'admin') {
          window.location.href = '/sudo/dashboard/';
        } else {
          window.location.href = '/profile/';
        }
      } else {
        const error = await response.json();
        alert(error.error || 'Login failed');
      }
    } catch (err) {
      alert('Login error: ' + err);
    }
  });
});