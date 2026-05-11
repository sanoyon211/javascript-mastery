// ============================================================
// 📘 01 - Array Basics
// ============================================================

// ============================================================
// 📌 Array তৈরি করা
// ============================================================
const fruits = ["আম", "জাম", "কাঁঠাল"]; // Array literal (সবচেয়ে common)
const numbers = new Array(1, 2, 3, 4, 5); // Constructor (এড়িয়ে চলো)
const empty = [];                           // Empty array
const mixed = [1, "hello", true, null, {name: "Karim"}]; // Mixed types

// ============================================================
// 📌 Access & Modify
// ============================================================
console.log(fruits[0]);        // "আম" (প্রথম)
console.log(fruits[2]);        // "কাঁঠাল" (তৃতীয়)
console.log(fruits.at(-1));    // "কাঁঠাল" (শেষ) ← Modern!
console.log(fruits.length);    // 3

fruits[1] = "লিচু"; // পরিবর্তন
console.log(fruits); // ["আম", "লিচু", "কাঁঠাল"]

// ============================================================
// 📌 Add & Remove Elements
// ============================================================
const arr = [1, 2, 3];

// শেষে যোগ/বাদ:
arr.push(4, 5);    // [1, 2, 3, 4, 5] — শেষে যোগ, নতুন length return করে
arr.pop();         // [1, 2, 3, 4]   — শেষেরটা বাদ দেয়, সেই element return করে

// শুরুতে যোগ/বাদ:
arr.unshift(0);    // [0, 1, 2, 3, 4] — শুরুতে যোগ (ধীর!)
arr.shift();       // [1, 2, 3, 4]    — শুরুরটা বাদ দেয় (ধীর!)

console.log(arr);

// ============================================================
// 📌 splice() — Middle থেকে Add/Remove
// ============================================================
const colors = ["red", "green", "blue", "yellow"];

// Remove: splice(startIndex, deleteCount)
const removed = colors.splice(1, 2); // index 1 থেকে 2টা বাদ দাও
console.log(removed); // ["green", "blue"]
console.log(colors);  // ["red", "yellow"]

// Insert: splice(index, 0, ...items)
colors.splice(1, 0, "purple", "pink"); // index 1 এ insert
console.log(colors); // ["red", "purple", "pink", "yellow"]

// Replace: splice(index, deleteCount, ...items)
colors.splice(2, 1, "orange"); // index 2 এর 1টা বাদ দিয়ে "orange" বসাও
console.log(colors);

// ============================================================
// 📌 slice() — Copy/Extract (Original পরিবর্তন হয় না!)
// ============================================================
const nums = [10, 20, 30, 40, 50];
console.log(nums.slice(1, 3));  // [20, 30] (1 থেকে 3 এর আগে পর্যন্ত)
console.log(nums.slice(2));     // [30, 40, 50] (2 থেকে শেষ পর্যন্ত)
console.log(nums.slice(-2));    // [40, 50] (শেষ থেকে 2টা)
console.log(nums);              // [10, 20, 30, 40, 50] (unchanged!)

// Array copy:
const copy = nums.slice(); // পুরো array copy
const copy2 = [...nums];   // Spread দিয়ে copy (better)

// ============================================================
// 📌 indexOf & includes
// ============================================================
const languages = ["JS", "Python", "Java", "JS", "C++"];
console.log(languages.indexOf("JS"));      // 0 (প্রথমটার index)
console.log(languages.lastIndexOf("JS"));  // 3 (শেষটার index)
console.log(languages.indexOf("Ruby"));    // -1 (নেই)
console.log(languages.includes("Python")); // true
console.log(languages.includes("Ruby"));   // false

// ============================================================
// 📌 concat & flat
// ============================================================
const a = [1, 2, 3];
const b = [4, 5, 6];
const c = a.concat(b);        // [1, 2, 3, 4, 5, 6]
const d = [...a, ...b];       // [1, 2, 3, 4, 5, 6] (preferred)

const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]] (1 level)
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]  (2 levels)
console.log(nested.flat(Infinity)); // সম্পূর্ণ flat

// ============================================================
// 📌 join & reverse
// ============================================================
const words = ["Hello", "World", "JavaScript"];
console.log(words.join(" "));  // "Hello World JavaScript"
console.log(words.join("-"));  // "Hello-World-JavaScript"
console.log(words.join(""));   // "HelloWorldJavaScript"

const reversed = [1, 2, 3, 4, 5].reverse();
console.log(reversed); // [5, 4, 3, 2, 1] (original ও change হয়!)

// ============================================================
// 📌 Array.from() & Array.of()
// ============================================================
// String থেকে Array:
const chars = Array.from("Hello");
console.log(chars); // ["H", "e", "l", "l", "o"]

// Range তৈরি করা:
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Shopping cart array তে item যোগ করো এবং remove করো
// 2. দুটো array merge করো এবং duplicate বাদ দাও
// 3. Array কে reverse করো (original পরিবর্তন না করে)
