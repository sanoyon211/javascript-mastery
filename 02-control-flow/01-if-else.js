// ============================================================
// 📘 01 - If/Else — Conditional Statements
// ============================================================

// ============================================================
// 📌 Basic if/else
// ============================================================
const temperature = 35;

if (temperature > 30) {
  console.log("গরম আবহাওয়া! পানি বেশি খাও।");
} else if (temperature > 20) {
  console.log("আরামদায়ক আবহাওয়া।");
} else if (temperature > 10) {
  console.log("ঠান্ডা আবহাওয়া। গরম কাপড় পড়ো।");
} else {
  console.log("অনেক ঠান্ডা!");
}

// ============================================================
// 📌 Nested if/else
// ============================================================
const marks = 75;
const isPresent = true;

if (isPresent) {
  if (marks >= 80) {
    console.log("A+ (সর্বোচ্চ)");
  } else if (marks >= 70) {
    console.log("A");
  } else if (marks >= 60) {
    console.log("B");
  } else if (marks >= 50) {
    console.log("C");
  } else if (marks >= 33) {
    console.log("D (pass)");
  } else {
    console.log("F (fail)");
  }
} else {
  console.log("Absent — পরীক্ষা দেননি");
}

// ============================================================
// 📌 Ternary Operator (short if/else)
// ============================================================
const age = 20;
const canVote = age >= 18 ? "ভোট দিতে পারবে" : "ভোট দিতে পারবে না";
console.log(canVote);

// Nested ternary (এড়িয়ে চলো — অস্পষ্ট হয়ে যায়)
const score = 85;
const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : "C";
console.log(grade); // "A"

// ============================================================
// 📌 Short-circuit as conditional
// ============================================================
const isLoggedIn = true;
isLoggedIn && console.log("স্বাগতম!"); // isLoggedIn true হলে run হবে

const user = null;
const displayName = user?.name || "Guest";
console.log(displayName); // "Guest"

// ============================================================
// 📌 Real World Examples
// ============================================================

// Login check:
function checkLogin(username, password) {
  if (!username || !password) {
    return "Username এবং password দিন";
  }
  if (username === "admin" && password === "1234") {
    return "Login সফল!";
  }
  return "Username বা password ভুল";
}
console.log(checkLogin("admin", "1234")); // Login সফল!
console.log(checkLogin("", "1234"));      // Username এবং password দিন

// Discount calculation:
function getDiscount(totalAmount, isMember) {
  if (totalAmount >= 5000 && isMember) {
    return 0.20; // 20% discount
  } else if (totalAmount >= 5000 || isMember) {
    return 0.10; // 10% discount
  } else if (totalAmount >= 1000) {
    return 0.05; // 5% discount
  }
  return 0; // No discount
}

const total = 6000;
const member = true;
const discount = getDiscount(total, member);
const finalPrice = total * (1 - discount);
console.log(`ছাড়: ${discount * 100}%`);
console.log(`মূল্য: ৳${finalPrice}`);

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. BMI calculator: weight ও height নিয়ে BMI বের করো
//    BMI = weight / (height * height)
//    < 18.5: Underweight, 18.5-24.9: Normal, 25-29.9: Overweight, ≥30: Obese
// 2. Traffic light: "red", "yellow", "green" input নিয়ে কী করতে হবে বলো
// 3. Year input নিয়ে Leap year কিনা check করো
