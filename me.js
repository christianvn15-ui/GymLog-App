function home() { window.location.href = "main.html"; }
function workout() { window.location.href = "schedule.html"; }
function me() { window.location.href = "me.html"; }

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.contains(document.querySelector("footer"))) {
    loadWorkouts();
  }
});

function loadWorkouts() {
  const main = document.querySelector("main");
  const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  main.innerHTML = `
    <section id="workout-list"></section>
    <button class="add-btn" onclick="createWorkout()">+ Add</button>
  `;

  const listSection = document.getElementById("workout-list");
  workouts.forEach((workout, index) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "card workout-card";
    workoutCard.innerHTML = `
      <div class="card-header">
        <h2>${workout.name}</h2>
        <button class="delete-btn" onclick="deleteWorkout(${index})" aria-label="Delete Workout">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
    workoutCard.onclick = (e) => {
      if (e.target.closest(".delete-btn")) return;
      localStorage.setItem("currentWorkoutIndex", index);
      window.location.href = "inner.html";
    };
    listSection.appendChild(workoutCard);
  });
}

function createWorkout() {
  const workout = { name: "New Workout", exercises: [] };
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.push(workout);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  loadWorkouts();
}

function deleteWorkout(index) {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.splice(index, 1);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  loadWorkouts();
}