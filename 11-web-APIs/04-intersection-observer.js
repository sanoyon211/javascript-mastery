// ============================================================
// 📘 04 - Intersection Observer API
// ============================================================
// Element viewport এ আছে কিনা detect করা
// Lazy loading, infinite scroll, animations, ads tracking

// ============================================================
// 📌 Basic Usage
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(`${entry.target.id} is visible!`);
      // Animation trigger:
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target); // একবার দেখালেই থামো
    } else {
      console.log(`${entry.target.id} is not visible`);
    }
  });
}, {
  root: null,          // null = viewport
  threshold: 0.1,      // 10% visible হলে trigger
  rootMargin: "0px"    // margin (negative = early trigger)
});

// Observe করা:
document.querySelectorAll(".animate-on-scroll").forEach(el => {
  observer.observe(el);
});

// ============================================================
// 📌 Lazy Image Loading
// ============================================================
function setupLazyImages() {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;         // data-src থেকে real src
        img.classList.remove("lazy");
        imageObserver.unobserve(img);       // load হলে unobserve
      }
    });
  }, { rootMargin: "200px" }); // 200px আগেই load শুরু

  document.querySelectorAll("img[data-src]").forEach(img => {
    imageObserver.observe(img);
  });
}

// HTML: <img data-src="real-image.jpg" src="placeholder.jpg" class="lazy">
setupLazyImages();

// ============================================================
// 📌 Infinite Scroll
// ============================================================
let page = 1;
let isLoading = false;

const loadMoreObserver = new IntersectionObserver(async (entries) => {
  const sentinel = entries[0]; // last element
  if (sentinel.isIntersecting && !isLoading) {
    isLoading = true;
    await loadMoreData(page++);
    isLoading = false;
  }
});

async function loadMoreData(pageNum) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`);
    const posts = await response.json();

    const container = document.querySelector("#posts-container");
    posts.forEach(post => {
      const el = document.createElement("div");
      el.textContent = post.title;
      container?.append(el);
    });

    // Sentinel এ পরিণত করো:
    const lastItem = container?.lastElementChild;
    if (lastItem) loadMoreObserver.observe(lastItem);
  } catch (e) {
    console.error("Failed to load more:", e);
  }
}

// ============================================================
// 📌 Read Progress Bar
// ============================================================
function setupReadProgress() {
  const article = document.querySelector("article");
  if (!article) return;

  const progressObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const progress = Math.min(100, Math.round(
      (entry.boundingClientRect.bottom < 0
        ? 100
        : (1 - entry.intersectionRatio) * 100)
    ));
    document.querySelector("#progress-bar")?.style.setProperty("width", `${progress}%`);
  }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });

  progressObserver.observe(article);
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. Card list: viewport এ আসলে fade-in animation হবে
// 2. Sticky header: scroll করলে header shadow আসবে
// 3. "Back to top" button: নিচে গেলে দেখাবে
