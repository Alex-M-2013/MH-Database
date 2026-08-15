const container = document.getElementById("container");

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
            monsterIcon.src = `Icons/${monster.name}.png`;
            monsterIcon.alt = `${monster.name}`;

            const monsterName = document.createElement("p");
            monsterName.innerHTML = `<strong>Name: </strong>${monster.name}`;

            const monsterType = document.createElement("p");
            monsterType.innerHTML = `<strong>Type: </strong>${capitalise(monster.kind)}`;

            const monsterSpecies = document.createElement("p");
            monsterSpecies.innerHTML = `<strong>Species: </strong>${capitalise(monster.species)}`

            monsterCard.append(monsterIcon, monsterName, monsterType, monsterSpecies);
            container.append(monsterCard);
        });
    });
