import "./App.scss";

import { type FC, Fragment } from "react";
import { type Game } from "./utils/games";

import { BrowserRouter, Routes, Route } from "react-router";
import { gameTabs, getTabSlug, otherTabs, type OtherTab } from "./utils/tabs";

import { NavBar } from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

import { Favourites } from "./components/pages/Favourites";

import { Home } from "./components/pages/Home";
import { Main } from "./components/Main/Main";
import { MonsterPage } from "./components/pages/MonsterPage";

import { About } from "./components/pages/About";
import { Settings } from "./components/pages/Settings";

const componentMap: Record<OtherTab, FC> = { About, Settings };

export const App: FC = () => (
    <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
            <Route path="*" element={<h1>404 (Not Found)</h1>} />
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            {gameTabs.map((tab: Game) => (
                <Fragment key={tab}>
                    <Route path={`/${getTabSlug(tab)}`} element={<Main key={tab} gameTab={tab} />} />
                    <Route path={`/${getTabSlug(tab)}/:id`} element={<MonsterPage gameTab={tab} />} />
                </Fragment>
            ))}
            {otherTabs.map((tab: OtherTab) => {
                const Component = componentMap[tab];
                return <Route key={tab} path={`/${getTabSlug(tab)}`} element={<Component />} />;
            })}
        </Routes>
    </BrowserRouter>
);
