import { useEffect, useState } from "react";
import "../styles/components/GameTabs.css";
import "../styles/components/Hamburger.css";
import "../styles/components/Sidenav.css";

export const GameTabs = (props) => {
    useEffect(() => {
        document.querySelectorAll(".game-tab").forEach((tab) => {
            tab.classList.toggle("active-tab", tab.textContent.trim() === props.currentTab);
        });
    }, [props.currentTab]);

    function changeTab(event) {
        const nextTab = event.currentTarget.textContent.trim();
        props.setCurrentTab(nextTab);
        localStorage.setItem("savedTab", nextTab);
    }

    const [isOpen, setIsOpen] = useState(false);

    const openCloseNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div id="game-tabs">
                <button className="game-tab" onClick={changeTab}>
                    Wilds
                </button>
                <button className="game-tab" onClick={changeTab}>
                    Rise/Sunbreak
                </button>

                <button className="game-tab" onClick={changeTab}>
                    World/Iceborne
                </button>
                <button className="game-tab" onClick={changeTab}>
                    MHGU
                </button>
            </div>

            <button id="hamburger-menu" onClick={openCloseNav}>
                <img id="hamburger-icon" src="/assets/icons/hamburger.svg" alt="Hamburger Icon" />
            </button>

            <div id="sidenav" style={{ width: !isOpen ? "0" : "80dvw" }}>
                <button id="close-sidenav" onClick={openCloseNav}>
                    <img src="/assets/icons/x-lg.svg" alt="X" />
                </button>

                <div id="sidenav-tabs">
                    <button
                        className="game-tab"
                        onClick={(event) => {
                            changeTab(event);
                            openCloseNav();
                        }}
                    >
                        Wilds
                    </button>
                    <button
                        className="game-tab"
                        onClick={(event) => {
                            changeTab(event);
                            openCloseNav();
                        }}
                    >
                        Rise/Sunbreak
                    </button>
                    <button
                        className="game-tab"
                        onClick={(event) => {
                            changeTab(event);
                            openCloseNav();
                        }}
                    >
                        World/Iceborne
                    </button>
                    <button
                        className="game-tab"
                        onClick={(event) => {
                            changeTab(event);
                            openCloseNav();
                        }}
                    >
                        MHGU
                    </button>
                </div>
            </div>
        </>
    );
};
