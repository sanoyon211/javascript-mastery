// ============================================================
// 📘 01 - DOM Basics
// ============================================================
// DOM = Document Object Model
// Browser HTML কে একটা tree structure এ রাখে
// JavaScript দিয়ে সেই tree পরিবর্তন করা যায়!
//
// ⚠️ এই file গুলো Browser এ চালাতে হবে!
//    HTML file এ <script src="01-dom-basics.js"></script> যোগ করো
// ============================================================

/*
  DOM Tree Structure:
  
  document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── h1 (#text)
          ├── div.container
          │   ├── p
          │   └── button
          └── footer
*/

// ============================================================
// 📌 document object — সবকিছুর শুরু
// ============================================================
console.log(document.title);         // Page title
console.log(document.URL);           // Current URL
console.log(document.body);          // body element
console.log(document.head);          // head element
console.log(document.documentElement); // html element

// ============================================================
// 📌 Node Types
// ============================================================
console.log(document.nodeType);      // 9 = Document
console.log(document.body.nodeType); // 1 = Element
// 3 = Text, 8 = Comment

// ============================================================
// 📌 DOM Traversal — Tree এ navigate করা
// ============================================================
const body = document.body;

// Children:
console.log(body.children);          // HTMLCollection (শুধু elements)
console.log(body.childNodes);        // NodeList (text, comments সহ)
console.log(body.firstElementChild); // প্রথম child element
console.log(body.lastElementChild);  // শেষ child element
console.log(body.childElementCount); // কতটা child element

// Parent:
const someEl = document.querySelector("p");
if (someEl) {
  console.log(someEl.parentElement);   // parent element
  console.log(someEl.parentNode);      // parent node
  console.log(someEl.closest(".container")); // নিকটতম ancestor
}

// Siblings:
if (someEl) {
  console.log(someEl.nextElementSibling);     // পরের element
  console.log(someEl.previousElementSibling); // আগের element
}

// ============================================================
// 📌 Element Properties
// ============================================================
/*
  const el = document.querySelector("div");
  
  el.tagName          // "DIV"
  el.id               // id attribute
  el.className        // class string
  el.classList        // DOMTokenList (class গুলো)
  el.innerHTML        // inner HTML string
  el.innerText        // visible text
  el.textContent      // সব text (hidden সহ)
  el.outerHTML        // element সহ HTML
  
  el.style            // inline styles
  el.attributes       // সব attributes
  el.dataset          // data-* attributes
  
  el.offsetWidth/Height  // element এর size
  el.getBoundingClientRect() // position + size
*/

// ============================================================
// 📌 Checking Element Type
// ============================================================
function processElement(el) {
  if (el instanceof HTMLInputElement) {
    console.log("Input:", el.value);
  } else if (el instanceof HTMLButtonElement) {
    console.log("Button:", el.textContent);
  } else if (el instanceof HTMLDivElement) {
    console.log("Div with", el.children.length, "children");
  }
}

// ============================================================
// 🏋️ PRACTICE (Browser এ করো)
// ============================================================
// HTML file তৈরি করো:
/*
<!DOCTYPE html>
<html>
<head><title>DOM Practice</title></head>
<body>
  <h1 id="title">Hello DOM!</h1>
  <div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <button id="btn">Click me</button>
  </div>
  <script src="01-dom-basics.js"></script>
</body>
</html>
*/
// তারপর:
// 1. h1 element select করো এবং text change করো
// 2. সব p elements এর text print করো
// 3. button এর parent element খুঁজে বের করো
