//Root Colors
(function () {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

// Typing Animation
var typed = new Typed(".text", {
  strings: [
    "Machine Learning Enthusiast.",
    "Web Developer.",
    "Python Programmer.",
    "Problem Solver.",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

//Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-item ul");
const toggleIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Switch icon
  if (navMenu.classList.contains("active")) {
    toggleIcon.classList.remove("bi-list");
    toggleIcon.classList.add("bi-x");
  } else {
    toggleIcon.classList.remove("bi-x");
    toggleIcon.classList.add("bi-list");
  }
});

// Window loader
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2000); //  seconds delay
});

// Scroll Progress
const progressBar = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrolled + "%";
});

// Toggle Button
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  function currentTheme() {
    return root.getAttribute("data-theme") || "dark";
  }
  function setIcon(theme) {
    if (!btn) return;
    btn.innerHTML =
      theme === "dark"
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon-stars"></i>';
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.title = btn.getAttribute("aria-label");
  }

  // Initialize icon on load
  setIcon(currentTheme());

  // Toggle on click + persist
  btn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIcon(next);
  });
})();

// AOS JS
AOS.init({
  duration: 1100, // Animation duration (in ms)
  once: true, // Animation happens only once
});

//Back to top button
const btn = document.getElementById("backToTop");
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
btn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

//MAil Sender
function sendmail() {
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const button = document.querySelector("button[type='button']");

  // Validate name
    if (name.length < 2) {
      alert("❌ Please enter your full name!");
      return;
    }

  // Email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address!");
    return;
  }

  // Validate message
    if (message.length < 5) {
      alert("❌ Please enter a longer message (at least 5 characters).");
      return;
    }

  const templateParams = {
    name: name,
    email: email,
    message: message,
  };

  // Show loading state
  button.disabled = true;
  button.innerText = "Sending...";

  emailjs
    .send("service_cjr54qp", "template_gdh566m", templateParams)
    .then(
      function (response) {
        console.log("✅ SUCCESS:", response);
        alert("✅ Email sent successfully!");
        document.querySelector("form").reset();
      },
      function (error) {
        console.error("❌ ERROR:", error);
        alert("❌ Failed to send email. Check console for details.");
      }
    )
    .finally(() => {
      // Restore button state
      button.disabled = false;
      button.innerText = "Send Message";
    });
}

//Slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// ===== Certificate Modal Script =====
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const captionText = document.getElementById("certModalCaption");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".see-cert-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // stop link opening in new tab
    modal.style.display = "block";
    modalImg.src = this.parentElement.querySelector("img").src;

    // Capture certificate title + platform (from <p> tags)
    const certName =
      this.parentElement.querySelectorAll("p")[0]?.innerText || "";
    const certPlatform =
      this.parentElement.querySelectorAll("p")[1]?.innerText || "";
    captionText.innerText = `${certName} — ${certPlatform}`;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
