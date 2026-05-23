// ============================================================
// 📘 03 - Destructuring (Combined: Array + Object)
// ============================================================
// ES6 এর অন্যতম সেরা feature — data extract করার shorthand

// ============================================================
// 📌 Complex Destructuring Patterns
// ============================================================

// API Response destructuring:
const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 1,
      name: "Karim Uddin",
      role: "admin",
      permissions: ["read", "write", "delete"],
      address: {
        city: "Dhaka",
        country: "Bangladesh"
      }
    },
    meta: {
      total: 100,
      page: 1
    }
  }
};

// Deep destructure:
const {
  status,
  data: {
    user: {
      id,
      name,
      role = "user",      // default value
      permissions: [firstPerm, ...otherPerms], // array destructure inside object
      address: { city, country }
    },
    meta: { total, page }
  }
} = apiResponse;

console.log(name, role, city);     // "Karim Uddin" "admin" "Dhaka"
console.log(firstPerm, otherPerms); // "read" ["write", "delete"]
console.log(total, page);           // 100 1

// ============================================================
// 📌 Function Parameters with Destructuring
// ============================================================

// Complex config:
function createServer({
  host = "localhost",
  port = 3000,
  ssl = false,
  database: {
    url,
    name: dbName = "mydb",
    options: { timeout = 5000 } = {}
  } = {},
  cors: { origins = ["*"] } = {}
} = {}) {
  console.log(`Server: ${ssl ? "https" : "http"}://${host}:${port}`);
  console.log(`DB: ${url}/${dbName} (timeout: ${timeout}ms)`);
  console.log(`CORS: ${origins.join(", ")}`);
}

createServer({
  port: 8080,
  ssl: true,
  database: {
    url: "mongodb://localhost",
    name: "production",
    options: { timeout: 3000 }
  }
});

// ============================================================
// 📌 Swapping & Intermediate Values
// ============================================================

// Multiple swap:
let [a, b, c] = [1, 2, 3];
[a, b, c] = [c, a, b]; // rotate!
console.log(a, b, c);  // 3 1 2

// Function returning multiple values:
function divmod(a, b) {
  return [Math.floor(a / b), a % b];
}
const [quotient, remainder] = divmod(17, 5);
console.log(quotient, remainder); // 3 2

// ============================================================
// 📌 Destructuring with Map & Set
// ============================================================
const map = new Map([["name", "Karim"], ["age", 25]]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

const [first, second] = new Set([10, 20, 30]);
console.log(first, second); // 10 20

// ============================================================
// 📌 Import Destructuring (Module syntax)
// ============================================================
// import { useState, useEffect, useCallback } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { createStore, combineReducers } from 'redux';

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Complex API response destructure করো (nested 3+ levels)
// 2. Function: {x, y} coordinates নিয়ে distance calculate করো
// 3. Destructuring দিয়ে object থেকে specific keys extract করো
//    (pick function: pick({a:1,b:2,c:3}, ['a','c']) → {a:1,c:3})
