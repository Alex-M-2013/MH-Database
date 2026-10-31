import styles from "@styles/Main/Filter.module.scss";

import { type FC } from "react";
import { type Element } from "@utils/monsters";

export type FilterType = Element | "none";

interface FilterProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

export const Filter: FC<FilterProps> = ({ filter, setFilter }: FilterProps) => {
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
