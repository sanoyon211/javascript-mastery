// ============================================================
// 📘 06 - Number Methods & Math Object
// ============================================================

// ============================================================
// 📌 Number Methods
// ============================================================
const num = 3.14159;

console.log(num.toFixed(2));        // "3.14" (২ দশমিক পর্যন্ত)
console.log(num.toPrecision(4));    // "3.142" (মোট ৪টি significant digit)
console.log((1234567).toLocaleString()); // "1,234,567" (comma যুক্ত)

// Number check:
console.log(Number.isInteger(42));      // true
console.log(Number.isInteger(42.5));    // false
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(42));       // true
console.log(Number.isNaN(NaN));         // true
console.log(Number.isNaN(42));          // false

// Parsing:
console.log(parseInt("100px"));   // 100 (শুধু number নেয়)
console.log(parseInt("abc"));     // NaN
console.log(parseFloat("3.14m")); // 3.14

// Number limits:
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// ============================================================
// 📌 Math Object — গণিতের সব কাজ
// ============================================================

// Basic:
console.log(Math.round(4.5));  // 5  (সবচেয়ে কাছের integer)
console.log(Math.round(4.4));  // 4
console.log(Math.ceil(4.1));   // 5  (উপরে round করে)
console.log(Math.floor(4.9));  // 4  (নিচে round করে)
console.log(Math.trunc(4.9));  // 4  (দশমিক অংশ বাদ দেয়)
console.log(Math.abs(-10));    // 10 (absolute value)

// Power & Root:
console.log(Math.pow(2, 10));  // 1024
console.log(Math.sqrt(144));   // 12
console.log(Math.cbrt(27));    // 3 (cube root)

// Min & Max:
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.min(1, 5, 3, 9, 2)); // 1

const scores = [85, 92, 78, 95, 88];
console.log(Math.max(...scores)); // 95 (spread operator দিয়ে)
console.log(Math.min(...scores)); // 78

// Constants:
console.log(Math.PI);    // 3.141592653589793
console.log(Math.E);     // 2.718281828459045 (Euler's number)

// Logarithm:
console.log(Math.log(Math.E)); // 1
console.log(Math.log2(8));     // 3
console.log(Math.log10(1000)); // 3

// Trigonometry:
console.log(Math.sin(0));        // 0
console.log(Math.cos(0));        // 1
console.log(Math.tan(Math.PI/4)); // 1

// ============================================================
// 📌 Random Number — সবচেয়ে বেশি ব্যবহার হয়!
// ============================================================

// 0 থেকে 1 এর মধ্যে random (1 বাদে):
console.log(Math.random()); // যেমন: 0.7234512...

// 0 থেকে n-1 পর্যন্ত random integer:
function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
console.log(getRandomInt(10)); // 0 থেকে 9 এর মধ্যে

// min থেকে max পর্যন্ত random integer:
function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomBetween(1, 6));   // Dice roll: 1 থেকে 6
console.log(getRandomBetween(100, 999)); // 3-digit random number

// Array থেকে random item:
const items = ["আম", "জাম", "কাঁঠাল", "লিচু"];
const randomItem = items[getRandomInt(items.length)];
console.log(randomItem); // random fruit

// ============================================================
// 📌 টাকার হিসাব (Real-world example)
// ============================================================
const price = 1234.5678;

// দুই দশমিকে রাখা:
const formattedPrice = price.toFixed(2);
console.log(`মূল্য: ৳${formattedPrice}`); // মূল্য: ৳1234.57

// VAT সহ:
const vatRate = 0.15;
const totalWithVAT = price * (1 + vatRate);
console.log(`VAT সহ: ৳${totalWithVAT.toFixed(2)}`);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. 1 থেকে 100 এর মধ্যে একটা random number generate করো
// 2. Array এর সব number এর গড় বের করো
//    [10, 20, 30, 40, 50] → 30
// 3. একটা circle এর area বের করো (r = 7)
//    Formula: π * r²
// 4. টাকার পরিমাণ কে বাংলাদেশী format এ দেখাও (comma সহ)
