const container = document.getElementById("container");

const url = new URL("https://wilds.mhdb.io/en/monsters");
url.searchParams.set("q", JSON.stringify({ kind: "large" }));

fetch(url)
    .then((response) => response.json())
    .then((monsters) => {
        monsters.forEach((monster) => {
            const monsterCard = document.createElement("div");
            monsterCard.className = "monster-card";

            const monsterIcon = document.createElement("img");
            monsterIcon.src = `icons/Monsters/${monster.name}.png`;
            monsterIcon.alt = `${monster.name}`;
            monsterIcon.loading = "lazy";
            monsterIcon.className = "monster-icon";

            const monsterName = document.createElement("p");
            monsterName.innerHTML = `<strong>Name: </strong>${monster.name}`;

            const monsterType = document.createElement("p");
            monsterType.innerHTML = `<strong>Type: </strong>${capitalise(monster.kind)}`;

            const monsterSpecies = document.createElement("p");
            monsterSpecies.innerHTML = `<strong>Species: </strong>${capitalise(monster.species)}`;

            const monsterWeakness = document.createElement("p");
            const elementWeakness = monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0] ?? "N/A";
            monsterWeakness.innerHTML = `<strong>Weakness: </strong>${capitalise(elementWeakness)}`;

            if (elementWeakness !== "N/A") {
                const monsterWeaknessIcon = document.createElement("img");
                monsterWeaknessIcon.src = `icons/Elements/${capitalise(elementWeakness)}.png`;
                monsterWeaknessIcon.alt = `${capitalise(elementWeakness)}`;
                monsterWeaknessIcon.loading = "lazy";
                monsterWeaknessIcon.className = "element-icon";

                monsterWeakness.append(monsterWeaknessIcon);
            }

            monsterCard.append(monsterIcon, monsterName, monsterType, monsterSpecies, monsterWeakness);
            container.append(monsterCard);
        });
    });
