import "../../styles/NavBar/NavBar.css";
import { Sidenav } from "./Sidenav/Sidenav";
import { useEffect } from "react";
import { useCurrentTab, getTabDisplayMobile, getTabSlug } from "../../utils/tabs";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar = ({ isMobile }) => {
    const currentTab = useCurrentTab();

    useEffect(() => {
        if (currentTab) localStorage.setItem("savedSlug", getTabSlug(currentTab));
    }, [currentTab]);

    return (
        <div id="navbar">
            <Sidenav isMobile={isMobile} />
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

const Divider = () => <div className="tab-divider" style={{ height: "50%", width: "2.5px", margin: "1rem" }} />;
