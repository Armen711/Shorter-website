// Progressive-enhancement handler shared by every form with class
// "js-waitlist-form" (customer + barber). Submits via fetch so we can show
// an inline success/error message instead of a full page reload/redirect —
// works with Formspree's JSON response format out of the box.
function initWaitlistForms() {
  var forms = document.querySelectorAll("form.js-waitlist-form");

  forms.forEach(function (form) {
    var status = form.querySelector(".form-status");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }

      var action = form.getAttribute("action") || "";
      if (!action || action.indexOf("REPLACE_WITH_YOUR_FORM_ID") !== -1) {
        if (status) {
          status.className = "form-status error";
          status.textContent =
            "Form isn't connected yet — add your Formspree endpoint (see README).";
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
      }

      try {
        var response = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.reset();
          if (status) {
            status.className = "form-status success";
            status.textContent = "You're on the list! We'll be in touch.";
          }
        } else {
          if (status) {
            status.className = "form-status error";
            status.textContent =
              "Something went wrong submitting the form. Please try again.";
          }
        }
      } catch (err) {
        if (status) {
          status.className = "form-status error";
          status.textContent =
            "Couldn't reach the form service. Check your connection and try again.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  });
}

// Mobile nav dropdown: toggles the collapsed link list open/closed, closes
// on link tap, outside tap, Escape, or if the viewport is resized back up to
// the desktop layout (where the links are always visible inline).
function initNavToggle() {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("site-nav-links");
  if (!toggle || !links) return;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    links.classList.add("is-open");
    toggle.setAttribute("aria-label", "Close menu");
  }

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (!links.classList.contains("is-open")) return;
    if (links.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initWaitlistForms();
  initNavToggle();
});
