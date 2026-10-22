import { useState, useEffect } from "react";

import { fetchMonsters } from "../../utils/fetchMonsters";
import { removeDashes } from "../../utils/helper";

import { MonsterCard } from "./MonsterCard";
import { Loader } from "../Loader";

export const MonsterCards = ({ gameTab, search }) => {
    const [monsters, setMonsters] = useState([]);
    const userSearch = removeDashes(search).toLowerCase().trim();

    useEffect(() => {
        let ignore = false;

        const getMonsters = async () => {
            const data = await fetchMonsters(gameTab);
            if (!ignore) setMonsters(data);
        };
        getMonsters();

        return () => (ignore = true);
    }, [gameTab]);

    const sortOrder = localStorage.getItem("savedSortOrder") ?? "default";
    const sortedMonsters = [...monsters];

    switch (sortOrder) {
        case "name-asc":
            sortedMonsters.sort((first, second) => first.name.localeCompare(second.name));
            break;

        case "name-desc":
            sortedMonsters.sort((first, second) => second.name.localeCompare(first.name));
            break;

        default:
            break;
    }

    return <>{sortedMonsters.length > 0 ? sortedMonsters.map((monster) => <MonsterCard key={monster} monster={monster} game={gameTab} userSearch={userSearch} />) : <Loader />}</>;
};
