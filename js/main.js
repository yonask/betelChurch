document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => menu.classList.toggle("show"));
  }

  const target = new Date("2026-06-14T19:00:00-04:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, "0");
    };

    set("days", d);
    set("hours", h);
    set("minutes", m);
    set("seconds", s);

    const mini = document.getElementById("miniCountdown");
    if (mini) mini.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const filterButtons = document.querySelectorAll(".filter");
  const filterItems = document.querySelectorAll(".filter-item");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      filterItems.forEach((item) => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "block" : "none";
      });
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      document.getElementById("formMsg").textContent = `Thank you, ${name || "friend"}! Your message has been received.`;
      contactForm.reset();
    });
  }

  const prayerForm = document.getElementById("prayerForm");
  if (prayerForm) {
    prayerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById("prayerMsg").textContent = "Thank you. Your prayer request has been submitted.";
      prayerForm.reset();
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById("newsletterMsg").textContent = "Subscribed successfully!";
      newsletterForm.reset();
    });
  }

  const giveButton = document.getElementById("giveButton");
  if (giveButton) {
    giveButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Replace this with your real online giving/payment provider link.");
    });
  }
});
