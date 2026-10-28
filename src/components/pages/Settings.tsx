import { type FC, useSyncExternalStore, useState } from "react";
import styles from "@styles/pages/Settings.module.scss";

import { type Theme } from "@components/NavBar/ThemeSwitcher";
import { capitalise } from "@utils/helper";

export const Settings: FC = () => {
    const theme: Theme | null = useSyncExternalStore(
        (callback) => {
            const observer = new MutationObserver(callback);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
            return () => observer.disconnect();
        },
        (): Theme | null => document.documentElement.getAttribute("data-theme") as Theme | null,
    );

    const [sortOrder, setSortOrder] = useState<string>(() => localStorage.getItem("savedSortOrder") ?? "default");
    const [imagesOn, setImagesOn] = useState<boolean>(() => JSON.parse(localStorage.getItem("imagesOn") ?? "true"));

    return (
        <div className={styles.settings}>
            <div className={styles.card}>
                <h1>Settings</h1>

                <h2>General</h2>
                <p>
                    <strong>Theme: </strong>
                    <button onClick={() => document.getElementById("theme-switcher")!.click()}>{capitalise(theme ?? "")}</button>
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
                            const nextValue: boolean = !imagesOn;
                            setImagesOn(nextValue);
                            localStorage.setItem("imagesOn", JSON.stringify(nextValue));
                        }}
                    >
                        {imagesOn ? "On" : "Off"}
                    </button>
                </p>

                <h2>localStorage</h2>
                <p>
                    <strong>Reset localStorage:</strong>
                    <button onClick={() => localStorage.clear()}>Reset</button>
                </p>
                <p>
                    <strong>Import localStorage: </strong>
                    <button
                        onClick={() => {
                            const input: string | null = prompt("Paste data here: ");
                            try {
                                Object.assign(localStorage, JSON.parse(input ?? ""));
                                alert("Successfully imported data. The page will now reload.");
                                window.location.reload();
                            } catch {
                                alert("Invalid data");
                            }
                        }}
                    >
                        Import
                    </button>
                </p>
                <p>
                    <strong>Export localStorage: </strong>
                    <button
                        onClick={() => {
                            alert(`${JSON.stringify(localStorage)}\n\n Copied to clipboard`);
                            navigator.clipboard.writeText(JSON.stringify(localStorage));
                            console.log(`Exported localStorage: ${JSON.stringify(localStorage)}`);
                        }}
                    >
                        Export
                    </button>
                </p>
            </div>
        </div>
    );
};
