import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { gameTabs, getTabSlug } from "./utils/tabs";

import { About } from "./components/About";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { MonsterCards } from "./components/MonsterCards";
import { GitHubLink } from "./components/GitHubLink";

export const App = () => {
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
                <NavBar isMobile={isMobile} />
                <Routes>
                    <Route path="/" element={<Navigate to={`/${localStorage.getItem("savedSlug") ?? "wilds"}`} replace />} />
                    {gameTabs.map((tab) => (
                        <Route key={tab} path={`/${getTabSlug(tab)}`} element={<Main isMobile={isMobile} gameTab={tab} />} />
                    ))}
                    <Route path="/about" element={<About isMobile={isMobile} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const Main = ({ isMobile, gameTab }) => {
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
