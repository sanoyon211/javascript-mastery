// ============================================================
// 📘 02 - Template Literals
// ============================================================

// Multi-line:
const html = `
  <div class="card">
    <h2>${"Dynamic Title"}</h2>
    <p>${2 + 2} items</p>
  </div>
`;

// Tagged Templates (Advanced):
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : "");
  }, "");
}

const name = "Karim";
const role = "Developer";
const tagged = highlight`Hello, ${name}! You are a ${role}.`;
console.log(tagged);
// Hello, <mark>Karim</mark>! You are a <mark>Developer</mark>.

// ============================================================
// 📌 SQL-like Tagged Template (Real World):
// ============================================================
function sql(strings, ...values) {
  const query = strings.join("?");
  return { query, params: values };
}

const userId = 5;
const status = "active";
const { query, params } = sql`SELECT * FROM users WHERE id = ${userId} AND status = ${status}`;
console.log(query);  // "SELECT * FROM users WHERE id = ? AND status = ?"
console.log(params); // [5, "active"] — SQL injection safe!

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. HTML card component: template literal দিয়ে বানাও
// 2. Tagged template: currency format করো (৳ + comma)
