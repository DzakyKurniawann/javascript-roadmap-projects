# Grade Report Generator

A small grade helper that turns a numeric score into a grade report with the letter grade, a pass/fail result, and a short feedback message.

## Learning Goals

- Write functions with parameters and return values
- Use conditionals (`if` / `else if` / `else`) to map a score to a letter grade
- Return boolean values from comparison expressions
- Compose functions by calling them inside another function
- Build and return an object with multiple properties

## Functions

| Function | Description |
|----------|-------------|
| `getLetterGrade(score)` | Returns `"A"`, `"B"`, `"C"`, `"D"`, or `"F"` based on the score |
| `hasPassed(score)` | Returns `true` when the score is `60` or higher, otherwise `false` |
| `getFeedback(grade)` | Returns a short feedback message for the given letter grade |
| `createGradeReport(name, score)` | Uses the three functions above and returns one report object |

## Grading Scale

| Score | Grade | Feedback |
|-------|-------|----------|
| 90 and above | A | Excellent work |
| 80 – 89 | B | Good job |
| 70 – 79 | C | You passed |
| 60 – 69 | D | You passed |
| Below 60 | F | Keep practicing |

A student passes with a score of `60` or higher (grades A to D).

## Usage

```js
console.log(createGradeReport('Ava', 92));
// { name: "Ava", score: 92, grade: "A", passed: true, feedback: "Excellent work" }

console.log(createGradeReport('Noah', 48));
// { name: "Noah", score: 48, grade: "F", passed: false, feedback: "Keep practicing" }

console.log(createGradeReport('Mina', 75));
// { name: "Mina", score: 75, grade: "C", passed: true, feedback: "You passed" }

console.log(createGradeReport('Sam', 60));
// { name: "Sam", score: 60, grade: "D", passed: true, feedback: "You passed" }
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **Small functions are easier to manage.** Instead of putting all the logic in one function, I split the work into `getLetterGrade`, `hasPassed`, `getFeedback`, and `createGradeReport`. Each one does a single job, so it is easier to read, test, and change on its own.
- **Functions can build on each other.** `createGradeReport` does not repeat any grading logic. It calls the other functions and combines their results into one object.
- **Reuse the result instead of recalculating.** `getFeedback` takes the grade returned by `getLetterGrade`, not the raw score. This keeps the feedback rules tied to the grade, so changing a grade boundary automatically updates the feedback too.
- **Boundaries need careful checking.** A score of exactly `60` must be a `D` and must pass, while `59` must be an `F`. Testing the edge values showed me why the order and operators (`>=` versus `>`) in the conditions matter.
- **Return versus `console.log`.** The functions return values, and `console.log` is only used to check the output. Returning an object makes the report reusable, for example to render it on a web page later.
- **Objects group related data.** Returning one object with `name`, `score`, `grade`, `passed`, and `feedback` is cleaner than returning several separate values.

## Source

Project specification from [roadmap.sh: Grade Report Generator](https://roadmap.sh/projects/js-grade-report-generator).