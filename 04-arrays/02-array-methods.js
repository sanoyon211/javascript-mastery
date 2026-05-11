// ============================================================
// 📘 02 - Important Array Methods (Real World Usage)
// ============================================================

const products = [
  { id: 1, name: "Laptop",  price: 75000, category: "Electronics", inStock: true },
  { id: 2, name: "Phone",   price: 25000, category: "Electronics", inStock: true },
  { id: 3, name: "Shirt",   price: 800,   category: "Clothing",    inStock: false },
  { id: 4, name: "Book",    price: 500,   category: "Education",   inStock: true },
  { id: 5, name: "Headphone",price: 5000, category: "Electronics", inStock: true },
  { id: 6, name: "Jeans",   price: 1500,  category: "Clothing",    inStock: true },
];

// ============================================================
// 📌 filter + map + reduce combination
// ============================================================

// In-stock Electronics এর total price:
const electronicsTotal = products
  .filter(p => p.category === "Electronics" && p.inStock)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log(`Electronics total: ৳${electronicsTotal.toLocaleString()}`);

// সব product এর নাম (in-stock):
const availableNames = products
  .filter(p => p.inStock)
  .map(p => p.name);
console.log("Available:", availableNames);

// ============================================================
// 📌 flatMap() — map + flat combined
// ============================================================
const sentences = ["Hello World", "JavaScript is Great", "Coding is Fun"];
const allWords = sentences.flatMap(s => s.split(" "));
console.log(allWords); // ["Hello", "World", "JavaScript", ...]

// ============================================================
// 📌 Array.isArray()
// ============================================================
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("hello"));   // false
console.log(Array.isArray({}));        // false

// ============================================================
// 📌 fill() — array এর সব বা কিছু জায়গা fill করা
// ============================================================
const filled = new Array(5).fill(0);
console.log(filled); // [0, 0, 0, 0, 0]

const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 4); // index 2 থেকে 4 এর আগে পর্যন্ত 0 দাও
console.log(arr); // [1, 2, 0, 0, 5]

// ============================================================
// 📌 findLast() & findLastIndex() (ES2023)
// ============================================================
const nums = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(nums.findLast(n => n > 3));      // 4 (শেষ থেকে)
console.log(nums.findLastIndex(n => n > 3)); // 5 (index)

// ============================================================
// 📌 toSorted(), toReversed(), with() — ES2023 (non-mutating!)
// ============================================================
const original = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = original.toSorted((a, b) => a - b); // original unchanged!
const reversed = original.toReversed();              // original unchanged!
console.log(original); // [3, 1, 4, 1, 5, 9, 2, 6] (unchanged!)
console.log(sorted);   // [1, 1, 2, 3, 4, 5, 6, 9]

// ============================================================
// 📌 Set দিয়ে Duplicate Remove করা
// ============================================================
const withDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(withDuplicates)];
console.log(unique); // [1, 2, 3, 4, 5]

const dupNames = ["Karim", "Rahim", "Karim", "Sadia", "Rahim"];
const uniqueNames = [...new Set(dupNames)];
console.log(uniqueNames); // ["Karim", "Rahim", "Sadia"]

// ============================================================
// 📌 Array Chunking (একটা সাধারণ interview question)
// ============================================================
function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  );
}
console.log(chunk([1,2,3,4,5,6,7], 3)); // [[1,2,3], [4,5,6], [7]]

// ============================================================
// 📌 Shuffle Array (Fisher-Yates algorithm)
// ============================================================
function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
console.log(shuffle([1, 2, 3, 4, 5]));

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Products array থেকে category অনুযায়ী group করো
// 2. সবচেয়ে দামী এবং সস্তা product খুঁজে বের করো
// 3. Products এর price এর median বের করো
