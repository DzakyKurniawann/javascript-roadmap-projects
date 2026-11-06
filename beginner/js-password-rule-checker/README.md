# Password Rule Checker

A small password validator where each rule lives in its own function. The final validator checks every rule and reports which ones failed.

## Learning Goals

- Write one function per rule, each returning `true` or `false`
- Check string length with the `length` property
- Detect numbers and uppercase letters in a string
- Collect the names of failed rules into an array
- Return a result object with a validity flag and a list of problems
- Build a validator from small, reusable checks

## Rules

| Rule name | Requirement |
|-----------|-------------|
| `minimum length` | At least 8 characters |
| `number` | Contains at least one number |
| `uppercase letter` | Contains at least one uppercase letter |

## Functions

| Function | Description |
|----------|-------------|
| `hasMinimumLength(password)` | Returns `true` when the password has at least 8 characters |
| `hasNumber(password)` | Returns `true` when the password contains at least one number |
| `hasUppercaseLetter(password)` | Returns `true` when the password contains at least one uppercase letter |
| `getFailedRules(password)` | Returns an array with the names of the rules that failed |
| `validatePassword(password)` | Returns an object with `valid` and `failedRules` |

## Usage

```js
console.log(validatePassword('hello'));
// { valid: false, failedRules: ["minimum length", "number", "uppercase letter"] }

console.log(validatePassword('Hello123'));
// { valid: true, failedRules: [] }

console.log(validatePassword('hello123'));
// { valid: false, failedRules: ["uppercase letter"] }

console.log(validatePassword('HELLOABC'));
// { valid: false, failedRules: ["number"] }
```

Run it with Node.js:

```bash
node app.js
```

## What I Learned

- **One rule per function keeps things clear.** Each check answers a single yes or no question, so it is easy to read, test, and change without affecting the other rules.
- **Validation should report every problem, not only the first one.** `getFailedRules` checks all the rules and collects the names of the ones that fail. This gives the user the full picture in one go, instead of fixing one issue at a time.
- **A result object carries more information than a boolean.** Returning `{ valid, failedRules }` tells the caller both whether the password passed and why it failed, which is what an interface needs to show helpful messages.
- **`valid` can be derived from the list of failures.** If `failedRules` is empty, the password is valid, so there is no need to run the checks twice or keep a separate flag.
- **Checking the content of a string needs a pattern.** Finding a number or an uppercase letter in a password showed me how to test text for a certain kind of character, instead of comparing it to a fixed value.
- **Exact names matter.** The failed rules must be called `"minimum length"`, `"number"`, and `"uppercase letter"`. A small difference in spelling changes the output, so I learned to match the expected format carefully.

## Source

Project specification from [roadmap.sh: Password Rule Checker](https://roadmap.sh/projects/js-password-rule-checker).