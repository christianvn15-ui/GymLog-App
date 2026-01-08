document.addEventListener("DOMContentLoaded", () => {
  // If user already signed up, skip to main.html
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    window.location.href = "main.html";
  }
});

document.getElementById("auth-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  const userData = { email, name, age, height, weight };
  localStorage.setItem("userData", JSON.stringify(userData));

  // Redirect to homepage after signup
  window.location.href = "main.html";
});