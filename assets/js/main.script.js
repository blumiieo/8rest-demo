//HOME HERO SECTION & NAV START
document.addEventListener("DOMContentLoaded", function () {
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 10,
      mobile: true,
      live: true,
    }).init();
  }

  // Navbar Scroll Background Toggle
  const navPill = document.querySelector(".nav-pill");
  if (navPill) {
    function handleNavScroll() {
      if (window.scrollY > 30) {
        navPill.classList.add("is-scrolled");
      } else {
        navPill.classList.remove("is-scrolled");
      }
    }
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll(); // Run on initial page load
  }

  // Mobile Menu Toggle & Accessibility
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMenu(forceClose = false) {
    const isCurrentlyOpen = navToggle.getAttribute("aria-expanded") === "true";
    const willOpen = forceClose ? false : !isCurrentlyOpen;

    navToggle.setAttribute("aria-expanded", willOpen);
    mobileMenu.classList.toggle("is-open", willOpen);
    mobileMenu.setAttribute("aria-hidden", !willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  }

  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      toggleMenu(true);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      navToggle.getAttribute("aria-expanded") === "true"
    ) {
      toggleMenu(true);
    }
  });
});
// HOME HERO SECTION & NAV END

// HOME SECTION 7 REVIEWS SLIDER START
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("reviewsTrack");
  const prevBtn = document.getElementById("reviewPrevBtn");
  const nextBtn = document.getElementById("reviewNextBtn");
  const thumb = document.getElementById("reviewsProgressThumb");

  if (!track || !prevBtn || !nextBtn) return;

  // Calculates the scroll distance of one card + its gap
  function getScrollStep() {
    const firstCard = track.querySelector(".review-slide-item");
    if (!firstCard) return 320;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    return firstCard.offsetWidth + gap;
  }

  // Updates arrow disabled states and moves the indicator thumb
  function syncSlider() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const currentScroll = track.scrollLeft;

    // 1. Button active/disabled state
    prevBtn.disabled = currentScroll <= 4;
    nextBtn.disabled = currentScroll >= maxScroll - 4;

    // 2. Indicator bar translation
    if (thumb && maxScroll > 0) {
      const progressBar = thumb.parentElement;
      const barWidth = progressBar.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const maxTranslate = barWidth - thumbWidth;

      const ratio = Math.min(1, Math.max(0, currentScroll / maxScroll));
      const translateX = ratio * maxTranslate;

      thumb.style.transform = `translateX(${translateX}px)`;
    }
  }

  // Button clicks: use scrollBy with smooth behavior
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  // Keep progress bar in sync during manual touch, trackpad, or button scroll
  track.addEventListener("scroll", syncSlider, { passive: true });
  window.addEventListener("resize", syncSlider, { passive: true });

  // Initial call on page load
  syncSlider();
});
// HOME SECTION 7 REVIEWS SLIDER END

// HOME SECTION 8 FAQ ACCORDION START
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const header = item.querySelector(".faq-header");
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon");

    // Initialize initial state (e.g., items with .is-open)
    if (item.classList.contains("is-open")) {
      body.style.maxHeight = body.scrollHeight + "px";
      header.setAttribute("aria-expanded", "true");
      if (icon) icon.innerHTML = "&times;";
    } else {
      body.style.maxHeight = null;
      header.setAttribute("aria-expanded", "false");
      if (icon) icon.innerHTML = "+";
    }

    header.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");

      if (isOpen) {
        // Close item
        item.classList.remove("is-open");
        body.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
        if (icon) icon.innerHTML = "+";
      } else {
        // Open item
        item.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
        if (icon) icon.innerHTML = "&times;";
      }
    });
  });

  // Re-calculate heights if viewport resizes while an item is expanded
  window.addEventListener("resize", function () {
    document
      .querySelectorAll(".faq-item.is-open .faq-body")
      .forEach(function (body) {
        body.style.maxHeight = body.scrollHeight + "px";
      });
  });
});
// HOME SECTION 8 FAQ ACCORDION END

// CONTACT FORM OPTION POPUP START
document
  .querySelectorAll(".custom-select-dropdown .dropdown-item")
  .forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      var selectedVal = this.getAttribute("data-value");

      // Update display text and hidden input value
      document.getElementById("selectedOptionText").textContent = selectedVal;
      document.getElementById("product_interest").value = selectedVal;

      // Update active highlight
      document
        .querySelectorAll(".custom-select-dropdown .dropdown-item")
        .forEach(function (el) {
          el.classList.remove("active");
        });
      this.classList.add("active");
    });
  });
// CONTACT FORM OPTION POPUP END

/* BACK TO TOP FLOATING BUTTON START */
  (function () {
    const btn = document.getElementById('btnScrollTop');
    if (!btn) return;

    // Show button when scrolled halfway down or approaching bottom
    window.addEventListener('scroll', function () {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Reveals button once user scrolls past 350px or 40% of the page
      if (scrollPos > 350 || (scrollPos / scrollHeight) > 0.4) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    // Smooth scroll to top on click
    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  })();
/* BACK TO TOP FLOATING BUTTON END */
