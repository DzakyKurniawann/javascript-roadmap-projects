# Number Checker

A small number helper that checks what kind of number it is (positive, negative, zero, even, or odd) and combines the results into a single report object.

## Learning Goals

- Write functions with parameters and return values
- Write small boolean helper functions (predicates)
- Use comparison operators and the remainder operator (`%`)
- Compose functions by calling them inside another function
- Return a new object from a function instead of printing it

## Functions

| Function | Description |
|----------|-------------|
| `isPositive(number)` | Returns `true` when the number is greater than `0` |
| `isNegative(number)` | Returns `true` when the number is less than `0` |
| `isZero(number)` | Returns `true` when the number is exactly `0` |
| `isEven(number)` | Returns `true` when the number is even |
| `describeNumber(number)` | Uses the helpers above and returns a new object with `positive`, `negative`, `zero`, `even`, and `odd` properties |

## Usage

```js
console.log(describeNumber(8));
// { positive: true, negative: false, zero: false, even: true, odd: false }

console.log(describeNumber(-3));
// { positive: false, negative: true, zero: false, even: false, odd: true }

console.log(describeNumber(0));
// { positive: false, negative: false, zero: true, even: true, odd: false }

console.log(describeNumber(7));
// { positive: true, negative: false, zero: false, even: false, odd: true }
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **Boolean functions answer one question each.** `isPositive`, `isNegative`, `isZero`, and `isEven` each check a single condition and return `true` or `false`. Because the logic is separated, each function is easy to read, test, and reuse.
- **A comparison already produces a boolean.** Instead of writing `if (number > 0) { return true; } else { return false; }`, I can simply write `return number > 0;`. This is shorter and clearer.
- **The remainder operator (`%`) detects even numbers.** A number is even when `number % 2 === 0`. This also works for negative numbers and for `0`, so `-3 % 2` gives `-1` (not even) and `0 % 2` gives `0` (even).
- **Reuse a function instead of repeating logic.** `odd` is just the opposite of `even`, so `describeNumber` uses `!isEven(number)` instead of writing a separate `isOdd` check. This keeps the code in one place and avoids mistakes.
- **Functions can build on each other.** `describeNumber` does not contain its own checks. It calls the helper functions and combines their results into one object, which shows how bigger features are assembled from smaller pieces.
- **Return a new object each time.** Every call to `describeNumber` creates and returns a fresh object, so results from different calls never affect each other.
- **Edge cases matter.** `0` is neither positive nor negative, but it is even. Testing the sample values `8`, `-3`, `0`, and `7` covers positive, negative, zero, even, and odd cases, so I learned to check the edge cases and not only the normal ones.

## Source

Project specification from [roadmap.sh: Temperature Converter](https://roadmap.sh/projects/js-number-checker).
