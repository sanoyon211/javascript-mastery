// ============================================================
// 📘 05 - Event Delegation
// ============================================================
// Parent element এ একটা listener রাখো — সব children handle করবে
// Dynamic elements এর জন্য perfect!

// ❌ Without delegation (প্রতিটিতে listener — memory waste!):
// document.querySelectorAll(".delete-btn").forEach(btn => {
//   btn.addEventListener("click", deleteItem);
// });
// নতুন element যোগ করলে listener নেই!

// ✅ With delegation (একটা listener, সব handle করে):
document.querySelector("#todo-list")?.addEventListener("click", (e) => {
  // কোন element click হলো?
  const target = e.target;

  if (target.matches(".delete-btn")) {
    const li = target.closest("li");
    li?.remove();
    console.log("Item deleted");
  }

  if (target.matches(".complete-btn")) {
    const li = target.closest("li");
    li?.classList.toggle("completed");
  }

  if (target.matches(".edit-btn")) {
    const li = target.closest("li");
    const span = li?.querySelector(".text");
    if (span) {
      const newText = prompt("নতুন text:", span.textContent);
      if (newText) span.textContent = newText;
    }
  }
});

// ============================================================
// 📌 Dynamic Table
// ============================================================
const table = document.querySelector("#data-table");
table?.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row || row.parentElement.tagName === "THEAD") return;

  if (e.target.matches(".sort-btn")) {
    const col = e.target.dataset.col;
    sortTable(col);
  }

  if (e.target.matches(".delete-row")) {
    row.remove();
  }

  // Row select:
  document.querySelectorAll("tr.selected").forEach(r => r.classList.remove("selected"));
  row.classList.add("selected");
});

function sortTable(column) {
  console.log("Sorting by:", column);
}

// ============================================================
// 📌 Navigation Menu
// ============================================================
document.querySelector(".nav")?.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link) return;

  e.preventDefault();

  // Active class update:
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  link.classList.add("active");

  // Route navigate:
  const route = link.dataset.route;
  navigateTo(route);
});

function navigateTo(route) {
  console.log("Navigating to:", route);
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Accordion: parent div এ listener রাখো, যেকোনো item click এ toggle
// 2. Shopping cart: item list এ quantity +/- এবং remove delegation দিয়ে
// 3. Tab component: tab container এ delegation দিয়ে content switch করো
