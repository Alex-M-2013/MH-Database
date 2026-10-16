import styles from "../../styles/pages/Settings.module.scss";
import { useSyncExternalStore, useState } from "react";
import { capitalise } from "../../utils/helper";

export const Settings = () => {
    const theme = useSyncExternalStore(
        (callback) => {
            const observer = new MutationObserver(callback);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
            return () => observer.disconnect();
        },
        () => document.documentElement.getAttribute("data-theme"),
    );

    const [sortOrder, setSortOrder] = useState(() => localStorage.getItem("savedSortOrder") ?? "default");
    const [imagesOn, setImagesOn] = useState(() => JSON.parse(localStorage.getItem("imagesOn")) ?? true);

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
                <p>
                    <strong>Monster Images: </strong>
                    <button
                        onClick={() => {
                            const nextValue = !imagesOn;
                            setImagesOn(nextValue);
                            localStorage.setItem("imagesOn", nextValue);
                        }}
                    >
                        {imagesOn ? "On" : "Off"}
                    </button>
                </p>
            </div>
        </div>
    );
};
