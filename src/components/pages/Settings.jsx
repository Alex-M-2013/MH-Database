import styles from "../../styles/pages/Settings.module.scss";
import { useSyncExternalStore, useState } from "react";
import { capitalise } from "../../utils/helper";

const subscribeToTheme = (callback) => {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
};

const getTheme = () => document.documentElement.getAttribute("data-theme");

export const Settings = () => {
    const theme = useSyncExternalStore(subscribeToTheme, getTheme);
    const [sortOrder, setSortOrder] = useState(localStorage.getItem("savedSortOrder") ?? "default");

    return (
        <div className={styles.settings}>
            <div className={styles.card}>
                <h1>Settings</h1>

                <p>
                    <strong>Theme: </strong>
                    <button onClick={() => document.getElementById("theme-switcher").click()}>{capitalise(theme)}</button>
                </p>
                <p>
                    <strong>Reset localStorage:</strong>
                    <button onClick={() => localStorage.clear()}>Reset</button>
                </p>
                <p>
                    <strong>Monster Sort Order: </strong>
                    <select
                        value={sortOrder}
                        onChange={(event) => {
                            setSortOrder(event.currentTarget.value);
                            localStorage.setItem("savedSortOrder", event.currentTarget.value);
                        }}
                    >
                        <option value="default">Default</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                    </select>
                </p>
            </div>
        </div>
    );
};
