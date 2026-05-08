// ============================================================
// 📘 07 - Type Conversion & Coercion
// ============================================================
// Type Conversion: আমরা নিজে করি (Explicit)
// Type Coercion: JavaScript নিজে করে (Implicit)
// ============================================================

// ============================================================
// 📌 Explicit Conversion (আমরা নিজে করি)
// ============================================================

// → Number এ convert:
console.log(Number("42"));      // 42
console.log(Number("3.14"));    // 3.14
console.log(Number(""));        // 0
console.log(Number("  "));      // 0
console.log(Number("abc"));     // NaN
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

// → String এ convert:
console.log(String(42));         // "42"
console.log(String(true));       // "true"
console.log(String(false));      // "false"
console.log(String(null));       // "null"
console.log(String(undefined));  // "undefined"
console.log(String([1,2,3]));    // "1,2,3"

// → Boolean এ convert:
// Falsy values (false হয়): 0, "", null, undefined, NaN, false
// Truthy values: বাকি সব কিছু!
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
console.log(Boolean(false));      // false

console.log(Boolean(1));          // true
console.log(Boolean("hello"));    // true
console.log(Boolean([]));         // true (empty array ও truthy!)
console.log(Boolean({}));         // true (empty object ও truthy!)
console.log(Boolean("false"));    // true (string "false" কিন্তু truthy!)

// ============================================================
// 📌 Implicit Coercion (JavaScript নিজে করে — সাবধান!)
// ============================================================

// + operator এ string থাকলে concatenation হয়:
console.log(1 + "2");     // "12" (number → string)
console.log("3" + 4 + 5); // "345" (বাম থেকে ডানে)
console.log(3 + 4 + "5"); // "75"  (আগে 3+4=7, তারপর "75")

// - * / এ string → number হয়:
console.log("5" - 2);    // 3
console.log("5" * "2");  // 10
console.log("10" / "2"); // 5
console.log("5" - "x");  // NaN

// Comparison:
console.log("5" == 5);   // true  (coercion হয়!)
console.log("5" === 5);  // false (coercion হয় না)
console.log(null == undefined);  // true
console.log(null === undefined); // false

// ============================================================
// 📌 Truthy/Falsy Real World Usage
// ============================================================

// Form validation example:
function validateInput(input) {
  if (!input) { // empty string, null, undefined সব false হবে
    return "Input দেওয়া হয়নি!";
  }
  return `Input পাওয়া গেছে: ${input}`;
}

console.log(validateInput(""));        // "Input দেওয়া হয়নি!"
console.log(validateInput(null));      // "Input দেওয়া হয়নি!"
console.log(validateInput("Karim"));   // "Input পাওয়া গেছে: Karim"

// Default value pattern:
function greet(name) {
  const displayName = name || "Guest"; // name falsy হলে "Guest"
  return `Hello, ${displayName}!`;
}
console.log(greet("Rahim")); // "Hello, Rahim!"
console.log(greet(""));      // "Hello, Guest!"
console.log(greet());        // "Hello, Guest!"

// ============================================================
// 📌 parseInt vs Number — পার্থক্য জানো
// ============================================================
console.log(Number("42px"));   // NaN     (চলে না)
console.log(parseInt("42px")); // 42      (number পর্যন্ত নেয়)
console.log(parseInt("px42")); // NaN     (প্রথমে number না থাকলে)
console.log(parseInt("3.99")); // 3       (integer part নেয়)
console.log(parseFloat("3.99")); // 3.99  (decimal সহ নেয়)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. নিচের গুলো Boolean এ convert করো এবং result বলো:
//    "0", [], {}, " ", 0, "false"
// 2. "100" + 50 এবং "100" - 50 এর পার্থক্য explain করো
// 3. একটা function লেখো যা যেকোনো input কে number এ convert করবে,
//    সম্ভব না হলে 0 return করবে
