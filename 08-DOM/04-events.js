// ============================================================
// 📘 04 - Events
// ============================================================
// Event হলো browser এ কিছু একটা ঘটার সংকেত
// click, scroll, keypress, load — সব কিছুই event

// ============================================================
// 📌 addEventListener — সবসময় এটা ব্যবহার করো
// ============================================================
const btn = document.querySelector("#myBtn");

if (btn) {
  // Basic:
  btn.addEventListener("click", function(event) {
    console.log("Clicked!", event);
  });

  // Arrow function:
  btn.addEventListener("click", (e) => {
    console.log("Button text:", e.target.textContent);
  });

  // Named function (remove করা যায়):
  function handleClick(e) {
    console.log("Click handled");
  }
  btn.addEventListener("click", handleClick);
  // btn.removeEventListener("click", handleClick); // remove
}

// ============================================================
// 📌 Event Object (e)
// ============================================================
document.addEventListener("click", (e) => {
  console.log(e.type);          // "click"
  console.log(e.target);        // যে element এ click হলো
  console.log(e.currentTarget); // যে element এ listener আছে
  console.log(e.clientX, e.clientY); // Mouse position (viewport)
  console.log(e.pageX, e.pageY);     // Mouse position (page)
  console.log(e.timeStamp);    // কখন ঘটলো

  e.preventDefault();   // default behavior বন্ধ (form submit, link follow)
  e.stopPropagation();  // bubbling বন্ধ করে
});

// ============================================================
// 📌 Mouse Events
// ============================================================
const hoverBox = document.querySelector(".hover-box");
if (hoverBox) {
  hoverBox.addEventListener("click", (e) => console.log("click"));
  hoverBox.addEventListener("dblclick", (e) => console.log("double click"));
  hoverBox.addEventListener("mouseenter", (e) => console.log("mouse entered")); // bubble করে না
  hoverBox.addEventListener("mouseleave", (e) => console.log("mouse left"));
  hoverBox.addEventListener("mouseover", (e) => console.log("mouseover")); // bubble করে
  hoverBox.addEventListener("mousemove", (e) => {
    hoverBox.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
  });
  hoverBox.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // right-click menu বন্ধ
    console.log("Right clicked!");
  });
}

// ============================================================
// 📌 Keyboard Events
// ============================================================
document.addEventListener("keydown", (e) => {
  console.log("Key:", e.key);       // "Enter", "a", "ArrowUp"
  console.log("Code:", e.code);     // "Enter", "KeyA", "ArrowUp"
  console.log("Ctrl:", e.ctrlKey);  // true/false
  console.log("Shift:", e.shiftKey);
  console.log("Alt:", e.altKey);

  // Keyboard shortcuts:
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Save!");
  }

  if (e.key === "Escape") {
    console.log("Close modal");
  }
});

const searchInput = document.querySelector("#search");
if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch(e.target.value);
  });
}

function performSearch(term) {
  console.log("Searching:", term);
}

// ============================================================
// 📌 Form Events
// ============================================================
const form = document.querySelector("#myForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // page reload বন্ধ!

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);

    // API এ পাঠাও:
    // await submitForm(data);
  });

  // Input events:
  const input = form.querySelector("input");
  if (input) {
    input.addEventListener("input", (e) => {
      console.log("Real-time:", e.target.value); // প্রতি keystroke এ
    });

    input.addEventListener("change", (e) => {
      console.log("Changed:", e.target.value); // focus হারালে
    });

    input.addEventListener("focus", () => input.classList.add("focused"));
    input.addEventListener("blur", () => input.classList.remove("focused"));
  }
}

// ============================================================
// 📌 Event Bubbling & Capturing
// ============================================================
/*
  HTML structure:
  <div id="grandparent">
    <div id="parent">
      <button id="child">Click</button>
    </div>
  </div>

  Bubbling (default): child → parent → grandparent → document
  Capturing: document → grandparent → parent → child
*/

["grandparent", "parent", "child"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;

  // Bubbling (3rd param = false, default):
  el.addEventListener("click", (e) => {
    console.log(`Bubbling: ${id}`);
  });

  // Capturing (3rd param = true):
  el.addEventListener("click", (e) => {
    console.log(`Capturing: ${id}`);
  }, true);
});

// ============================================================
// 📌 once, passive options
// ============================================================
btn?.addEventListener("click", () => {
  console.log("শুধু একবার fire হবে!");
}, { once: true }); // একবার fire হলে auto remove

// Scroll performance:
document.addEventListener("scroll", () => {
  // heavy work
}, { passive: true }); // browser কে বলছি preventDefault() call করবো না

// ============================================================
// 📌 Custom Events
// ============================================================
// নিজস্ব event তৈরি:
const cartUpdated = new CustomEvent("cartUpdated", {
  detail: { itemCount: 5, total: 1500 },
  bubbles: true
});

document.addEventListener("cartUpdated", (e) => {
  console.log("Cart updated! Items:", e.detail.itemCount);
});

document.dispatchEvent(cartUpdated); // event fire করা

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Drag to reorder list items
// 2. Keyboard navigation: arrow keys দিয়ে menu navigate করো
// 3. Image gallery: click এ modal এ বড় করে দেখাবে
// 4. Form validation: real-time error messages দেখাবে
