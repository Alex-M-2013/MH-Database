import { type FC } from "react";
import styles from "@styles/NavBar/Sidenav/Tab.module.css";

import { useCurrentTab, getTabSlug } from "@utils/tabs";
import { Link } from "react-router";

interface TabProps {
    tabName: string;
    openCloseNav: () => void;
}

export const Tab: FC<TabProps> = ({ tabName, openCloseNav }: TabProps) => {
    const currentTab = useCurrentTab();

    return (
        <Link to={`/${getTabSlug(tabName)}`}>
            <button className={`${styles.tab} ${tabName === currentTab ? styles.active : ""}`} onClick={openCloseNav}>
                {tabName}
            </button>
        </Link>
    );
};
