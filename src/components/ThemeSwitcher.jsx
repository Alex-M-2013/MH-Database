import "../styles/ThemeSwitcher.css";
import { useRef, useState, useEffect } from "react";
import { capitalise } from "../utils/helper";

export const ThemeSwitcher = () => {
    const initialTheme = localStorage.getItem("savedTheme") ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const currentTheme = useRef(initialTheme);
    const [currentIcon, setCurrentIcon] = useState(() => localStorage.getItem("savedThemeIcon") ?? (initialTheme === "light" ? "sun" : "moon"));

    useEffect(() => document.documentElement.setAttribute("data-theme", currentTheme.current), []);

    function switchTheme() {
        const nextTheme = currentTheme.current === "light" ? "dark" : "light";
        currentTheme.current = nextTheme;
        document.documentElement.setAttribute("data-theme", nextTheme);

        const nextIcon = nextTheme === "light" ? "sun" : "moon";
        setCurrentIcon(nextIcon);

        localStorage.setItem("savedTheme", nextTheme);
        localStorage.setItem("savedThemeIcon", nextIcon);
    }

    return (
        <button id="theme-switcher" onClick={switchTheme}>
            <img id="theme-icon" src={`/assets/icons/${currentIcon}.svg`} alt={capitalise(currentIcon)} />
        </button>
    );
};
