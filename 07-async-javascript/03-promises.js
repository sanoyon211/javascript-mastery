// ============================================================
// 📘 03 - Promises (Callback Hell এর সমাধান)
// ============================================================
// Promise হলো একটা object যে ভবিষ্যতে কোনো value দেওয়ার "প্রতিশ্রুতি" দেয়
//
// Promise এর ৩টি state:
// 1. Pending   → কাজ চলছে
// 2. Fulfilled → কাজ সফল হয়েছে
// 3. Rejected  → কাজ ব্যর্থ হয়েছে
// ============================================================

// ============================================================
// 📌 Promise তৈরি করা
// ============================================================
const myPromise = new Promise((resolve, reject) => {
  // Async কাজ এখানে করো
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("কাজ সফল হয়েছে! ✅"); // fulfilled
    } else {
      reject(new Error("কাজ ব্যর্থ হয়েছে! ❌")); // rejected
    }
  }, 1000);
});

// ============================================================
// 📌 Promise ব্যবহার করা (.then, .catch, .finally)
// ============================================================
myPromise
  .then(result => {
    console.log("Success:", result); // fulfilled হলে
    return "পরের কাজ";              // chain করার জন্য
  })
  .then(next => {
    console.log("Next:", next);      // আগের return value পায়
  })
  .catch(error => {
    console.log("Error:", error.message); // rejected হলে
  })
  .finally(() => {
    console.log("সবশেষে সবসময় চলে"); // success বা failure যাই হোক
  });

// ============================================================
// 📌 Real World Promise — API Call simulation
// ============================================================
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log(`User ${userId} fetch করা হচ্ছে...`);

    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("Invalid user ID"));
        return;
      }
      resolve({
        id: userId,
        name: "Karim Uddin",
        email: "karim@email.com"
      });
    }, 1500);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    console.log(`User ${userId} এর posts fetch করা হচ্ছে...`);
    setTimeout(() => {
      resolve([
        { id: 1, title: "JavaScript শেখার অভিজ্ঞতা" },
        { id: 2, title: "Web Development Journey" }
      ]);
    }, 1000);
  });
}

// Promise Chaining:
fetchUser(1)
  .then(user => {
    console.log("User:", user.name);
    return fetchUserPosts(user.id); // নতুন promise return
  })
  .then(posts => {
    console.log("Posts:", posts.length, "টি পোস্ট পাওয়া গেছে");
    posts.forEach(p => console.log(" -", p.title));
  })
  .catch(error => {
    console.log("Error:", error.message);
  });

// ============================================================
// 📌 Promise.all() — একসাথে অনেক Promise চালাও
// ============================================================
const promise1 = Promise.resolve(1);
const promise2 = new Promise(res => setTimeout(() => res(2), 500));
const promise3 = new Promise(res => setTimeout(() => res(3), 300));

// সবগুলো শেষ হওয়ার পরে result পাবো:
Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log("All results:", results); // [1, 2, 3]
  });

// ⚠️ একটাও fail হলে সব fail:
Promise.all([
  Promise.resolve("ok"),
  Promise.reject(new Error("একটা fail হলো")),
  Promise.resolve("ok2")
]).catch(err => console.log("Promise.all failed:", err.message));

// ============================================================
// 📌 Promise.allSettled() — সব শেষ হোক, fail হলেও
// ============================================================
Promise.allSettled([
  Promise.resolve("success"),
  Promise.reject(new Error("failed")),
  Promise.resolve("another success")
]).then(results => {
  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("✅", result.value);
    } else {
      console.log("❌", result.reason.message);
    }
  });
});

// ============================================================
// 📌 Promise.race() — যে আগে শেষ করবে তারটা নেবো
// ============================================================
const fast = new Promise(res => setTimeout(() => res("দ্রুত!"), 100));
const slow = new Promise(res => setTimeout(() => res("ধীর!"), 500));

Promise.race([fast, slow])
  .then(winner => console.log("Winner:", winner)); // "দ্রুত!"

// Timeout pattern:
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// ============================================================
// 📌 Promise.any() — যেকোনো একটা success হলেই চলবে
// ============================================================
Promise.any([
  Promise.reject(new Error("fail 1")),
  Promise.resolve("success!"),
  Promise.reject(new Error("fail 2"))
]).then(result => console.log("Any:", result)); // "success!"

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. delay(ms) function: Promise দিয়ে ms millisecond পরে resolve করে
// 2. 3টি API call একসাথে করো (Promise.all), সব data মিলিয়ে দেখাও
// 3. Retry mechanism: fail হলে ৩ বার আবার চেষ্টা করো
