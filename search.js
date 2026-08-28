function search() {
    const userSearch = removeDashes(document.querySelector("#search-bar input").value).toLowerCase().trim();

    const monsterCards = document.querySelectorAll(".monster-card");

    monsterCards.forEach((card) => {
        const monsterName = removeDashes(card.querySelector("p").textContent).replace("Name: ", "").toLowerCase();
        const monsterType = removeDashes(card.querySelector(".monster-type").textContent).replace("Type: ", "").toLowerCase();
        const monsterSpecies = removeDashes(card.querySelector(".monster-species").textContent).replace("Species: ", "").toLowerCase();

        if (monsterName.includes(userSearch) || monsterType.includes(userSearch) || monsterSpecies.includes(userSearch)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
