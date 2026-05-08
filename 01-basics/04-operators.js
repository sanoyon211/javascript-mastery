// ============================================================
// 📘 04 - Operators
// ============================================================

// ============================================================
// 📌 1. Arithmetic Operators (গণনার জন্য)
// ============================================================
console.log(10 + 5);   // 15 (যোগ)
console.log(10 - 5);   // 5  (বিয়োগ)
console.log(10 * 5);   // 50 (গুণ)
console.log(10 / 3);   // 3.333... (ভাগ)
console.log(10 % 3);   // 1  (ভাগশেষ — Modulus)
console.log(2 ** 8);   // 256 (power: 2 এর 8 ঘাত)

// String + Number = String concatenation!
console.log("বয়স: " + 25); // "বয়স: 25"
console.log(5 + "5");       // "55" (number → string হয়ে গেছে!)
console.log(5 - "3");       // 2   (string → number হয়ে গেছে!)

// ============================================================
// 📌 2. Assignment Operators
// ============================================================
let x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x **= 2;  // x = x ** 2 → 36
x %= 7;   // x = x % 7  → 1
console.log(x); // 1

// ============================================================
// 📌 3. Increment & Decrement
// ============================================================
let count = 5;

// Pre-increment: আগে বাড়ায়, তারপর return করে
console.log(++count); // 6 (count এখন 6)

// Post-increment: আগে return করে, তারপর বাড়ায়
console.log(count++); // 6 (return 6, তারপর count = 7)
console.log(count);   // 7

// Pre-decrement
console.log(--count); // 6

// ============================================================
// 📌 4. Comparison Operators (তুলনা)
// ============================================================
console.log(5 == "5");   // true  (== value compare করে, type নয়)
console.log(5 === "5");  // false (=== value + type দুটোই compare করে)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true  (type আলাদা তাই)

console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 >= 10);   // true
console.log(10 <= 9);    // false

// ⚠️ সবসময় === ব্যবহার করো, == নয়!
console.log(0 == false);  // true  (বিভ্রান্তিকর!)
console.log(0 === false); // false (সঠিক আচরণ)
console.log("" == false); // true  (বিভ্রান্তিকর!)

// ============================================================
// 📌 5. Logical Operators
// ============================================================
// && (AND) — দুটোই true হলে true
console.log(true && true);   // true
console.log(true && false);  // false

// || (OR) — যেকোনো একটা true হলে true
console.log(false || true);  // true
console.log(false || false); // false

// ! (NOT) — উল্টো করে দেয়
console.log(!true);  // false
console.log(!false); // true

// Real example:
const age = 20;
const hasID = true;
if (age >= 18 && hasID) {
  console.log("প্রবেশ অনুমতি আছে"); // এটা print হবে
}

// ============================================================
// 📌 6. Short-Circuit Evaluation (খুব গুরুত্বপূর্ণ!)
// ============================================================

// || এর short circuit: প্রথম truthy value return করে
const userName = "" || "Guest";   // "" falsy, তাই "Guest"
console.log(userName); // "Guest"

const city = "Dhaka" || "Unknown"; // "Dhaka" truthy, তাই "Dhaka"
console.log(city); // "Dhaka"

// && এর short circuit: প্রথম falsy value return করে
const result = null && "hello";
console.log(result); // null

// ============================================================
// 📌 7. Nullish Coalescing Operator ?? (ES2020)
// ============================================================
// || থেকে ভালো: শুধু null/undefined check করে
const score = 0;
console.log(score || "no score");  // "no score" (কারণ 0 falsy!)
console.log(score ?? "no score");  // 0 (কারণ 0 null/undefined নয়!)

const value = null ?? "default";
console.log(value); // "default"

// ============================================================
// 📌 8. Optional Chaining ?. (ES2020)
// ============================================================
const user = {
  name: "Karim",
  address: {
    city: "Dhaka"
  }
};

console.log(user.address?.city);    // "Dhaka"
console.log(user.phone?.number);    // undefined (error নয়!)
// console.log(user.phone.number);  // ❌ TypeError!

// ============================================================
// 📌 9. Ternary Operator — one-line if-else
// ============================================================
const num = 15;
const type = num % 2 === 0 ? "জোড়" : "বিজোড়";
console.log(type); // "বিজোড়"

// ============================================================
// 📌 10. Spread Operator ...
// ============================================================
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. == এবং === এর পার্থক্য ৩টি example দিয়ে দেখাও
// 2. Short-circuit দিয়ে default value set করো
// 3. Ternary দিয়ে pass/fail বলো (marks 50 এর বেশি হলে pass)
