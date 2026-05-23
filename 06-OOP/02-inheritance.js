// ============================================================
// 📘 02 - Inheritance (extends & super)
// ============================================================

class Vehicle {
  constructor(brand, year, fuelType) {
    this.brand = brand;
    this.year = year;
    this.fuelType = fuelType;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    console.log(`${this.brand}: Speed = ${this.speed} km/h`);
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    console.log(`${this.brand}: Speed = ${this.speed} km/h`);
  }

  get info() {
    return `${this.year} ${this.brand} (${this.fuelType})`;
  }

  toString() {
    return this.info;
  }
}

// ============================================================
// 📌 extends — Inheritance
// ============================================================
class Car extends Vehicle {
  constructor(brand, year, fuelType, doors) {
    super(brand, year, fuelType); // Parent constructor call — অবশ্যই প্রথমে!
    this.doors = doors;
    this.type = "Car";
  }

  honk() {
    return `${this.brand}: Beep beep! 🚗`;
  }

  // Override parent method:
  get info() {
    return `${super.info} — ${this.doors} doors`; // super দিয়ে parent method
  }
}

class ElectricCar extends Car {
  #batteryLevel = 100;

  constructor(brand, year, batteryCapacity) {
    super(brand, year, "Electric", 4);
    this.batteryCapacity = batteryCapacity;
    this.type = "Electric Car";
  }

  charge(amount) {
    this.#batteryLevel = Math.min(100, this.#batteryLevel + amount);
    console.log(`Charging... Battery: ${this.#batteryLevel}%`);
  }

  get batteryStatus() {
    return `${this.#batteryLevel}%`;
  }

  // Override:
  accelerate(amount) {
    this.#batteryLevel -= amount * 0.5; // battery খরচ
    super.accelerate(amount);           // parent method call
    console.log(`Battery: ${this.batteryStatus}`);
  }
}

// ============================================================
// 📌 Usage
// ============================================================
const toyota = new Car("Toyota", 2022, "Petrol", 4);
const tesla = new ElectricCar("Tesla", 2023, 100);

console.log(toyota.info);     // 2022 Toyota (Petrol) — 4 doors
console.log(toyota.honk());   // Toyota: Beep beep! 🚗
toyota.accelerate(60);        // Toyota: Speed = 60 km/h

console.log(tesla.info);      // 2023 Tesla (Electric) — 4 doors
tesla.accelerate(80);
tesla.charge(20);
console.log(tesla.batteryStatus);

// instanceof check:
console.log(tesla instanceof ElectricCar); // true
console.log(tesla instanceof Car);         // true
console.log(tesla instanceof Vehicle);     // true

// ============================================================
// 📌 Mixin Pattern (Multiple Inheritance এর বিকল্প)
// ============================================================
// JavaScript এ একটাই parent class! Mixin দিয়ে multiple traits যোগ করা:

const Serializable = (Base) => class extends Base {
  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  touch() {
    this.updatedAt = new Date();
  }
};

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class EnhancedUser extends Timestamped(Serializable(User)) {}

const user = new EnhancedUser("Karim", "karim@email.com");
console.log(user.serialize()); // JSON string
console.log(user.createdAt);   // Date object

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Shape (area, perimeter) → Circle, Rectangle, Triangle
// 2. Person → Employee → Manager (সব level এ unique methods)
// 3. Animal → Dog (bark), Cat (meow), Bird (fly)
