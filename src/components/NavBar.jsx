import "../styles/NavBar.css";
import { Sidenav } from "./Sidenav";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavBar = ({ currentTab, setCurrentTab, isMobile }) => (
    <div id="navbar">
        <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} isMobile={isMobile} />
        <h1>{!isMobile ? "MH Database" : "Monsters:"}</h1>
        <ThemeSwitcher />
    </div>
);
