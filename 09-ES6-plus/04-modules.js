// ============================================================
// 📘 04 - ES6 Modules (import / export)
// ============================================================
// Module হলো আলাদা JS file যেখান থেকে code import/export করা যায়
// Modern JS এর সবচেয়ে গুরুত্বপূর্ণ feature!
//
// ⚠️ Modules শুধু HTTP server এ কাজ করে (local file:// তে নয়)
//    VS Code এ Live Server extension ব্যবহার করো
// ============================================================

// ============================================================
// 📌 Export Types
// ============================================================

// --- math.js file এর ভেতরে এভাবে লিখবে ---

// Named Export (অনেকগুলো export করা যায়):
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// Default Export (শুধু একটা):
export default class MathHelper {
  static square(n) { return n * n; }
  static cube(n) { return n * n * n; }
}

// ============================================================
// 📌 Import Types
// ============================================================

// Named import:
// import { add, multiply, PI } from "./math.js";

// Rename on import:
// import { add as sum, multiply as product } from "./math.js";

// Default import:
// import MathHelper from "./math.js";

// Import all:
// import * as Math from "./math.js";
// Math.add(1, 2);
// Math.PI

// Mixed:
// import MathHelper, { add, PI } from "./math.js";

// ============================================================
// 📌 Real World Module Structure
// ============================================================

/*
  project/
  ├── index.html
  ├── main.js          ← entry point
  ├── utils/
  │   ├── helpers.js
  │   ├── validators.js
  │   └── formatters.js
  ├── services/
  │   ├── api.js
  │   └── auth.js
  └── components/
      ├── header.js
      └── footer.js
*/

// --- utils/formatters.js ---
/*
export function formatCurrency(amount, currency = "BDT") {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

export function truncate(str, maxLength = 100) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
*/

// --- services/api.js ---
/*
const BASE_URL = "https://api.example.com";

export async function get(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function post(endpoint, data) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export default { get, post };
*/

// --- main.js ---
/*
import { formatCurrency, formatDate } from "./utils/formatters.js";
import api from "./services/api.js";

async function init() {
  const products = await api.get("/products");
  products.forEach(p => {
    console.log(`${p.name}: ${formatCurrency(p.price)}`);
  });
}

init();
*/

// ============================================================
// 📌 Dynamic Import (Lazy Loading)
// ============================================================
async function loadChartLibrary() {
  // শুধু যখন দরকার তখন load করো (performance!)
  const { Chart } = await import("./chart.js");
  return new Chart();
}

// Button click এ load:
document.querySelector("#show-chart")?.addEventListener("click", async () => {
  const chart = await loadChartLibrary();
  chart.render();
});

// ============================================================
// 📌 HTML এ Module ব্যবহার
// ============================================================
/*
  <script type="module" src="main.js"></script>
  
  Module এর বৈশিষ্ট্য:
  ✅ Strict mode automatic
  ✅ Top-level await সম্ভব
  ✅ Scoped (global নয়)
  ✅ defer by default
*/

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. utils.js file তৈরি করো: formatCurrency, formatDate, capitalize export করো
// 2. api.js: GET, POST functions export করো
// 3. main.js: ওই functions import করে ব্যবহার করো
// 4. index.html এ <script type="module"> দিয়ে চালাও
