const themeLink = document.getElementById("theme-link");
const themeIcon = document.getElementById("theme-icon");
let currentTheme = "light";

loadCurrentTheme();

function loadCurrentTheme() {
    const loadedTheme = localStorage.getItem("savedTheme") ?? "light";
    themeLink.href = `themes/${loadedTheme}-theme.css`;

    const icon = localStorage.getItem("savedThemeIcon") ?? "sun";
    themeIcon.src = `icons/${icon}.svg`;
    themeIcon.alt = `${capitalise(icon)}`;
}

function switchTheme() {
    if (currentTheme === "light") {
        themeLink.href = "themes/dark-theme.css";

        themeIcon.src = "icons/moon.svg";
        themeIcon.alt = "Moon";
        localStorage.setItem("savedThemeIcon", "moon");

        currentTheme = "dark";
        localStorage.setItem("savedTheme", currentTheme);
    } else if (currentTheme === "dark") {
        themeLink.href = "themes/light-theme.css";

        themeIcon.src = "icons/sun.svg";
        themeIcon.alt = "Sun";
        localStorage.setItem("savedThemeIcon", "sun");

        currentTheme = "light";
        localStorage.setItem("savedTheme", currentTheme);
    }
}
