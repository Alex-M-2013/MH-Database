import { type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";
export type WeaknessTableRow = { name: string | undefined; value: number; condition?: string | null };

const getStrongest = (rows: WeaknessTableRow[]) => rows.filter((row) => row.name !== undefined && ["fire", "water", "ice", "thunder", "dragon"].includes(row.name)).sort((first, second) => second.value - first.value)[0]?.name;

export interface GameHelpers {
    getIcon: (monster: Monster) => string;
    getType: (monster: Monster) => string | undefined;
    getWeakness: (monster: Monster) => string | undefined;
    getWeaknesses: (monster: Monster) => WeaknessTableRow[];
    getBaseHealth: (monster: Monster) => number | null;
}

export const games = {
    Wilds: {
        getIcon: (monster: WildsMonster) => monster.name,
        getType: (monster: WildsMonster) => monster.kind,
        getWeakness: (monster: WildsMonster) => getStrongest(games.Wilds.getWeaknesses(monster)),
        getWeaknesses: (monster: WildsMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element ?? w.status ?? w.effect, value: w.level, condition: w.condition })),
        getBaseHealth: (monster: WildsMonster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster: RiseMonster) => monster.name,
        getType: () => "Large",
        getWeakness: (monster: RiseMonster) => getStrongest(games["Rise/Sunbreak"].getWeaknesses(monster)),
        getWeaknesses: (monster: RiseMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element, value: w.stars })),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster: WorldMonster) => monster.name,
        getType: (monster: WorldMonster) => monster.type,
        getWeakness: (monster: WorldMonster) => getStrongest(games["World/Iceborne"].getWeaknesses(monster)),
        getWeaknesses: (monster: WorldMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element, value: w.stars, condition: w.condition })),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster: MHGUMonster) => monster.icon_name,
        getType: (monster: MHGUMonster) => monster.type,
        getWeakness: (monster: MHGUMonster) => getStrongest(games.MHGU.getWeaknesses(monster)),
        getWeaknesses: (monster: MHGUMonster) => {
            const { state, pitfall_trap, shock_trap, flash_bomb, sonic_bomb, dung_bomb, meat, ...rest } = monster.weaknesses?.[0] ?? {};
            return Object.entries(rest)
                .filter(([, value]) => value > 0)
                .map(([name, value]) => ({ name, value }));
        },
        getBaseHealth: (monster: MHGUMonster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster: MH4UMonster) => monster.icon_name,
        getType: () => "Large",
        getWeakness: (monster: MH4UMonster) => getStrongest(games.MH4U.getWeaknesses(monster)),
        getWeaknesses: (monster: MH4UMonster) => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};
            return Object.entries({ ...elements, ...status })
                .filter(([, value]) => value > 0)
                .map(([name, value]) => ({ name, value }));
        },
        getBaseHealth: () => null,
    },
};
