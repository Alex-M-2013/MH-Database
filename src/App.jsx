import "./App.css";

import { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gameTabs, getTabSlug } from "./utils/tabs";

import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home";
import { Main } from "./components/Main/Main";
import { MonsterPage } from "./components/MonsterPage";
import { About } from "./components/About";

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
                    <Route path="/" element={<Home />} />
                    {gameTabs.map((tab) => (
                        <Fragment key={tab}>
                            <Route path={`/${getTabSlug(tab)}`} element={<Main key={tab} isMobile={isMobile} gameTab={tab} />} />
                            <Route path={`/${getTabSlug(tab)}/:id`} element={<MonsterPage gameTab={tab} />} />
                        </Fragment>
                    ))}
                    <Route path="/about" element={<About isMobile={isMobile} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
