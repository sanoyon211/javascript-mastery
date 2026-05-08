// ============================================================
// 📘 02 - Variables (var, let, const)
// ============================================================
// Variable হলো data store করার container
// মনে করো একটা বাক্স — যেখানে জিনিস রাখো
// ============================================================

// ============================================================
// 📌 var — পুরনো পদ্ধতি (এখন avoid করো)
// ============================================================
var name = "Rahim";
var age = 25;
console.log(name, age); // Rahim 25

// var এর সমস্যা: re-declare করা যায় (bug তৈরি করে!)
var name = "Karim"; // ❌ এটা allowed কিন্তু dangerous!
console.log(name);  // Karim

// ============================================================
// 📌 let — আধুনিক পদ্ধতি, value বদলানো যায়
// ============================================================
let city = "Dhaka";
console.log(city); // Dhaka

city = "Chittagong"; // ✅ value পরিবর্তন করা যায়
console.log(city);   // Chittagong

// let দিয়ে re-declare করা যায় না
// let city = "Sylhet"; // ❌ SyntaxError!

// ============================================================
// 📌 const — constant, value বদলানো যায় না
// ============================================================
const PI = 3.14159;
console.log(PI); // 3.14159

// PI = 3; // ❌ TypeError: Assignment to constant variable

const country = "Bangladesh";
console.log(country); // Bangladesh

// ============================================================
// 📌 কখন কোনটা ব্যবহার করবো?
// ============================================================
// ✅ const  → সবসময় প্রথমে চেষ্টা করো (value পরিবর্তন হবে না)
// ✅ let    → যখন value পরিবর্তন হবে (loop counter, etc.)
// ❌ var    → এড়িয়ে চলো (পুরনো, সমস্যা তৈরি করে)

// ============================================================
// 📌 Variable Naming Rules
// ============================================================

// ✅ Valid names:
let firstName = "Karim";         // camelCase (সবচেয়ে popular)
let _privateVar = "hidden";      // underscore দিয়ে শুরু করা যায়
let $dollarSign = "ok";          // dollar sign দিয়ে শুরু করা যায়
let userName2 = "user";          // number মাঝে বা শেষে থাকতে পারে

// ❌ Invalid names:
// let 2user = "bad";     // number দিয়ে শুরু করা যাবে না
// let user-name = "bad"; // hyphen চলে না
// let let = "bad";       // reserved keyword চলে না

// ============================================================
// 📌 Multiple Variables একসাথে
// ============================================================
let x = 1, y = 2, z = 3;
console.log(x, y, z); // 1 2 3

// Value ছাড়া declare:
let score;
console.log(score); // undefined (value দেওয়া হয়নি তাই)
score = 100;
console.log(score); // 100

// ============================================================
// 📌 Variable Swap (দুটো variable এর value অদলবদল)
// ============================================================
let a = "আম";
let b = "জাম";
console.log("আগে:", a, b); // আগে: আম জাম

// Modern way (Destructuring):
[a, b] = [b, a];
console.log("পরে:", a, b); // পরে: জাম আম

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. তোমার নাম, বয়স, এবং শহর const/let দিয়ে store করো
// 2. বয়স update করো (জন্মদিনে ১ বাড়ালে)
// 3. দুটো number এর value swap করো
// 4. একটা variable declare করো value ছাড়া, তারপর value দাও

// তোমার উত্তর:
