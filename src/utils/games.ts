import { type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";
export interface WeaknessTableRow {
    name: string;
    value: number;
    condition?: string;
}

const getStrongest = (rows: WeaknessTableRow[]) => rows.filter((row) => ["fire", "water", "ice", "thunder", "dragon"].includes(row.name)).sort((first, second) => second.value - first.value)[0]?.name;

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
        getWeaknesses: (monster: WildsMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element ?? w.status ?? w.effect ?? "Not found", value: w.level, condition: w.condition })),
        getBaseHealth: (monster: WildsMonster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster: RiseMonster) => monster.name,
        getType: () => "Large",
        getWeakness: (monster: RiseMonster) => getStrongest(games["Rise/Sunbreak"].getWeaknesses(monster)),
        getWeaknesses: (monster: RiseMonster): WeaknessTableRow[] => monster.weaknesses.filter((w) => w.stars > 0).map((w): WeaknessTableRow => ({ name: w.element, value: w.stars })),
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
        getWeaknesses: (monster: MHGUMonster): WeaknessTableRow[] => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};

            const entries = Object.entries({ ...elements, ...status });
            const filtered = entries.filter(([, value]) => value > 0);
            return filtered.map(([name, value]) => ({ name, value }));
        },
        getBaseHealth: (monster: MHGUMonster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster: MH4UMonster) => monster.icon_name,
        getType: () => "Large",
        getWeakness: (monster: MH4UMonster) => getStrongest(games.MH4U.getWeaknesses(monster)),
        getWeaknesses: (monster: MH4UMonster): WeaknessTableRow[] => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};

            const entries = Object.entries({ ...elements, ...status });
            const filtered = entries.filter(([, value]) => value > 0);
            return filtered.map(([name, value]) => ({ name, value }));
        },
        getBaseHealth: () => null,
    },
};
