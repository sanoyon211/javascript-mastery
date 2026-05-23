// ============================================================
// 📘 04 - async/await (সবচেয়ে Clean Async Code)
// ============================================================
// async/await হলো Promise এর উপর তৈরি syntactic sugar
// Async code কে synchronous এর মতো readable করে!
// ============================================================

// ============================================================
// 📌 Basic async/await
// ============================================================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function সবসময় Promise return করে:
async function greet() {
  await delay(1000); // delay শেষ না হওয়া পর্যন্ত অপেক্ষা করে
  return "Hello, Async World!"; // automatically Promise.resolve() এ wrap হয়
}

greet().then(msg => console.log(msg)); // Hello, Async World!

// ============================================================
// 📌 await — Promise resolve হওয়ার জন্য অপেক্ষা করে
// ============================================================
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Karim", role: "admin" }), 500);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, title: "Post 1", userId },
      { id: 2, title: "Post 2", userId }
    ]), 300);
  });
}

// Promise Chaining (কঠিন):
// fetchUser(1).then(user => fetchPosts(user.id)).then(posts => ...)

// async/await (সহজ ও readable):
async function getUserAndPosts(userId) {
  const user = await fetchUser(userId);    // অপেক্ষা করো
  console.log("User:", user.name);

  const posts = await fetchPosts(user.id); // আবার অপেক্ষা করো
  console.log("Posts:", posts.length, "টি");

  return { user, posts }; // return করলে Promise এ wrap হয়
}

getUserAndPosts(1);

// ============================================================
// 📌 Error Handling — try/catch
// ============================================================
function fetchData(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail
        ? reject(new Error("Server error! 500"))
        : resolve({ data: "সফলভাবে data পাওয়া গেছে" });
    }, 500);
  });
}

async function loadData() {
  try {
    const result = await fetchData(false);
    console.log("✅", result.data);

    const fail = await fetchData(true); // এটা throw করবে
    console.log("এটা দেখাবে না");
  } catch (error) {
    console.log("❌ Error caught:", error.message);
  } finally {
    console.log("Loading শেষ (সবসময় চলে)");
  }
}

loadData();

// ============================================================
// 📌 Parallel Execution — একসাথে চালাও (Performance!)
// ============================================================
async function sequential() {
  console.time("Sequential");
  const user = await fetchUser(1);        // 500ms অপেক্ষা
  const posts = await fetchPosts(user.id); // আবার 300ms
  console.timeEnd("Sequential");           // ~800ms
  return { user, posts };
}

async function parallel() {
  console.time("Parallel");
  const [user, posts] = await Promise.all([
    fetchUser(1),     // দুটো একসাথে শুরু!
    fetchPosts(1)
  ]);
  console.timeEnd("Parallel"); // ~500ms (সবচেয়ে বেশি যেটা)
  return { user, posts };
}

// parallel(); // অনেক দ্রুত!

// ============================================================
// 📌 async forEach, map (Common Mistake!)
// ============================================================
const userIds = [1, 2, 3];

// ❌ forEach async কাজ করে না:
async function wrongWay() {
  userIds.forEach(async (id) => {
    const user = await fetchUser(id);
    console.log(user.name); // order নিশ্চিত নয়!
  });
  // forEach await করে না!
}

// ✅ for...of ব্যবহার করো (sequential):
async function correctSequential() {
  for (const id of userIds) {
    const user = await fetchUser(id);
    console.log(user.name); // order নিশ্চিত
  }
}

// ✅ Promise.all দিয়ে parallel:
async function correctParallel() {
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );
  users.forEach(user => console.log(user.name));
}

// ============================================================
// 📌 Real World: API Call with async/await
// ============================================================
async function getGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      name: data.name,
      followers: data.followers,
      repos: data.public_repos
    };
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("Network connection error!");
    }
    throw error;
  }
}

// Browser বা Node.js 18+ এ কাজ করবে:
// const userData = await getGitHubUser("torvalds");
// console.log(userData);

// ============================================================
// 📌 Top-level await (ES2022, Modules এ)
// ============================================================
// Module এ directly await করা যায়:
// const data = await fetchData();
// (শুধু type="module" বা .mjs file এ)

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. async function লেখো যা ৩টি city এর weather একসাথে fetch করে
// 2. Retry function: 3 বার চেষ্টা করবে, তারপরও fail হলে error throw
// 3. Queue: একের পর এক async task চালাও (sequential)
