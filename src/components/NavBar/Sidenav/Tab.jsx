import "../../../styles/NavBar/Sidenav/Tab.css";

import { useCurrentTab, getTabSlug } from "../../../utils/tabs";
import { Link } from "react-router-dom";

export const Tab = ({ tabName, openCloseNav }) => {
    const currentTab = useCurrentTab();

    return (
        <Link to={`/${getTabSlug(tabName)}`}>
            <button className={`sidenav-tab ${tabName === currentTab ? "active-tab" : ""}`} onClick={openCloseNav}>
                {tabName}
            </button>
        </Link>
    );
};
