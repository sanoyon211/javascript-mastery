// ============================================================
// 📘 06 - Forms & Validation
// ============================================================

// ============================================================
// 📌 Form Data পড়া
// ============================================================
const form = document.querySelector("#registrationForm");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Method 1: FormData API
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  // Method 2: Manual
  const name = form.querySelector("[name='name']").value.trim();
  const email = form.querySelector("[name='email']").value.trim();
  const password = form.querySelector("[name='password']").value;

  // Validate করো:
  const errors = validateForm({ name, email, password });

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  // Submit করো:
  submitForm({ name, email, password });
});

// ============================================================
// 📌 Validation
// ============================================================
function validateForm(data) {
  const errors = {};

  // Name:
  if (!data.name) {
    errors.name = "নাম দেওয়া আবশ্যক";
  } else if (data.name.length < 3) {
    errors.name = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
  }

  // Email:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = "ইমেইল দেওয়া আবশ্যক";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "সঠিক ইমেইল দিন";
  }

  // Password:
  if (!data.password) {
    errors.password = "পাসওয়ার্ড দেওয়া আবশ্যক";
  } else if (data.password.length < 8) {
    errors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
    errors.password = "পাসওয়ার্ডে বড় হাতা অক্ষর ও সংখ্যা থাকতে হবে";
  }

  return errors;
}

function showErrors(errors) {
  // আগের errors মুছে ফেলো:
  document.querySelectorAll(".error-msg").forEach(el => el.remove());
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

  for (const [field, message] of Object.entries(errors)) {
    const input = form?.querySelector(`[name="${field}"]`);
    if (!input) continue;

    input.classList.add("error");

    const errorEl = document.createElement("span");
    errorEl.classList.add("error-msg");
    errorEl.textContent = message;
    input.parentNode?.insertAdjacentElement("beforeend", errorEl);
  }
}

async function submitForm(data) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Registration failed");

    console.log("✅ Registration successful!");
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
}

// ============================================================
// 📌 Real-time Validation
// ============================================================
function setupRealTimeValidation() {
  const inputs = form?.querySelectorAll("input, textarea, select");

  inputs?.forEach(input => {
    input.addEventListener("blur", () => {
      validateField(input);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input); // error থাকলে real-time validate
      }
    });
  });
}

function validateField(input) {
  const name = input.name;
  const value = input.value.trim();
  const errors = validateForm({ [name]: value });

  const existingError = input.parentNode?.querySelector(".error-msg");
  existingError?.remove();

  if (errors[name]) {
    input.classList.add("error");
    const errorEl = document.createElement("span");
    errorEl.classList.add("error-msg");
    errorEl.textContent = errors[name];
    input.parentNode?.append(errorEl);
  } else {
    input.classList.remove("error");
    input.classList.add("valid");
  }
}

// ============================================================
// 📌 Input Types Handle করা
// ============================================================
function getInputValue(input) {
  switch (input.type) {
    case "checkbox":
      return input.checked;
    case "radio":
      const radioGroup = document.querySelectorAll(`[name="${input.name}"]:checked`);
      return radioGroup[0]?.value;
    case "file":
      return input.files[0]; // File object
    case "number":
    case "range":
      return Number(input.value);
    default:
      return input.value.trim();
  }
}

// ============================================================
// 📌 File Upload Preview
// ============================================================
const fileInput = document.querySelector("#avatar");
fileInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file:
  if (!file.type.startsWith("image/")) {
    alert("শুধু image file গ্রহণযোগ্য");
    e.target.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) { // 2MB limit
    alert("File size 2MB এর বেশি হবে না");
    e.target.value = "";
    return;
  }

  // Preview:
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.querySelector("#avatar-preview");
    if (preview) preview.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// HTML তৈরি করো এবং:
// 1. Multi-step form: Next/Previous button সহ ৩টি step
// 2. Password strength indicator: weak/medium/strong দেখাবে
// 3. Phone number auto-format: 01712345678 → 017-1234-5678
// 4. OTP input: 6টি box, একটায় লিখলে পরেরটায় focus যাবে
