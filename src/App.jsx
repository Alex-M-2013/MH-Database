import "./styles/App.css";
import "./styles/themes.css";
import { useState } from "react";
import { GameTabs } from "./components/GameTabs";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { SearchBar } from "./components/SearchBar";
import { MonsterCards } from "./components/MonsterCards";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    const [currentTab, setCurrentTab] = useState(localStorage.getItem("savedTab") ?? "Wilds");

    return (
        <>
            <GameTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <ThemeSwitcher />

            <h1>Monsters:</h1>

            <SearchBar />

            <div id="card-container">
                <MonsterCards gameTab={currentTab} />
            </div>

            <GitHubLink />
        </>
    );
};
