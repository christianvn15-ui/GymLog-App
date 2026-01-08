function home() { window.location.href = "main.html"; }
function workout() { window.location.href = "schedule.html"; }
function me() { window.location.href = "me.html"; }

let currentDate = new Date();

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
});

function renderCalendar() {
  const monthYear = document.getElementById("month-year");
  const calendar = document.getElementById("calendar");

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell empty";
    calendar.appendChild(emptyCell);
  }

  // Fill days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    cell.innerHTML = `<span class="date">${day}</span>`;

    const workouts = JSON.parse(localStorage.getItem("scheduledWorkouts")) || [];
    const dateKey = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const workoutForDay = workouts.filter(w => w.date === dateKey);

    workoutForDay.forEach((w, idx) => {
      const workoutDiv = document.createElement("div");
      workoutDiv.className = "workout-entry";
      workoutDiv.innerHTML = `
        ${w.name}
        <button class="delete-btn" onclick="deleteWorkoutEvent('${dateKey}', ${idx})" aria-label="Delete Workout">
          <i class="fa fa-trash"></i>
        </button>
      `;
      cell.appendChild(workoutDiv);
    });

    calendar.appendChild(cell);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function addWorkout() {
  const date = document.getElementById("workout-date").value;
  const name = document.getElementById("workout-name").value.trim();

  if (!date || !name) {
    alert("Please select a date and enter a workout name.");
    return;
  }

  let workouts = JSON.parse(localStorage.getItem("scheduledWorkouts")) || [];
  workouts.push({ date, name });
  localStorage.setItem("scheduledWorkouts", JSON.stringify(workouts));

  renderCalendar();
  document.getElementById("workout-date").value = "";
  document.getElementById("workout-name").value = "";
}

function deleteWorkoutEvent(date, index) {
  let workouts = JSON.parse(localStorage.getItem("scheduledWorkouts")) || [];
  const filtered = workouts.filter(w => w.date === date);
  const target = filtered[index];

  // Remove the specific workout
  workouts = workouts.filter((w, i) => !(w.date === target.date && w.name === target.name && i === workouts.indexOf(target)));
  localStorage.setItem("scheduledWorkouts", JSON.stringify(workouts));

  renderCalendar();
}