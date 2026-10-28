import { type FC, useState } from "react";
import styles from "@styles/NavBar/Sidenav/Sidenav.module.scss";

import { type Game } from "@utils/games";
import { useIsMobile } from "@utils/useIsMobile";
import { gameTabs, otherTabs, type OtherTab } from "@utils/tabs";

import { Hamburger } from "./Hamburger";
import { BsXLg } from "react-icons/bs";
import { TabDivider } from "./TabDivider";
import { Tab } from "./Tab";

export const Sidenav: FC = () => {
    const isMobile = useIsMobile();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openCloseNav = () => setIsOpen((isOpen: boolean) => !isOpen);
    const openWidth = isMobile ? "80dvw" : "22dvw";

    return (
        <>
            <Hamburger openCloseNav={openCloseNav} />

            <div className={styles.background} style={{ visibility: isOpen ? "visible" : "hidden" }} onClick={openCloseNav}></div>

            <div className={styles.sidenav} style={{ width: !isOpen ? "0" : openWidth }}>
                <button className={styles.close} onClick={openCloseNav}>
                    <BsXLg className="icon navbar" />
                </button>

                <div className={styles.tabs}>
                    <TabDivider isOpen={isOpen} />

                    <Tab tabName="Favourites" openCloseNav={openCloseNav} />

                    <TabDivider isOpen={isOpen} />

                    {gameTabs.map((tab: Game) => (
                        <Tab key={tab} tabName={tab} openCloseNav={openCloseNav} />
                    ))}

                    <TabDivider isOpen={isOpen} />

                    {otherTabs.map((tab: OtherTab) => (
                        <Tab key={tab} tabName={tab} openCloseNav={openCloseNav} />
                    ))}
                </div>
            </div>
        </>
    );
};
