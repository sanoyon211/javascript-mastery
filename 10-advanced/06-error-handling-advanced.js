// ============================================================
// 📘 06 - Advanced Error Handling
// ============================================================

// ============================================================
// 📌 Error Types
// ============================================================
// SyntaxError: code parse করতে পারেনি
// ReferenceError: undefined variable access
// TypeError: wrong type operation
// RangeError: out of range value
// URIError: malformed URI

try {
  null.property;           // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null"
  console.log(e.stack);   // full stack trace
}

// ============================================================
// 📌 Custom Error Hierarchy
// ============================================================
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return { name: this.name, message: this.message, code: this.code, statusCode: this.statusCode };
  }
}

class HttpError extends AppError {
  constructor(statusCode, message) {
    const code = `HTTP_${statusCode}`;
    super(message, code, statusCode);
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad Request") { super(400, message); }
}

class UnauthorizedError extends HttpError {
  constructor() { super(401, "Unauthorized — Please login"); }
}

class ForbiddenError extends HttpError {
  constructor() { super(403, "Forbidden — Access denied"); }
}

class NotFoundError extends HttpError {
  constructor(resource) { super(404, `${resource} not found`); }
}

// ============================================================
// 📌 Error Boundary Pattern
// ============================================================
function withErrorBoundary(fn, errorHandler) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      return errorHandler(error);
    }
  };
}

const safeGetUser = withErrorBoundary(
  async (id) => {
    if (!id) throw new BadRequestError("User ID is required");
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (res.status === 404) throw new NotFoundError("User");
    return res.json();
  },
  (error) => {
    console.error(`[${error.name}] ${error.message}`);
    return null;
  }
);

// ============================================================
// 📌 Result Type Pattern
// ============================================================
class Result {
  #value;
  #error;

  static ok(value) {
    const r = new Result();
    r.#value = value;
    return r;
  }

  static err(error) {
    const r = new Result();
    r.#error = error instanceof Error ? error : new Error(String(error));
    return r;
  }

  get isOk() { return this.#error === undefined; }
  get isErr() { return !this.isOk; }
  get value() { return this.#value; }
  get error() { return this.#error; }

  map(fn) {
    return this.isOk ? Result.ok(fn(this.#value)) : this;
  }

  mapErr(fn) {
    return this.isErr ? Result.err(fn(this.#error)) : this;
  }

  unwrap(defaultValue) {
    return this.isOk ? this.#value : defaultValue;
  }
}

async function fetchUserSafe(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) return Result.err(new HttpError(res.status, res.statusText));
    return Result.ok(await res.json());
  } catch (e) {
    return Result.err(e);
  }
}

async function demo() {
  const result = await fetchUserSafe(1);
  if (result.isOk) {
    console.log("User:", result.value.name);
  } else {
    console.log("Error:", result.error.message);
  }

  const name = result.map(u => u.name).unwrap("Unknown");
  console.log(name);
}

demo();

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. API client: সব errors কে custom class এ convert করো
// 2. Form validation: ValidationError class, multiple field errors
// 3. Result pattern দিয়ে safe division function তৈরি করো
