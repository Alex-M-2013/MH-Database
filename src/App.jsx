import "./styles/App.css";
import { useState, useEffect } from "react";
import { Sidenav } from "./components/Sidenav";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { SearchBar } from "./components/SearchBar";
import { MonsterCards } from "./components/MonsterCards";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
    const [currentTab, setCurrentTab] = useState(() => localStorage.getItem("savedTab") ?? "Wilds");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenWidth <= 600;

    return (
        <>
            <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} isMobile={isMobile} />

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
