import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { parse as parseJSONC } from "jsonc-parser";

const errorToast = Toastify({
    text: "Could not fetch monster data. See console (F12) for more details.",
    duration: 4500,
    style: {
        background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        borderRadius: "8px",
    },
});

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
            errorToast.showToast();
            throw new Error(`ERROR: ${response.status}`);
        }

        const data = await parse(response);
        return data;
    } catch (error) {
        errorToast.showToast();
        console.error(error);
        return [];
    }
};
