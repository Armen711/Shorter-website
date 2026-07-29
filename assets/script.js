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

document.addEventListener("DOMContentLoaded", initWaitlistForms);
