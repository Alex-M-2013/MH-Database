import "../styles/Hamburger.css";
import "../styles/Sidenav.css";
import { useEffect, useState } from "react";
import { TabDivider } from "./TabDivider";
import { Link } from "react-router-dom";

export const Sidenav = ({ currentTab, setCurrentTab, isMobile }) => {
    const gameTabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU"];

    useEffect(() => {
        document.querySelectorAll(".sidenav-tab").forEach((tab) => {
            tab.classList.toggle("active-tab", tab.textContent === currentTab);
        });
    }, [currentTab]);

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

            <div id="sidenav-background" style={{ visibility: isOpen ? "visible" : "hidden" }}></div>

            <div id="sidenav" style={{ width: !isOpen ? "0" : openWidth }}>
                <button id="close-sidenav" onClick={openCloseNav}>
                    <img src="/assets/icons/x-lg.svg" alt="X" />
                </button>

                <div id="sidenav-tabs">
                    <TabDivider isMobile={isMobile} isOpen={isOpen} />

                    {gameTabs.map((tab) => {
                        return (
                            <Link to="/">
                                <button
                                    className="sidenav-tab"
                                    onClick={(event) => {
                                        changeTab(event);
                                        openCloseNav();
                                    }}
                                    key={tab}
                                >
                                    {tab}
                                </button>
                            </Link>
                        );
                    })}

                    <TabDivider isMobile={isMobile} isOpen={isOpen} />
                    <Link to="/about">
                        <button
                            className="sidenav-tab"
                            onClick={(event) => {
                                changeTab(event);
                                openCloseNav();
                            }}
                        >
                            About
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
