let currentWorkoutIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const index = localStorage.getItem("currentWorkoutIndex");
  if (index !== null) {
    currentWorkoutIndex = parseInt(index);
    openWorkoutPage(currentWorkoutIndex);
  }
});

function openWorkoutPage(index) {
  const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  const workout = workouts[index];

  const main = document.querySelector("main");
  main.innerHTML = `
    <section>
      <div class="card">
        <input type="text" id="workout-name" value="${workout.name}" onblur="updateWorkoutName(${index})">
        <div id="exercise-list"></div>
        <button class="cardbtn" onclick="openModal()">+ Add Exercise</button>
      </div>
    </section>
  `;

  renderExercises(workout.exercises);
}

function updateWorkoutName(index) {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  const newName = document.getElementById("workout-name").value.trim();
  workouts[index].name = newName || "Untitled Workout";
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function renderExercises(exercises) {
  const exerciseList = document.getElementById("exercise-list");
  exerciseList.innerHTML = "";
  exercises.forEach((ex, i) => {
    const div = document.createElement("div");
    div.className = "exercise";
    div.innerHTML = `
      <p><b>${ex.name}</b> — ${ex.reps} reps × ${ex.sets} sets</p>
      <button class="delete-btn" onclick="deleteExercise(${i})" aria-label="Delete Exercise">
        <i class="fa fa-trash"></i>
      </button>
    `;
    exerciseList.appendChild(div);
  });
}

function deleteExercise(exIndex) {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts[currentWorkoutIndex].exercises.splice(exIndex, 1);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  openWorkoutPage(currentWorkoutIndex);
}

// Modal controls
function openModal() { document.getElementById("exercise-modal").style.display = "flex"; }
function closeModal() { document.getElementById("exercise-modal").style.display = "none"; }

function saveExercise() {
  const name = document.getElementById("exercise-name").value.trim();
  const reps = document.getElementById("exercise-reps").value.trim();
  const sets = document.getElementById("exercise-sets").value.trim();

  if (!name || !reps || !sets) {
    alert("Please fill in all fields.");
    return;
  }

  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts[currentWorkoutIndex].exercises.push({ name, reps, sets });
  localStorage.setItem("workouts", JSON.stringify(workouts));

  closeModal();
  openWorkoutPage(currentWorkoutIndex);
}

function goHome() { window.location.href = "main.html"; }