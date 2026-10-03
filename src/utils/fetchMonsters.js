import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../react-toastify.css";
import { parse as parseJSONC } from "jsonc-parser";

const errorToastOptions = {
    toastId: "monsterFetchingError",
    position: "top-center",
    autoClose: 3000,
    transition: Slide,
    style: {
        color: "white",
        backgroundColor: "#e83a3a",
    },
};

const showErrorToast = () => toast("Could not fetch monster data. See console (F12) for more details.", errorToastOptions);

const monsterSources = {
    Wilds: {
        url: 'https://wilds.mhdb.io/en/monsters?q={"kind":"large"}',
        parse: (r) => r.json(),
    },
    "Rise/Sunbreak": {
        url: "/data/rise_monster_db.jsonc",
        parse: async (response) => parseJSONC(await response.text()),
    },
    "World/Iceborne": {
        url: "/data/mhw-db-com-monsters-large.json",
        parse: (response) => response.json(),
    },
    MHGU: {
        url: "/data/mhgu_monsters.json",
        parse: async (r) => {
            const monsters = await r.json();
            const filteredMonsters = monsters.filter((monster) => monster.type === "large" || monster.type === "deviant");
            return filteredMonsters;
        },
    },
};

export const fetchMonsters = async (game) => {
    try {
        const { url, parse } = monsterSources[game];

        const response = await fetch(url);
        if (!response.ok) {
            showErrorToast();
            throw new Error(`ERROR: ${response.status}`);
        }

        const data = await parse(response);
        return data;
    } catch (error) {
        showErrorToast();
        console.error(error);
        return [];
    }
};
