import { parse } from "jsonc-parser";

const container = document.getElementById("card-container");
const gameTabs = document.querySelectorAll(".game-tab");
let currentTab = localStorage.getItem("savedTab") ?? "Wilds";

renderCards(currentTab);

gameTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
        currentTab = event.currentTarget.textContent.trim();
        localStorage.setItem("savedTab", currentTab);
        renderCards(currentTab);
    });
});

function renderCards(gameTab) {
    container.innerHTML = "";

    let url;
    let fetchVar = "fetch(url).then((response) => response.json())";
    let iconVar = "monster.name";
    let typeVar;
    let getWeakness = () => null;

    if (gameTab === "Wilds") {
        url = new URL("https://wilds.mhdb.io/en/monsters");
        url.searchParams.set("q", JSON.stringify({ kind: "large" }));
        typeVar = "monster.kind";
        getWeakness = (monster) => monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0];
    } else if (gameTab === "Rise/Sunbreak") {
        url = "./data/rise_monster_db.jsonc";
        fetchVar = "fetch(url).then(response => response.text()).then(text => parse(text));"
        getWeakness = (monster) => {
            if (!monster.weaknesses || monster.weaknesses.length === 0) {
                return null;
            } else {
                return monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element;
            }
        };
    } else if (gameTab === "World/Iceborne") {
        url = new URL("https://mhw-db.com/monsters");
        url.searchParams.set("q", JSON.stringify({ type: "large" }));
        typeVar = "monster.type";
        getWeakness = (monster) => {
            if (!monster.weaknesses || monster.weaknesses.length === 0) {
                return null;
            } else {
                return monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element;
            }
        };
    } else if (gameTab === "MHGU") {
        url = "./data/mhgu_monsters.json";

        getWeakness = (monster) => {
            const data = monster.weaknesses?.[0];
            if (!data) return null;

            let bestKey = null;
            let bestValue = -Infinity;

            for (const [key, value] of Object.entries(data)) {
                if (key === "state") continue;
                if (value > bestValue) {
                    bestValue = value;
                    bestKey = key;
                }
            }

            return bestKey;
        };

        fetchVar += `.then((monsters) => monsters.filter((monster) => monster.type === "large" || monster.type === "deviant"))`;
        iconVar = "monster.icon_name";
        typeVar = "monster.type";
    }

    eval(fetchVar).then((monsters) => {
        monsters.forEach((monster) => {
            const monsterCard = document.createElement("div");
            monsterCard.className = "monster-card";

            const monsterIcon = document.createElement("img");
            monsterIcon.src = `icons/Monsters/${gameTab.split("/")[0]}/${eval(iconVar)}.png`;
            monsterIcon.alt = `${monster.name}`;
            monsterIcon.loading = "lazy";
            monsterIcon.className = "monster-icon";

            const monsterName = document.createElement("p");
            monsterName.innerHTML = `<strong>Name: </strong>${monster.name}`;

            const monsterType = document.createElement("p");
            monsterType.innerHTML = `<strong>Type: </strong>${capitalise(eval(typeVar)) ?? "Large"}`;
            monsterType.className = "monster-type";

            const monsterSpecies = document.createElement("p");
            monsterSpecies.innerHTML = `<strong>Species: </strong>${capitalise(monster.species) ?? "No Data"}`;
            monsterSpecies.className = "monster-species";

            const monsterWeakness = document.createElement("p");
            const elementWeakness = getWeakness(monster) ?? "No Data";
            monsterWeakness.innerHTML = `<strong>Weakness: </strong>${capitalise(elementWeakness)} `;

            if (elementWeakness !== "No Data") {
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
}
