# Age Calculator

An age calculator built with HTML, CSS, and JavaScript. The user enters a birth date, and the app shows the exact age in years, months, and days after validating the input.

## Learning Goals

- Build the interface with `createElement`, `append`, and `appendChild`
- Work with the `Date` object, including zero-based months
- Find the number of days in a month with `new Date(year, month, 0)`
- Validate user input and show clear error messages
- Calculate an age by subtracting dates and borrowing days and months
- Show results and errors by updating the page with `innerHTML`

## Features

- Three number inputs for day, month, and year, with placeholders
- Inputs are limited to four digits
- Validation for empty fields, months outside 1 to 12, days that do not exist in the chosen month, dates in the future, and years before 1900
- The number of days in a month is checked correctly, including leap years
- Exact age shown in years, months, and days
- Error messages appear in a styled alert box
- The whole interface is generated from JavaScript
- Soft blue theme with a responsive card that stacks the inputs on small screens

## Project Structure

```
js-age-calculator/
├── index.html    # Empty root container
├── style.css     # Layout, theme, result and error styles
└── app.js        # Builds the UI, validates input, and calculates the age
```

## Run Locally

No installation is needed. Open `index.html` in a browser, or use the Live Server extension in VS Code.

## What I Learned

- **Months in `Date` start at zero.** `getMonth()` returns 0 for January, so the current month needs `+ 1`, and the birth month needs `- 1` when creating a date. Forgetting this gives results that are off by one month.
- **Day 0 gives the last day of the previous month.** Using `new Date(year, month, 0).getDate()` returns the number of days in a month, and it handles leap years automatically. This is how the app knows that February 30 is not a valid date.
- **Validation protects the calculation.** Checking empty fields, month range, days in the month, future dates, and unrealistic years before calculating prevents wrong results, and each error has its own message so the user knows what to fix.
- **An age is a subtraction with borrowing.** Subtracting year, month, and day separately can give negative numbers. When the days are negative, the app borrows the days of the previous month, and when the months are negative, it borrows 12 months from the years.
- **The interface can be built entirely in JavaScript.** Creating the title, inputs, button, and result area with `createElement` showed me how a page is assembled from code, and a `fields` array avoids repeating the same input code three times.
- **Early returns keep validation readable.** Each failed check shows an error and calls `return`, so the calculation code only runs when all checks have passed.
- **The result area is reused.** The same container is cleared and filled with either an age or an error message, so only one message is visible at a time.

## Source

Based on the [roadmap.sh Age Calculator](https://roadmap.sh/projects/age-calculator) project, implemented with plain JavaScript and the built-in `Date` object.