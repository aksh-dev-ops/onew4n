// ===== Onew4n Photography — shared scripts =====
(function () {
  // Header background on scroll
  var header = document.querySelector(".site-header");
  if (header && !header.classList.contains("solid")) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // Portfolio filters
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".gallery figure");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.dataset.filter;
      items.forEach(function (fig) {
        fig.classList.toggle("hidden", cat !== "all" && fig.dataset.cat !== cat);
      });
    });
  });

  // Lightbox
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    items.forEach(function (fig) {
      fig.addEventListener("click", function () {
        var img = fig.querySelector("img");
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt;
        lb.classList.add("open");
      });
    });
    var close = function () { lb.classList.remove("open"); lbImg.src = ""; };
    lb.addEventListener("click", function (e) { if (e.target !== lbImg) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Testimonials slider
  var quotes = document.querySelectorAll(".quote-item");
  var dots = document.querySelectorAll(".quote-dots button");
  if (quotes.length) {
    var current = 0;
    var show = function (i) {
      quotes[current].classList.remove("active"); dots[current].classList.remove("active");
      current = i;
      quotes[current].classList.add("active"); dots[current].classList.add("active");
    };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { show(i); }); });
    setInterval(function () { show((current + 1) % quotes.length); }, 7000);
  }

  // Contact form validation
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var ok = input.type === "checkbox" ? input.checked :
                 input.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()) :
                 input.value.trim() !== "";
        if (field) field.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;

      // TODO: connect to a form backend (e.g. Formspree, Netlify Forms, or your own API).
      // Example: set form action="https://formspree.io/f/XXXX" and remove preventDefault above.
      form.reset();
      document.querySelector(".form-success").classList.add("show");
    });
  }
})();
