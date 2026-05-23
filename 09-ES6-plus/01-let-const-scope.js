// ============================================================
// 📘 01 - let, const, Scope & Hoisting
// ============================================================

// ============================================================
// 📌 Block Scope vs Function Scope
// ============================================================

// var: function-scoped, hoisted
function varExample() {
  console.log(x); // undefined (hoisted!)
  var x = 10;
  if (true) {
    var y = 20; // function scope — if block এর বাইরেও accessible!
  }
  console.log(y); // 20 (leak!)
}

// let/const: block-scoped, NOT hoisted (TDZ)
function letExample() {
  // console.log(x); // ❌ ReferenceError: TDZ (Temporal Dead Zone)
  let x = 10;
  if (true) {
    let y = 20; // block scope — শুধু এই {} এর ভেতরে
    const z = 30;
    console.log(y, z); // 20 30
  }
  // console.log(y); // ❌ ReferenceError!
}

// ============================================================
// 📌 Hoisting — Variables & Functions
// ============================================================

// Function Declaration: সম্পূর্ণ hoist হয়
console.log(greet("Karim")); // ✅ Works! "Hello Karim"
function greet(name) {
  return `Hello ${name}`;
}

// var: declaration hoist হয়, initialization নয়
console.log(myVar); // undefined (not error!)
var myVar = "hello";

// let/const: declaration hoist হয় কিন্তু TDZ এ থাকে
// console.log(myLet); // ❌ ReferenceError!
let myLet = "hello";

// Function Expression: hoist হয় না!
// console.log(sayHi()); // ❌ TypeError: sayHi is not a function
var sayHi = function() { return "Hi!"; };

// ============================================================
// 📌 Closure in Loops — Classic Problem
// ============================================================

// ❌ var এ problem:
const funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(() => i); // সব closure একই 'i' share করে
}
console.log(funcsVar[0]()); // 3 (expected 0!)
console.log(funcsVar[1]()); // 3
console.log(funcsVar[2]()); // 3

// ✅ let এ সমাধান:
const funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(() => j); // প্রতি iteration এ নতুন 'j'
}
console.log(funcsLet[0]()); // 0 ✅
console.log(funcsLet[1]()); // 1 ✅
console.log(funcsLet[2]()); // 2 ✅

// ============================================================
// 📌 const এর সীমাবদ্ধতা
// ============================================================
const PI = 3.14;
// PI = 3.15; // ❌ TypeError

// কিন্তু const object/array এর contents পরিবর্তন করা যায়!
const user = { name: "Karim" };
user.name = "Rahim"; // ✅ Allowed! (reference const, content নয়)
// user = {}; // ❌ TypeError (reference পরিবর্তন করা যাবে না)

const arr = [1, 2, 3];
arr.push(4); // ✅ Allowed!
// arr = []; // ❌ TypeError

// Freeze করে সত্যিকার immutable:
const COLORS = Object.freeze(["red", "green", "blue"]);
// COLORS.push("yellow"); // ❌ TypeError in strict mode

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. var, let, const এর scope পার্থক্য নিজে test করো
// 2. Loop এ var vs let এর পার্থক্য দেখাও
// 3. const object কে freeze করো এবং modify করার চেষ্টা করো
