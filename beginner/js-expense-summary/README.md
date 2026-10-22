# Expense Summary

A small expense helper that calculates useful totals from a list of expenses and finds the largest one. The final summary is built by reusing the smaller helper functions.

## Learning Goals

- Write functions with parameters and return values
- Use `reduce` to add up values in an array
- Use `filter` to select items that match a condition
- Find the largest item in an array and return the whole object
- Compose functions by calling the smaller helpers inside another function

## Expense Shape

Each expense is an object with three properties:

```js
{ id: 1, category: 'food', amount: 24 }
```

## Functions

| Function | Description |
|----------|-------------|
| `calculateTotal(expenses)` | Returns the total amount spent across all expenses |
| `calculateCategoryTotal(expenses, category)` | Returns the total amount spent in one category (`0` if the category has no expenses) |
| `findLargestExpense(expenses)` | Returns the full expense object with the largest `amount`, not only the amount |
| `createExpenseSummary(expenses)` | Uses the helpers above and returns `total`, `foodTotal`, `transportTotal`, and `largestExpense` |

For an empty list, `calculateTotal` returns `0` and `findLargestExpense` returns `null`.

## Usage

```js
const expenses = [
  { id: 1, category: 'food', amount: 24 },
  { id: 2, category: 'transport', amount: 15 },
  { id: 3, category: 'food', amount: 18 },
  { id: 4, category: 'books', amount: 40 },
];

console.log(createExpenseSummary(expenses));
// { total: 97, foodTotal: 42, transportTotal: 15, largestExpense: { id: 4, category: "books", amount: 40 } }

console.log(calculateCategoryTotal(expenses, 'food'));
// 42

console.log(calculateCategoryTotal(expenses, 'health'));
// 0

console.log(findLargestExpense(expenses));
// { id: 4, category: "books", amount: 40 }
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **`reduce` is a good fit for totals.** Starting with an initial value of `0` and adding each `amount` turns a list of objects into a single number, and it also handles an empty list safely.
- **Filter first, then reuse the total.** `calculateCategoryTotal` filters the expenses by category and then calls `calculateTotal` on the result, so the adding logic is written only once.
- **A category with no expenses should give `0`.** Checking `'health'` showed that the function must return `0` instead of `undefined` or an error when nothing matches.
- **Return the whole object, not just a number.** `findLargestExpense` returns the full expense, so the caller can see the `id` and `category` as well as the `amount`. Comparing `amount` values while keeping track of the expense itself makes this possible.
- **Functions can build on each other.** `createExpenseSummary` does not repeat any calculation. It calls `calculateTotal`, `calculateCategoryTotal` (twice), and `findLargestExpense`, then combines the results into one object.
- **Match the expected output exactly.** The summary must use the exact property names `total`, `foodTotal`, `transportTotal`, and `largestExpense`, so comparing my output carefully against the expected result mattered.

## Source

Project specification from roadmap.sh: Expense Summary.
