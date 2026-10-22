# Task List Utilities

A small set of helper functions for managing a task list. Every helper returns a new result and never changes the original `tasks` array.

## Learning Goals

- Write functions with parameters and return values
- Update data without mutating the original array
- Use array methods such as `map`, `filter`, and spread syntax (`...`)
- Copy objects with spread syntax instead of editing them in place
- Compose small helpers to manage a list of objects

## Task Shape

Each task is an object with three properties:

```js
{ id: 1, title: 'Review variables', completed: true }
```

## Functions

| Function | Description |
|----------|-------------|
| `addTask(tasks, title)` | Returns a new array with a new incomplete task added at the end |
| `completeTask(tasks, taskId)` | Returns a new array where only the task with the matching `id` is marked as completed |
| `removeTask(tasks, taskId)` | Returns a new array without the task that has the matching `id` |
| `countIncompleteTasks(tasks)` | Returns the number of tasks where `completed` is `false` |

A new task gets an `id` one higher than the largest existing `id` (or `1` when the list is empty), so ids stay unique even after a task is removed.

## Usage

```js
const tasks = [
  { id: 1, title: 'Review variables', completed: true },
  { id: 2, title: 'Practice functions', completed: false },
];

const withNewTask = addTask(tasks, 'Build task utilities');
console.log(withNewTask.map((task) => task.title));
// ["Review variables", "Practice functions", "Build task utilities"]

const completed = completeTask(withNewTask, 2);
console.log(countIncompleteTasks(completed));
// 1

console.log(removeTask(completed, 1).map((task) => task.id));
// [2, 3]

console.log(tasks.length);
// 2

console.log(countIncompleteTasks(tasks));
// 1
```

The last two checks confirm that the original `tasks` array was not changed: it still has two items and one incomplete task.

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **Avoid mutating the original data.** Methods like `push` and `splice` change the array they are called on. Using `[...tasks, newTask]`, `map`, and `filter` creates a new array instead, so the original list stays safe.
- **Copy objects too, not just arrays.** In `completeTask`, using `map` alone is not enough if I edit the matching task directly, because that would still change the original object. Returning `{ ...task, completed: true }` creates a copy and leaves the original untouched.
- **`map` and `filter` fit these jobs well.** `map` transforms every item (completing one task), `filter` keeps only the items I want (removing one task), and both return new arrays.
- **Only the matching task should change.** Tasks that do not match the `taskId` must be returned as they are, so one call never completes or removes the wrong task.
- **Unique ids need care.** Using the array length as the next id can create duplicates after a removal, so calculating the next id from the highest existing id is safer.
- **Check the original after every call.** Logging `tasks.length` and `countIncompleteTasks(tasks)` at the end is a simple way to prove that no helper mutated the input.

## Source

Project specification from [roadmap.sh: Task List Utilities](https://roadmap.sh/projects/js-task-list-utilitie).
