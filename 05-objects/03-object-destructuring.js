// ============================================================
// 📘 03 - Object Destructuring
// ============================================================

const user = {
  name: "Karim Uddin",
  age: 25,
  email: "karim@email.com",
  address: {
    city: "Dhaka",
    zip: "1200"
  },
  role: "developer"
};

// ============================================================
// 📌 Basic Destructuring
// ============================================================
const { name, age, email } = user;
console.log(name, age, email); // Karim Uddin 25 karim@email.com

// ============================================================
// 📌 Rename Variables
// ============================================================
const { name: fullName, age: years } = user;
console.log(fullName, years); // Karim Uddin 25

// ============================================================
// 📌 Default Values
// ============================================================
const { name: n, phone = "N/A", role = "user" } = user;
console.log(phone); // "N/A" (property নেই)
console.log(role);  // "developer" (property আছে, default override)

// ============================================================
// 📌 Nested Destructuring
// ============================================================
const { address: { city, zip } } = user;
console.log(city, zip); // Dhaka 1200

// ============================================================
// 📌 Rest in Object Destructuring
// ============================================================
const { name: userName, age: userAge, ...rest } = user;
console.log(userName, userAge); // Karim Uddin 25
console.log(rest); // { email: "...", address: {...}, role: "..." }

// ============================================================
// 📌 Function Parameter Destructuring (সবচেয়ে বেশি ব্যবহার!)
// ============================================================
// পুরনো পদ্ধতি:
function displayUserOld(user) {
  console.log(`${user.name} (${user.age})`);
}

// Destructuring দিয়ে:
function displayUser({ name, age, role = "user" }) {
  console.log(`${name} (${age}) — ${role}`);
}
displayUser(user); // Karim Uddin (25) — developer
displayUser({ name: "Rahim", age: 30 }); // Rahim (30) — user

// ============================================================
// 📌 React style props (Real World)
// ============================================================
function Button({ text, onClick, disabled = false, variant = "primary" }) {
  // React component এ এভাবে props destructure করা হয়
  console.log(`Button: ${text}, variant: ${variant}, disabled: ${disabled}`);
}

// ============================================================
// 📌 Destructuring in Loops
// ============================================================
const students = [
  { name: "Karim", marks: 85 },
  { name: "Rahim", marks: 92 },
];

for (const { name, marks } of students) {
  console.log(`${name}: ${marks}`);
}

// Object.entries() দিয়ে:
const scores = { Math: 90, English: 85, Science: 92 };
for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. API response object থেকে শুধু দরকারি fields নাও
// 2. Function এ config object destructure করো default সহ
// 3. Nested user object থেকে city এবং country বের করো
