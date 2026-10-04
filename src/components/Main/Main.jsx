import { SearchBar } from "./SearchBar";
import { MonsterCards } from "./MonsterCards";
import { GitHubLink } from "../GitHubLink"

export const Main = ({ isMobile, gameTab }) => {
    return (
        <>
            <h1 style={{ display: !isMobile ? "" : "none" }}>Monsters:</h1>
            <SearchBar />
            <div id="card-container">
                <MonsterCards gameTab={gameTab} />
            </div>
            <GitHubLink />
        </>
    );
};
