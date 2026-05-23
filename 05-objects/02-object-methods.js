// ============================================================
// 📘 02 - Object Methods & this keyword
// ============================================================

const calculator = {
  result: 0,

  add(n) {
    this.result += n;
    return this; // Method chaining এর জন্য!
  },

  subtract(n) {
    this.result -= n;
    return this;
  },

  multiply(n) {
    this.result *= n;
    return this;
  },

  reset() {
    this.result = 0;
    return this;
  },

  getValue() {
    return this.result;
  }
};

// Method Chaining:
const answer = calculator.add(10).multiply(3).subtract(5).getValue();
console.log(answer); // (0+10)*3-5 = 25

// ============================================================
// 📌 Object.create() — Prototype based object
// ============================================================
const animal = {
  makeSound() {
    return `${this.name} says ${this.sound}`;
  }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.sound = "Woof";
console.log(dog.makeSound()); // "Rex says Woof"

// ============================================================
// 📌 Getters & Setters
// ============================================================
const temperature = {
  _celsius: 0, // convention: _ মানে private

  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  },

  set fahrenheit(f) {
    this._celsius = (f - 32) * 5/9;
  },

  get celsius() {
    return this._celsius;
  },

  set celsius(c) {
    if (c < -273.15) throw new Error("Absolute zero এর নিচে যাওয়া সম্ভব নয়!");
    this._celsius = c;
  }
};

temperature.celsius = 100;
console.log(temperature.fahrenheit); // 212
temperature.fahrenheit = 32;
console.log(temperature.celsius);    // 0

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Stack data structure object বানাও (push, pop, peek, isEmpty)
// 2. Shopping cart object: addItem, removeItem, getTotal, clearCart
