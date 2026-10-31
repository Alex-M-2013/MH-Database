import styles from "@styles/Main/Filter.module.scss";

import { type FC, useEffect } from "react";
import { type Element } from "@utils/monsters";
import { type Game } from "@utils/games"

export type FilterType = Element | "none";

interface FilterProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
    gameTab: Game
}

export const Filter: FC<FilterProps> = ({ filter, setFilter, gameTab }: FilterProps) => {
    useEffect(() => setFilter("none"), [gameTab])
    
    return (
        <div className={styles.filter}>
            <h2>Filter (Weakness): </h2>

            <select
                value={filter}
                onChange={(event) => {
                    setFilter(event.currentTarget.value as FilterType);
                    localStorage.setItem("savedFilter", event.currentTarget.value as FilterType);
                }}
            >
                <option value="none">None</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="thunder">Thunder</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
            </select>
        </div>
    );
};
