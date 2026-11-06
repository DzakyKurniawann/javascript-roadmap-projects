# Order Status Helper

A set of helper functions that summarize an order object for a support dashboard. The final summary shows the payment status, the shipping status, the number of items, and whether the order needs attention.

## Learning Goals

- Read values from nested objects (`order.payment.status`, `order.customer.name`)
- Write small functions that each return a boolean
- Return different messages depending on a condition
- Add up item quantities with `reduce`
- Combine conditions with logical operators
- Build a summary object from the results of smaller functions

## Functions

| Function | Description |
|----------|-------------|
| `isPaid(order)` | Returns `true` when `payment.status` is `"paid"` |
| `hasShipped(order)` | Returns `true` when `shipping.status` is `"shipped"` |
| `getDeliveryMessage(order)` | Returns a shipping message, and includes `estimatedDelivery` when the order has shipped |
| `needsAttention(order)` | Returns `true` when the order is unpaid or has not shipped |
| `createOrderSummary(order)` | Returns `id`, `customerName`, `paid`, `shipped`, `itemCount`, `deliveryMessage`, and `needsAttention` |

`itemCount` adds up the quantity of every item, so two notebooks and one pen set count as 3 items, not 2.

## Usage

```js
const order = {
  id: 'ORD-1001',
  customer: {
    name: 'Ava Stone',
    email: 'ava@example.com',
  },
  payment: {
    status: 'paid',
  },
  shipping: {
    status: 'shipped',
    estimatedDelivery: '2026-06-18',
  },
  items: [
    { name: 'Notebook', quantity: 2 },
    { name: 'Pen Set', quantity: 1 },
  ],
};

console.log(createOrderSummary(order));
// {
//   id: "ORD-1001",
//   customerName: "Ava Stone",
//   paid: true,
//   shipped: true,
//   itemCount: 3,
//   deliveryMessage: "Order shipped. Estimated delivery: 2026-06-18.",
//   needsAttention: false
// }

console.log(isPaid(order));
// true

console.log(hasShipped(order));
// true

const pendingOrder = {
  ...order,
  payment: { status: 'unpaid' },
  shipping: { status: 'processing', estimatedDelivery: '2026-06-18' },
};

console.log(needsAttention(pendingOrder));
// true

console.log(getDeliveryMessage(pendingOrder));
// Order has not shipped yet.
```

Run it with Node.js:

```bash
node app.js
```

## What I Learned

- **Nested data is read step by step.** The payment status, shipping status, and customer name each live inside their own object, so I reach them with paths such as `order.payment.status` and `order.customer.name`.
- **Quantity is not the same as the number of rows.** The order has two item rows but three items in total, so `items.length` gives the wrong answer. Using `reduce` to add up each `quantity` gives the correct count.
- **A message can depend on a condition.** `getDeliveryMessage` returns a different text depending on the shipping status, and only includes the delivery date when the order has shipped. This showed me how a function can choose its output based on the data.
- **Logical operators combine simple checks.** An order needs attention when it is unpaid or has not shipped, so `needsAttention` can reuse `isPaid` and `hasShipped` with `!` and `||` instead of repeating the comparisons.
- **Small functions build the summary.** `createOrderSummary` calls the other helpers and collects their results into one object, so every piece can be tested alone and the summary stays easy to read.
- **The spread operator copies an object.** The sample check creates `pendingOrder` with `...order` and then replaces only the payment and shipping parts. This is a quick way to make a variation of an object without changing the original.

## Source

Project specification from [roadmap.sh: Order Status Helper](https://roadmap.sh/projects/js-order-status-helper).