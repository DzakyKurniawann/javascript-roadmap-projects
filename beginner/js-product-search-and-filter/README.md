# Product Search and Filter

A set of search and filter helpers for a small product list. Most helpers return a list of matching products, and one helper returns a single product.

## Learning Goals

- Filter arrays with `filter`
- Find a single item with `find`
- Understand when a function returns an array and when it returns one item or `undefined`
- Compare strings without caring about letter casing
- Write functions that do not change the original array
- Chain `filter` with `map` to display only the data you need

## Functions

| Function | Description |
|----------|-------------|
| `filterByCategory(products, category)` | Returns the products that belong to the given category |
| `filterByMaxPrice(products, maxPrice)` | Returns the products priced at or below the maximum price |
| `getInStockProducts(products)` | Returns the products where `inStock` is `true` |
| `findProductById(products, productId)` | Returns the matching product, or `undefined` if there is none |
| `searchProducts(products, searchText)` | Returns the products whose name contains the search text, ignoring casing |

## Usage

```js
const products = [
  { id: 1, name: 'Notebook', category: 'stationery', price: 10, inStock: true },
  { id: 2, name: 'Desk Lamp', category: 'home', price: 35, inStock: false },
  { id: 3, name: 'Pen Set', category: 'stationery', price: 6, inStock: true },
  { id: 4, name: 'Water Bottle', category: 'fitness', price: 18, inStock: true },
];

console.log(filterByCategory(products, 'stationery').map((p) => p.name));
// ["Notebook", "Pen Set"]

console.log(filterByMaxPrice(products, 20).map((p) => p.name));
// ["Notebook", "Pen Set", "Water Bottle"]

console.log(findProductById(products, 3));
// { id: 3, name: "Pen Set", category: "stationery", price: 6, inStock: true }

console.log(searchProducts(products, 'pen').map((p) => p.name));
// ["Pen Set"]

console.log(getInStockProducts(products).map((p) => p.name));
// ["Notebook", "Pen Set", "Water Bottle"]

console.log(findProductById(products, 99));
// undefined
```

Run it with Node.js:

```bash
node index.js
```

## What I Learned

- **`filter` and `find` solve different problems.** `filter` always returns an array, even when nothing matches (an empty array), while `find` returns a single item or `undefined`. Choosing the right one depends on whether I expect many results or just one.
- **Not finding something is a valid result.** `findProductById` returns `undefined` for an unknown id instead of crashing. This made me think about how the code that uses the function should handle a missing result.
- **Case-insensitive search needs both sides lowercased.** Searching for `'pen'` should match `'Pen Set'`, so I convert both the product name and the search text to lowercase before using `includes`.
- **Do not change the original data.** `filter` creates a new array and leaves `products` untouched, which keeps the data predictable and avoids bugs where one function accidentally affects another.
- **Chaining makes output easier to read.** Using `.map((product) => product.name)` after a filter lets me check results quickly, without printing whole objects.
- **Small helper functions are reusable.** Each function does a single job, so they can be combined later, for example filtering by category first and then by max price.

## Source

Project specification from [roadmap.sh: Product Search and Filter](https://roadmap.sh/projects/js-product-search-and-filter).