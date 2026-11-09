# Quiz App

A browser-based quiz built with HTML, CSS, and plain JavaScript. The questions are loaded from a JSON file, each question has a countdown timer, and the user gets immediate feedback after every answer.

## Learning Goals

- Manage application state with a single `appState` object
- Render different screens (welcome, quiz, result) from the state
- Load data from a JSON file with `fetch` and `async/await`
- Handle loading errors with `try/catch`
- Run a countdown with `setInterval` and stop it with `clearInterval`
- Give instant feedback by changing button styles with CSS classes
- Animate a progress bar that follows the timer

## Features

- Welcome screen with the number of questions and the time limit
- Five multiple-choice JavaScript questions loaded from `quiz.json`
- Each question is shown as a card, and the answers are buttons
- After answering, the correct answer turns green and a wrong choice turns red
- The score goes up by one for every correct answer
- A 10-second timer with a progress bar for each question
- When time runs out, the app skips to the next question and subtracts one point from the score, never going below zero
- Final screen with the score and a message that depends on the percentage
- "Try Again" button to restart the quiz
- Error screen if the quiz data cannot be loaded
- Soft blue theme with a centered card

## Project Structure

```
quiz-app/
├── index.html    # Empty container for the app
├── style.css     # Card, button, feedback, and timer bar styles
├── app.js        # State, rendering, timer, and quiz logic
└── quiz.json     # Questions, answer options, and the index of the correct answer
```

## Run Locally

The quiz loads `quiz.json` with `fetch`, and browsers block this when the page is opened directly from the file system. Run it through a local server instead:

- In VS Code, use the **Live Server** extension and open `index.html`, or
- In the terminal, from the project folder:
  ```bash
  npx serve .
  ```

Then open the address shown in the terminal.

## What I Learned

- **State is the single source of truth.** The `appState` object stores the current step, the question index, the score, and the timer. The screen is always rebuilt from this state, so the interface and the data cannot get out of sync.
- **A render pipeline keeps screens organized.** One `render()` function clears the container and calls `renderWelcome`, `renderQuiz`, or `renderResult` depending on `currentStep`. Each screen has its own function, which keeps the code easy to read.
- **Data can live outside the code.** Keeping the questions in `quiz.json` means I can add or change questions without touching the JavaScript. Each question stores the index of its correct option, so checking an answer is a simple comparison.
- **`fetch` needs error handling and a server.** Wrapping the request in `try/catch` and checking `response.ok` lets the app show a clear error screen instead of failing silently. I also learned that `fetch` does not work from a `file://` address, so a local server is needed.
- **Timers must be cleaned up.** Every question starts a new `setInterval`, so the previous one is cleared with `clearInterval` first, and also when the user answers. Without this, several timers would run at the same time.
- **Use one constant for related values.** The progress bar once jumped to a small width at the start because the timer began at 10 while the percentage was divided by 60. Putting the duration in a single `QUESTION_DURATION` constant fixed it and keeps the welcome text, the timer, and the bar in sync.
- **Feedback needs a short pause.** After an answer, the buttons are disabled and colored, and `setTimeout` waits 1.5 seconds before the next question, so the user has time to see the correct answer.
- **CSS can animate the timer bar.** Changing the bar width once per second together with `transition: width 1s linear` makes it shrink smoothly instead of in steps.

## Source

Project specification from [roadmap.sh: Quiz App](https://roadmap.sh/projects/quiz-app).