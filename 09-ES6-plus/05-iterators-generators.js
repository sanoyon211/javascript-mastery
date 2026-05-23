// ============================================================
// 📘 05 - Iterators & Generators
// ============================================================

// ============================================================
// 📌 Iterator Protocol
// ============================================================
// Iterator: একটা object যার next() method আছে
// next() returns: { value, done }

function createRange(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() { return this; } // iterable করার জন্য
  };
}

const range = createRange(1, 5);
console.log(range.next()); // { value: 1, done: false }
console.log(range.next()); // { value: 2, done: false }

const range2 = createRange(1, 5);
for (const n of range2) {  // iterable তাই for...of কাজ করে
  process.stdout.write(n + " ");
}
console.log(); // 1 2 3 4 5

// ============================================================
// 📌 Generators (function*)
// ============================================================
// Generator function: pause এবং resume করা যায়!
// yield: value দেয় এবং pause করে

function* simpleGenerator() {
  console.log("Start");
  yield 1;           // pause, return 1
  console.log("After 1");
  yield 2;           // pause, return 2
  console.log("After 2");
  yield 3;           // pause, return 3
  console.log("Done");
}

const gen = simpleGenerator();
console.log(gen.next()); // "Start" → {value: 1, done: false}
console.log(gen.next()); // "After 1" → {value: 2, done: false}
console.log(gen.next()); // "After 2" → {value: 3, done: false}
console.log(gen.next()); // "Done" → {value: undefined, done: true}

// for...of দিয়ে:
for (const val of simpleGenerator()) {
  console.log(val); // 1, 2, 3
}

// ============================================================
// 📌 Infinite Generator
// ============================================================
function* counter(start = 0) {
  while (true) {
    yield start++;
  }
}

function* range3(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

const count = counter(1);
console.log(count.next().value); // 1
console.log(count.next().value); // 2
console.log(count.next().value); // 3

for (const n of range3(0, 10, 2)) {
  process.stdout.write(n + " ");
}
console.log(); // 0 2 4 6 8 10

// ============================================================
// 📌 Generator with yield*
// ============================================================
function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable; // delegate to another iterable
  }
}

console.log([...concat([1, 2], [3, 4], [5])]); // [1, 2, 3, 4, 5]

// ============================================================
// 📌 Async Generator (Infinite scroll, streaming)
// ============================================================
async function* fetchPages(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`${baseUrl}?page=${page}&limit=10`);
    const data = await response.json();
    yield data; // এক page এর data দাও
  }
}

async function processAllPages() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  // for await...of দিয়ে async generator iterate
  // for await (const page of fetchPages(url, 3)) {
  //   console.log(`Page received: ${page.length} items`);
  //   page.forEach(post => console.log(" -", post.title));
  // }
  console.log("Async generator ready");
}

processAllPages();

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Fibonacci generator: অসীম Fibonacci sequence generate করো
// 2. Tree traversal generator: DOM tree এর সব nodes yield করো
// 3. Throttle generator: প্রতি n items এ pause করো
