import { useState } from "react";
import "../styles/components/GameTabs.css";
import "../styles/components/Hamburger.css";
import "../styles/components/Sidenav.css";

export const GameTabs = ({ currentTab, setCurrentTab }) => {
    const tabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU"];

    function changeTab(event) {
        const nextTab = event.currentTarget.textContent.trim();
        setCurrentTab(nextTab);
        localStorage.setItem("savedTab", nextTab);
    }

    const [isOpen, setIsOpen] = useState(false);
    const openCloseNav = () => setIsOpen(!isOpen);

    return (
        <>
            <div id="game-tabs">
                {tabs.map((tab) => {
                    return (
                        <button className={`game-tab ${tab === currentTab ? "active-tab" : ""}`} onClick={changeTab} key={tab}>
                            {tab}
                        </button>
                    );
                })}
            </div>

            <button id="hamburger-menu" onClick={openCloseNav}>
                <img id="hamburger-icon" src="/assets/icons/hamburger.svg" alt="Hamburger Icon" />
            </button>

            <div id="sidenav" style={{ width: !isOpen ? "0" : "80dvw" }}>
                <button id="close-sidenav" onClick={openCloseNav}>
                    <img src="/assets/icons/x-lg.svg" alt="X" />
                </button>

                <div id="sidenav-tabs">
                    {tabs.map((tab) => {
                        return (
                            <button
                                className={`game-tab ${tab === currentTab ? "active-tab" : ""}`}
                                onClick={(event) => {
                                    changeTab(event);
                                    openCloseNav();
                                }}
                                key={tab}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
