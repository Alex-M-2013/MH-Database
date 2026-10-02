import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About } from "./components/About";
import { NavBar } from "./components/NavBar";
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
            <BrowserRouter>
                <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} isMobile={isMobile} />
                <Routes>
                    <Route path="/" element={<Main isMobile={isMobile} currentTab={currentTab} />} />
                    <Route path="/about" element={<About isMobile={isMobile} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const Main = ({ isMobile, currentTab }) => {
    return (
        <>
            <h1 style={{ display: !isMobile ? "" : "none" }}>Monsters:</h1>
            <SearchBar />
            <div id="card-container">{currentTab !== "About" && <MonsterCards gameTab={currentTab} />}</div>
            <GitHubLink />
        </>
    );
};
