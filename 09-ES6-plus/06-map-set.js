// ============================================================
// 📘 06 - Map & Set
// ============================================================

// ============================================================
// 📌 Map — key-value pairs (Object এর উন্নত version)
// ============================================================
// Object থেকে পার্থক্য:
// ✅ যেকোনো type key হতে পারে (object, function, etc.)
// ✅ insertion order maintain করে
// ✅ size property আছে
// ✅ iteration সহজ

const map = new Map();

// Set:
map.set("name", "Karim");
map.set(1, "one");                    // number key
map.set(true, "boolean key");         // boolean key
map.set({ id: 1 }, "object key");    // object key!

// Get:
console.log(map.get("name")); // "Karim"
console.log(map.get(1));      // "one"
console.log(map.size);        // 4

// Check:
console.log(map.has("name")); // true
console.log(map.has("age"));  // false

// Delete:
map.delete(true);

// Iterate:
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

map.forEach((value, key) => console.log(key, "→", value));

// Convert:
const mapArr = [...map];              // Array of [key, value] pairs
const keys = [...map.keys()];
const values = [...map.values()];

// Object → Map:
const obj = { a: 1, b: 2, c: 3 };
const objToMap = new Map(Object.entries(obj));

// Map → Object:
const mapToObj = Object.fromEntries(map);

// ============================================================
// 📌 Map Real World Usage
// ============================================================

// Cache/Memoization:
const cache = new Map();
function expensiveCalc(n) {
  if (cache.has(n)) return cache.get(n);
  const result = n * n * n; // heavy calculation
  cache.set(n, result);
  return result;
}

// Frequency counter:
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const freq = new Map();
words.forEach(word => freq.set(word, (freq.get(word) || 0) + 1));
console.log([...freq.entries()].sort((a, b) => b[1] - a[1]));

// WeakMap (garbage collection friendly):
const weakMap = new WeakMap();
let user = { name: "Karim" };
weakMap.set(user, { loginCount: 5 });
console.log(weakMap.get(user)); // { loginCount: 5 }
// user = null; // weakMap এর entry auto remove হবে!

// ============================================================
// 📌 Set — Unique values এর collection
// ============================================================
const set = new Set([1, 2, 3, 2, 1, 4, 3]); // duplicates auto remove!
console.log(set); // Set { 1, 2, 3, 4 }
console.log(set.size); // 4

set.add(5);
set.add(2); // duplicate — ignore
set.delete(1);
console.log(set.has(3)); // true

// Iterate:
for (const item of set) {
  console.log(item);
}

// Convert:
const arr = [...set];
const arr2 = Array.from(set);

// ============================================================
// 📌 Set Real World Usage
// ============================================================

// Unique filter (সবচেয়ে popular use!):
const dupArray = [1, 2, 2, 3, 3, 3, 4, 5];
const unique = [...new Set(dupArray)]; // [1, 2, 3, 4, 5]

const dupNames = ["Karim", "Rahim", "Karim", "Sadia"];
const uniqueNames = [...new Set(dupNames)];

// Set operations:
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union (মিলিয়ে):
const union = new Set([...setA, ...setB]); // {1,2,3,4,5,6}

// Intersection (common):
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3,4}

// Difference (A তে আছে, B তে নেই):
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1,2}

console.log([...union]);        // [1,2,3,4,5,6]
console.log([...intersection]); // [3,4]
console.log([...difference]);   // [1,2]

// WeakSet:
const weakSet = new WeakSet();
let obj = { name: "test" };
weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Word frequency counter: paragraph থেকে সবচেয়ে বেশি ব্যবহৃত word খুঁজো
// 2. Two arrays এর common elements বের করো (Set দিয়ে)
// 3. Map দিয়ে phone book: name → number store করো, search করো
