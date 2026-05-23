// ============================================================
// 📘 01 - Synchronous vs Asynchronous
// ============================================================

// ============================================================
// 📌 Synchronous (একটার পর একটা, blocking)
// ============================================================
console.log("1. শুরু হলো");
console.log("2. মাঝে আছি");
console.log("3. শেষ হলো");
// Output: 1, 2, 3 (order অনুযায়ী)

// Synchronous heavy task (blocking!):
function heavyTask() {
  let result = 0;
  for (let i = 0; i < 1_000_000; i++) {
    result += i;
  }
  return result;
}
// console.log(heavyTask()); // এটা run হওয়ার সময় browser freeze হয়ে যাবে!

// ============================================================
// 📌 Asynchronous (non-blocking)
// ============================================================
console.log("A. শুরু");

setTimeout(() => {
  console.log("B. আমি async! (2 সেকেন্ড পরে)");
}, 2000);

console.log("C. আমি আগে print হবো!");

// Output order: A → C → B (B আসে 2 সেকেন্ড পরে!)

// ============================================================
// 📌 JavaScript এ Async কীভাবে কাজ করে?
// ============================================================
/*
  JavaScript এর Call Stack, Event Loop, এবং Callback Queue:

  ┌─────────────────────────────────────────┐
  │          Call Stack                      │
  │  (synchronous code এখানে execute হয়)   │
  └─────────────────────────────────────────┘
            ↑ ↓ (Event Loop check করে)
  ┌─────────────────────────────────────────┐
  │          Callback Queue                  │
  │  (async callbacks এখানে অপেক্ষা করে)   │
  └─────────────────────────────────────────┘
            ↑
  ┌─────────────────────────────────────────┐
  │          Web APIs (Browser)              │
  │  setTimeout, fetch, DOM events, etc.     │
  └─────────────────────────────────────────┘

  Event Loop: Call Stack খালি হলে Callback Queue থেকে নেয়!
*/

// Demo:
console.log("1");                              // Call Stack এ
setTimeout(() => console.log("2"), 0);         // Web API → Queue (0ms তেও!)
Promise.resolve().then(() => console.log("3")); // Microtask Queue (Promise)
console.log("4");                              // Call Stack এ

// Output: 1, 4, 3, 2
// কারণ: Promise (microtask) setTimeout (macrotask) এর আগে চলে!

// ============================================================
// 📌 কোন কোন operations Async?
// ============================================================
// • setTimeout, setInterval
// • fetch (HTTP requests)
// • File read/write (Node.js)
// • Database queries
// • DOM events (click, scroll, etc.)
// • Promises
// • async/await

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. নিচের code এর output order predict করো:
//    console.log("Start");
//    setTimeout(() => console.log("Timeout"), 0);
//    Promise.resolve().then(() => console.log("Promise"));
//    console.log("End");
// 2. setInterval দিয়ে প্রতি ১ সেকেন্ডে counter বাড়াও, ৫ সেকেন্ড পরে থামো
