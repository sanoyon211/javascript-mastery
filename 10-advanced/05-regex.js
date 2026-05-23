// ============================================================
// 📘 05 - Regular Expressions (RegEx)
// ============================================================
// Pattern matching for strings — validation, search, replace

// ============================================================
// 📌 Creating Regex
// ============================================================
const literal = /hello/;           // literal notation
const constructor = new RegExp("hello"); // constructor

// Flags:
const caseInsensitive = /hello/i;  // i = case insensitive
const global = /hello/g;           // g = find all matches
const multiline = /^hello/m;       // m = multiline
const combined = /hello/gi;        // combine flags

// ============================================================
// 📌 Basic Methods
// ============================================================
const str = "Hello World! Hello JS!";

// test(): true/false
console.log(/hello/i.test(str));   // true

// match(): matches return করে
console.log(str.match(/hello/i));  // first match + info
console.log(str.match(/hello/gi)); // ["Hello", "Hello"] — g flag দিলে array

// search(): index return করে
console.log(str.search(/world/i)); // 6

// replace():
console.log(str.replace(/hello/gi, "Hi")); // "Hi World! Hi JS!"

// replaceAll():
console.log("aababc".replaceAll("ab", "X")); // "aXXc"

// split():
console.log("one,two,,three".split(/,+/)); // ["one", "two", "three"]

// ============================================================
// 📌 Character Classes
// ============================================================
// \d  = digit [0-9]
// \D  = non-digit
// \w  = word char [a-zA-Z0-9_]
// \W  = non-word
// \s  = whitespace
// \S  = non-whitespace
// .   = any char (newline বাদে)
// ^   = start of string
// $   = end of string

console.log(/\d+/.test("abc123")); // true (digits আছে)
console.log(/^\d+$/.test("123")); // true (সব digit)
console.log(/^\d+$/.test("12a")); // false

// ============================================================
// 📌 Quantifiers
// ============================================================
// *   = 0 or more
// +   = 1 or more
// ?   = 0 or 1 (optional)
// {n} = exactly n
// {n,} = n or more
// {n,m} = n to m

console.log(/\d{4}/.test("2024"));       // true
console.log(/\d{4}/.test("202"));        // false
console.log(/colou?r/.test("color"));    // true (u optional)
console.log(/colou?r/.test("colour"));   // true

// ============================================================
// 📌 Groups & Alternation
// ============================================================
// ()  = group
// |   = or
// (?:) = non-capturing group

// Phone numbers: 017xxxxxxxx বা 019xxxxxxxx
const phoneRegex = /^01[3-9]\d{8}$/;
console.log(phoneRegex.test("01712345678")); // true
console.log(phoneRegex.test("01212345678")); // false

// Capturing groups:
const dateStr = "2024-01-15";
const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
if (match) {
  const [full, year, month, day] = match;
  console.log(year, month, day); // "2024" "01" "15"
}

// Named groups (ES2018):
const namedMatch = "2024-01-15".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
if (namedMatch) {
  const { year, month, day } = namedMatch.groups;
  console.log(year, month, day); // "2024" "01" "15"
}

// ============================================================
// 📌 Real World Validation
// ============================================================
const validators = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^01[3-9]\d{8}$/,                    // BD phone
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  nid: /^\d{10}(\d{7})?$/,                    // BD NID (10 or 17 digits)
  postcode: /^\d{4}$/,                         // BD postcode
};

function validate(type, value) {
  return validators[type]?.test(value) ?? false;
}

console.log(validate("email", "karim@gmail.com")); // true
console.log(validate("email", "invalid.email"));    // false
console.log(validate("phone", "01712345678"));      // true
console.log(validate("phone", "01012345678"));      // false

// ============================================================
// 📌 String Manipulation with RegEx
// ============================================================

// Slug তৈরি করা:
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")      // special chars remove
    .replace(/[\s_-]+/g, "-")      // spaces to dash
    .replace(/^-+|-+$/g, "");      // leading/trailing dash remove
}
console.log(slugify("Hello World! JavaScript"));  // "hello-world-javascript"
console.log(slugify("  This is a   Test!  "));   // "this-is-a-test"

// Highlight search terms:
function highlight(text, term) {
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}
console.log(highlight("Hello World", "world")); // Hello <mark>World</mark>

// Extract all URLs from text:
function extractURLs(text) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return text.match(urlRegex) || [];
}
console.log(extractURLs("Visit https://google.com or http://github.com for more"));

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Credit card number validate করো: 16 digits, 4 groups এ
//    "1234 5678 9012 3456" বা "1234-5678-9012-3456"
// 2. HTML tags extract করো: "<p>Hello</p>" থেকে "p" বের করো
// 3. Password strength check: lowercase, uppercase, digit, special char
// 4. Bangladeshi postal code validate করো (4 digits)
