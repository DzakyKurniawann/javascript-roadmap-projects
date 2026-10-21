# Cart Total Calculator

A small helper that builds a summary for a shopping cart. It calculates the subtotal from every item's price and quantity, applies the discount, then calculates tax on the discounted amount to get the final total.

## Learning Goals

- Work with an array of objects
- Loop over an array to calculate a running total (`reduce` or `for...of`)
- Split a calculation into small, single-purpose functions
- Compose functions by calling one inside another
- Return an object that groups related results

## Functions

| Function | Description |
|----------|-------------|
| `calculateSubtotal(items)` | Adds `price * quantity` for every item in the cart |
| `calculateDiscount(subtotal, discountPercent)` | Returns the discount amount |
| `calculateTax(amountAfterDiscount, taxPercent)` | Returns the tax amount, calculated on the amount after the discount |
| `createCartSummary(items, discountPercent, taxPercent)` | Returns an object with `subtotal`, `discount`, `tax`, and `total` |

## Usage

```js
const cartItems = [
  { name: 'Notebook', price: 10, quantity: 2 },
  { name: 'Pen', price: 2, quantity: 5 },
  { name: 'Bag', price: 30, quantity: 1 },
];

console.log(createCartSummary(cartItems, 10, 5));
// { subtotal: 60, discount: 6, tax: 2.7, total: 56.7 }

console.log(calculateSubtotal(cartItems));
// 60

const singleItemCart = [{ name: 'Mouse', price: 25, quantity: 2 }];

console.log(createCartSummary(singleItemCart, 0, 10));
// { subtotal: 50, discount: 0, tax: 5, total: 55 }
```

Run it with Node.js:

```bash
node index.js
```

## Implementation

```js
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateDiscount(subtotal, discountPercent) {
  return (subtotal * discountPercent) / 100;
}

function calculateTax(amountAfterDiscount, taxPercent) {
  return (amountAfterDiscount * taxPercent) / 100;
}

function createCartSummary(items, discountPercent, taxPercent) {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal, discountPercent);
  const amountAfterDiscount = subtotal - discount;
  const tax = calculateTax(amountAfterDiscount, taxPercent);
  const total = amountAfterDiscount + tax;

  return { subtotal, discount, tax, total };
}
```

## What I Learned

- **Every item must be multiplied by its quantity.** The subtotal is not the sum of prices, but the sum of `price * quantity` for each item. In the sample cart that is `20 + 10 + 30 = 60`, not `10 + 2 + 30`.
- **`reduce` builds one value from an array.** It keeps a running `sum`, adds each item's line total, and returns the final number. The starting value `0` matters, because it also makes an empty cart return `0` instead of throwing an error.
- **Arrays of objects are easy to read.** Each item has named properties (`item.price`, `item.quantity`), so the code is clearer than using separate arrays for prices and quantities.
- **Break the calculation into steps.** Subtotal, discount, and tax each have their own function, so every rule lives in one place and can be tested on its own. `createCartSummary` only combines them.
- **The order of calculation matters.** Tax is calculated on the amount after the discount (`54`), not on the subtotal (`60`). That is why the tax is `2.7` and not `3`.
- **Returning an object groups related results.** `createCartSummary` returns `subtotal`, `discount`, `tax`, and `total` together, so the caller can read `summary.total` without remembering the order of values.
- **The same functions work for any cart.** Nothing is hardcoded, so a cart with one item, many items, or a `0` discount all use the same logic.
- **Decimal numbers can be imprecise.** JavaScript uses floating point, so some inputs can produce results like `0.30000000000000004`. For real money it is safer to round (for example with `toFixed(2)`) or work in cents.

## Source

Project specification from [roadmap.sh: Cart Total Calculator](https://roadmap.sh/projects/js-cart-total-calculator).
