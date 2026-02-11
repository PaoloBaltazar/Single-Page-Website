/**
 * Marci Metzger Homes — Main JavaScript
 * Handles: loader, custom cursor, navigation, scroll animations,
 * parallax, smooth scrolling, and counter animations.
 */

(function () {
  "use strict";

  // === LOADER ===
  function initLoader() {
    const loaderText = document.getElementById("loaderText");
    const letters = "MARCI METZGER".split("");

    letters.forEach(function (letter, index) {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      span.style.animationDelay = index * 0.05 + "s";
      loaderText.appendChild(span);
    });

    setTimeout(function () {
      document.getElementById("loader").classList.add("hidden");
    }, 2000);
  }

  // === NAVIGATION SCROLL ===
  function initNavScroll() {
    var nav = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 80);
    });
  }

  // === REVEAL ON SCROLL ===
  function initRevealAnimations() {
    var revealElements = document.querySelectorAll(".reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // === PARALLAX HERO ===
  function initParallax() {
    window.addEventListener("scroll", function () {
      var heroBg = document.querySelector(".hero-bg");
      var scroll = window.scrollY;

      if (scroll < window.innerHeight) {
        heroBg.style.transform =
          "scale(" +
          (1.1 - scroll * 0.0001) +
          ") translateY(" +
          scroll * 0.3 +
          "px)";
      }
    });
  }

  // === SMOOTH ANCHOR SCROLL ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // === COUNTER ANIMATION ===
  function initCounterAnimation() {
    function animateCounters() {
      document
        .querySelectorAll(".stat-number, .result-number")
        .forEach(function (el) {
          var text = el.textContent;
          var match = text.match(/[\d.]+/);
          if (!match) return;

          var target = parseFloat(match[0]);
          var prefix = text.slice(0, text.indexOf(match[0]));
          var suffix = text.slice(text.indexOf(match[0]) + match[0].length);
          var current = 0;
          var increment = target / 60;
          var isDecimal = match[0].includes(".");

          function update() {
            current += increment;

            if (current >= target) {
              el.innerHTML =
                prefix +
                (isDecimal ? target.toFixed(1) : Math.round(target)) +
                suffix;
              el.innerHTML = el.innerHTML.replace(
                /(\$|M|\+|#)/g,
                "<span>$1</span>"
              );
              return;
            }

            el.innerHTML =
              prefix +
              (isDecimal ? current.toFixed(1) : Math.round(current)) +
              suffix;
            el.innerHTML = el.innerHTML.replace(
              /(\$|M|\+|#)/g,
              "<span>$1</span>"
            );
            requestAnimationFrame(update);
          }

          update();
        });
    }

    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    var statsSection = document.querySelector(".about-stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // === CONTACT FORM ===
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you! We'll be in touch soon.");
      });
    }
  }

  // === INITIALIZE ALL MODULES ===
  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initNavScroll();
    initRevealAnimations();
    initParallax();
    initSmoothScroll();
    initCounterAnimation();
    initContactForm();
  });
})();
