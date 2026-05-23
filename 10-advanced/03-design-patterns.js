// ============================================================
// 📘 03 - Design Patterns
// ============================================================
// সমস্যা সমাধানের proven templates/blueprints

// ============================================================
// 📌 1. Singleton Pattern
// ============================================================
// একটাই instance সবসময়

class Database {
  static #instance = null;
  #connection = null;

  constructor(url) {
    if (Database.#instance) {
      return Database.#instance; // আগের instance return করো
    }
    this.url = url;
    this.#connection = `Connected to ${url}`;
    Database.#instance = this;
  }

  query(sql) {
    return `Running: ${sql} on ${this.url}`;
  }

  static getInstance(url) {
    if (!Database.#instance) {
      new Database(url);
    }
    return Database.#instance;
  }
}

const db1 = new Database("mongodb://localhost/mydb");
const db2 = new Database("mongodb://other/db");
console.log(db1 === db2); // true — same instance!
console.log(db2.url);     // "mongodb://localhost/mydb" (প্রথমটাই)

// ============================================================
// 📌 2. Observer Pattern (Event System)
// ============================================================
// Subject → অনেক Observers কে notify করে

class EventEmitter {
  #events = {};

  on(event, listener) {
    if (!this.#events[event]) this.#events[event] = [];
    this.#events[event].push(listener);
    return () => this.off(event, listener); // unsubscribe function return!
  }

  off(event, listener) {
    this.#events[event] = this.#events[event]?.filter(l => l !== listener) || [];
  }

  emit(event, ...args) {
    this.#events[event]?.forEach(listener => listener(...args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();

const unsubscribe = emitter.on("userLoggedIn", (user) => {
  console.log(`Welcome, ${user.name}!`);
});

emitter.on("userLoggedIn", (user) => {
  console.log(`Sending welcome email to ${user.email}`);
});

emitter.once("appStarted", () => {
  console.log("App started! (only once)");
});

emitter.emit("userLoggedIn", { name: "Karim", email: "karim@email.com" });
emitter.emit("appStarted");
emitter.emit("appStarted"); // "once" তাই এবার চলবে না

unsubscribe(); // first listener remove

// ============================================================
// 📌 3. Factory Pattern
// ============================================================
// Object creation hide করা

class UIFactory {
  static create(type, config) {
    switch (type) {
      case "button":
        return new Button(config);
      case "input":
        return new Input(config);
      case "modal":
        return new Modal(config);
      default:
        throw new Error(`Unknown component: ${type}`);
    }
  }
}

class Button {
  constructor({ text, variant = "primary", onClick }) {
    this.text = text;
    this.variant = variant;
    this.onClick = onClick;
  }
  render() { return `<button class="btn-${this.variant}">${this.text}</button>`; }
}

class Input {
  constructor({ placeholder, type = "text" }) {
    this.placeholder = placeholder;
    this.type = type;
  }
  render() { return `<input type="${this.type}" placeholder="${this.placeholder}">`; }
}

class Modal {
  constructor({ title, content }) {
    this.title = title;
    this.content = content;
  }
  render() { return `<div class="modal"><h2>${this.title}</h2><p>${this.content}</p></div>`; }
}

const btn = UIFactory.create("button", { text: "Submit", variant: "success" });
const input = UIFactory.create("input", { placeholder: "Email দিন", type: "email" });
console.log(btn.render());
console.log(input.render());

// ============================================================
// 📌 4. Strategy Pattern
// ============================================================
// Algorithm/behavior runtime এ swap করা

class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    return this.strategy.sort([...data]);
  }
}

const bubbleSort = {
  sort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    return arr;
  }
};

const quickSort = {
  sort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const mid = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...this.sort(left), ...mid, ...this.sort(right)];
  }
};

const data = [5, 2, 8, 1, 9, 3];
const sorter = new Sorter(quickSort);
console.log(sorter.sort(data)); // [1, 2, 3, 5, 8, 9]

sorter.strategy = bubbleSort; // strategy swap!
console.log(sorter.sort(data));

// ============================================================
// 📌 5. Proxy Pattern
// ============================================================
// Object এর access intercept করা

function createReactiveObject(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const oldValue = obj[prop];
      obj[prop] = value;
      if (oldValue !== value) onChange(prop, oldValue, value);
      return true;
    },
    get(obj, prop) {
      console.log(`Reading: ${prop}`);
      return obj[prop];
    }
  });
}

const state = createReactiveObject(
  { count: 0, name: "Karim" },
  (prop, old, newVal) => console.log(`${prop} changed: ${old} → ${newVal}`)
);

state.count = 5;    // "count changed: 0 → 5"
state.name = "Rahim"; // "name changed: Karim → Rahim"
console.log(state.count); // "Reading: count" → 5

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Singleton: Config class তৈরি করো (app settings store)
// 2. Observer: Shopping cart event system (itemAdded, itemRemoved, totalChanged)
// 3. Strategy: Payment method: CreditCard, bKash, Nagad strategy দিয়ে
