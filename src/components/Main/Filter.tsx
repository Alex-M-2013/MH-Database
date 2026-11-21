import styles from "@styles/Main/Filter.module.scss";

import { type FC, useEffect } from "react";
import { type Element, type Game } from "@utils/games";
import { capitalise } from "@utils/helper";

export type FilterType = Element | "none";

interface FilterProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
    gameTab: Game;
}

const filters: FilterType[] = ["none", "fire", "water", "thunder", "ice", "dragon"];

export const Filter: FC<FilterProps> = ({ filter, setFilter, gameTab }: FilterProps) => {
    useEffect(() => setFilter("none"), [gameTab]);

    return (
        <div className={styles.filter}>
            <h2>Filter (Weakness): </h2>

            <select value={filter} onChange={(event) => setFilter(event.currentTarget.value as FilterType)}>
                {filters.map((filter) => <option key={filter} value={filter}>{capitalise(filter)}</option>)}
            </select>
        </div>
    );
};
