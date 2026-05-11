// ============================================================
// 📘 05 - Recursion
// ============================================================
// Recursion: একটা function যে নিজেকেই call করে
// Base case ছাড়া recursion হলো infinite loop!
// ============================================================

// ============================================================
// 📌 Factorial (n!)
// ============================================================
// 5! = 5 × 4 × 3 × 2 × 1 = 120

function factorial(n) {
  if (n <= 1) return 1;       // ← Base case (এখানে থামে)
  return n * factorial(n - 1); // ← Recursive case
}

console.log(factorial(5));  // 120
console.log(factorial(10)); // 3628800

// ============================================================
// 📌 Fibonacci Series
// ============================================================
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...

function fibonacci(n) {
  if (n <= 0) return 0;            // Base case
  if (n === 1) return 1;           // Base case
  return fibonacci(n - 1) + fibonacci(n - 2); // Recursive
}

for (let i = 0; i < 10; i++) {
  process.stdout.write(fibonacci(i) + " ");
}
console.log(); // 0 1 1 2 3 5 8 13 21 34

// ============================================================
// 📌 Sum of Array (Recursion)
// ============================================================
function arraySum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + arraySum(arr.slice(1));
}
console.log(arraySum([1, 2, 3, 4, 5])); // 15

// ============================================================
// 📌 Nested Object Traverse (Real World!)
// ============================================================
const fileSystem = {
  name: "root",
  children: [
    {
      name: "documents",
      children: [
        { name: "resume.pdf", children: [] },
        { name: "cover.doc", children: [] }
      ]
    },
    {
      name: "photos",
      children: [
        { name: "vacation.jpg", children: [] }
      ]
    }
  ]
};

function listAllFiles(node, indent = 0) {
  console.log("  ".repeat(indent) + node.name);
  for (const child of node.children) {
    listAllFiles(child, indent + 1); // Recursive call!
  }
}
listAllFiles(fileSystem);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Power function: power(2, 10) → 1024 (Math.pow ছাড়া)
// 2. Countdown function: countdown(5) → 5, 4, 3, 2, 1, Blast off!
// 3. Flatten nested array: [1, [2, [3, [4]]]] → [1, 2, 3, 4]
