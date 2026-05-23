// ============================================================
// 📘 05 - Prototypes & Prototype Chain
// ============================================================
// JavaScript এ প্রতিটি object এর একটা hidden property আছে: [[Prototype]]
// এই chain দিয়েই JavaScript inheritance কাজ করে!

// ============================================================
// 📌 Prototype Chain
// ============================================================
const obj = { x: 1 };

// obj এর prototype:
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// Object.prototype এর methods সব object এ available:
console.log(obj.toString());       // "[object Object]"
console.log(obj.hasOwnProperty("x")); // true

// Array prototype:
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
// তাই arr.map(), arr.filter() etc. কাজ করে!

// ============================================================
// 📌 Constructor Function (Class এর আগের পদ্ধতি)
// ============================================================
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Prototype এ method যোগ করা:
Person.prototype.greet = function() {
  return `Hello, I am ${this.name}`;
};

Person.prototype.isAdult = function() {
  return this.age >= 18;
};

const p1 = new Person("Karim", 25);
const p2 = new Person("Mitu", 15);

console.log(p1.greet());    // Hello, I am Karim
console.log(p2.isAdult());  // false

// ✅ method গুলো shared — memory efficient!
console.log(p1.greet === p2.greet); // true

// ============================================================
// 📌 Prototype Inheritance
// ============================================================
function Animal(name) {
  this.name = name;
}
Animal.prototype.makeSound = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Parent constructor call
  this.breed = breed;
}

// Dog এর prototype কে Animal এর prototype থেকে extend করা:
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} says Woof!`;
};

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.makeSound()); // Rex makes a sound (inherited!)
console.log(rex.bark());      // Rex says Woof!
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true

// ============================================================
// 📌 আধুনিক পদ্ধতি: class (পরের folder এ বিস্তারিত)
// ============================================================
// class শুধু constructor function এর সুন্দর syntax!

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Vehicle constructor function তৈরি করো (brand, year, speed)
//    prototype এ accelerate(), brake() method যোগ করো
// 2. prototype chain verify করো: obj.__proto__ এর মাধ্যমে
