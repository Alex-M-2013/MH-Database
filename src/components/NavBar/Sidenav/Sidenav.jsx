import "../../../styles/NavBar/Sidenav/Sidenav.css"

import { useState } from "react";
import { gameTabs } from "../../../utils/tabs";

import { Hamburger } from "./Hamburger";
import { TabDivider } from "./TabDivider";
import { Tab } from "./Tab";

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