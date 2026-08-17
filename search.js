function search() {
    const userSearch = removeDashes(document.querySelector("#search-bar input").value).toLowerCase().trim();

    const monsterCards = document.querySelectorAll(".monster-card");

    monsterCards.forEach((card) => {
        const monsterName = removeDashes(card.querySelector("p").textContent).replace("Name: ", "").toLowerCase();

        if (monsterName.includes(userSearch)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
