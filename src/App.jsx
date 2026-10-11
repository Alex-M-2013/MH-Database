import "./App.css";

import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { gameTabs, getTabSlug, otherTabs } from "./utils/tabs";

import { NavBar } from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

import { Home } from "./components/pages/Home";
import { Main } from "./components/Main/Main";
import { MonsterPage } from "./components/pages/MonsterPage";

import { About } from "./components/pages/About";
import { Settings } from "./components/pages/Settings";

const componentMap = { About: About, Settings: Settings };

export const App = () => (
    <>
        <BrowserRouter>
            <NavBar />
            <ToastContainer />
            <Routes>
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Home />} />
                {gameTabs.map((tab) => (
                    <Fragment key={tab}>
                        <Route path={`/${getTabSlug(tab)}`} element={<Main key={tab} gameTab={tab} />} />
                        <Route path={`/${getTabSlug(tab)}/:id`} element={<MonsterPage gameTab={tab} />} />
                    </Fragment>
                ))}
                {otherTabs.map((tab) => {
                    const Component = componentMap[tab];
                    return <Route key={tab} path={`/${getTabSlug(tab)}`} element={<Component />} />;
                })}
            </Routes>
        </BrowserRouter>
    </>
);
