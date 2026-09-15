import "../styles/components/SearchBar.css";
import { removeDashes } from "../utils/helper";

export const SearchBar = () => {
    function search(userInput) {
        const userSearch = removeDashes(userInput).toLowerCase().trim();

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

    return (
        <div id="search-bar">
            <img src="/assets/icons/search.svg" alt="Search" />
            <input
                type="text"
                aria-label="Search Monsters"
                placeholder="Search..."
                onInput={(event) => {
                    const userSearch = event.currentTarget.value;
                    search(userSearch);
                }}
            />
        </div>
    );
};
