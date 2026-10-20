# Temperature Converter

A set of small helper functions for a temperature widget. Two functions handle the conversion math, and one function handles the display text.

## Learning Goals

- Write functions with parameters and return values
- Apply a math formula inside a function
- Separate calculation logic from display logic
- Return numbers from calculation functions and strings from formatting functions
- Build display text with template literals

## Functions

| Function | Description |
|----------|-------------|
| `celsiusToFahrenheit(celsius)` | Converts a Celsius value to Fahrenheit and returns a number |
| `fahrenheitToCelsius(fahrenheit)` | Converts a Fahrenheit value to Celsius and returns a number |
| `formatTemperature(value, unit)` | Returns display text combining the value and its unit, for example `"77 F"` |

## Usage

```js
const fahrenheit = celsiusToFahrenheit(25);
console.log(formatTemperature(fahrenheit, 'F'));
// 77 F

const celsius = fahrenheitToCelsius(68);
console.log(formatTemperature(celsius, 'C'));
// 20 C

console.log(formatTemperature(celsiusToFahrenheit(0), 'F'));
// 32 F

console.log(formatTemperature(fahrenheitToCelsius(32), 'C'));
// 0 C
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **Keep calculation and display separate.** The conversion functions only do math and return numbers, while `formatTemperature` only builds the text. Because each function has one job, I can reuse the conversion results anywhere, such as in a chart or a comparison, without being tied to a specific text format.
- **Return types matter.** A number and a string behave differently. Returning a number from the conversion functions lets me keep calculating with the result, and turning it into a string only at the very end keeps the logic clean.
- **A formula becomes a function.** The conversion between Celsius and Fahrenheit is a formula, and wrapping it in a function with a clear name makes it easy to read and reuse. It also made me pay attention to operator order and parentheses, since a small mistake changes the result.
- **Testing with known values helps.** Checking known points such as the freezing point of water (0 C is 32 F) is a quick way to confirm that both formulas are correct and that converting back and forth gives the original value.
- **Functions compose well.** Passing the result of one function directly into another, like `formatTemperature(celsiusToFahrenheit(0), 'F')`, showed me how small functions can be chained together to build larger behavior.

## Source

Project specification from [roadmap.sh: Temperature Converter](https://roadmap.sh/projects/js-temperature-converter).
