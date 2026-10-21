# Price Calculator

A small helper that calculates the final price of a product. The discount is applied first, and tax is calculated on the discounted price.

## Learning Goals

- Write functions with parameters and return values
- Do percentage calculations with arithmetic operators
- Split a calculation into small, single-purpose functions
- Compose functions by calling one inside another
- Return an object that groups related results

## Functions

| Function | Description |
|----------|-------------|
| `calculateDiscount(price, discountPercent)` | Returns the discount amount |
| `calculateTax(priceAfterDiscount, taxPercent)` | Returns the tax amount, calculated on the discounted price |
| `calculateFinalPrice(price, discountPercent, taxPercent)` | Subtracts the discount, adds tax, and returns the final price |
| `createPriceSummary(price, discountPercent, taxPercent)` | Returns an object with `price`, `discount`, `tax`, and `finalPrice` |

## Usage

```js
console.log(createPriceSummary(100, 20, 10));
// { price: 100, discount: 20, tax: 8, finalPrice: 88 }

console.log(createPriceSummary(200, 25, 5));
// { price: 200, discount: 50, tax: 7.5, finalPrice: 157.5 }

console.log(createPriceSummary(50, 0, 10));
// { price: 50, discount: 0, tax: 5, finalPrice: 55 }
```

Run it with Node.js:

```bash
node index.js
```

## Implementation

```js
function calculateDiscount(price, discountPercent) {
  return (price * discountPercent) / 100;
}

function calculateTax(priceAfterDiscount, taxPercent) {
  return (priceAfterDiscount * taxPercent) / 100;
}

function calculateFinalPrice(price, discountPercent, taxPercent) {
  const discount = calculateDiscount(price, discountPercent);
  const priceAfterDiscount = price - discount;
  const tax = calculateTax(priceAfterDiscount, taxPercent);

  return priceAfterDiscount + tax;
}

function createPriceSummary(price, discountPercent, taxPercent) {
  const discount = calculateDiscount(price, discountPercent);
  const tax = calculateTax(price - discount, taxPercent);
  const finalPrice = calculateFinalPrice(price, discountPercent, taxPercent);

  return { price, discount, tax, finalPrice };
}
```

## What I Learned

- **The order of calculation matters.** Tax must be calculated on the price after the discount, not on the original price. For `100` with 20% discount and 10% tax, the tax is `8` (10% of 80), not `10` (10% of 100). Passing `priceAfterDiscount` into `calculateTax` makes this rule clear in the code.
- **Small functions keep each rule in one place.** The discount formula lives only in `calculateDiscount` and the tax formula only in `calculateTax`. If a rule changes, I fix it in one function and everything that uses it is updated.
- **Functions can build on each other.** `calculateFinalPrice` calls the two helpers instead of repeating the percentage math, and `createPriceSummary` reuses all three functions.
- **Objects group related results.** Instead of returning one number, `createPriceSummary` returns an object with four named values, so the caller can read `summary.tax` or `summary.finalPrice` without remembering the order of values.
- **Shorthand property names save typing.** Writing `{ price, discount, tax, finalPrice }` is the same as `{ price: price, discount: discount, ... }` when the variable name matches the key.
- **Do not hardcode values.** Everything is calculated from the parameters, so the same functions work for any price and percentage, including edge cases like a `0` discount.
- **Decimal numbers can be imprecise.** JavaScript uses floating point, so some inputs can give results like `0.30000000000000004`. The sample values here come out clean, but for real money it is safer to round (for example with `toFixed(2)`) or work in cents.
- **Return versus `console.log`.** The functions return values and `console.log` is only used to check the output, so the results can be reused later, for example in a shopping cart or an invoice.

## Source

Project specification from roadmap.sh: Price Calculator.
