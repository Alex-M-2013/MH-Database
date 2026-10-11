import { useState } from "react";
import styles from "../../styles/Main/Main.module.scss";
import { SearchBar } from "./SearchBar";
import { MonsterCards } from "./MonsterCards";
import { GitHubLink } from "../GitHubLink";
import { useIsMobile } from "../../utils/useIsMobile.js";

export const Main = ({ gameTab }) => {
    const isMobile = useIsMobile();
    const [search, setSearch] = useState("");

    return (
        <>
            <h1 style={{ display: !isMobile ? "" : "none" }}>Monsters:</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <div className={styles.cardContainer}>
                <MonsterCards gameTab={gameTab} search={search} />
            </div>
            <GitHubLink />
        </>
    );
};