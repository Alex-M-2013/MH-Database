import { type FC, useState } from "react";

import { type Game } from "@utils/games";
import { useIsMobile } from "@utils/useIsMobile";
import { type FilterType } from "./Filter";

import { SearchBar } from "./SearchBar";
import { Filter } from "./Filter";
import { MonsterCards } from "./MonsterCards";
import { GitHubLink } from "@components/GitHubLink";

export const Main: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const isMobile = useIsMobile();
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<FilterType>((localStorage.getItem("savedFilter") as FilterType | null) ?? "none");

    return (
        <>
            <h1 style={{ display: !isMobile ? "" : "none" }}>Monsters:</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} gameTab={gameTab} />
            <div className="card-container">
                <MonsterCards gameTab={gameTab} search={search} filter={filter} />
            </div>
            <GitHubLink />
        </>
    );
};
