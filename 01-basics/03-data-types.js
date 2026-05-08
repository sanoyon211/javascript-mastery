// ============================================================
// 📘 03 - Data Types
// ============================================================
// JavaScript এ ৮ ধরনের data type আছে
// ২ ভাগে ভাগ করা যায়: Primitive & Reference
// ============================================================

// ============================================================
// 📌 PRIMITIVE DATA TYPES (৭টি)
// ============================================================
// মান সরাসরি variable এ store হয়

// 1️⃣ String — text data
const name = "Karim";           // double quote
const city = 'Dhaka';           // single quote
const greeting = `Hello!`;      // backtick (template literal)
console.log(typeof name);       // "string"

// 2️⃣ Number — integer ও decimal উভয়ই
const age = 25;
const price = 99.99;
const negative = -10;
const bigNum = 1_000_000;       // underscore separator (readable)
console.log(typeof age);        // "number"

// Special Numbers:
console.log(Infinity);          // Infinity
console.log(-Infinity);         // -Infinity
console.log(NaN);               // Not a Number
console.log(0 / 0);             // NaN
console.log("abc" * 2);         // NaN

// 3️⃣ BigInt — অনেক বড় সংখ্যার জন্য
const bigInteger = 9007199254740991n; // শেষে 'n' লাগাতে হয়
console.log(typeof bigInteger); // "bigint"

// 4️⃣ Boolean — true অথবা false
const isLoggedIn = true;
const isAdmin = false;
console.log(typeof isLoggedIn); // "boolean"

// 5️⃣ undefined — value দেওয়া হয়নি
let score;
console.log(score);             // undefined
console.log(typeof score);      // "undefined"

// 6️⃣ null — ইচ্ছাকৃতভাবে "কিছু নেই" বোঝানো
const data = null;
console.log(data);              // null
console.log(typeof data);       // "object" ← JavaScript এর একটা পুরনো bug!

// 7️⃣ Symbol — unique identifier (Advanced)
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);       // false (সবসময় unique)

// ============================================================
// 📌 REFERENCE DATA TYPES
// ============================================================
// এগুলো memory তে reference হিসেবে store হয়

// 1️⃣ Object — key-value pair এর collection
const person = {
  name: "Rahim",
  age: 30,
  city: "Dhaka"
};
console.log(typeof person);     // "object"

// 2️⃣ Array — ordered list (আসলে special object)
const fruits = ["আম", "জাম", "কাঁঠাল"];
console.log(typeof fruits);     // "object"
console.log(Array.isArray(fruits)); // true

// 3️⃣ Function (আসলে special object)
function greet() { return "Hello"; }
console.log(typeof greet);      // "function"

// ============================================================
// 📌 typeof operator
// ============================================================
console.log(typeof "hello");    // string
console.log(typeof 42);         // number
console.log(typeof true);       // boolean
console.log(typeof undefined);  // undefined
console.log(typeof null);       // object (bug!)
console.log(typeof {});         // object
console.log(typeof []);         // object
console.log(typeof function(){}); // function

// ============================================================
// 📌 Primitive vs Reference — গুরুত্বপূর্ণ পার্থক্য!
// ============================================================

// Primitive: copy by VALUE
let num1 = 10;
let num2 = num1;   // num1 এর value copy হয়
num2 = 20;
console.log(num1); // 10 (পরিবর্তন হয়নি!)
console.log(num2); // 20

// Reference: copy by REFERENCE
let obj1 = { x: 10 };
let obj2 = obj1;   // একই object কে point করে!
obj2.x = 20;
console.log(obj1.x); // 20 (পরিবর্তন হয়ে গেছে!)
console.log(obj2.x); // 20

// Object এর সত্যিকারের copy করতে:
let obj3 = { x: 10 };
let obj4 = { ...obj3 }; // Spread operator দিয়ে
obj4.x = 99;
console.log(obj3.x); // 10 (পরিবর্তন হয়নি!)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. প্রতিটি data type এর একটি করে example লেখো
// 2. typeof দিয়ে প্রতিটির type check করো
// 3. Primitive vs Reference এর পার্থক্য নিজে test করো
