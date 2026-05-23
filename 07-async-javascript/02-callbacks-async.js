// ============================================================
// 📘 02 - Callbacks in Async Context
// ============================================================

// ============================================================
// 📌 Async Callback Patterns
// ============================================================

// Simulated async operations:
function getUser(id, callback) {
  setTimeout(() => {
    if (id <= 0) return callback(new Error("Invalid ID"), null);
    callback(null, { id, name: "Karim", role: "admin" });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, title: "First Post", userId },
      { id: 2, title: "Second Post", userId }
    ]);
  }, 400);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, text: "Great post!", postId },
      { id: 2, text: "Thanks!", postId }
    ]);
  }, 300);
}

// ============================================================
// 📌 Callback Hell — The Problem
// ============================================================
getUser(1, (err, user) => {
  if (err) { console.error(err); return; }
  console.log("User:", user.name);

  getPosts(user.id, (err, posts) => {
    if (err) { console.error(err); return; }
    console.log("Posts:", posts.length);

    getComments(posts[0].id, (err, comments) => {
      if (err) { console.error(err); return; }
      console.log("Comments:", comments.length);
      // আরো deep গেলে আরো nested — Pyramid of Doom!
    });
  });
});

// ============================================================
// 📌 Promisify — Callback → Promise (সমাধান!)
// ============================================================
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

// Convert করো:
const getUserAsync = promisify(getUser);
const getPostsAsync = promisify(getPosts);
const getCommentsAsync = promisify(getComments);

// এখন clean async/await:
async function loadUserData(userId) {
  const user = await getUserAsync(userId);
  console.log("User:", user.name);

  const posts = await getPostsAsync(user.id);
  console.log("Posts:", posts.length);

  const comments = await getCommentsAsync(posts[0].id);
  console.log("Comments:", comments.length);
}

loadUserData(1);

// Node.js এ built-in promisify:
// const { promisify } = require("util");
// const readFileAsync = promisify(fs.readFile);

// ============================================================
// 📌 Parallel Callbacks (async.js style)
// ============================================================
function parallel(tasks, done) {
  const results = [];
  let completed = 0;
  let hasError = false;

  tasks.forEach((task, i) => {
    task((err, result) => {
      if (hasError) return;
      if (err) {
        hasError = true;
        return done(err);
      }
      results[i] = result;
      if (++completed === tasks.length) {
        done(null, results);
      }
    });
  });
}

// Usage:
parallel([
  cb => getUser(1, cb),
  cb => getPosts(1, cb),
  cb => getComments(1, cb)
], (err, [user, posts, comments]) => {
  if (err) return console.error(err);
  console.log("All loaded:", user.name, posts.length, "posts", comments.length, "comments");
});

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. promisify function implement করো এবং test করো
// 2. waterfall: একটার output পরেরটার input
// 3. race: প্রথমে যে শেষ করে তারটাই নাও
