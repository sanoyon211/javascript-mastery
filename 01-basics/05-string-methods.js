// ============================================================
// 📘 05 - String Methods (সবচেয়ে কাজের methods)
// ============================================================

const str = "Hello, Bangladesh!";

// ============================================================
// 📌 Basic Properties & Methods
// ============================================================
console.log(str.length);          // 18 (মোট character সংখ্যা)
console.log(str[0]);              // "H" (index দিয়ে access)
console.log(str.charAt(0));       // "H"
console.log(str[str.length - 1]); // "!" (শেষ character)

// ============================================================
// 📌 Case Methods
// ============================================================
console.log(str.toUpperCase()); // "HELLO, BANGLADESH!"
console.log(str.toLowerCase()); // "hello, bangladesh!"

// ============================================================
// 📌 Search Methods
// ============================================================
console.log(str.includes("Bangladesh")); // true
console.log(str.includes("India"));      // false

console.log(str.indexOf("l"));          // 2 (প্রথম 'l' কোথায়)
console.log(str.lastIndexOf("l"));      // 3 (শেষ 'l' কোথায়)
console.log(str.indexOf("xyz"));        // -1 (না পেলে -1)

console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!"));       // true

// ============================================================
// 📌 Extraction Methods
// ============================================================
console.log(str.slice(7, 16));        // "Banglade" (7 থেকে 16 এর আগে পর্যন্ত)
console.log(str.slice(-10));          // "angladesh!" (শেষ থেকে)
console.log(str.substring(7, 16));    // "Banglade"

// ============================================================
// 📌 Replace Methods
// ============================================================
console.log(str.replace("Bangladesh", "World")); // "Hello, World!"

const text = "আম আম আম";
console.log(text.replace("আম", "জাম"));    // "জাম আম আম" (শুধু প্রথমটা!)
console.log(text.replaceAll("আম", "জাম")); // "জাম জাম জাম" (সবগুলো!)

// ============================================================
// 📌 Split & Join
// ============================================================
const csv = "Dhaka,Chittagong,Sylhet,Rajshahi";
const cities = csv.split(",");
console.log(cities); // ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]
console.log(cities.join(" | ")); // "Dhaka | Chittagong | Sylhet | Rajshahi"

const sentence = "JavaScript is awesome";
const words = sentence.split(" ");
console.log(words); // ["JavaScript", "is", "awesome"]

// ============================================================
// 📌 Trim Methods (whitespace সরানো)
// ============================================================
const messy = "   Hello World!   ";
console.log(messy.trim());      // "Hello World!" (দুই পাশ থেকে)
console.log(messy.trimStart()); // "Hello World!   " (বাম পাশ থেকে)
console.log(messy.trimEnd());   // "   Hello World!" (ডান পাশ থেকে)

// Form input validate করার সময় খুব কাজে লাগে!
const userInput = "   karim@email.com   ";
const cleanEmail = userInput.trim();
console.log(cleanEmail); // "karim@email.com"

// ============================================================
// 📌 Padding Methods
// ============================================================
console.log("5".padStart(3, "0")); // "005" (বাম দিকে 0 যোগ)
console.log("5".padEnd(3, "0"));   // "500" (ডান দিকে 0 যোগ)

// Credit card এর শেষ ৪ digits:
const card = "1234567890123456";
const masked = card.slice(-4).padStart(card.length, "*");
console.log(masked); // "************3456"

// ============================================================
// 📌 Repeat Method
// ============================================================
console.log("Ha".repeat(3));  // "HaHaHa"
console.log("⭐".repeat(5)); // "⭐⭐⭐⭐⭐"

// ============================================================
// 📌 Template Literals (Backtick strings) — খুব গুরুত্বপূর্ণ!
// ============================================================
const personName = "Karim";
const personAge = 25;

// পুরনো পদ্ধতি:
console.log("আমার নাম " + personName + " এবং বয়স " + personAge);

// আধুনিক পদ্ধতি (Template Literal):
console.log(`আমার নাম ${personName} এবং বয়স ${personAge}`);

// Expression ও ব্যবহার করা যায়:
console.log(`২ + ৩ = ${2 + 3}`); // "২ + ৩ = 5"
console.log(`আগামী বছর বয়স হবে ${personAge + 1}`);

// Multi-line string:
const poem = `
  এই ফোল্ডারটি
  JavaScript শেখার জন্য
  তৈরি করা হয়েছে
`;
console.log(poem);

// ============================================================
// 📌 String to Number & Number to String
// ============================================================
const numStr = "42";
console.log(Number(numStr));     // 42
console.log(parseInt("42.9"));   // 42
console.log(parseFloat("42.9")); // 42.9

const num = 42;
console.log(String(num));        // "42"
console.log(num.toString());     // "42"
console.log(num.toFixed(2));     // "42.00"
console.log((3.14159).toFixed(2)); // "3.14"

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. "  hello world  " → trim করে প্রতিটি শব্দ capitalize করো
// 2. Email থেকে username বের করো (@ এর আগের অংশ)
//    Hint: "karim@gmail.com".split("@")[0]
// 3. একটি phone number কে format করো: "01712345678" → "017-1234-5678"
// 4. Template literal দিয়ে একটি invoice তৈরি করো
