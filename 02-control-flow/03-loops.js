// ============================================================
// 📘 03 - Loops (পুনরাবৃত্তি)
// ============================================================

// ============================================================
// 📌 1. for loop — যখন কতবার চলবে জানি
// ============================================================
for (let i = 1; i <= 5; i++) {
  console.log(`সংখ্যা: ${i}`);
}
// 1, 2, 3, 4, 5

// উল্টো দিকে:
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// 5, 4, 3, 2, 1

// ২ দিয়ে বাড়িয়ে:
for (let i = 0; i <= 10; i += 2) {
  process.stdout.write(i + " ");
}
console.log(); // 0 2 4 6 8 10

// ============================================================
// 📌 2. while loop — condition সত্য থাকলে চলে
// ============================================================
let count = 1;
while (count <= 5) {
  console.log(`while: ${count}`);
  count++;
}

// User input simulation:
let attempts = 0;
const maxAttempts = 3;
while (attempts < maxAttempts) {
  console.log(`চেষ্টা ${attempts + 1}`);
  attempts++;
}

// ============================================================
// 📌 3. do...while — অন্তত একবার চলবেই
// ============================================================
let x = 10;
do {
  console.log(`do-while: ${x}`); // condition false হলেও একবার চলে
  x++;
} while (x < 5); // এটা false, তাই শুধু একবার চলবে

// ============================================================
// 📌 4. for...of — Array, String iterate করার জন্য
// ============================================================
const fruits = ["আম", "জাম", "কাঁঠাল", "লিচু"];

for (const fruit of fruits) {
  console.log(fruit);
}

// String iterate:
for (const char of "JavaScript") {
  process.stdout.write(char + "-");
}
console.log(); // J-a-v-a-S-c-r-i-p-t-

// Index সহ পেতে entries() ব্যবহার করো:
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// ============================================================
// 📌 5. for...in — Object এর keys iterate করার জন্য
// ============================================================
const person = {
  name: "Karim",
  age: 25,
  city: "Dhaka"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// name: Karim
// age: 25
// city: Dhaka

// ⚠️ for...in Array এ ব্যবহার করা উচিত নয়, for...of ব্যবহার করো

// ============================================================
// 📌 Nested Loops — Multiplication Table
// ============================================================
console.log("\n--- Multiplication Table ---");
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    process.stdout.write(`${i * j}\t`);
  }
  console.log(); // নতুন লাইন
}
// 1  2  3
// 2  4  6
// 3  6  9

// ============================================================
// 📌 Pattern Printing (Interview Question)
// ============================================================
// Triangle pattern:
for (let i = 1; i <= 5; i++) {
  console.log("*".repeat(i));
}
// *
// **
// ***
// ****
// *****

// ============================================================
// 📌 Array দিয়ে কাজ (Real World)
// ============================================================
const students = [
  { name: "Rahim", marks: 85 },
  { name: "Karim", marks: 92 },
  { name: "Sadia", marks: 78 },
  { name: "Mitu", marks: 45 },
];

let total = 0;
let passCount = 0;

for (const student of students) {
  total += student.marks;
  if (student.marks >= 50) {
    passCount++;
    console.log(`✅ ${student.name}: ${student.marks}`);
  } else {
    console.log(`❌ ${student.name}: ${student.marks} (fail)`);
  }
}

const average = total / students.length;
console.log(`গড় নম্বর: ${average}`);
console.log(`পাস: ${passCount}/${students.length}`);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. 1 থেকে 100 এর মধ্যে সব জোড় সংখ্যার যোগফল বের করো
// 2. Fibonacci series প্রথম 10টি: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
// 3. Array তে সবচেয়ে বড় সংখ্যা খুঁজে বের করো (Math.max ছাড়া)
// 4. Numbers 1-50, FizzBuzz: 3 এর গুণিতকে "Fizz", 5 এর গুণিতকে "Buzz",
//    দুটোরই গুণিতকে "FizzBuzz" print করো
