// ============================================================
// 📘 06 - Error Handling (Async)
// ============================================================

// ============================================================
// 📌 Custom Error Classes
// ============================================================
class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} পাওয়া যায়নি`, 404, "NOT_FOUND");
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(`${field}: ${message}`, 400, "VALIDATION_ERROR");
    this.field = field;
  }
}

class NetworkError extends AppError {
  constructor() {
    super("Network connection problem!", 503, "NETWORK_ERROR");
  }
}

// ============================================================
// 📌 Error Handling Patterns
// ============================================================

// Pattern 1: try/catch (সবচেয়ে common)
async function fetchUserSafe(userId) {
  try {
    if (!userId) throw new ValidationError("userId", "required");
    if (userId < 0) throw new ValidationError("userId", "must be positive");

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (response.status === 404) throw new NotFoundError("User");
    if (!response.ok) throw new AppError(`Server error: ${response.status}`, response.status);

    return await response.json();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`❌ Validation Error [${error.field}]: ${error.message}`);
    } else if (error instanceof NotFoundError) {
      console.log(`🔍 Not Found: ${error.message}`);
    } else if (error instanceof TypeError) {
      console.log(`🌐 Network Error: Check your connection`);
    } else {
      console.log(`💥 Unexpected: ${error.message}`);
    }
    return null;
  }
}

// Pattern 2: Result Pattern (Go-style, no exceptions)
async function fetchUserResult(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function useResultPattern() {
  const { data, error } = await fetchUserResult(1);
  if (error) {
    console.log("Error:", error);
    return;
  }
  console.log("User:", data.name);
}

// ============================================================
// 📌 Global Error Handler
// ============================================================

// Browser:
// window.addEventListener("error", (event) => {
//   console.error("Global error:", event.error);
// });
//
// window.addEventListener("unhandledrejection", (event) => {
//   console.error("Unhandled promise rejection:", event.reason);
//   event.preventDefault();
// });

// Node.js:
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1);
});

// ============================================================
// 📌 Retry Logic
// ============================================================
async function withRetry(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await new Promise(res => setTimeout(res, delay * attempt)); // exponential backoff
    }
  }
}

async function unstableApi() {
  if (Math.random() < 0.7) throw new Error("Random failure!");
  return "Success!";
}

async function demoRetry() {
  try {
    const result = await withRetry(unstableApi, 3, 500);
    console.log("Final result:", result);
  } catch (error) {
    console.log("All retries failed:", error.message);
  }
}

demoRetry();

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Custom AuthError class তৈরি করো (401 status)
// 2. withRetry function এ exponential backoff যোগ করো
// 3. Form validation: সব field validate করো, সব errors একসাথে দেখাও
