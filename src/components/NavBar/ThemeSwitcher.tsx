import { type FC, useState, useEffect } from "react";
import styles from "@styles/NavBar/ThemeSwitcher.module.scss";

import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

export type Theme = "light" | "dark";

export const ThemeSwitcher: FC = () => {
    const initialTheme: Theme = (localStorage.getItem("savedTheme") as Theme | null) ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);

    useEffect(() => document.documentElement.setAttribute("data-theme", currentTheme), []);

    function switchTheme() {
        const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
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
