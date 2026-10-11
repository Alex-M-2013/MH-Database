import styles from "../../styles/NavBar/ThemeSwitcher.module.scss";
import { useState, useEffect } from "react";

import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

export const ThemeSwitcher = () => {
    const initialTheme = localStorage.getItem("savedTheme") ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    useEffect(() => document.documentElement.setAttribute("data-theme", currentTheme), []);

    function switchTheme() {
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("savedTheme", nextTheme);
    }

    return (
        <button id="theme-switcher" className={styles.themeSwitcher} onClick={switchTheme}>
            {currentTheme === "light" ? <BsSun className="icon navbar" /> : <BsMoon className="icon navbar" />}
        </button>
    );
};
