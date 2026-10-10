import "./App.css";

import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { gameTabs, getTabSlug } from "./utils/tabs";

import { NavBar } from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/Home";
import { Main } from "./components/Main/Main";
import { MonsterPage } from "./components/MonsterPage";
import { About } from "./components/About";

export const App = () => (
    <>
        <BrowserRouter>
            <NavBar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                {gameTabs.map((tab) => (
                    <Fragment key={tab}>
                        <Route path={`/${getTabSlug(tab)}`} element={<Main key={tab} gameTab={tab} />} />
                        <Route path={`/${getTabSlug(tab)}/:id`} element={<MonsterPage gameTab={tab} />} />
                    </Fragment>
                ))}
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    </>
);
