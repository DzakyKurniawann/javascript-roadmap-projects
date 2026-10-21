# String Formatter

A small helper that normalizes names from a signup form. It trims extra spaces and fixes the casing so every name is shown back to the user in a consistent format.

## Learning Goals

- Write functions with parameters and return values
- Use built-in string methods (`trim`, `toUpperCase`, `toLowerCase`, `charAt`, `slice`)
- Split a task into small, single-purpose helper functions
- Reuse helpers by calling them inside another function
- Build strings with template literals

## Functions

| Function | Description |
|----------|-------------|
| `cleanText(text)` | Removes spaces from the start and end of a string |
| `capitalize(text)` | Uppercases the first character and lowercases the rest |
| `formatDisplayName(firstName, lastName)` | Cleans and capitalizes both names, then returns the full display name |

## Usage

```js
console.log(formatDisplayName('  ava', 'STONE  '));
// Ava Stone

console.log(formatDisplayName('nOAh', '  kim'));
// Noah Kim

console.log(formatDisplayName('  mINA  ', 'pATEL'));
// Mina Patel
```

Run it with Node.js:

```bash
node index.js
```

## Implementation

```js
function cleanText(text) {
  return text.trim();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatDisplayName(firstName, lastName) {
  const first = capitalize(cleanText(firstName));
  const last = capitalize(cleanText(lastName));

  return `${first} ${last}`;
}
```

## What I Learned

- **Helper functions avoid repetition.** The same cleanup (trim, then capitalize) is needed for both the first and last name. Instead of writing it twice, `formatDisplayName` reuses `cleanText` and `capitalize`, so a fix in one place applies everywhere.
- **The order of operations matters.** I have to trim first and capitalize second. If I capitalize `'  ava'` before trimming, the first character is a space, so the `a` would never be uppercased and the result would be wrong.
- **Strings are immutable.** `trim()`, `toUpperCase()`, and `toLowerCase()` do not change the original string; they return a new one. That is why every helper uses `return` and the result must be stored or passed along.
- **Combining string methods.** `charAt(0)` gets the first character and `slice(1)` gets the rest, so I can uppercase one part, lowercase the other, and join them with `+`. `charAt(0)` is also safe on an empty string, while `text[0].toUpperCase()` would throw an error.
- **Functions can be nested as arguments.** `capitalize(cleanText(firstName))` passes the output of one function straight into the next, which keeps the code short while still being readable.
- **Return versus `console.log`.** The functions return strings and `console.log` is only used to check the output. This keeps them reusable, for example to display the name on a web page later.
- **Real-world input is messy.** Users type names with random spacing and casing (`'nOAh'`, `'  mINA  '`). Normalizing input before using or displaying it is a common and important task in form handling.

## Source

Project specification from [roadmap.sh: String Formatter](https://roadmap.sh/projects/js-string-formatter).
