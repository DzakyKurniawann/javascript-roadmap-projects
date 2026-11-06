const root = document.getElementById("root");

// 1. RENDER UI ELEMENTS
function initApp() {
  // Header
  const header = document.createElement("h1");
  header.className = "app-title";
  header.innerHTML = "Age <span>Calculator</span>";

  // Card
  const card = document.createElement("div");
  card.id = "calculatorCard";

  // Input Row
  const inputRow = document.createElement("div");
  inputRow.className = "input-row";

  const fields = [
    { id: "Day", label: "DAY", placeholder: "DD" },
    { id: "Month", label: "MONTH", placeholder: "MM" },
    { id: "Year", label: "YEAR", placeholder: "YYYY" },
  ];

  fields.forEach((field) => {
    const group = document.createElement("div");
    group.className = "input-group";

    const label = document.createElement("label");
    label.innerText = field.label;

    const input = document.createElement("input");
    input.type = "number";
    input.id = `user${field.id}`;
    input.placeholder = field.placeholder;

    // Mencegah input angka berlebihan
    input.oninput = (e) => {
      if (e.target.value.length > 4)
        e.target.value = e.target.value.slice(0, 4);
    };

    group.append(label, input);
    inputRow.appendChild(group);
  });

  // Button
  const btn = document.createElement("button");
  btn.className = "calculate-btn";
  btn.innerText = "Calculate My Age";
  btn.onclick = processCalculation;

  // Result Area
  const resultArea = document.createElement("div");
  resultArea.id = "resultArea";
  resultArea.innerHTML =
    '<p style="color:#aaa">Enter your birth date above</p>';

  card.append(inputRow, btn, resultArea);
  root.append(header, card);
}

// 2. LOGIC & VALIDATION
const getDaysInMonth = (m, y) => new Date(y, m, 0).getDate();

function processCalculation() {
  const d = parseInt(document.getElementById("userDay").value);
  const m = parseInt(document.getElementById("userMonth").value);
  const y = parseInt(document.getElementById("userYear").value);
  const display = document.getElementById("resultArea");

  const now = new Date();
  const currentD = now.getDate();
  const currentM = now.getMonth() + 1;
  const currentY = now.getFullYear();

  // Clear previous result
  display.innerHTML = "";

  // VALIDATION
  if (!d || !m || !y) {
    showError("Please fill in all fields.");
    return;
  }

  if (m < 1 || m > 12) {
    showError("Month must be between 1 and 12.");
    return;
  }

  const maxDays = getDaysInMonth(m, y);
  if (d < 1 || d > maxDays) {
    showError(`Invalid date. This month only has ${maxDays} days.`);
    return;
  }

  const birthDate = new Date(y, m - 1, d);
  if (birthDate > now) {
    showError("Birth date cannot be in the future.");
    return;
  }

  if (y < 1900) {
    showError("Please enter a realistic year.");
    return;
  }

  // --- CALCULATION ---
  let ageY = currentY - y;
  let ageM = currentM - m;
  let ageD = currentD - d;

  if (ageD < 0) {
    const prevMonthDays = getDaysInMonth(currentM - 1, currentY);
    ageD += prevMonthDays;
    ageM--;
  }

  if (ageM < 0) {
    ageM += 12;
    ageY--;
  }

  // DISPLAY SUCCESS
  display.innerHTML = `
  <div class="age-text">
    You are <span class="age-number">${ageY}</span> years, 
    <span class="age-number">${ageM}</span> months, <br>
    and <span class="age-number">${ageD}</span> days old.
  </div>`;
}

function showError(msg) {
  const display = document.getElementById("resultArea");
  display.innerHTML = `<div class="error-message">${msg}</div>`;
}

initApp();
