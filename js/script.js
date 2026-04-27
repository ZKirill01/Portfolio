// ─────────────────────────────
// COLOR MODE TOGGLE (LIGHT DEFAULT)
// ─────────────────────────────

const modeToggle = document.getElementById("mode-toggle");

// default to light if nothing is stored
const savedMode = localStorage.getItem("colorMode") ?? "light";

// apply theme immediately
document.documentElement.classList.toggle("light", savedMode === "light");

// ensure storage is always set
localStorage.setItem("colorMode", savedMode);

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");

    localStorage.setItem("colorMode", isLight ? "light" : "dark");
  });
}

// ─────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────

const cursor = document.getElementById("cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document
    .querySelectorAll("a, button, .cs-image, .about-photo")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("hovering"),
      );
    });
}

// ─────────────────────────────
// SECTION REVEAL (GLOBAL VERSION)
// ─────────────────────────────

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0) * 120;

        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);

        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".cs-card").forEach((el) => io.observe(el));
