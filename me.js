document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    document.getElementById("header-name").textContent = userData.name || "User Name";
    document.getElementById("user-email").textContent = userData.email || "user@email.com";
    document.getElementById("user-info").textContent =
      `Height: ${userData.height || "--"}cm | Weight: ${userData.weight || "--"}kg | Age: ${userData.age || "--"}`;

    // If profile pic already set, show it and hide upload option
    if (userData.profilePic) {
      document.getElementById("header-pic").src = userData.profilePic;
      document.getElementById("main-pic").src = userData.profilePic;
      document.getElementById("profile-upload").style.display = "none";
    }

    // Load progress photos if exist
    if (userData.progressPhotos) {
      userData.progressPhotos.forEach((photo, idx) => {
        const slot = idx + 1;
        if (photo.image) document.getElementById(`progress-pic-${slot}`).src = photo.image;
        if (photo.date) document.getElementById(`progress-date-${slot}`).textContent = photo.date;
        if (photo.weight) document.getElementById(`progress-weight-${slot}`).textContent = `${photo.weight}kg`;
      });
    }
  }
});

// Upload profile picture only once
function updateProfilePic(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const imgData = e.target.result;
      document.getElementById("main-pic").src = imgData;
      document.getElementById("header-pic").src = imgData;

      let userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.profilePic = imgData;
      localStorage.setItem("userData", JSON.stringify(userData));

      // Hide upload option permanently
      document.getElementById("profile-upload").style.display = "none";
    };
    reader.readAsDataURL(file);
  }
}

// Upload progress photo
function uploadProgressPhoto(event, slot) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const imgData = e.target.result;
      document.getElementById(`progress-pic-${slot}`).src = imgData;

      let userData = JSON.parse(localStorage.getItem("userData")) || {};
      if (!userData.progressPhotos) userData.progressPhotos = [];
      userData.progressPhotos[slot - 1] = userData.progressPhotos[slot - 1] || {};
      userData.progressPhotos[slot - 1].image = imgData;
      localStorage.setItem("userData", JSON.stringify(userData));
    };
    reader.readAsDataURL(file);
  }
}

// Update progress date + weight
function updateProgress(slot) {
  const newDate = prompt("Enter progress date (YYYY-MM-DD):");
  const newWeight = prompt("Enter weight (kg):");

  if (!newDate || !newWeight) {
    alert("Please enter both date and weight.");
    return;
  }

  document.getElementById(`progress-date-${slot}`).textContent = newDate;
  document.getElementById(`progress-weight-${slot}`).textContent = `${newWeight}kg`;

  let userData = JSON.parse(localStorage.getItem("userData")) || {};
  if (!userData.progressPhotos) userData.progressPhotos = [];
  userData.progressPhotos[slot - 1] = userData.progressPhotos[slot - 1] || {};
  userData.progressPhotos[slot - 1].date = newDate;
  userData.progressPhotos[slot - 1].weight = newWeight;
  localStorage.setItem("userData", JSON.stringify(userData));
}