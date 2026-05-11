// ============================================================
// 📘 03 - Higher Order Functions
// ============================================================
// যে function অন্য function কে argument হিসেবে নেয়
// অথবা function return করে — সেটাই Higher Order Function
// ============================================================

// ============================================================
// 📌 map() — প্রতিটি element transform করে নতুন array বানায়
// ============================================================
const numbers = [1, 2, 3, 4, 5];

// পুরনো পদ্ধতি:
const squaredOld = [];
for (const n of numbers) {
  squaredOld.push(n * n);
}

// map দিয়ে:
const squared = numbers.map(n => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

// Object array:
const students = [
  { name: "Karim", marks: 85 },
  { name: "Rahim", marks: 72 },
  { name: "Sadia", marks: 90 },
];

const names = students.map(s => s.name);
console.log(names); // ["Karim", "Rahim", "Sadia"]

const grades = students.map(s => ({
  name: s.name,
  grade: s.marks >= 80 ? "A" : "B"
}));
console.log(grades);

// ============================================================
// 📌 filter() — condition অনুযায়ী elements রাখে
// ============================================================
const allNumbers = [1, -3, 7, -2, 4, -8, 9, 0];

const positives = allNumbers.filter(n => n > 0);
console.log(positives); // [1, 7, 4, 9]

const passedStudents = students.filter(s => s.marks >= 75);
console.log(passedStudents);

// ============================================================
// 📌 reduce() — সব elements কে একটা value এ পরিণত করে
// ============================================================
// reduce(callback, initialValue)
// callback: (accumulator, currentValue) => newAccumulator

const nums = [1, 2, 3, 4, 5];

// Sum:
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Product:
const product = nums.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Max value:
const max = nums.reduce((acc, n) => n > acc ? n : acc, -Infinity);
console.log(max); // 5

// Count occurrences:
const fruits = ["আম", "জাম", "আম", "কাঁঠাল", "জাম", "আম"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { আম: 3, জাম: 2, কাঁঠাল: 1 }

// Group by:
const people = [
  { name: "Karim", city: "Dhaka" },
  { name: "Rahim", city: "Chittagong" },
  { name: "Sadia", city: "Dhaka" },
  { name: "Mitu",  city: "Sylhet" },
];

const byCity = people.reduce((acc, person) => {
  const city = person.city;
  if (!acc[city]) acc[city] = [];
  acc[city].push(person.name);
  return acc;
}, {});
console.log(byCity);
// { Dhaka: ["Karim", "Sadia"], Chittagong: ["Rahim"], Sylhet: ["Mitu"] }

// ============================================================
// 📌 forEach() — প্রতিটি element এ কাজ করে (return নেই)
// ============================================================
const items = ["a", "b", "c"];
items.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});

// map vs forEach:
// map → নতুন array তৈরি করে ✅
// forEach → শুধু iterate করে, কিছু return করে না

// ============================================================
// 📌 find() & findIndex()
// ============================================================
const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone",  price: 20000 },
  { id: 3, name: "Tablet", price: 30000 },
];

const laptop = products.find(p => p.name === "Laptop");
console.log(laptop); // { id: 1, name: "Laptop", price: 50000 }

const phoneIndex = products.findIndex(p => p.name === "Phone");
console.log(phoneIndex); // 1

// ============================================================
// 📌 some() & every()
// ============================================================
const scores = [80, 92, 45, 78, 55];

// some: কমপক্ষে একটা condition satisfy করলে true
console.log(scores.some(s => s >= 90));  // true (92 আছে)
console.log(scores.some(s => s >= 100)); // false

// every: সবগুলো condition satisfy করলে true
console.log(scores.every(s => s >= 50)); // false (45 আছে)
console.log(scores.every(s => s >= 40)); // true

// ============================================================
// 📌 sort()
// ============================================================
const names = ["Zara", "Karim", "Anika", "Rahim"];
names.sort(); // alphabetically
console.log(names); // ["Anika", "Karim", "Rahim", "Zara"]

// Numbers sort (সাবধান! default sort alphabetical):
const nums2 = [10, 1, 20, 2, 30];
nums2.sort(); // ❌ Wrong: [1, 10, 2, 20, 30]
nums2.sort((a, b) => a - b); // ✅ Ascending: [1, 2, 10, 20, 30]
nums2.sort((a, b) => b - a); // Descending: [30, 20, 10, 2, 1]
console.log(nums2);

// Object sort by property:
const studentsSorted = [...students].sort((a, b) => b.marks - a.marks);
console.log(studentsSorted); // সর্বোচ্চ থেকে সর্বনিম্ন marks

// ============================================================
// 📌 Method Chaining — সবচেয়ে powerful pattern!
// ============================================================
const data = [
  { name: "Karim", age: 25, salary: 50000 },
  { name: "Rahim", age: 30, salary: 80000 },
  { name: "Sadia", age: 22, salary: 45000 },
  { name: "Mitu",  age: 35, salary: 90000 },
  { name: "Roni",  age: 28, salary: 60000 },
];

// 30 এর কম বয়সীদের salary বের করো এবং গড় নাও:
const avgSalary = data
  .filter(p => p.age < 30)          // বয়স ফিল্টার
  .map(p => p.salary)               // শুধু salary নাও
  .reduce((sum, s) => sum + s, 0)   // যোগ করো
  / data.filter(p => p.age < 30).length; // গড়

console.log(`গড় বেতন: ৳${avgSalary}`);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Products array থেকে 1000 টাকার বেশি দামের products filter করো
// 2. Students array তে সবার marks 10% বাড়াও (map ব্যবহার করো)
// 3. Words array তে প্রতিটি word এর length বের করো
// 4. Sales data থেকে total revenue বের করো (reduce)
