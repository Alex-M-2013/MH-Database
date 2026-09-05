const themeIcon = document.getElementById("theme-icon");
let currentTheme = "light";

loadCurrentTheme();

function loadCurrentTheme() {
    const loadedTheme = localStorage.getItem("savedTheme") ?? "light";
    document.documentElement.setAttribute("data-theme", loadedTheme);

    const icon = localStorage.getItem("savedThemeIcon") ?? "sun";
    themeIcon.src = `assets/icons/${icon}.svg`;
    themeIcon.alt = `${capitalise(icon)}`;
}

function switchTheme() {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    currentTheme = nextTheme;
    document.documentElement.setAttribute("data-theme", nextTheme);

    const nextIcon = nextTheme === "light" ? "sun" : "moon";
    themeIcon.src = `assets/icons/${nextIcon}.svg`;
    themeIcon.alt = `${capitalise(nextIcon)}`;

    localStorage.setItem("savedTheme", nextTheme);
    localStorage.setItem("savedThemeIcon", nextIcon);
}