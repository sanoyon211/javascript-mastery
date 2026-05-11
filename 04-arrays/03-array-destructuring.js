// ============================================================
// 📘 03 - Array Destructuring
// ============================================================
// Array এর values কে নির্দিষ্ট variables এ assign করার shorthand

// Basic:
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements:
const [first, , third] = [10, 20, 30];
console.log(first, third); // 10 30

// Default values:
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // 1 2 0

// Swap variables:
let p = "আম", q = "জাম";
[p, q] = [q, p];
console.log(p, q); // জাম আম

// Rest pattern:
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Function return:
function getCoords() {
  return [23.8103, 90.4125]; // Dhaka coordinates
}
const [lat, lng] = getCoords();
console.log(`Lat: ${lat}, Lng: ${lng}`);

// Nested destructuring:
const [[r, g], b2] = [[255, 128], 0];
console.log(r, g, b2); // 255 128 0

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. [10, 20, 30, 40, 50] থেকে প্রথম দুটো এবং বাকিগুলো আলাদা করো
// 2. Function থেকে [min, max] return করে destructure করো
