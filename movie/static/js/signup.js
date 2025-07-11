// movie/static/js/signup.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const response = await fetch("/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "/login/";
      } else {
        const data = await response.json();
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}); 