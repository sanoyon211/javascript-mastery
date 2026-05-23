// ============================================================
// 📘 01 - LocalStorage & SessionStorage
// ============================================================
// Browser এ data store করার উপায়
// localStorage: browser বন্ধ করলেও থাকে (persistent)
// sessionStorage: tab বন্ধ করলে চলে যায় (temporary)
// ⚠️ Browser এ চালাতে হবে!

// ============================================================
// 📌 localStorage
// ============================================================

// String store:
localStorage.setItem("username", "Karim");
const name = localStorage.getItem("username"); // "Karim"
localStorage.removeItem("username");
localStorage.clear(); // সব মুছে ফেলো

// Object store (JSON stringify করতে হয়!):
const user = { name: "Karim", age: 25, city: "Dhaka" };
localStorage.setItem("user", JSON.stringify(user));

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "Karim"

// ============================================================
// 📌 Utility Functions (Helper)
// ============================================================
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  has(key) {
    return localStorage.getItem(key) !== null;
  }
};

// Usage:
storage.set("cart", [{ id: 1, name: "Laptop", qty: 1 }]);
const cart = storage.get("cart", []);
console.log(cart);

// ============================================================
// 📌 Shopping Cart with localStorage
// ============================================================
class ShoppingCart {
  #STORAGE_KEY = "shopping_cart";

  get items() {
    return storage.get(this.#STORAGE_KEY, []);
  }

  addItem(product, quantity = 1) {
    const items = this.items;
    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }

    storage.set(this.#STORAGE_KEY, items);
    return this;
  }

  removeItem(productId) {
    const items = this.items.filter(i => i.id !== productId);
    storage.set(this.#STORAGE_KEY, items);
    return this;
  }

  updateQuantity(productId, quantity) {
    const items = this.items;
    const item = items.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) return this.removeItem(productId);
      item.quantity = quantity;
      storage.set(this.#STORAGE_KEY, items);
    }
    return this;
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    storage.remove(this.#STORAGE_KEY);
  }
}

// Usage:
const cart2 = new ShoppingCart();
cart2
  .addItem({ id: 1, name: "Laptop", price: 75000 })
  .addItem({ id: 2, name: "Mouse", price: 1500 }, 2)
  .addItem({ id: 1, name: "Laptop", price: 75000 }); // qty বাড়বে

console.log(`Items: ${cart2.count}`);
console.log(`Total: ৳${cart2.total.toLocaleString()}`);

// ============================================================
// 📌 sessionStorage — Tab session data
// ============================================================

// Form data save (reload করলে হারাবে না):
function saveFormProgress(formData) {
  sessionStorage.setItem("formProgress", JSON.stringify(formData));
}

function loadFormProgress() {
  return JSON.parse(sessionStorage.getItem("formProgress") || "{}");
}

// Multi-step form:
const steps = loadFormProgress();
console.log("Saved progress:", steps);

// ============================================================
// 📌 Storage Events (Tab এর মধ্যে sync)
// ============================================================
window.addEventListener("storage", (event) => {
  console.log("Storage changed in another tab!");
  console.log("Key:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);

  // Cart sync across tabs:
  if (event.key === "shopping_cart") {
    updateCartUI();
  }
});

function updateCartUI() {
  // Cart UI update করো
}

// ============================================================
// 📌 IndexedDB (Large data store)
// ============================================================
// localStorage সীমা ~5MB, IndexedDB অনেক বেশি!
// Complex queries, files, blobs store করা যায়

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyAppDB", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("users")) {
        const store = db.createObjectStore("users", { keyPath: "id" });
        store.createIndex("email", "email", { unique: true });
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Theme preference store করো (dark/light mode)
// 2. Recently viewed products list (max 5 items)
// 3. Form auto-save: typing করতে করতে sessionStorage এ save
// 4. Cart badge count update করো localStorage থেকে
