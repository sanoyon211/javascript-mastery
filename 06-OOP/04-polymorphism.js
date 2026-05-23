// ============================================================
// 📘 04 - Polymorphism
// ============================================================
// Same interface, different behavior
// একই method নাম, কিন্তু আলাদা class এ আলাদা কাজ করে

// ============================================================
// 📌 Method Overriding (Runtime Polymorphism)
// ============================================================
class Shape {
  constructor(color = "white") {
    this.color = color;
  }

  area() {
    return 0; // Base class — override করতে হবে
  }

  perimeter() {
    return 0;
  }

  describe() {
    return `${this.constructor.name}: Area = ${this.area().toFixed(2)}, Perimeter = ${this.perimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2; // override!
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color);
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height; // override!
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(a, b, c, color) {
    super(color);
    this.a = a;
    this.b = b;
    this.c = c;
  }

  perimeter() {
    return this.a + this.b + this.c;
  }

  area() {
    const s = this.perimeter() / 2; // Heron's formula
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }
}

// ============================================================
// 📌 Polymorphism in action:
// ============================================================
const shapes = [
  new Circle(5, "red"),
  new Rectangle(4, 6, "blue"),
  new Triangle(3, 4, 5, "green"),
  new Circle(3, "yellow"),
];

// একই method call, আলাদা behavior!
shapes.forEach(shape => {
  console.log(shape.describe()); // describe() প্রতিটির নিজস্ব area/perimeter call করে
});

// Total area:
const totalArea = shapes.reduce((sum, shape) => sum + shape.area(), 0);
console.log(`Total area: ${totalArea.toFixed(2)}`);

// ============================================================
// 📌 Duck Typing (JavaScript Style Polymorphism)
// ============================================================
// "If it walks like a duck and quacks like a duck, it's a duck"
// Type check না করে — behavior check করা

class FileLogger {
  log(message) {
    console.log(`[FILE] ${new Date().toISOString()}: ${message}`);
  }
}

class ConsoleLogger {
  log(message) {
    console.log(`[CONSOLE]: ${message}`);
  }
}

class DatabaseLogger {
  log(message) {
    console.log(`[DB INSERT]: "${message}"`);
  }
}

// একই interface (log method) — আলাদা implementation:
function logAll(loggers, message) {
  loggers.forEach(logger => logger.log(message)); // type check করছি না!
}

const loggers = [new FileLogger(), new ConsoleLogger(), new DatabaseLogger()];
logAll(loggers, "User logged in");

// ============================================================
// 📌 Payment System (Real World Polymorphism)
// ============================================================
class PaymentMethod {
  constructor(name) {
    this.name = name;
  }

  pay(amount) {
    throw new Error(`${this.name} must implement pay() method`);
  }

  refund(amount) {
    throw new Error(`${this.name} must implement refund() method`);
  }
}

class CreditCard extends PaymentMethod {
  constructor(cardNumber) {
    super("Credit Card");
    this.cardNumber = cardNumber;
  }

  pay(amount) {
    return `✅ Credit Card (****${this.cardNumber.slice(-4)}): ৳${amount} charged`;
  }

  refund(amount) {
    return `💰 Refund ৳${amount} to Credit Card`;
  }
}

class BkashPayment extends PaymentMethod {
  constructor(phone) {
    super("bKash");
    this.phone = phone;
  }

  pay(amount) {
    return `✅ bKash (${this.phone}): ৳${amount} deducted`;
  }

  refund(amount) {
    return `💰 Refund ৳${amount} to bKash ${this.phone}`;
  }
}

class NagadPayment extends PaymentMethod {
  constructor(phone) {
    super("Nagad");
    this.phone = phone;
  }

  pay(amount) {
    return `✅ Nagad (${this.phone}): ৳${amount} deducted`;
  }

  refund(amount) {
    return `💰 Refund ৳${amount} to Nagad ${this.phone}`;
  }
}

// Checkout process — payment method নিয়ে চিন্তা নেই!
function checkout(cart, paymentMethod) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Order total: ৳${total}`);
  console.log(paymentMethod.pay(total)); // polymorphic call!
}

const cart = [{ name: "Laptop", price: 75000 }, { name: "Mouse", price: 1500 }];

checkout(cart, new CreditCard("1234567890123456"));
checkout(cart, new BkashPayment("01712345678"));
checkout(cart, new NagadPayment("01812345678"));

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Notification system: EmailNotification, SMSNotification, PushNotification
//    সবার send(message) method আছে
// 2. Compression: ZipCompressor, GzipCompressor, RarCompressor
//    সবার compress(data) এবং decompress(data) method
