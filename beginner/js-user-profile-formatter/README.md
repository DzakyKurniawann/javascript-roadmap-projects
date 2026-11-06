# User Profile Formatter

A set of helper functions that turn a nested user object into values that are easier to show in an interface or return from an API. Small functions each format one piece of data, and a final function collects them into one summary.

## Learning Goals

- Read values from nested objects (`user.address.city`)
- Write small functions that each do one job
- Build a new object from several function results
- Combine strings with template literals
- Keep `null` values as they are instead of replacing them
- Compare a value to decide a boolean result

## Functions

| Function | Description |
|----------|-------------|
| `getDisplayName(user)` | Returns the first and last name as one string |
| `getLocation(user)` | Returns the location as `"City, Country"` |
| `getContactSummary(user)` | Returns an object with `email` and `phone` |
| `isAccountActive(user)` | Returns `true` when `account.status` is `"active"` |
| `createProfileSummary(user)` | Returns an object with `displayName`, `location`, `contact`, `active`, and `plan` |

## Usage

```js
const user = {
  id: 42,
  firstName: 'Ava',
  lastName: 'Stone',
  email: 'ava@example.com',
  phone: null,
  address: {
    city: 'London',
    country: 'UK',
  },
  account: {
    status: 'active',
    plan: 'pro',
  },
};

console.log(createProfileSummary(user));
// {
//   displayName: "Ava Stone",
//   location: "London, UK",
//   contact: { email: "ava@example.com", phone: null },
//   active: true,
//   plan: "pro"
// }

console.log(getDisplayName(user));
// Ava Stone

console.log(isAccountActive(user));
// true

console.log(getContactSummary(user));
// { email: "ava@example.com", phone: null }
```

Run it with Node.js:

```bash
node app.js
```

## What I Learned

- **Nested objects are read with dot notation.** Values like the city and the plan live inside `address` and `account`, so I reach them with paths such as `user.address.city` and `user.account.plan`.
- **A summary function can be built from smaller ones.** `createProfileSummary` does not repeat any formatting logic. It calls the other functions and puts their results into one object, which keeps each piece easy to test and change on its own.
- **Functions can return objects, not only strings.** `getContactSummary` returns an object with two properties, which showed me that a function can return structured data that other code can use directly.
- **`null` is a real value that should be kept.** When a user has no phone number, the summary keeps `phone` as `null` instead of turning it into an empty string or removing it. This makes it clear that the data is missing, and the code that uses the summary can decide how to display that.
- **Comparisons already give a boolean.** `isAccountActive` can return the result of comparing `account.status` to `"active"` directly, without an extra `if` that returns `true` or `false`.
- **Shaping data for the interface.** Combining first and last name, and joining city and country, showed me how raw data is prepared into the form that a screen or an API response needs.

## Source

Project specification from [roadmap.sh: User Profile Formatter](https://roadmap.sh/projects/js-user-profile-formatter).