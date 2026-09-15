import "../styles/components/ThemeSwitcher.css";
import { useRef, useState, useEffect } from "react";
import { capitalise } from "../utils/helper";

export const ThemeSwitcher = () => {
    const currentTheme = useRef(localStorage.getItem("savedTheme") ?? "light");
    const [currentIcon, setCurrentIcon] = useState(() => localStorage.getItem("savedThemeIcon") ?? "sun");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme.current);
    }, []);

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
