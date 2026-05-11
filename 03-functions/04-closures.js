// ============================================================
// 📘 04 - Closures (JavaScript এর সবচেয়ে গুরুত্বপূর্ণ concept!)
// ============================================================
// Closure: একটা function যে তার outer scope এর variables কে
// "মনে রাখে" — এমনকি outer function শেষ হয়ে যাওয়ার পরেও!
// ============================================================

// ============================================================
// 📌 Basic Closure
// ============================================================
function outer() {
  const message = "আমি outer function এর variable"; // outer এর variable

  function inner() {
    console.log(message); // inner, outer এর variable access করতে পারছে!
  }

  return inner; // function টাকে return করছি
}

const myFunction = outer(); // outer() call করা হলো, কিন্তু শেষ!
myFunction(); // তারপরও message access হচ্ছে! এটাই Closure!

// ============================================================
// 📌 Counter Example — Closure এর সবচেয়ে classic উদাহরণ
// ============================================================
function makeCounter() {
  let count = 0; // এই variable টা "enclosed" হয়ে গেছে

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount()  { return count; }
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter(); // আলাদা counter, আলাদা count!

counter1.increment();
counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.getCount()); // 3
console.log(counter2.getCount()); // 1 (আলাদা!)

// ============================================================
// 📌 Data Privacy (Private Variables)
// ============================================================
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private! বাইরে থেকে সরাসরি access নেই

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`৳${amount} জমা হলো। Balance: ৳${balance}`);
      }
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("অপর্যাপ্ত ব্যালেন্স!");
      } else {
        balance -= amount;
        console.log(`৳${amount} উত্তোলন হলো। Balance: ৳${balance}`);
      }
    },
    getBalance() {
      return balance; // শুধু এই method দিয়েই balance দেখা যাবে
    }
  };
}

const account = createBankAccount(10000);
account.deposit(5000);    // ৳5000 জমা হলো। Balance: ৳15000
account.withdraw(3000);   // ৳3000 উত্তোলন হলো। Balance: ৳12000
account.withdraw(20000);  // অপর্যাপ্ত ব্যালেন্স!
console.log(account.getBalance()); // 12000
// console.log(balance); // ❌ Error! balance private

// ============================================================
// 📌 Memoization (Caching) — Performance optimization
// ============================================================
function memoize(fn) {
  const cache = {}; // closure এ store হচ্ছে

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log("Cache থেকে পাওয়া গেছে!");
      return cache[key];
    }

    console.log("নতুন calculation করা হচ্ছে...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function slowSquare(n) {
  // মনে করো এটা অনেক ধীর calculation
  return n * n;
}

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5));  // নতুন calculation করা হচ্ছে... 25
console.log(fastSquare(5));  // Cache থেকে পাওয়া গেছে! 25
console.log(fastSquare(10)); // নতুন calculation করা হচ্ছে... 100

// ============================================================
// 📌 Partial Application
// ============================================================
function multiply(a, b) {
  return a * b;
}

function makeMultiplier(factor) {
  return (number) => number * factor; // closure!
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const times10 = makeMultiplier(10);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(times10(5)); // 50

// VAT calculator:
const withVAT = makeMultiplier(1.15); // 15% VAT
const withServiceCharge = makeMultiplier(1.10); // 10% service

console.log(`VAT সহ: ৳${withVAT(1000)}`);         // ৳1150
console.log(`Service সহ: ৳${withServiceCharge(1000)}`); // ৳1100

// ============================================================
// ⚠️ Common Closure Mistake (Loop এ)
// ============================================================
// Bug:
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("var i:", i); // সবগুলো 3 print করবে! (bug)
  }, 100 * i);
}

// Fix 1: let ব্যবহার করো (সবচেয়ে সহজ):
for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("let j:", j); // 0, 1, 2 (সঠিক)
  }, 100 * j);
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. makeAdder(x) function লেখো যা একটা function return করে
//    সেই function y নিয়ে x+y return করবে
//    const add5 = makeAdder(5); add5(3) → 8
// 2. একটা private counter বানাও যেখানে max limit আছে
// 3. Timer function: start() থেকে শুরু হবে, getTime() এ সময় দেখাবে
