// ============================================================
// 📘 07 - Memory Management & Performance
// ============================================================

// ============================================================
// 📌 Memory Leaks — কীভাবে হয়?
// ============================================================

// 1. Global variables:
// function leak() {
//   leakedVar = "I am global!"; // var/let/const নেই — global হয়ে গেছে!
// }

// 2. Event listeners না সরানো:
function badPattern() {
  const button = document.querySelector("#btn");
  const heavyData = new Array(100000).fill("data");

  button?.addEventListener("click", () => {
    console.log(heavyData[0]); // heavyData এর reference ধরে রাখছে!
  });
  // button remove হলেও listener আর heavyData মেমরিতে থাকবে!
}

// Fix:
function goodPattern() {
  const button = document.querySelector("#btn");
  const heavyData = new Array(100000).fill("data");

  function handleClick() {
    console.log(heavyData[0]);
  }

  button?.addEventListener("click", handleClick);

  // Cleanup:
  return () => {
    button?.removeEventListener("click", handleClick);
  };
}

const cleanup = goodPattern();
// Component unmount এ:
// cleanup();

// 3. Timer না সরানো:
function badTimer() {
  const data = loadHeavyData();
  setInterval(() => {
    process(data); // data কে ধরে রাখছে!
  }, 1000);
  // clearInterval() কখনো call হয় না!
}

function goodTimer() {
  const data = loadHeavyData();
  const id = setInterval(() => {
    if (!data.isNeeded) {
      clearInterval(id); // যখন দরকার নেই তখন clear করো
      return;
    }
    process(data);
  }, 1000);

  return () => clearInterval(id);
}

function loadHeavyData() { return { isNeeded: true }; }
function process(data) {}

// 4. Detached DOM nodes:
function badDOM() {
  const div = document.createElement("div");
  document.body.append(div);
  document.body.removeChild(div); // DOM থেকে সরানো হলো
  // কিন্তু div এর reference এখনো আছে!
  return div; // ⚠️ detached node — leak!
}

// ============================================================
// 📌 WeakRef & FinalizationRegistry
// ============================================================
let obj = { data: "important data" };
const weakRef = new WeakRef(obj);

// Check if still alive:
const deref = weakRef.deref();
if (deref) {
  console.log(deref.data); // "important data"
}

// GC হলে notify:
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`${heldValue} has been garbage collected!`);
});

let tracked = { name: "tracked object" };
registry.register(tracked, "tracked-item");
// tracked = null; // এখন GC পারবে collect করতে

// ============================================================
// 📌 Performance Tips
// ============================================================

// 1. DOM manipulation batch করো:
function batchDOMUpdates(items) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const el = document.createElement("div");
    el.textContent = item;
    fragment.append(el); // DOM touch নেই এখন
  });
  document.querySelector("#container")?.append(fragment); // একবারে!
}

// 2. Debounce (অনেকবার call হওয়া রোধ করে):
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchDebounced = debounce((query) => {
  console.log("Searching:", query); // 300ms পরে একবারই চলবে
}, 300);

// 3. Throttle (rate limit করে):
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

const onScrollThrottled = throttle(() => {
  console.log("Scroll handled"); // প্রতি 100ms এ একবার
}, 100);

window.addEventListener("scroll", onScrollThrottled);

// 4. Memoize:
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return expensiveFib(n - 1) + expensiveFib(n - 2);
});

console.time("fib(40)");
console.log(expensiveFib(40));
console.timeEnd("fib(40)"); // খুব দ্রুত!

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Debounce দিয়ে search input optimize করো
// 2. Throttle দিয়ে scroll event optimize করো
// 3. Event listener cleanup pattern implement করো
