import "../styles/NavBar.css";
import { Sidenav } from "./Sidenav";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar = ({ currentTab, setCurrentTab, isMobile }) => (
    <div id="navbar">
        <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} isMobile={isMobile} />
        {!isMobile && <h1>MH Database</h1>}
        {isMobile && currentTab !== "About" && <h1>Monsters:</h1>}
        <ThemeSwitcher />
    </div>
);
