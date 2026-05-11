// ============================================================
// 📘 06 - Callbacks
// ============================================================
// Callback: একটা function যাকে অন্য function এর argument হিসেবে pass করা হয়
// এবং পরে call করা হয়
// ============================================================

// ============================================================
// 📌 Basic Callback
// ============================================================
function doSomething(callback) {
  console.log("কাজ শুরু হলো...");
  callback(); // callback function call করছি
  console.log("কাজ শেষ হলো।");
}

doSomething(function() {
  console.log("আমি callback function!");
});

// Arrow function callback:
doSomething(() => console.log("Arrow callback!"));

// ============================================================
// 📌 Callback with Data
// ============================================================
function processNumber(num, callback) {
  const result = callback(num);
  return result;
}

const squared = processNumber(5, n => n * n);
const doubled = processNumber(5, n => n * 2);
console.log(squared); // 25
console.log(doubled); // 10

// ============================================================
// 📌 Async Callback (setTimeout)
// ============================================================
function fetchData(callback) {
  console.log("Data fetch করা শুরু হলো...");

  setTimeout(() => {
    const data = { name: "Karim", age: 25 };
    callback(null, data); // convention: (error, data)
  }, 2000);
}

fetchData((error, data) => {
  if (error) {
    console.log("Error:", error);
    return;
  }
  console.log("Data পাওয়া গেছে:", data);
});

// ============================================================
// 📌 Callback Hell (সমস্যা!)
// ============================================================
// একটার পর একটা async operation করতে গেলে নেস্টেড হয়ে যায়:

setTimeout(() => {
  console.log("Step 1: User login");
  setTimeout(() => {
    console.log("Step 2: Fetch user data");
    setTimeout(() => {
      console.log("Step 3: Fetch orders");
      setTimeout(() => {
        console.log("Step 4: Process orders");
        // এটাই Callback Hell! Pyramid of Doom!
        // সমাধান: Promises এবং async/await (পরের file এ)
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// ============================================================
// 📌 Custom forEach, map (Callback এর real world)
// ============================================================
function myForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

myForEach([1, 2, 3], (item, index) => {
  console.log(`Index ${index}: ${item}`);
});

const doubled2 = myMap([1, 2, 3, 4, 5], n => n * 2);
console.log(doubled2); // [2, 4, 6, 8, 10]

// ============================================================
// 📌 Error-First Callback Pattern (Node.js convention)
// ============================================================
function divide(a, b, callback) {
  if (b === 0) {
    callback(new Error("শূন্য দিয়ে ভাগ করা যাবে না!")); // error first
    return;
  }
  callback(null, a / b); // null = no error
}

divide(10, 2, (err, result) => {
  if (err) { console.log("Error:", err.message); return; }
  console.log("Result:", result); // 5
});

divide(10, 0, (err, result) => {
  if (err) { console.log("Error:", err.message); return; } // Error!
  console.log("Result:", result);
});

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. একটা function লেখো যা array, operation, callback নেয়
//    প্রতিটি element এ operation করে callback এ result দেয়
// 2. Simulated async login: 2 sec পরে success/failure callback call করো
