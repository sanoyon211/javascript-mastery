// ============================================================
// 📘 02 - Event Loop (JavaScript এর হৃদয়!)
// ============================================================

// ============================================================
// 📌 JavaScript Runtime Components
// ============================================================
/*
  ┌─────────────────────────────────────────────────┐
  │                JavaScript Engine                 │
  │                                                 │
  │   ┌──────────────┐    ┌─────────────────────┐  │
  │   │  Call Stack  │    │      Heap           │  │
  │   │              │    │  (Memory allocation)│  │
  │   │ main()       │    └─────────────────────┘  │
  │   │ greet()      │                             │
  │   │ console.log  │                             │
  │   └──────────────┘                             │
  └─────────────────────────────────────────────────┘
  
  ┌─────────────────────────────────────────────────┐
  │                  Web APIs (Browser)              │
  │   setTimeout | fetch | DOM events | ...          │
  └─────────────────────────────────────────────────┘
  
  ┌─────────────────────────────────────────────────┐
  │              Task Queues                         │
  │                                                 │
  │   Microtask Queue (Priority!):                  │
  │   Promise callbacks, queueMicrotask             │
  │                                                 │
  │   Macrotask Queue:                              │
  │   setTimeout, setInterval, DOM events           │
  └─────────────────────────────────────────────────┘
  
  Event Loop: Call Stack খালি? → Microtask queue check → Macrotask
*/

// ============================================================
// 📌 Execution Order Demo
// ============================================================
console.log("1: Synchronous start");

setTimeout(() => console.log("2: setTimeout (macrotask)"), 0);

Promise.resolve()
  .then(() => console.log("3: Promise.then (microtask)"))
  .then(() => console.log("4: Second .then (microtask)"));

queueMicrotask(() => console.log("5: queueMicrotask"));

console.log("6: Synchronous end");

/*
  Output order:
  1: Synchronous start
  6: Synchronous end
  3: Promise.then (microtask)     ← microtasks আগে!
  4: Second .then (microtask)
  5: queueMicrotask
  2: setTimeout (macrotask)       ← macrotask সবার শেষে
*/

// ============================================================
// 📌 Starvation — Microtask দিয়ে block করা
// ============================================================
// ⚠️ Infinite microtasks → macrotasks কখনো run হবে না!
function infiniteMicrotask() {
  Promise.resolve().then(infiniteMicrotask); // never ending microtask!
  // setTimeout never gets a chance!
}
// infiniteMicrotask(); // এটা run করলে browser freeze!

// ============================================================
// 📌 setTimeout(fn, 0) — কিছু পরে run
// ============================================================
// 0ms মানে "পরেরবার call stack খালি হলে" — তবুও সব synchronous code এর পরে

console.log("Before setTimeout");
setTimeout(() => {
  console.log("Inside setTimeout — পরে চলে");
}, 0);
console.log("After setTimeout");

// ============================================================
// 📌 Rendering এবং Event Loop
// ============================================================
/*
  Browser render cycle:
  Macrotask → Microtasks → Render → Macrotask → ...
  
  তাই DOM change করলে শুধু microtask এর পরে, 
  পরের macrotask এর আগে render হয়!
*/

// ============================================================
// 📌 setInterval vs setTimeout
// ============================================================
let count = 0;

// setInterval: প্রতি n ms এ repeat
const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  if (count >= 3) {
    clearInterval(intervalId); // থামাও!
    console.log("Interval stopped");
  }
}, 1000);

// setTimeout দিয়ে interval (বেশি reliable):
function reliableInterval(fn, delay) {
  function run() {
    fn();
    setTimeout(run, delay); // নিজেকে schedule করে
  }
  setTimeout(run, delay);
}

// ============================================================
// 📌 requestAnimationFrame — Animation এর জন্য
// ============================================================
/*
  Browser এর repaint এর সাথে sync হয় (~60fps = 16.7ms)
  setTimeout এর চেয়ে smooth animation!
*/

function animate(element) {
  let position = 0;

  function step() {
    position += 2;
    element.style.transform = `translateX(${position}px)`;

    if (position < 200) {
      requestAnimationFrame(step); // পরের frame এ আবার call
    }
  }

  requestAnimationFrame(step); // শুরু করো
}

// ============================================================
// 📌 Long Running Task — UI Block করা
// ============================================================

// ❌ Main thread block করে (UI freeze!):
function heavyTaskBlocking() {
  const start = Date.now();
  while (Date.now() - start < 3000) {} // 3 seconds block!
  console.log("Done");
}

// ✅ Chunked — UI breathing room দেওয়া:
function heavyTaskAsync(data, callback) {
  const chunkSize = 1000;
  let index = 0;

  function processChunk() {
    const end = Math.min(index + chunkSize, data.length);
    for (; index < end; index++) {
      // process data[index]
    }

    if (index < data.length) {
      setTimeout(processChunk, 0); // অন্য events এর সুযোগ দাও
    } else {
      callback();
    }
  }

  processChunk();
}

// ✅ Web Worker — আলাদা thread এ heavy task:
// const worker = new Worker("heavy-task.js");
// worker.postMessage(data);
// worker.onmessage = (e) => console.log("Result:", e.data);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. নিচের code এর output order বলো:
/*
  async function main() {
    console.log("A");
    await Promise.resolve();
    console.log("B");
  }
  main();
  console.log("C");
  setTimeout(() => console.log("D"), 0);
  Promise.resolve().then(() => console.log("E"));
*/
// 2. setInterval দিয়ে clock তৈরি করো (HH:MM:SS format)
// 3. requestAnimationFrame দিয়ে progress bar animate করো
