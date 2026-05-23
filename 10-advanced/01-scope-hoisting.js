// ============================================================
// 📘 01 - Scope & Hoisting (Deep Dive)
// ============================================================

// ============================================================
// 📌 Scope Chain
// ============================================================
const globalVar = "global";

function outer() {
  const outerVar = "outer";

  function middle() {
    const middleVar = "middle";

    function inner() {
      const innerVar = "inner";

      // সব outer variables access করা যায়:
      console.log(globalVar); // "global"
      console.log(outerVar);  // "outer"
      console.log(middleVar); // "middle"
      console.log(innerVar);  // "inner"
    }
    inner();
  }
  middle();
}
outer();

// ============================================================
// 📌 Execution Context
// ============================================================
/*
  JavaScript code run হওয়ার আগে Execution Context তৈরি হয়:
  
  1. Global Execution Context:
     - Creation phase: var hoisting, function hoisting
     - Execution phase: code line by line চলে
  
  2. Function Execution Context (প্রতি function call এ):
     - নিজস্ব this, arguments
     - Inner variables
  
  Call Stack:
  ┌──────────────────┐
  │  inner() context  │
  ├──────────────────┤
  │  middle() context │
  ├──────────────────┤
  │  outer() context  │
  ├──────────────────┤
  │  Global context   │
  └──────────────────┘
*/

// ============================================================
// 📌 IIFE & Module Pattern
// ============================================================
const Counter = (function() {
  // Private:
  let count = 0;
  const MAX = 10;

  // Public API:
  return {
    increment() {
      if (count < MAX) count++;
      return count;
    },
    decrement() {
      if (count > 0) count--;
      return count;
    },
    reset() { count = 0; },
    get value() { return count; }
  };
})();

console.log(Counter.increment()); // 1
console.log(Counter.increment()); // 2
console.log(Counter.value);       // 2
// console.log(count); // ❌ ReferenceError — private!

// ============================================================
// 📌 Lexical Scope
// ============================================================
const x = "outer x";

function printX() {
  console.log(x); // "outer x" — defined কোথায় সেটা দেখে, called কোথায় নয়!
}

function callPrintX() {
  const x = "inner x";
  printX(); // "outer x" (lexical scope!)
}

callPrintX(); // "outer x"

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Scope chain manually trace করো (5 level deep)
// 2. IIFE দিয়ে একটা module pattern তৈরি করো
// 3. Hoisting: কোন variable/function আগে কোনটা পরে available তা বলো
