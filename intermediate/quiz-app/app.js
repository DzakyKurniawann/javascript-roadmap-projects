let quizData = [];

const QUESTION_DURATION = 10;

const appState = {
  currentStep: "welcome",
  currentQuestionIndex: 0,
  score: 0,
  timer: 60,
  interval: null,
};

const appContainer = document.getElementById("app");

// FETCH DATA FROM JSON
async function loadQuizData() {
  try {
    const response = await fetch("quiz.json");
    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
    quizData = await response.json();
    render();
  } catch (error) {
    renderError(`Failed to load quiz content: ${error.message}`);
  }
}

// RENDERING PIPELINE
function render() {
  appContainer.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card";

  if (appState.currentStep === "welcome") {
    renderWelcome(card);
  } else if (appState.currentStep === "quiz") {
    renderQuiz(card);
  } else if (appState.currentStep === "result") {
    renderResult(card);
  }
  appContainer.appendChild(card);
}

function renderWelcome(container) {
  container.innerHTML = `
    <h1>JS Quiz App</h1>
    <p>Test your knowledge with ${quizData.length} questions. Each has a ${QUESTION_DURATION}-second limit.</p>
    <button class="primary-btn" id="startQuizBtn">Start Quiz</button>`;

  const startQuizBtn = container.querySelector("#startQuizBtn");
  startQuizBtn.addEventListener("click", startQuiz);
}

function renderQuiz(container) {
  const data = quizData[appState.currentQuestionIndex];

  container.innerHTML = `
    <div class="timer-bar"><div class="timer-progress" id="timerProgress"></div></div>
    <p>Question ${appState.currentQuestionIndex + 1} of ${quizData.length}</p>
    <h3>${data.question}</h3>
    <div id="optionsContainer"></div>`;

  const optionsContainer = container.querySelector("#optionsContainer");
  data.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(index, btn));
    optionsContainer.appendChild(btn);
  });
}

function renderResult(container) {
  const finalPercentage = (appState.score / quizData.length) * 100;
  const isSuccess = finalPercentage >= 80;

  container.innerHTML = `
    <h1>Quiz Complete!</h1>
    <h2>Your Score: ${appState.score} / ${quizData.length}</h2>
    <p>${
      isSuccess
        ? "🎉 Amazing! You are a JS Master!"
        : "Keep practicing! You can do better!"
    }</p>
    <button class="primary-btn" id="resetQuizBtn">Try Again</button>`;

  const resetQuizBtn = container.querySelector("#resetQuizBtn");
  resetQuizBtn.addEventListener("click", resetQuiz);
}

function renderError(message) {
  appContainer.innerHTML = `
    <div class="card">
      <h1 style="color: #ef4444;">System Error</h1>
      <p>${message}</p>
    </div>`;
}

// TIMING MANAGEMENT
function startTimer() {
  appState.timer = QUESTION_DURATION;
  clearInterval(appState.interval);
  appState.interval = setInterval(() => {
    appState.timer--;
    const progress = document.getElementById("timerProgress");
    if (progress) progress.style.width = `${(appState.timer / QUESTION_DURATION) * 100}%`;

    if (appState.timer <= 0) {
      appState.score = Math.max(0, appState.score - 1);
      nextQuestion();
    }
  }, 1000);
}

// LOGIC CORE
function startQuiz() {
  appState.currentStep = "quiz";
  appState.currentQuestionIndex = 0;
  appState.score = 0;
  render();
  startTimer();
}

function handleAnswer(selectedIndex, clickedBtn) {
  clearInterval(appState.interval);
  const data = quizData[appState.currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === data.correct) btn.classList.add("correct");
    if (idx === selectedIndex && idx !== data.correct)
      btn.classList.add("wrong");
  });

  if (selectedIndex === data.correct) appState.score++;

  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  if (appState.currentQuestionIndex < quizData.length - 1) {
    appState.currentQuestionIndex++;
    render();
    startTimer();
  } else {
    appState.currentStep = "result";
    render();
  }
}

function resetQuiz() {
  appState.currentStep = "quiz";
  startQuiz();
}

// INITIAL DEPLOYMENT
loadQuizData();
