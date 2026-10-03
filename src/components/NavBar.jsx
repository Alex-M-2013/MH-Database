import "../styles/NavBar.css";
import { Sidenav } from "./Sidenav";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar = ({ currentTab, setCurrentTab, isMobile }) => (
    <div id="navbar">
        <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} isMobile={isMobile} />
        {!isMobile ? (
            <>
                <h1>MH Database</h1>
                <Divider />
                <h1>{currentTab}</h1>
            </>
        ) : (
            <h1>{currentTab.split("/")[0]}</h1>
        )}
        <ThemeSwitcher />
    </div>
);

const Divider = () => <div className="tab-divider" style={{ height: "50%", width: "2.5px", margin: "1rem" }} />;
