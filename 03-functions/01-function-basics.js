// ============================================================
// 📘 01 - Function Basics
// ============================================================
// Function হলো reusable code block — একবার লেখো, বারবার ব্যবহার করো

// ============================================================
// 📌 Function Declaration
// ============================================================
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Karim")); // Hello, Karim!
console.log(greet("Rahim")); // Hello, Rahim!

// ✅ Function Declaration Hoisting — আগে call করেও চলে!
console.log(add(3, 4)); // 7 (declaration এর আগে call করা হচ্ছে)

function add(a, b) {
  return a + b;
}

// ============================================================
// 📌 Function Expression
// ============================================================
const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // 20

// ❌ Hoisting নেই:
// console.log(subtract(5, 3)); // Error! (expression এর আগে call করা যায় না)
const subtract = function(a, b) { return a - b; };

// ============================================================
// 📌 Parameters & Arguments
// ============================================================

// Default Parameters:
function welcome(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
console.log(welcome());              // Hello, Guest!
console.log(welcome("Karim"));       // Hello, Karim!
console.log(welcome("Rahim", "Hi")); // Hi, Rahim!

// Rest Parameters (...) — অনির্দিষ্ট সংখ্যক argument:
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15

function introduce(firstName, lastName, ...hobbies) {
  return `${firstName} ${lastName} এর শখ: ${hobbies.join(", ")}`;
}
console.log(introduce("Karim", "Uddin", "coding", "reading", "gaming"));

// ============================================================
// 📌 Return Statement
// ============================================================

// Multiple return points:
function getGrade(marks) {
  if (marks >= 80) return "A+";
  if (marks >= 70) return "A";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  if (marks >= 33) return "D";
  return "F";
}
console.log(getGrade(85)); // A+
console.log(getGrade(45)); // D

// Multiple values return (object হিসেবে):
function getMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
    range: Math.max(...arr) - Math.min(...arr)
  };
}
const result = getMinMax([3, 7, 1, 9, 4]);
console.log(result.min);   // 1
console.log(result.max);   // 9
console.log(result.range); // 8

// ============================================================
// 📌 Function Scope
// ============================================================
const globalVar = "আমি global";

function testScope() {
  const localVar = "আমি local";
  console.log(globalVar); // ✅ global access হয়
  console.log(localVar);  // ✅ local access হয়
}

testScope();
// console.log(localVar); // ❌ Error! local variable বাইরে access হয় না

// ============================================================
// 📌 Pure Function vs Impure Function
// ============================================================

// Pure Function: same input → same output, কোনো side effect নেই
function pureAdd(a, b) {
  return a + b; // শুধু return করে, বাইরে কিছু change করে না
}

// Impure Function: side effect আছে
let total = 0;
function impureAdd(n) {
  total += n; // বাইরের variable change করছে
  return total;
}

// ============================================================
// 📌 IIFE — Immediately Invoked Function Expression
// ============================================================
// Define হওয়ার সাথে সাথেই execute হয়
(function() {
  const secret = "আমি immediately execute হলাম!";
  console.log(secret);
})();

// Modern way with arrow function:
(() => {
  console.log("Arrow IIFE!");
})();

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Temperature converter function: Celsius → Fahrenheit এবং উল্টো
//    Formula: F = C * 9/5 + 32
// 2. isPrime(n) function: prime number হলে true return করো
// 3. factorial(n) function: 5! = 5*4*3*2*1 = 120
// 4. capitalize(str): প্রতিটি শব্দের প্রথম অক্ষর বড় হাতা করো
