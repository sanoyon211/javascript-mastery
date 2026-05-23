// ============================================================
// 📘 01 - Object Basics
// ============================================================

// ============================================================
// 📌 Object তৈরি করা
// ============================================================
const person = {
  name: "Karim Uddin",      // string property
  age: 25,                   // number property
  isStudent: false,          // boolean property
  hobbies: ["coding", "reading"], // array property
  address: {                 // nested object
    city: "Dhaka",
    district: "Dhaka",
    country: "Bangladesh"
  },
  greet() {                  // method (shorthand)
    return `Hello, I am ${this.name}`;
  }
};

// ============================================================
// 📌 Access Properties
// ============================================================
// Dot notation (সবচেয়ে common):
console.log(person.name);          // "Karim Uddin"
console.log(person.address.city);  // "Dhaka"

// Bracket notation (dynamic key এর জন্য):
console.log(person["name"]);       // "Karim Uddin"
const key = "age";
console.log(person[key]);          // 25

// Method call:
console.log(person.greet());       // "Hello, I am Karim Uddin"

// ============================================================
// 📌 Add, Update, Delete Properties
// ============================================================
const car = { brand: "Toyota", year: 2020 };

// Add:
car.color = "White";
car["mileage"] = 50000;

// Update:
car.year = 2023;

// Delete:
delete car.mileage;

console.log(car); // { brand: "Toyota", year: 2023, color: "White" }

// ============================================================
// 📌 Optional Chaining with Objects
// ============================================================
const user = { profile: { name: "Rahim" } };

console.log(user.profile?.name);     // "Rahim"
console.log(user.address?.city);     // undefined (error নয়!)
console.log(user.profile?.phone?.number); // undefined

// ============================================================
// 📌 Computed Property Names
// ============================================================
const field = "name";
const obj = {
  [field]: "Karim",     // computed: "name": "Karim"
  [`get${field}`]: function() { return this.name; }
};
console.log(obj.name);    // "Karim"
console.log(obj.getname()); // "Karim"

// ============================================================
// 📌 Property Shorthand
// ============================================================
const name = "Sadia";
const age = 22;

// পুরনো পদ্ধতি:
const user1 = { name: name, age: age };

// Shorthand (variable নাম = property নাম হলে):
const user2 = { name, age };

console.log(user2); // { name: "Sadia", age: 22 }

// ============================================================
// 📌 Object.keys(), values(), entries()
// ============================================================
const product = { name: "Laptop", price: 75000, brand: "Dell" };

console.log(Object.keys(product));
// ["name", "price", "brand"]

console.log(Object.values(product));
// ["Laptop", 75000, "Dell"]

console.log(Object.entries(product));
// [["name", "Laptop"], ["price", 75000], ["brand", "Dell"]]

// entries দিয়ে iterate:
for (const [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}

// ============================================================
// 📌 Object.assign() & Spread
// ============================================================
const defaults = { theme: "light", language: "bn", fontSize: 16 };
const userPrefs = { theme: "dark", fontSize: 18 };

const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", language: "bn", fontSize: 18 }

// ============================================================
// 📌 Object.freeze() & Object.seal()
// ============================================================
const config = Object.freeze({ apiUrl: "https://api.example.com", timeout: 5000 });
config.timeout = 10000; // এটা কাজ করবে না (silent fail)
console.log(config.timeout); // 5000 (পরিবর্তন হয়নি)

// ============================================================
// 📌 Checking Properties
// ============================================================
const obj2 = { x: 1, y: 2 };
console.log("x" in obj2);              // true
console.log("z" in obj2);              // false
console.log(obj2.hasOwnProperty("x")); // true

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Student object বানাও (name, age, marks, grade, address)
// 2. Object এর সব properties iterate করে print করো
// 3. দুটো object merge করো (conflict এ দ্বিতীয়টার value রাখো)
