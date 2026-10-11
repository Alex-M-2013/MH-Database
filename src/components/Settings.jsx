import "../styles/Settings.scss";
import { useSyncExternalStore } from "react";
import { capitalise } from "../utils/helper"

const subscribeToTheme = (callback) => {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
};

const getTheme = () => document.documentElement.getAttribute("data-theme");

export const Settings = () => {
    const theme = useSyncExternalStore(subscribeToTheme, getTheme);

    return (
        <div id="settings">
            <div id="settings-card">
                <h1>Settings</h1>

                <p>
                    <strong>Theme: </strong>
                    <button onClick={() => document.getElementById("theme-switcher").click()}>{capitalise(theme)}</button>
                </p>
                <p>
                    <strong>Reset localStorage:</strong>
                    <button onClick={() => localStorage.clear()}>Reset</button>
                </p>
            </div>
        </div>
    );
};
