// ============================================================
// 📘 01 - Classes (ES6+)
// ============================================================
// Class হলো Constructor Function এর clean syntax (syntactic sugar)
// কিন্তু কাজ একই — prototype based!

class Animal {
  // Constructor: new দিয়ে object তৈরির সময় call হয়
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
    this.isAlive = true;
  }

  // Instance Methods:
  makeSound() {
    return `${this.name} says ${this.sound}!`;
  }

  eat(food) {
    return `${this.name} is eating ${food}`;
  }

  // Getter:
  get description() {
    return `${this.name} (${this.sound})`;
  }

  // Static Method (instance ছাড়াই call করা যায়):
  static create(name, sound) {
    return new Animal(name, sound);
  }

  toString() {
    return `Animal: ${this.name}`;
  }
}

// Instance তৈরি:
const cat = new Animal("Billi", "Meow");
const dog = new Animal("Rex", "Woof");

console.log(cat.makeSound());    // Billi says Meow!
console.log(dog.eat("bone"));   // Rex is eating bone
console.log(cat.description);   // Billi (Meow)

// Static method:
const bird = Animal.create("Tia", "Tweet");
console.log(bird.makeSound()); // Tia says Tweet!

// ============================================================
// 📌 Class Fields (ES2022)
// ============================================================
class BankAccount {
  // Public fields:
  owner;
  balance = 0;  // default value

  // Private fields (#):
  #pin;
  #transactionHistory = [];

  constructor(owner, initialBalance, pin) {
    this.owner = owner;
    this.balance = initialBalance;
    this.#pin = pin;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    this.#transactionHistory.push({ type: "deposit", amount, date: new Date() });
    console.log(`৳${amount} জমা হলো। Balance: ৳${this.balance}`);
  }

  withdraw(amount, pin) {
    if (pin !== this.#pin) throw new Error("Wrong PIN!");
    if (amount > this.balance) throw new Error("Insufficient balance!");
    this.balance -= amount;
    this.#transactionHistory.push({ type: "withdraw", amount, date: new Date() });
    console.log(`৳${amount} উত্তোলন হলো। Balance: ৳${this.balance}`);
  }

  getStatement() {
    return this.#transactionHistory; // private কিন্তু method দিয়ে access
  }

  // Static method:
  static validateAmount(amount) {
    return amount > 0 && Number.isFinite(amount);
  }
}

const account = new BankAccount("Karim", 10000, 1234);
account.deposit(5000);         // ৳5000 জমা হলো। Balance: ৳15000
account.withdraw(3000, 1234);  // ৳3000 উত্তোলন। Balance: ৳12000
// account.withdraw(1000, 9999); // Error: Wrong PIN!

// account.#pin // ❌ SyntaxError: private field!
console.log(BankAccount.validateAmount(500)); // true

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Student class: name, id, marks[] — addMark(), getAverage(), getGrade()
// 2. Library class: books[] — addBook(), removeBook(), search(), list()
// 3. TodoList class: todos[] — add(), complete(), remove(), listPending()
