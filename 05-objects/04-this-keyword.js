// ============================================================
// 📘 04 - this keyword
// ============================================================
// 'this' কে point করে সেটা নির্ভর করে কীভাবে function call হচ্ছে তার উপর

// ============================================================
// 📌 Global context
// ============================================================
// Browser: this = window
// Node.js: this = module.exports (empty object)
console.log(this); // {} in Node.js

// ============================================================
// 📌 Object method এ this
// ============================================================
const person = {
  name: "Karim",
  greet() {
    return `Hello, I am ${this.name}`; // this = person object
  }
};
console.log(person.greet()); // Hello, I am Karim

// ⚠️ Method extract করলে this হারিয়ে যায়!
const greetFn = person.greet;
// console.log(greetFn()); // Error or undefined name!

// Fix: bind() দিয়ে:
const boundGreet = person.greet.bind(person);
console.log(boundGreet()); // Hello, I am Karim

// ============================================================
// 📌 call() এবং apply()
// ============================================================
function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}

const user1 = { name: "Rahim" };
const user2 = { name: "Sadia" };

console.log(introduce.call(user1, "Hello", "!"));    // Hello, I am Rahim!
console.log(introduce.call(user2, "Hi", "..."));     // Hi, I am Sadia...

// apply: arguments array হিসেবে দেয়:
console.log(introduce.apply(user1, ["Hey", "?"]));   // Hey, I am Rahim?

// ============================================================
// 📌 bind() — নতুন function তৈরি করে fixed this সহ
// ============================================================
const greetRahim = introduce.bind(user1, "Howdy");
console.log(greetRahim("!!")); // Howdy, I am Rahim!!

// ============================================================
// 📌 Arrow Function এ this
// ============================================================
const team = {
  name: "Dev Team",
  members: ["Karim", "Rahim", "Sadia"],

  // ❌ Arrow function: this = outer scope (not team!)
  listMembersWrong: () => {
    return `${this?.name}: ${team.members.join(", ")}`;
  },

  // ✅ Regular function: this = team
  listMembersRight() {
    return `${this.name}: ${this.members.join(", ")}`;
  },

  // ✅ Arrow inside regular: this lexically inherited
  listWithArrow() {
    return this.members.map(m => `${this.name} - ${m}`); // Arrow: this = team
  }
};

console.log(team.listMembersRight()); // Dev Team: Karim, Rahim, Sadia
console.log(team.listWithArrow());    // ["Dev Team - Karim", ...]

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. call() দিয়ে একটা function এর this পরিবর্তন করো
// 2. bind() দিয়ে partial application তৈরি করো
