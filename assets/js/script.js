'use strict';


// theme variables
const root = document.documentElement;
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const themeToggleIcon = themeToggleBtn ? themeToggleBtn.querySelector("ion-icon") : null;
const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "preferred-theme";

const getStoredTheme = function () {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null;
  }
}

const setStoredTheme = function (theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    // Ignore write failures (e.g., strict privacy mode)
  }
}

const applyTheme = function (theme) {
  root.dataset.theme = theme;
  if (!themeToggleBtn || !themeToggleIcon) return;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggleBtn.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggleBtn.setAttribute("title", `Switch to ${nextTheme} theme`);
  themeToggleIcon.setAttribute("name", theme === "dark" ? "sunny-outline" : "moon-outline");
}

const storedTheme = getStoredTheme();
const initialTheme = storedTheme === "light" || storedTheme === "dark"
  ? storedTheme
  : (systemThemeMedia.matches ? "dark" : "light");

applyTheme(initialTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const currentTheme = root.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });
}

const syncWithSystemTheme = function (event) {
  if (getStoredTheme()) return;
  applyTheme(event.matches ? "dark" : "light");
}

if (typeof systemThemeMedia.addEventListener === "function") {
  systemThemeMedia.addEventListener("change", syncWithSystemTheme);
} else if (typeof systemThemeMedia.addListener === "function") {
  systemThemeMedia.addListener(syncWithSystemTheme);
}



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
