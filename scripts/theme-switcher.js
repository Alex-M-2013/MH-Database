const themeLink = document.getElementById("theme-link");
const themeIcon = document.getElementById("theme-icon");
let currentTheme = "light";

loadCurrentTheme();

function loadCurrentTheme() {
    const loadedTheme = localStorage.getItem("savedTheme") ?? "light";
    themeLink.href = `styles/themes/${loadedTheme}-theme.css`;

    const icon = localStorage.getItem("savedThemeIcon") ?? "sun";
    themeIcon.src = `assets/icons/${icon}.svg`;
    themeIcon.alt = `${capitalise(icon)}`;
}

function switchTheme() {
    if (currentTheme === "light") {
        themeLink.href = "styles/themes/dark-theme.css";

        themeIcon.src = "assets/icons/moon.svg";
        themeIcon.alt = "Moon";
        localStorage.setItem("savedThemeIcon", "moon");

        currentTheme = "dark";
        localStorage.setItem("savedTheme", currentTheme);
    } else if (currentTheme === "dark") {
        themeLink.href = "styles/themes/light-theme.css";

        themeIcon.src = "assets/icons/sun.svg";
        themeIcon.alt = "Sun";
        localStorage.setItem("savedThemeIcon", "sun");

        currentTheme = "light";
        localStorage.setItem("savedTheme", currentTheme);
    }
}
