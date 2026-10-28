import { type FC, useState, useEffect } from "react";

import { type Game } from "@utils/games";
import { type Monster } from "@utils/monsters";
import { fetchMonsters } from "@utils/fetchMonsters";
import { removeDashes } from "@utils/helper";

import { MonsterCard } from "./MonsterCard";
import { Loader } from "@components/Loader";

interface MonsterCardsProps {
    gameTab: Game;
    search: string;
}

export const MonsterCards: FC<MonsterCardsProps> = ({ gameTab, search }: MonsterCardsProps) => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const userSearch = removeDashes(search).toLowerCase().trim();

    useEffect(() => {
        let ignore = false;

        const getMonsters = async () => {
            const data: Monster[] = await fetchMonsters(gameTab);
            if (!ignore) setMonsters(data);
        };
        getMonsters();

        return () => {
            ignore = true;
        };
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

    return <>{sortedMonsters.length > 0 ? sortedMonsters.map((monster) => <MonsterCard key={monster.name} monster={monster} game={gameTab} userSearch={userSearch} />) : <Loader />}</>;
};
