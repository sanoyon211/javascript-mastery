// ============================================================
// 📘 03 - Manipulating the DOM
// ============================================================

// ============================================================
// 📌 Content পরিবর্তন করা
// ============================================================
const heading = document.querySelector("h1");
if (heading) {
  // Text:
  heading.textContent = "নতুন Title";       // safe (HTML escape করে)
  heading.innerText = "আরেকটা Title";       // visible text only

  // HTML:
  heading.innerHTML = "<span>Bold Title</span>"; // ⚠️ XSS এর ঝুঁকি আছে!

  // Safe HTML insert:
  function safeSetHTML(element, text) {
    element.textContent = text; // always safe
  }
}

// ============================================================
// 📌 Attribute পরিবর্তন
// ============================================================
const img = document.querySelector("img");
if (img) {
  // Get:
  console.log(img.getAttribute("src"));
  console.log(img.getAttribute("alt"));

  // Set:
  img.setAttribute("src", "/new-image.jpg");
  img.setAttribute("alt", "নতুন ছবি");

  // Remove:
  img.removeAttribute("title");

  // Check:
  console.log(img.hasAttribute("src")); // true

  // Direct property (faster):
  img.src = "/another.jpg";
  img.alt = "Another";
}

// Data attributes:
const card = document.querySelector(".card");
if (card) {
  card.dataset.userId = "123";    // data-user-id="123"
  card.dataset.productName = "Laptop"; // data-product-name="Laptop"
  console.log(card.dataset.userId); // "123"
}

// ============================================================
// 📌 CSS Classes
// ============================================================
const box = document.querySelector(".box");
if (box) {
  box.classList.add("active");              // class যোগ
  box.classList.remove("hidden");           // class বাদ
  box.classList.toggle("dark");             // থাকলে বাদ, না থাকলে যোগ
  box.classList.replace("old", "new");      // replace
  console.log(box.classList.contains("active")); // true/false

  // Multiple at once:
  box.classList.add("animate", "fade-in", "visible");
}

// ============================================================
// 📌 Inline Styles
// ============================================================
const el = document.querySelector(".target");
if (el) {
  el.style.color = "red";
  el.style.backgroundColor = "#f0f0f0";  // camelCase!
  el.style.fontSize = "18px";
  el.style.display = "none";

  // Multiple styles at once:
  Object.assign(el.style, {
    padding: "10px",
    margin: "5px",
    borderRadius: "8px"
  });

  // Remove inline style:
  el.style.color = "";

  // Computed style (final applied style):
  const computed = getComputedStyle(el);
  console.log(computed.fontSize);
  console.log(computed.color);
}

// ============================================================
// 📌 Element তৈরি করা
// ============================================================

// Method 1: createElement (best for dynamic content)
function createCard(product) {
  const card = document.createElement("div");
  card.classList.add("card", "product-card");
  card.dataset.id = product.id;

  const title = document.createElement("h3");
  title.textContent = product.name; // safe!

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = `৳${product.price.toLocaleString()}`;

  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-primary");
  btn.textContent = "Cart এ যোগ করুন";
  btn.addEventListener("click", () => addToCart(product));

  card.append(title, price, btn); // একসাথে append!
  return card;
}

function addToCart(product) {
  console.log(`${product.name} cart এ যোগ হলো`);
}

// DOM এ যোগ করা:
const container = document.querySelector(".product-grid");
if (container) {
  const products = [
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Phone", price: 25000 },
  ];

  products.forEach(product => {
    container.append(createCard(product));
  });
}

// ============================================================
// 📌 Insert Positions
// ============================================================
const parent = document.querySelector("#list");
const newItem = document.createElement("li");
newItem.textContent = "New Item";

if (parent) {
  parent.append(newItem);           // শেষে
  parent.prepend(newItem);          // শুরুতে
  parent.before(newItem);           // parent এর আগে
  parent.after(newItem);            // parent এর পরে

  // insertAdjacentHTML (fast, string থেকে):
  parent.insertAdjacentHTML("beforeend", "<li>Fast insert</li>");
  parent.insertAdjacentHTML("afterbegin", "<li>First item</li>");
}

// ============================================================
// 📌 Element Remove করা
// ============================================================
const toRemove = document.querySelector(".remove-me");
if (toRemove) {
  toRemove.remove();                    // modern
  // toRemove.parentNode.removeChild(toRemove); // old way
}

// সব children মুছে ফেলা:
function clearContainer(el) {
  el.innerHTML = "";   // fast কিন্তু memory leak হতে পারে
  // while (el.firstChild) el.removeChild(el.firstChild); // safer
}

// ============================================================
// 📌 Clone করা
// ============================================================
const template = document.querySelector(".item-template");
if (template) {
  const clone = template.cloneNode(true); // true = deep clone (children সহ)
  clone.classList.remove("item-template");
  clone.querySelector(".title").textContent = "New Item";
  template.parentNode.append(clone);
}

// ============================================================
// 📌 Fragment — Performance Optimization
// ============================================================
function renderList(items) {
  const fragment = document.createDocumentFragment(); // memory তে তৈরি

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.append(li); // DOM update নেই এখন
  });

  document.querySelector("ul")?.append(fragment); // একবারে DOM এ যোগ! (fast!)
}

renderList(["আম", "জাম", "কাঁঠাল", "লিচু", "আনারস"]);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Todo list UI: input থেকে item নিয়ে list এ যোগ করো, delete button সহ
// 2. Product grid: array থেকে card তৈরি করো, filter করা যাবে
// 3. Accordion: click এ expand/collapse হবে
