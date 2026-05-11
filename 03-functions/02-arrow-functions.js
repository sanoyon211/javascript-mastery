// ============================================================
// 📘 02 - Arrow Functions (ES6)
// ============================================================
// সংক্ষিপ্ত syntax এর function — modern JS এর সবচেয়ে বেশি ব্যবহার

// ============================================================
// 📌 Basic Syntax
// ============================================================

// Regular function:
function add(a, b) {
  return a + b;
}

// Arrow function (একটু সংক্ষিপ্ত):
const addArrow = (a, b) => {
  return a + b;
};

// Implicit return (one-liner, return keyword লাগে না!):
const addShort = (a, b) => a + b;

console.log(add(3, 4));       // 7
console.log(addArrow(3, 4));  // 7
console.log(addShort(3, 4));  // 7

// ============================================================
// 📌 Different Syntax Forms
// ============================================================

// No parameter:
const sayHello = () => "Hello!";
console.log(sayHello()); // Hello!

// One parameter (brackets optional):
const double = n => n * 2;
console.log(double(5)); // 10

// Multiple parameters (brackets required):
const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Karim", "Uddin")); // Karim Uddin

// Object return করলে () দিতে হয়:
const createUser = (name, age) => ({ name, age });
console.log(createUser("Rahim", 25)); // {name: "Rahim", age: 25}

// Multi-line (curly braces + return দরকার):
const gradeCalc = marks => {
  if (marks >= 80) return "A+";
  if (marks >= 60) return "B";
  return "F";
};

// ============================================================
// 📌 this keyword এ পার্থক্য (গুরুত্বপূর্ণ!)
// ============================================================

// Regular function এর নিজস্ব 'this' আছে:
function Timer() {
  this.seconds = 0;

  // ❌ Regular function: 'this' এখানে Timer কে point করে না!
  // setInterval(function() {
  //   this.seconds++; // এটা কাজ করবে না
  // }, 1000);

  // ✅ Arrow function: 'this' enclosing scope (Timer) থেকে নেয়
  setInterval(() => {
    this.seconds++;
    // এখন this সঠিকভাবে Timer কে point করে
  }, 1000);
}

// Object method এ:
const person = {
  name: "Karim",

  // ❌ Arrow function object method হিসেবে ব্যবহার করো না:
  greetWrong: () => {
    return `Hello, ${this?.name}`; // this = undefined or global
  },

  // ✅ Regular function object method হিসেবে:
  greetRight: function() {
    return `Hello, ${this.name}`; // this = person object
  },

  // ✅ Shorthand method:
  greetShort() {
    return `Hello, ${this.name}`;
  }
};

console.log(person.greetRight()); // Hello, Karim
console.log(person.greetShort()); // Hello, Karim

// ============================================================
// 📌 Arrow Functions সবচেয়ে বেশি কাজে লাগে কোথায়?
// ============================================================

// Array methods:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log(evens);   // [2, 4, 6, 8, 10]
console.log(total);   // 55

// Chaining:
const result = numbers
  .filter(n => n % 2 === 0)  // জোড় সংখ্যা নাও
  .map(n => n * n)            // বর্গ করো
  .reduce((sum, n) => sum + n, 0); // যোগ করো
console.log(result); // 4+16+36+64+100 = 220

// Callback:
setTimeout(() => console.log("2 সেকেন্ড পরে!"), 2000);

// ============================================================
// 📌 কখন Arrow Function ব্যবহার করবো না?
// ============================================================
// ❌ Object methods (this সমস্যা)
// ❌ Constructor functions
// ❌ Event handlers (কখনো কখনো this দরকার হয়)
// ❌ Generator functions (arrow generator হয় না)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Regular function গুলো arrow function এ convert করো:
//    function square(n) { return n * n; }
//    function isEven(n) { return n % 2 === 0; }
// 2. Arrow function দিয়ে array থেকে শুধু positive numbers filter করো
// 3. Names array কে uppercase করো: ["karim", "rahim"] → ["KARIM", "RAHIM"]
