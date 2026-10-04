import "../styles/Hamburger.css";
import "../styles/Sidenav.css";
import { useState } from "react";
import { gameTabs, getTabSlug, useCurrentTab } from "../utils/tabs";

import { TabDivider } from "./TabDivider";
import { Link } from "react-router-dom";

export const Sidenav = ({ isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openCloseNav = () => setIsOpen((isOpen) => !isOpen);
    const openWidth = isMobile ? "80dvw" : "22dvw";

    return (
        <>
            <Hamburger openCloseNav={openCloseNav}/>

            <div id="sidenav-background" style={{ visibility: isOpen ? "visible" : "hidden" }} onClick={openCloseNav}></div>

            <div id="sidenav" style={{ width: !isOpen ? "0" : openWidth }}>
                <button id="close-sidenav" onClick={openCloseNav}>
                    <img src="/assets/icons/x-lg.svg" alt="X" />
                </button>

                <div id="sidenav-tabs">
                    <TabDivider isMobile={isMobile} isOpen={isOpen} />

                    {gameTabs.map((tab) => (
                        <Tab key={tab} tabName={tab} openCloseNav={openCloseNav} />
                    ))}

                    <TabDivider isMobile={isMobile} isOpen={isOpen} />

                    <Tab tabName="About" openCloseNav={openCloseNav} />
                </div>
            </div>
        </>
    );
};

const Hamburger = ({ openCloseNav }) => (
    <button id="hamburger-menu" onClick={openCloseNav}>
        <img id="hamburger-icon" src="/assets/icons/hamburger.svg" alt="Hamburger Icon" />
    </button>
);

const Tab = ({ tabName, openCloseNav }) => {
    const currentTab = useCurrentTab();

    return (
        <Link to={`/${getTabSlug(tabName)}`}>
            <button
                className={`sidenav-tab ${tabName === currentTab ? "active-tab" : ""}`}
                onClick={() => {
                    localStorage.setItem("savedSlug", getTabSlug(tabName));
                    openCloseNav();
                }}
            >
                {tabName}
            </button>
        </Link>
    );
};
