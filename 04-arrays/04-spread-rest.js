// ============================================================
// 📘 04 - Spread & Rest Operator (...)
// ============================================================
// দেখতে একই কিন্তু কাজ উল্টো!
// Spread: array/object কে "ছড়িয়ে দেয়"
// Rest: অনেক elements কে একটা array/object এ "জড়ো করে"

// ============================================================
// 📌 Spread Operator (...)
// ============================================================

// Array spread:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// মাঝে যোগ:
const withMiddle = [...arr1, 10, 20, ...arr2];
console.log(withMiddle); // [1, 2, 3, 10, 20, 4, 5, 6]

// Copy (shallow):
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (unchanged!)
console.log(copy);     // [1, 2, 3, 4]

// Function call:
const nums = [3, 1, 7, 5, 9];
console.log(Math.max(...nums)); // 9 (spread করে arguments হিসেবে পাঠাচ্ছে)

// String spread:
const chars = [..."JavaScript"];
console.log(chars); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

// Object spread:
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4 }

// Object copy (shallow):
const user = { name: "Karim", age: 25, city: "Dhaka" };
const updatedUser = { ...user, age: 26, email: "karim@email.com" }; // override + add
console.log(user);        // original unchanged
console.log(updatedUser); // { name: "Karim", age: 26, city: "Dhaka", email: "..." }

// ============================================================
// 📌 Rest Parameter (...) — Function এ
// ============================================================

function sum(...numbers) { // সব arguments এক array এ আসে
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2));           // 3
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mix: first few named, rest collected:
function introduce(name, age, ...hobbies) {
  console.log(`${name} (${age}) — শখ: ${hobbies.join(", ")}`);
}
introduce("Karim", 25, "coding", "reading", "gaming");

// ============================================================
// 📌 Real World Usage
// ============================================================

// API response update করা (Redux pattern):
const currentState = {
  user: "Karim",
  loading: false,
  error: null,
  data: []
};

const newState = { ...currentState, loading: true }; // loading update
const errorState = { ...currentState, error: "Network Error", loading: false };

// Shopping cart:
function addToCart(cart, newItem) {
  return [...cart, newItem]; // original cart পরিবর্তন হয় না!
}

const cart = [{ id: 1, name: "Laptop" }];
const updatedCart = addToCart(cart, { id: 2, name: "Phone" });
console.log(cart);        // [{id:1, name:"Laptop"}] (unchanged!)
console.log(updatedCart); // [{id:1,...}, {id:2,...}]

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. দুটো user object merge করো (newer user এর values override করবে)
// 2. Spread দিয়ে array copy করো এবং নতুন element যোগ করো
// 3. Rest parameter দিয়ে যেকোনো সংখ্যার argument এর average বের করো
