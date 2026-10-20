# Greeting Builder

A small greeting helper that combines a person's name and the time of day into a single greeting message.

## Learning Goals

- Write functions with parameters and return values
- Split a task into small, single-purpose functions
- Compose functions by calling one inside another
- Build strings with template literals
- Return values from functions instead of printing them

## Functions

| Function | Description |
|----------|-------------|
| `formatName(firstName, lastName)` | Joins the first and last name into one string |
| `getGreeting(timeOfDay)` | Returns `"Good morning"`, `"Good afternoon"`, or `"Good evening"` based on the time of day |
| `createGreeting(firstName, lastName, timeOfDay)` | Uses the two functions above and returns the final greeting |

## Usage

```js
console.log(createGreeting('Ava', 'Stone', 'morning'));
// Good morning, Ava Stone

console.log(createGreeting('Noah', 'Kim', 'evening'));
// Good evening, Noah Kim

console.log(createGreeting('Mina', 'Patel', 'afternoon'));
// Good afternoon, Mina Patel
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **Small functions are easier to manage.** Instead of writing everything inside one function, I split the work into `formatName`, `getGreeting`, and `createGreeting`. Each one does a single job, so it is easier to read, test, and change on its own.
- **Functions can build on each other.** `createGreeting` does not repeat any logic. It calls the other two functions and combines their results, which showed me how bigger features are assembled from smaller pieces.
- **Return versus `console.log`.** The functions return strings, and `console.log` is only used to check the output. Returning a value makes the function reusable, for example to show the greeting on a web page later, while printing inside the function would lock it to the console.
- **Template literals keep strings readable.** Combining values with `${}` is clearer than joining strings with `+`, especially when the message includes commas and spaces.
- **Small details matter.** The expected output has an exact format (`Good morning, Ava Stone`), so a missing comma or space makes the result wrong. This taught me to compare my output carefully against the expected result.

## Source

Project specification from [roadmap.sh: Greeting Builder](https://roadmap.sh/projects/js-greeting-builder).
