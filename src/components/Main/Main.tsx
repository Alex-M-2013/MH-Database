import { type FC, useState } from "react";

import { SearchBar } from "./SearchBar";
import { MonsterCards } from "./MonsterCards";
import { GitHubLink } from "../GitHubLink";
import { useIsMobile } from "../../utils/useIsMobile";

export const Main: FC<{ gameTab: string }> = ({ gameTab }: { gameTab: string }) => {
    const isMobile = useIsMobile();
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
