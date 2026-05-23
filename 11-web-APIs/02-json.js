// ============================================================
// 📘 02 - JSON (JavaScript Object Notation)
// ============================================================
// Data exchange format — Server ↔ Client communication
// Text based, language independent

// ============================================================
// 📌 JSON.stringify() — JS → JSON string
// ============================================================
const user = {
  name: "Karim",
  age: 25,
  hobbies: ["coding", "reading"],
  address: { city: "Dhaka", zip: "1200" },
  isActive: true,
  score: null,
  // এগুলো JSON এ থাকে না:
  greet: function() { return "hello"; }, // undefined হয়ে যায়
  symbol: Symbol("id"),                   // undefined হয়ে যায়
  undef: undefined                        // বাদ যায়
};

// Basic:
const json = JSON.stringify(user);
console.log(json);
// {"name":"Karim","age":25,"hobbies":["coding","reading"],...}

// Formatted (readable):
const pretty = JSON.stringify(user, null, 2); // 2 space indent
console.log(pretty);

// Replacer (কোন fields রাখবো):
const filtered = JSON.stringify(user, ["name", "age", "city"]);
console.log(filtered); // শুধু name, age

// Replacer function:
const censored = JSON.stringify(user, (key, value) => {
  if (key === "password" || key === "pin") return undefined; // hide
  return value;
});

// toJSON() — custom serialization:
class Product {
  constructor(name, price, cost) {
    this.name = name;
    this.price = price;
    this.cost = cost; // internal, hide করতে চাই
  }

  toJSON() {
    return { name: this.name, price: this.price }; // cost বাদ
  }
}
const product = new Product("Laptop", 75000, 50000);
console.log(JSON.stringify(product)); // {"name":"Laptop","price":75000}

// ============================================================
// 📌 JSON.parse() — JSON string → JS object
// ============================================================
const jsonStr = '{"name":"Karim","age":25,"active":true}';

const parsed = JSON.parse(jsonStr);
console.log(parsed.name); // "Karim"
console.log(typeof parsed.age); // "number"

// Reviver function:
const dateJson = '{"name":"Karim","birthDate":"1998-01-15"}';
const withDate = JSON.parse(dateJson, (key, value) => {
  if (key === "birthDate") return new Date(value); // string → Date!
  return value;
});
console.log(withDate.birthDate instanceof Date); // true

// ============================================================
// 📌 Error Handling
// ============================================================
function safeParse(json, defaultValue = null) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn("Invalid JSON:", e.message);
    return defaultValue;
  }
}

console.log(safeParse('{"name":"Karim"}')); // {name: "Karim"}
console.log(safeParse("invalid json", {})); // {} (default)

// ============================================================
// 📌 Deep Clone with JSON (simple cases)
// ============================================================
const original = { a: 1, b: { c: 2 }, d: [3, 4, 5] };

// Simple deep clone:
const clone = JSON.parse(JSON.stringify(original));
clone.b.c = 99;
console.log(original.b.c); // 2 (unchanged!)
console.log(clone.b.c);    // 99

// ⚠️ Limitations: Date, Function, undefined, Symbol হারিয়ে যায়!
// Deep clone এর জন্য structuredClone() ব্যবহার করো (modern):
const betterClone = structuredClone(original); // handles Date, etc.

// ============================================================
// 📌 API Response Handle করা
// ============================================================
async function fetchAndProcess() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json(); // JSON.parse automatically!
    console.log(data);

    // API এ পাঠানো:
    const body = JSON.stringify({ title: "New Todo", completed: false });
    const postResponse = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body // string হিসেবে পাঠাই
    });
    const created = await postResponse.json();
    console.log(created);
  } catch (e) {
    console.error(e);
  }
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. User object কে JSON এ convert করো, password field hide করো
// 2. JSON string থেকে date field গুলো Date object এ convert করো
// 3. Deep clone করো এবং nested object modify করে verify করো
