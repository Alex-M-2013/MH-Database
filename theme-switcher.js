const themeLink = document.getElementById("theme-link");
const themeIcon = document.getElementById("theme-icon");
let currentTheme = "light";

loadCurrentTheme();

function loadCurrentTheme() {
    const loadedTheme = localStorage.getItem("savedTheme") ?? "light";
    themeLink.href = `themes/${loadedTheme}-theme.css`;

    const icon = localStorage.getItem("savedThemeIcon") ?? "sun";
    themeIcon.src = `Icons/${icon}.svg`;
    themeIcon.alt = `${icon}`;
}

function switchTheme() {
    if (currentTheme === "light") {
        themeLink.href = "themes/dark-theme.css";

        themeIcon.src = "Icons/moon.svg";
        themeIcon.alt = "moon";
        localStorage.setItem("savedThemeIcon", "moon");

        currentTheme = "dark";
        localStorage.setItem("savedTheme", currentTheme);
    } else if (currentTheme === "dark") {
        themeLink.href = "themes/light-theme.css";

        themeIcon.src = "Icons/sun.svg";
        themeIcon.alt = "sun";
        localStorage.setItem("savedThemeIcon", "sun");

        currentTheme = "light";
        localStorage.setItem("savedTheme", currentTheme);
    }
}
