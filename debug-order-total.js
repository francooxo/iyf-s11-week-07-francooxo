// Lesson 14.3 — Debug This Code
//
// Original bugs found:
//
// 1. Off-by-one loop bound: `i <= items.length` runs one iteration too many.
//    On the last pass, items[items.length] is undefined, so `item.price`
//    throws "Cannot read properties of undefined". Fix: `i < items.length`.
//
// 2. Typo: `item.quanity` should be `item.quantity`. Because the typo'd
//    property doesn't exist on the object, it silently evaluates to
//    undefined, and price * undefined = NaN — this bug was masked by bug #1
//    (the loop threw before ever reaching a real quantity mismatch, so it
//    would only have surfaced after fixing the loop bound first).

function calculateOrderTotal(items) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item.price * item.quantity;
  }

  if (total > 100) {
    total = total * 0.9; // 10% discount
  }

  return total;
}

const order = [
  { name: "Book", price: 15, quantity: 2 },
  { name: "Pen", price: 3, quantity: 5 },
  { name: "Notebook", price: 8, quantity: 3 },
];

console.log(calculateOrderTotal(order));
// 15*2 + 3*5 + 8*3 = 30 + 15 + 24 = 69
// 69 is not > 100, so no discount applies.
// Result: 69