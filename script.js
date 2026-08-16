const container = document.getElementById("container");

const themeLink = document.getElementById("theme-link");
const themeIcon = document.getElementById("theme-icon");
let currentTheme = "Light";

const removeDashes = (string) => string.replaceAll("-", " ");

function capitalise(string) {
    const lowerCaseString = removeDashes(string).toLowerCase();
    const lowerCaseStringWords = lowerCaseString.split(" ");

    const capitalisedStringWords = lowerCaseStringWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    const capitalisedString = capitalisedStringWords.join(" ");

    return capitalisedString;
}

fetch("https://wilds.mhdb.io/en/monsters")
    .then((response) => response.json())
    .then((monsters) => {
        monsters.forEach((monster) => {
            const monsterCard = document.createElement("div");
            monsterCard.className = "monster-card";

            const monsterIcon = document.createElement("img");
            monsterIcon.src = `Icons/Monsters/${monster.name}.png`;
            monsterIcon.alt = `${monster.name}`;
            monsterIcon.loading = "lazy";
            monsterIcon.className = "monster-icon"

            const monsterName = document.createElement("p");
            monsterName.innerHTML = `<strong>Name: </strong>${monster.name}`;

            const monsterType = document.createElement("p");
            monsterType.innerHTML = `<strong>Type: </strong>${capitalise(monster.kind)}`;

            const monsterSpecies = document.createElement("p");
            monsterSpecies.innerHTML = `<strong>Species: </strong>${capitalise(monster.species)}`;

            const monsterWeakness = document.createElement("p");
            const elementWeakness = monster.weaknesses.map(weakness => weakness.element).filter(Boolean)[0] ?? "N/A";
            monsterWeakness.innerHTML = `<strong>Weakness: </strong>${capitalise(elementWeakness)} `;
            
            if (elementWeakness !== "N/A") {
                const monsterWeaknessIcon = document.createElement("img");
                monsterWeaknessIcon.src = `Icons/Elements/${capitalise(elementWeakness)}.png`;
                monsterWeaknessIcon.alt = `${capitalise(elementWeakness)}`;
                monsterWeaknessIcon.loading = "lazy";
                monsterWeaknessIcon.className = "element-icon";

                monsterWeakness.append(monsterWeaknessIcon);
            }

            monsterCard.append(monsterIcon, monsterName, monsterType, monsterSpecies, monsterWeakness);
            container.append(monsterCard);
        });
    });

function loadCurrentTheme() {

}

function switchTheme() {
    if (currentTheme === "Light") {
        themeLink.href = "themes/dark-theme.css";

        themeIcon.src = "Icons/moon.svg";
        themeIcon.alt = "Moon";

        currentTheme = "Dark";
    } else if (currentTheme === "Dark") {
        themeLink.href = "themes/light-theme.css";

        themeIcon.src = "Icons/sun.svg";
        themeIcon.alt = "Sun";

        currentTheme = "Light";
    } 


}

function search() {

}