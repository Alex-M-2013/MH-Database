import { type FC, useState } from "react";

import { type Game } from "@utils/games"
import { useIsMobile } from "@utils/useIsMobile";

import { SearchBar } from "./SearchBar";
import { MonsterCards } from "./MonsterCards";
import { GitHubLink } from "@components/GitHubLink";

export const Main: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const isMobile: boolean = useIsMobile();
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <h1 style={{ display: !isMobile ? "" : "none" }}>Monsters:</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <div className="card-container">
                <MonsterCards gameTab={gameTab} search={search} />
            </div>
            <GitHubLink />
        </>
    );
};
