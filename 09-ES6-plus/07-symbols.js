// ============================================================
// 📘 07 - Symbols & Well-known Symbols
// ============================================================
// Symbol: Unique, immutable primitive value
// Use: Object এ private-like keys, special behaviors define করা

// ============================================================
// 📌 Basic Symbol
// ============================================================
const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log(sym1 === sym2); // false — সবসময় unique!
console.log(sym1.toString()); // "Symbol(description)"
console.log(sym1.description); // "description"

// Object key হিসেবে:
const ID = Symbol("id");
const SECRET = Symbol("secret");

const user = {
  name: "Karim",
  [ID]: 12345,        // Symbol key
  [SECRET]: "abc123"  // Symbol key
};

console.log(user.name);     // "Karim"
console.log(user[ID]);      // 12345
console.log(user[SECRET]);  // "abc123"

// Symbol keys JSON এ আসে না, Object.keys() তে আসে না:
console.log(Object.keys(user));          // ["name"] — symbols বাদ!
console.log(JSON.stringify(user));        // {"name":"Karim"} — symbols বাদ!
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(secret)]

// ============================================================
// 📌 Symbol.for() — Global Registry
// ============================================================
const globalSym1 = Symbol.for("shared");
const globalSym2 = Symbol.for("shared");
console.log(globalSym1 === globalSym2); // true — একই global symbol!

// ============================================================
// 📌 Well-known Symbols (JavaScript Internal Hooks)
// ============================================================

// Symbol.iterator — custom iteration define করা:
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

const range = new NumberRange(1, 5);
console.log([...range]);      // [1, 2, 3, 4, 5]
for (const n of range) {
  process.stdout.write(n + " ");
}
console.log(); // 1 2 3 4 5

// Symbol.toPrimitive — type conversion control:
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.celsius;
    if (hint === "string") return `${this.celsius}°C`;
    return this.celsius; // default
  }
}

const temp = new Temperature(37.5);
console.log(+temp);         // 37.5 (number hint)
console.log(`${temp}`);     // "37.5°C" (string hint)
console.log(temp + 10);     // 47.5 (number hint)

// Symbol.hasInstance — instanceof behavior:
class EvenNumber {
  static [Symbol.hasInstance](num) {
    return typeof num === "number" && num % 2 === 0;
  }
}

console.log(4 instanceof EvenNumber);  // true
console.log(5 instanceof EvenNumber);  // false

// Symbol.toStringTag — Object.prototype.toString tag:
class CustomCollection {
  get [Symbol.toStringTag]() {
    return "CustomCollection";
  }
}

const col = new CustomCollection();
console.log(Object.prototype.toString.call(col)); // "[object CustomCollection]"

// ============================================================
// 📌 Real World: Private API Keys
// ============================================================
const _version = Symbol("version");
const _validate = Symbol("validate");

class ApiClient {
  [_version] = "2.0";

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  [_validate]() {
    if (!this.apiKey || this.apiKey.length < 10) {
      throw new Error("Invalid API key");
    }
  }

  request(endpoint) {
    this[_validate]();
    return fetch(`https://api.example.com${endpoint}`, {
      headers: { "Authorization": `Bearer ${this.apiKey}` }
    });
  }

  get version() {
    return this[_version];
  }
}

const client = new ApiClient("my-secret-api-key-12345");
console.log(client.version); // "2.0"
// client[_validate]() — বাইরে থেকে access করতে Symbol লাগবে!

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Custom iterable class তৈরি করো (Fibonacci sequence)
// 2. Symbol.toPrimitive দিয়ে Money class বানাও (৳100 + ৳50 = ৳150)
// 3. Symbol key দিয়ে object এ "hidden" metadata store করো
