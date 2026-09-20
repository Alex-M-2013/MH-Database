import "../styles/components/Hamburger.css";
import "../styles/components/Sidenav.css";
import { useState } from "react";
import { TabDivider } from "./TabDivider";

export const GameTabs = ({ currentTab, setCurrentTab, isMobile }) => {
    const tabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU"];

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
                    {tabs.map((tab) => {
                        return (
                            <button
                                className={`sidenav-tab ${tab === currentTab ? "active-tab" : ""}`}
                                style={{ display: isMobile ? (isOpen ? "" : "none") : "" }}
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
                    <TabDivider style={{ display: isMobile ? (isOpen ? "" : "none") : "" }} />
                </div>
            </div>
        </>
    );
};
