// Saturn Mobile Detailing — site scripts

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    siteNav.classList.toggle("is-open", !open);
  });
}

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Gallery lightbox
const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const close = () => lightbox.classList.remove("is-open");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return; // placeholder tile, nothing to show
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      closeBtn.focus();
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// Booking form — submits to Formspree via fetch so the user stays on the page
const form = document.querySelector("#booking-form");

if (form) {
  const status = form.querySelector(".form-status");

  // Preselect package from ?package=… links on the services page
  const pkg = new URLSearchParams(location.search).get("package");
  const pkgSelect = form.querySelector("#package");
  if (pkg && pkgSelect.querySelector(`option[value="${CSS.escape(pkg)}"]`)) pkgSelect.value = pkg;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (form.action.includes("YOUR_ID")) {
      status.textContent = "Form not connected yet — see README for Formspree setup.";
      status.className = "form-status is-error";
      return;
    }

    status.textContent = "Sending…";
    status.className = "form-status";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.textContent = "Thanks! We'll reach out shortly to confirm your appointment.";
      status.className = "form-status is-success";
    } catch {
      status.textContent = "Something went wrong. Please call or text us instead.";
      status.className = "form-status is-error";
    }
  });
}
