import { type FC, useEffect } from "react";
import styles from "../../styles/NavBar/NavBar.module.scss";

import { useCurrentTab, getTabDisplayMobile, getTabSlug } from "../../utils/tabs";
import { useIsMobile } from "../../utils/useIsMobile";

import { Sidenav } from "./Sidenav/Sidenav";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar: FC = () => {
    const currentTab: string = useCurrentTab();
    const isMobile: boolean = useIsMobile();

    useEffect(() => {
        if (currentTab) localStorage.setItem("savedSlug", getTabSlug(currentTab));
    }, [currentTab]);

    return (
        <div className={styles.navbar}>
            <Sidenav />
            {!isMobile ? (
                <>
                    <h1>MH Database</h1>
                    <Divider />
                    <h1>{currentTab}</h1>
                </>
            ) : (
                <h1>{getTabDisplayMobile(currentTab)}</h1>
            )}
            <ThemeSwitcher />
        </div>
    );
};

const Divider = () => <div className={styles.divider} />;
