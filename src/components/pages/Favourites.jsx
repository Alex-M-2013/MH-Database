import { useState, useEffect } from "react";
import { fetchMonsters } from "../../utils/fetchMonsters";
import { MonsterCard } from "../Main/MonsterCard";

export const Favourites = () => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        let ignore = false;

        const loadFavourites = async () => {
            const favourites = JSON.parse(localStorage.getItem("favourites")) ?? [];
            const loadedMonsters = [];

            for (const [id, game] of favourites) {
                const monsters = await fetchMonsters(game);
                const monster = monsters.find((monster) => monster.id === id);
                if (monster) loadedMonsters.push({ monster, game });
            }

            if (!ignore) setMonsters(loadedMonsters);
        };
        loadFavourites();

        return () => (ignore = true);
    }, []);

    const sortOrder = localStorage.getItem("savedSortOrder") ?? "default";
    const sortedMonsters = [...monsters];

    switch (sortOrder) {
        case "name-asc":
            sortedMonsters.sort((first, second) => first.monster.name.localeCompare(second.monster.name));
            break;

        case "name-desc":
            sortedMonsters.sort((first, second) => second.monster.name.localeCompare(first.monster.name));
            break;

        default:
            break;
    }

    return (
        <>
            <h1>Favourites</h1>
            <div className="card-container">{sortedMonsters.length > 0 ? sortedMonsters.map(({ monster, game }) => <MonsterCard key={`${monster.id}. ${monster}-${game}`} monster={monster} game={game} />) : <p style={{ fontSize: "1.3rem" }}>Favourites are empty! Try adding a favourite by clicking the star in the top right of a monster card.</p>}</div>
        </>
    );
};
