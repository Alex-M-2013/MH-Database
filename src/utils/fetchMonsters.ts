import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parse as parseJSONC } from "jsonc-parser";
import { type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";
import { type Game } from "./games";

const showErrorToast = () =>
    toast("Could not fetch monster data. See console (F12) for more details.", {
        toastId: "monsterFetchingError",
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
        draggableDirection: "y",
        className: "toast",
        style: {
            color: "white",
            backgroundColor: "#e83a3a",
        },
    });

const monsterSources = {
    Wilds: {
        url: 'https://wilds.mhdb.io/en/monsters?q={"kind":"large"}',
        parse: (r: Response): Promise<WildsMonster[]> => r.json(),
    },
    "Rise/Sunbreak": {
        url: "/data/rise_monster_db.jsonc",
        parse: async (response: Response): Promise<RiseMonster[]> => parseJSONC(await response.text()),
    },
    "World/Iceborne": {
        url: "/data/mhw_db.json",
        parse: async (response: Response): Promise<WorldMonster[]> => {
            const monsters: WorldMonster[] = await response.json();
            const seen: Set<string> = new Set();
            const filteredMonsters: WorldMonster[] = monsters.filter((monster: WorldMonster) => {
                if (monster.type !== "large" || seen.has(monster.name)) return false;
                seen.add(monster.name);
                return true;
            });

            return filteredMonsters;
        },
    },
    MHGU: {
        url: "/data/mhgu_monsters.json",
        parse: async (r: Response): Promise<MHGUMonster[]> => {
            const monsters: MHGUMonster[] = await r.json();
            const filteredMonsters: MHGUMonster[] = monsters.filter((monster: MHGUMonster) => monster.type === "large" || monster.type === "deviant");
            return filteredMonsters;
        },
    },
    MH4U: {
        url: "/data/mh4u_monsters.json",
        parse: async (r: Response): Promise<MH4UMonster[]> => {
            const monsters: MH4UMonster[] = await r.json();
            const filteredMonsters: MH4UMonster[] = monsters.filter((monster: MH4UMonster) => monster.class === "Boss");
            return filteredMonsters;
        },
    },
};

export const fetchMonsters = async (game: Game): Promise<Monster[]> => {
    try {
        const { url, parse } = monsterSources[game];

        const response = await fetch(url);
        if (!response.ok) {
            showErrorToast();
            throw new Error(`ERROR: ${response.status}`);
        }

        const data: Monster[] = await parse(response);
        return data;
    } catch (error) {
        showErrorToast();
        console.error(error);
        return [];
    }
};
