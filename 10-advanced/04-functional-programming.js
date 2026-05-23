// ============================================================
// 📘 04 - Functional Programming
// ============================================================
// Functions কে first-class citizen হিসেবে treat করা
// Pure functions, immutability, composition

// ============================================================
// 📌 Pure Functions
// ============================================================
// Same input → Always same output
// No side effects

// Pure:
const add = (a, b) => a + b;
const double = n => n * 2;
const getFullName = (first, last) => `${first} ${last}`;

// Impure (side effects আছে):
let total = 0;
function addToTotal(n) { total += n; return total; } // external state change

// ============================================================
// 📌 Immutability
// ============================================================
// Data পরিবর্তন না করে নতুন data তৈরি করা

// ❌ Mutable:
function addItemMutable(cart, item) {
  cart.push(item); // original পরিবর্তন!
  return cart;
}

// ✅ Immutable:
function addItemImmutable(cart, item) {
  return [...cart, item]; // নতুন array return
}

// Object update:
function updateUser(user, updates) {
  return { ...user, ...updates }; // নতুন object
}

const user = { name: "Karim", age: 25 };
const updated = updateUser(user, { age: 26, email: "karim@email.com" });
console.log(user);    // unchanged!
console.log(updated); // new object

// ============================================================
// 📌 Function Composition
// ============================================================
// ছোট functions কে combine করে বড় function তৈরি

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

// Small functions:
const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const removeSpaces = str => str.replace(/\s+/g, "-");

// Compose them:
const formatUsername = pipe(trim, toLowerCase, removeSpaces);
const formatTitle = pipe(trim, capitalize);

console.log(formatUsername("  Hello World  ")); // "hello-world"
console.log(formatTitle("  hello world  "));    // "Hello world"

// ============================================================
// 📌 Currying
// ============================================================
// Multi-argument function কে single-argument chain এ convert

// Normal:
function addNormal(a, b, c) { return a + b + c; }

// Curried:
const addCurried = a => b => c => a + b + c;

console.log(addNormal(1, 2, 3));       // 6
console.log(addCurried(1)(2)(3));      // 6
console.log(addCurried(1)(2));         // Function (partial application!)

// Auto curry utility:
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

const curriedAdd = curry((a, b, c) => a + b + c);
const add5 = curriedAdd(5);     // partial
const add5and3 = add5(3);       // more partial
console.log(add5and3(2));       // 10

// Real world currying:
const multiply = curry((factor, number) => factor * number);
const double2 = multiply(2);
const triple = multiply(3);

console.log([1, 2, 3, 4, 5].map(double2)); // [2, 4, 6, 8, 10]
console.log([1, 2, 3, 4, 5].map(triple));  // [3, 6, 9, 12, 15]

// ============================================================
// 📌 Functor, Maybe Monad (Avoiding null checks)
// ============================================================
class Maybe {
  constructor(value) { this._value = value; }

  static of(value) { return new Maybe(value); }

  isNothing() { return this._value === null || this._value === undefined; }

  map(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value));
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this._value;
  }
}

// Safely navigate deep object:
const user2 = { profile: { address: { city: "Dhaka" } } };

const city = Maybe.of(user2)
  .map(u => u.profile)
  .map(p => p.address)
  .map(a => a.city)
  .getOrElse("Unknown");

console.log(city); // "Dhaka"

const nullUser = null;
const city2 = Maybe.of(nullUser)
  .map(u => u.profile) // null check auto!
  .map(p => p.city)
  .getOrElse("Unknown");

console.log(city2); // "Unknown" (no error!)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. pipe দিয়ে data processing pipeline তৈরি করো
// 2. curry দিয়ে discount calculator তৈরি করো
// 3. Immutable update: nested object এর deep field update করো
