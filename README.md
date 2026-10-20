# JavaScript Roadmap Projects
A collection of hands-on JavaScript projects built while following the [roadmap.sh JavaScript projects](https://roadmap.sh/javascript/projects) track. The projects progress from small pure functions to DOM components, API integration, and state-driven applications.

Each project lives in its own folder with a dedicated README that explains what it does, which concepts it practices, and what I learned while building it.

## Table of Contents

- [Learning Path](#learning-path)
- [Projects](#projects)
  - [Beginner](#beginner)
  - [Intermediate](#intermediate)
  - [Advanced](#advanced)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Conventions](#conventions)
- [Acknowledgements](#acknowledgements)

## Learning Path

| Stage | Focus | Core concepts |
|-------|-------|---------------|
| 1 | Functions and strings | Parameters, return values, template literals, string methods |
| 2 | Arrays and objects | `map`, `filter`, `reduce`, `find`, `sort`, object manipulation |
| 3 | Nested data and JSON | Destructuring, optional chaining, data normalization |
| 4 | Validation | Rule-based checks, collecting and reporting errors |
| 5 | DOM and events | `querySelector`, event listeners, `classList`, component patterns |
| 6 | Async and APIs | `fetch`, `async/await`, error handling, rendering remote data |
| 7 | State and rendering | Application state, render pipeline, timers |

## Projects

### Beginner

| Project | Description | Concepts |
|---------|-------------|----------|
| [Greeting Builder](beginner/js-greeting-builder) | Greeting helper built from reusable string functions | Functions, template literals |
| [Temperature Converter](beginner/js-temperature-converter) | Temperature conversion and formatting functions | Arithmetic, number formatting |
| [Number Checker](beginner/js-number-checker) | Boolean helpers that describe a number | Conditionals, comparison and logical operators |
| [String Formatter](beginner/js-string-formatter) | Name normalization with string cleanup functions | String methods |
| [Price Calculator](beginner/js-price-calculator) | Discount, tax, and final price calculation | Small composable functions |
| [Cart Total Calculator](beginner/js-cart-total-calculator) | Cart totals from arrays of item objects | `reduce`, object properties |
| [Grade Report Generator](beginner/js-grade-report-generator) | Converts numeric scores into grade report objects | Conditionals, object creation |
| [Task List Utilities](beginner/js-task-list-utilities) | Task helpers that return updated arrays | Immutability, `map`, `filter` |
| [Expense Summary](beginner/js-expense-summary) | Totals and largest expense from an object array | `reduce`, `sort`, aggregation |
| [Product Search and Filter](beginner/js-product-search-and-filter) | Search and filter helpers for a product list | `filter`, string matching |
| [User Profile Formatter](beginner/js-user-profile-formatter) | Formats nested user data into a short profile summary | Destructuring, nested objects |
| [Quiz Score Calculator](beginner/js-quiz-score-calculator) | Scores quiz answers and returns a result summary | Array iteration, result objects |
| [JSON Response Normalizer](beginner/js-json-response-normalizer) | Normalizes API-shaped JSON into article summaries | Data transformation, defaults |
| [Password Rule Checker](beginner/js-password-rule-checker) | Validates a password and reports which rules failed | Validation, error reporting |
| [Order Status Helper](beginner/js-order-status-helper) | Summarizes nested order data for a support dashboard | Nested data, derived values |
| [Simple Tabs](beginner/js-simple-tabs) | Tabs component in HTML, CSS, and JavaScript | DOM selection, event handling |
| [Cookie Consent](beginner/js-cookie-consent) | Cookie consent banner | DOM manipulation, persisting user choice |
| [Restricted Textarea](beginner/js-restricted-textarea) | Textarea with live character count and a max limit | `input` events, live feedback |
| [Accordion](beginner/js-accordion) | Accordion component in HTML, CSS, and JavaScript | Class toggling, UI state |
| [Age Calculator](beginner/js-age-calculator) | Age calculator in HTML, CSS, and JavaScript | `Date` object, form input |

### Intermediate

| Project | Description | Concepts |
|---------|-------------|----------|
| [Quiz App](intermediate/quiz-app) | Browser-based quiz with a per-question countdown timer and progress bar | Application state, render pipeline, `fetch`, `setInterval` |
| [Weather App](intermediate/weather-app) | Fetches and displays weather for a given location | `fetch`, `async/await`, error handling |

### Advanced

| Project | Description | Concepts |
|---------|-------------|----------|
| [24hr Story Feature](advanced/stories-feature) | Client-side clone of an Instagram-style stories feature | Time-based logic, state management, dynamic UI |

## Repository Structure

```
javascript-roadmap-projects/
├── README.md
├── beginner/
│   ├── js-greeting-builder/
│   ├── js-temperature-converter/
│   ├── js-number-checker/
│   ├── js-string-formatter/
│   ├── js-price-calculator/
│   ├── js-cart-total-calculator/
│   ├── js-grade-report-generator/
│   ├── js-task-list-utilities/
│   ├── js-expense-summary/
│   ├── js-product-search-and-filter/
│   ├── js-user-profile-formatter/
│   ├── js-quiz-score-calculator/
│   ├── js-json-response-normalizer/
│   ├── js-password-rule-checker/
│   ├── js-order-status-helper/
│   ├── js-simple-tabs/
│   ├── js-cookie-consent/
│   ├── js-restricted-textarea/
│   ├── js-accordion/
│   └── js-age-calculator/
├── intermediate/
│   ├── quiz-app/
│   └── weather-app/
└── advanced/
    └── stories-feature/
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/USERNAME/javascript-roadmap-projects.git
cd javascript-roadmap-projects
```

Running a project depends on its type:

- **Function-based projects** (logic only): run with Node.js.
  ```bash
  cd beginner/js-price-calculator
  node index.js
  ```
- **DOM and UI projects**: open `index.html` in a browser. Projects that use `fetch` to load local files (for example the quiz app) need a local server:
  ```bash
  npx serve .
  ```

Requirements: [Node.js](https://nodejs.org/) 18 or later and a modern browser.

## Conventions

- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/), for example `feat: add js-greeting-builder` or `docs: add README for quiz-app`.
- **Naming**: folders use lowercase kebab-case and match the project slug on roadmap.sh where possible.
- **Documentation**: every project README includes the learning goals, usage examples, and a short reflection on what was learned.
- **Secrets**: API keys are never committed. Use a `.env` file listed in `.gitignore`.

## Acknowledgements

Project specifications are from [roadmap.sh](https://roadmap.sh/javascript/projects). The implementations and notes in this repository are my own.

---

If you find this repository useful for your own learning, feel free to star it.
