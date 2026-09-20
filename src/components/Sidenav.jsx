import "../styles/components/Hamburger.css";
import "../styles/components/Sidenav.css";
import { useState } from "react";
import { GameTabs } from "./GameTabs";
import { TabDivider } from "./TabDivider";

export const Sidenav = ({ currentTab, setCurrentTab, isMobile }) => {
    function changeTab(event) {
        const nextTab = event.currentTarget.textContent.trim();
        setCurrentTab(nextTab);
        localStorage.setItem("savedTab", nextTab);
    }

    const [isOpen, setIsOpen] = useState(false);
    const openCloseNav = () => setIsOpen(!isOpen);
    const openWidth = isMobile ? "80dvw" : "22dvw";

    return (
        <>
            <button id="hamburger-menu" onClick={openCloseNav}>
                <img id="hamburger-icon" src="/assets/icons/hamburger.svg" alt="Hamburger Icon" />
            </button>

            <div id="sidenav" style={{ width: !isOpen ? "0" : openWidth }}>
                <button id="close-sidenav" onClick={openCloseNav}>
                    <img src="/assets/icons/x-lg.svg" alt="X" />
                </button>

                <div id="sidenav-tabs">
                    <TabDivider isMobile={isMobile} isOpen={isOpen} />
                    <GameTabs currentTab={currentTab} changeTab={changeTab} openCloseNav={openCloseNav} /> 
                    <TabDivider isMobile={isMobile} isOpen={isOpen} />
                </div>
            </div>
        </>
    );
};
