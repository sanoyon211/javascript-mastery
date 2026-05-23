// ============================================================
// 📘 02 - Selecting Elements
// ============================================================
// DOM থেকে element খুঁজে বের করার সব উপায়
// ============================================================

// ============================================================
// 📌 Modern Methods (এগুলো সবসময় ব্যবহার করো)
// ============================================================

// querySelector — প্রথম matching element:
const title = document.querySelector("h1");
const btn = document.querySelector("#submit-btn");       // ID দিয়ে
const box = document.querySelector(".card");             // Class দিয়ে
const input = document.querySelector("input[type='text']"); // Attribute দিয়ে
const firstLi = document.querySelector("ul li");        // Nested
const active = document.querySelector(".nav-item.active"); // Multiple class

// querySelectorAll — সব matching elements (NodeList):
const allParas = document.querySelectorAll("p");
const allCards = document.querySelectorAll(".card");
const allInputs = document.querySelectorAll("form input");

// NodeList iterate:
allParas.forEach((p, index) => {
  console.log(`Para ${index + 1}:`, p.textContent);
});

// Array এ convert করো (বেশি methods পাবে):
const parasArray = Array.from(allParas);
const filtered = parasArray.filter(p => p.textContent.length > 50);

// ============================================================
// 📌 পুরনো Methods (জানা দরকার, কিন্তু querySelector ই ভালো)
// ============================================================

const byId = document.getElementById("header");           // HTMLElement | null
const byClass = document.getElementsByClassName("card");  // HTMLCollection (live!)
const byTag = document.getElementsByTagName("div");        // HTMLCollection (live!)
const byName = document.getElementsByName("email");        // NodeList

// ⚠️ HTMLCollection vs NodeList:
// HTMLCollection: live (DOM change হলে auto update), শুধু elements
// NodeList (querySelectorAll): static, text nodes সহ

// ============================================================
// 📌 Practical Selection Patterns
// ============================================================

// Form elements:
function getFormValues() {
  const form = document.querySelector("#loginForm");
  if (!form) return;

  const email = form.querySelector("[name='email']");
  const password = form.querySelector("[name='password']");
  const remember = form.querySelector("[type='checkbox']");

  return {
    email: email?.value.trim(),
    password: password?.value,
    remember: remember?.checked
  };
}

// Table data:
function getTableData() {
  const rows = document.querySelectorAll("table tbody tr");
  return Array.from(rows).map(row => {
    const cells = row.querySelectorAll("td");
    return Array.from(cells).map(cell => cell.textContent.trim());
  });
}

// Specific attribute:
function getAllExternalLinks() {
  return Array.from(
    document.querySelectorAll('a[href^="http"]') // href যেগুলো "http" দিয়ে শুরু
  ).map(a => a.href);
}

// Data attribute:
function getProductId(element) {
  return element.dataset.productId; // data-product-id="123"
}

// ============================================================
// 📌 closest() — Ancestor খোঁজা
// ============================================================
// Event delegation এ খুব কাজে লাগে:
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card"); // যে element click হলো তার .card ancestor
  if (card) {
    console.log("Card clicked:", card.dataset.id);
  }
});

// ============================================================
// 📌 matches() — Element কোনো selector match করে কিনা
// ============================================================
const el = document.querySelector("button");
if (el) {
  console.log(el.matches(".btn-primary"));    // true/false
  console.log(el.matches(":disabled"));       // disabled কিনা
  console.log(el.matches("[data-action]"));   // data-action আছে কিনা
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// HTML তৈরি করো এবং:
// 1. সব external link এ target="_blank" যোগ করো
// 2. Table এর সব row এ click করলে সেই row highlight হবে
// 3. Form এর সব required field গুলো select করো
// 4. .active class আছে এমন navigation item select করো
