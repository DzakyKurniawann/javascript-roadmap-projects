# Quiz Score Calculator

A set of helper functions that score a quiz by matching each question with the answer the user gave. The final result includes the number of correct answers, the total number of questions, the percentage, and a short message.

## Learning Goals

- Match items from two arrays using an id
- Count items with `filter` or `reduce`
- Calculate a percentage from two numbers
- Return a message based on a score with conditionals
- Handle missing data, such as an unanswered question
- Build a result object from the output of smaller functions

## Functions

| Function | Description |
|----------|-------------|
| `isAnswerCorrect(question, userAnswer)` | Returns `true` when the user's answer matches the correct answer |
| `countCorrectAnswers(questions, userAnswers)` | Matches each question with its user answer and returns the number of correct answers |
| `calculatePercentage(correctCount, totalQuestions)` | Returns the percentage score |
| `getResultMessage(percentage)` | Returns a short message based on the percentage |
| `createQuizResult(questions, userAnswers)` | Returns an object with `correctCount`, `totalQuestions`, `percentage`, and `message` |

A question without a user answer is counted as incorrect.

## Usage

```js
const questions = [
  { id: 1, correctAnswer: 'B' },
  { id: 2, correctAnswer: 'A' },
  { id: 3, correctAnswer: 'D' },
  { id: 4, correctAnswer: 'C' },
];

const userAnswers = [
  { questionId: 1, answer: 'B' },
  { questionId: 2, answer: 'C' },
  { questionId: 3, answer: 'D' },
  { questionId: 4, answer: 'C' },
];

console.log(createQuizResult(questions, userAnswers));
// { correctCount: 3, totalQuestions: 4, percentage: 75, message: "You passed" }

console.log(countCorrectAnswers(questions, userAnswers));
// 3

console.log(calculatePercentage(3, questions.length));
// 75

const partialAnswers = [{ questionId: 1, answer: 'B' }];
console.log(createQuizResult(questions, partialAnswers));
// { correctCount: 1, totalQuestions: 4, percentage: 25, message: "Keep practicing" }
```

Run it with Node.js:

```bash
node app.js
```

## What I Learned

- **Two arrays can be connected with an id.** The questions and the user answers are separate lists, so each question has to be matched to its answer through `questionId`. Using `find` for this showed me how to look up related data across arrays instead of relying on the order of the items.
- **A missing answer is a case to handle.** When the user skips a question, there is no matching answer to read. Handling this explicitly, and counting that question as incorrect, prevents errors and gives the correct score for partial answers.
- **Counting is a good use of `filter` or `reduce`.** Going through every question and counting only the correct ones turns a list of questions into a single number.
- **The total comes from the questions, not the answers.** The percentage has to be based on the total number of questions, so a user who answers only one question still gets a score out of four, not out of one.
- **Small functions make the final result easy to build.** `createQuizResult` only calls the other functions and collects their results into one object, so each step can be tested on its own.
- **Conditionals turn a number into a message.** Choosing a message from the percentage, such as passing or needing more practice, showed me how to turn raw numbers into feedback that a user can understand.

## Source

Project specification from [roadmap.sh: Quiz Score Calculator](https://roadmap.sh/projects/js-quiz-score-calculator).