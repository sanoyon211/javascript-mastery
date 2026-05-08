// ============================================================
// 📘 02 - Switch Statement
// ============================================================
// if/else এর alternative, একটা value এর বিপরীতে অনেক case check

const day = "সোমবার";

switch (day) {
  case "রবিবার":
    console.log("সাপ্তাহিক ছুটি");
    break;
  case "সোমবার":
  case "মঙ্গলবার":
  case "বুধবার":
  case "বৃহস্পতিবার":
  case "শুক্রবার":
    console.log("কর্মদিবস"); // এটা print হবে
    break;
  case "শনিবার":
    console.log("অর্ধেক কর্মদিবস");
    break;
  default:
    console.log("অজানা দিন");
}

// ⚠️ break না দিলে পরের case গুলোও run হয়! (fall-through)
const num = 1;
switch (num) {
  case 1:
    console.log("এক");
    // break নেই!
  case 2:
    console.log("দুই"); // এটাও print হবে!
  case 3:
    console.log("তিন"); // এটাও!
    break;
  case 4:
    console.log("চার"); // এটা হবে না
}

// ============================================================
// 📌 Switch with return (function এর ভেতরে)
// ============================================================
function getDayType(dayName) {
  switch (dayName) {
    case "রবিবার":
      return "ছুটির দিন";
    case "শুক্রবার":
    case "শনিবার":
      return "সাপ্তাহিক বন্ধ";
    default:
      return "কর্মদিবস";
  }
}
console.log(getDayType("শুক্রবার")); // সাপ্তাহিক বন্ধ

// ============================================================
// 📌 Switch vs if/else — কখন কোনটা?
// ============================================================
// switch: একটা value এর বিপরীতে নির্দিষ্ট কিছু case
// if/else: complex condition, range check (> < >= <=)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Month number (1-12) নিয়ে মাসের নাম return করো
// 2. Calculator function: operation (+, -, *, /) নিয়ে result দাও
//    switch দিয়ে করো
