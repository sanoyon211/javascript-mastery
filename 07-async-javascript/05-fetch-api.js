// ============================================================
// 📘 05 - Fetch API (HTTP Requests)
// ============================================================
// fetch() দিয়ে browser থেকে server এ request পাঠাই
// REST API এর সাথে communicate করার মূল উপায়
// ============================================================

// ============================================================
// 📌 GET Request (Data পড়া)
// ============================================================
async function getUsers() {
  try {
    // 1. Request পাঠাও
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // 2. Status check করো
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // 3. JSON parse করো
    const users = await response.json();

    // 4. Data ব্যবহার করো
    users.slice(0, 3).forEach(user => {
      console.log(`${user.name} — ${user.email}`);
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
}

// getUsers(); // Browser console এ run করো

// ============================================================
// 📌 POST Request (Data পাঠানো)
// ============================================================
async function createPost(title, body, userId) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",           // HTTP method
      headers: {
        "Content-Type": "application/json",  // JSON পাঠাচ্ছি
        "Authorization": "Bearer your-token-here" // Auth token
      },
      body: JSON.stringify({ title, body, userId }) // object → JSON string
    });

    if (!response.ok) throw new Error(`POST failed: ${response.status}`);

    const newPost = await response.json();
    console.log("নতুন post তৈরি হলো:", newPost);
    return newPost;
  } catch (error) {
    console.error("Post creation failed:", error.message);
  }
}

// createPost("আমার প্রথম পোস্ট", "JavaScript অনেক মজার!", 1);

// ============================================================
// 📌 PUT/PATCH Request (Data Update করা)
// ============================================================
async function updatePost(postId, updates) {
  // PUT: পুরো resource replace করে
  // PATCH: শুধু নির্দিষ্ট fields update করে

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });

  return response.json();
}

// ============================================================
// 📌 DELETE Request
// ============================================================
async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    console.log(`Post ${postId} deleted successfully`);
    return true;
  }
  return false;
}

// ============================================================
// 📌 Response Object — গুরুত্বপূর্ণ properties
// ============================================================
async function checkResponse() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  console.log(response.ok);          // true (200-299 হলে)
  console.log(response.status);      // 200
  console.log(response.statusText);  // "OK"
  console.log(response.url);         // full URL
  console.log(response.headers.get("content-type")); // "application/json; charset=utf-8"

  // Body read করার methods (একবারই পড়া যায়!):
  // response.json()    → JSON parse করে
  // response.text()    → plain text
  // response.blob()    → binary (image, file)
  // response.arrayBuffer() → raw binary
}

// ============================================================
// 📌 API Service Class (Real World Pattern)
// ============================================================
class ApiService {
  constructor(baseURL, token = null) {
    this.baseURL = baseURL;
    this.token = token;
  }

  #getHeaders(extra = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...extra
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async #request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.#getHeaders(),
      ...options
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    // 204 No Content হলে json নেই
    if (response.status === 204) return null;

    return response.json();
  }

  get(endpoint)              { return this.#request(endpoint); }
  post(endpoint, data)       { return this.#request(endpoint, { method: "POST", body: JSON.stringify(data) }); }
  put(endpoint, data)        { return this.#request(endpoint, { method: "PUT", body: JSON.stringify(data) }); }
  patch(endpoint, data)      { return this.#request(endpoint, { method: "PATCH", body: JSON.stringify(data) }); }
  delete(endpoint)           { return this.#request(endpoint, { method: "DELETE" }); }
}

// Usage:
const api = new ApiService("https://jsonplaceholder.typicode.com", "my-token");

async function demo() {
  // const posts = await api.get("/posts");
  // const post = await api.post("/posts", { title: "New Post", body: "Content" });
  // await api.delete("/posts/1");
  console.log("API Service ready!");
}

demo();

// ============================================================
// 📌 AbortController — Request cancel করা
// ============================================================
async function fetchWithCancel() {
  const controller = new AbortController();

  // ৫ সেকেন্ড পরে cancel:
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal
    });
    clearTimeout(timeoutId); // সফল হলে timeout cancel
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request cancelled!");
    } else {
      throw error;
    }
  }
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// jsonplaceholder.typicode.com ব্যবহার করো:
// 1. সব posts fetch করো, শুধু title দেখাও
// 2. নতুন user create করো (POST)
// 3. Post এর comment গুলো fetch করো
// 4. Search: title এ keyword থাকলে filter করো
