// Saturn Mobile Detailing — site scripts

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const setOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.classList.toggle("is-open", open);
  };
  navToggle.addEventListener("click", () => {
    setOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });
  // Close after tapping a link, so same-page anchors aren't hidden behind the menu
  siteNav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
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

// Forms — submit to Formspree via fetch so the user stays on the page
async function sendForm(form, status) {
  if (form.action.includes("YOUR_ID")) {
    status.textContent = "Form not connected yet — see README for Formspree setup.";
    status.className = "form-status is-error";
    return false;
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
    return true;
  } catch {
    status.textContent = "Something went wrong. Please call or text us instead.";
    status.className = "form-status is-error";
    return false;
  }
}

// Preselect package from ?package=… links (services page → contact page)
const pkgParam = new URLSearchParams(location.search).get("package");
const selectPackage = (select, value) => {
  if (select && value && select.querySelector(`option[value="${CSS.escape(value)}"]`)) select.value = value;
};

// Booking form (contact page)
const bookingForm = document.querySelector("#booking-form");

if (bookingForm) {
  const status = bookingForm.querySelector(".form-status");
  selectPackage(bookingForm.querySelector('select[name="package"]'), pkgParam);

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm(bookingForm, status);
  });
}

// Quote widget (home page) — three steps, each validated before moving on
const quoteForm = document.querySelector(".quote-form");

if (quoteForm) {
  const steps = [...quoteForm.querySelectorAll("[data-step]")];
  const bars = [...quoteForm.querySelectorAll(".quote-progress-bar span")];
  const currentLabel = quoteForm.querySelector("[data-step-current]");
  const backBtn = quoteForm.querySelector("[data-step-back]");
  const nextBtn = quoteForm.querySelector("[data-step-next]");
  const status = quoteForm.querySelector(".form-status");
  const pkgSelect = quoteForm.querySelector('select[name="package"]');
  let current = 0;

  const show = (i) => {
    current = i;
    steps.forEach((step, n) => (step.hidden = n !== i));
    bars.forEach((bar, n) => bar.classList.toggle("is-done", n <= i));
    currentLabel.textContent = i + 1;
    backBtn.hidden = i === 0;
    nextBtn.textContent = i === steps.length - 1 ? "Request My Quote" : "Continue";
  };

  // Stops at the first invalid field and shows the browser's message for it
  const stepIsValid = (step) => [...step.elements].every((el) => el.reportValidity());

  selectPackage(pkgSelect, pkgParam);

  // "Get a Quote" buttons on package cards preselect that package
  document.querySelectorAll("[data-package]").forEach((btn) => {
    btn.addEventListener("click", () => selectPackage(pkgSelect, btn.dataset.package));
  });

  backBtn.addEventListener("click", () => show(current - 1));

  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!stepIsValid(steps[current])) return;
    if (current < steps.length - 1) {
      show(current + 1);
      steps[current].querySelector("input, select")?.focus();
      return;
    }
    if (await sendForm(quoteForm, status)) show(0);
  });
}
