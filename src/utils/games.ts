import { type Element, type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";
const weaknesses = ["fire", "water", "thunder", "ice", "dragon", "poison", "paralysis", "sleep"];

interface Ailment {
    name: string;
    description?: string;
}

export interface WeaknessTableRow {
    name: string;
    value: number;
    condition?: string;
}

const getStrongestWeakness = (rows: WeaknessTableRow[]): Element => rows.filter((row) => ["fire", "water", "thunder", "ice", "dragon"].includes(row.name)).sort((first, second) => second.value - first.value)[0]?.name as Element;

export interface GameHelpers {
    getIcon: (monster: Monster) => string;
    getType: (monster: Monster) => string;
    getAilments: (monster: Monster) => Ailment[];
    getWeakness: (monster: Monster) => Element | undefined;
    getWeaknesses: (monster: Monster) => WeaknessTableRow[];
    getBaseHealth: (monster: Monster) => number | null;
}

export const games = {
    Wilds: {
        getIcon: (monster: WildsMonster) => monster.name,
        getType: (monster: WildsMonster) => monster.type,
        getAilments: () => [],
        getWeakness: (monster: WildsMonster) => getStrongestWeakness(games.Wilds.getWeaknesses(monster)),
        getWeaknesses: (monster: WildsMonster): WeaknessTableRow[] =>
            monster.weaknesses
                .filter((w) => weaknesses.includes(w.name))
                .map((w): WeaknessTableRow => ({ name: w.name, value: w.value, condition: w.condition }))
                .sort((first, second) => second.value - first.value),
        getBaseHealth: (monster: WildsMonster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster: RiseMonster) => monster.name,
        getType: (monster: RiseMonster) => monster.type,
        getAilments: (monster: RiseMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: RiseMonster) => getStrongestWeakness(games["Rise/Sunbreak"].getWeaknesses(monster)),
        getWeaknesses: (monster: RiseMonster): WeaknessTableRow[] =>
            monster.weaknesses
                .filter((w) => weaknesses.includes(w.name))
                .map((w): WeaknessTableRow => ({ name: w.name, value: w.value }))
                .sort((first, second) => second.value - first.value),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster: WorldMonster) => monster.name,
        getType: (monster: WorldMonster) => monster.type,
        getAilments: (monster: WorldMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment.name, description: ailment.description })),
        getWeakness: (monster: WorldMonster) => getStrongestWeakness(games["World/Iceborne"].getWeaknesses(monster)),
        getWeaknesses: (monster: WorldMonster): WeaknessTableRow[] =>
            monster.weaknesses
                .filter((w) => weaknesses.includes(w.name))
                .map((w): WeaknessTableRow => ({ name: w.name, value: w.value, condition: w.condition }))
                .sort((first, second) => second.value - first.value),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster: MHGUMonster) => monster.icon_name,
        getType: (monster: MHGUMonster) => monster.type,
        getAilments: (monster: MHGUMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: MHGUMonster) => getStrongestWeakness(games.MHGU.getWeaknesses(monster)),
        getWeaknesses: (monster: MHGUMonster): WeaknessTableRow[] =>
            monster.weaknesses
                .filter((w) => weaknesses.includes(w.name))
                .map((w): WeaknessTableRow => ({ name: w.name, value: w.value }))
                .sort((first, second) => second.value - first.value),
        getBaseHealth: (monster: MHGUMonster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster: MH4UMonster) => monster.icon_name,
        getType: (monster: MH4UMonster) => monster.type,
        getAilments: (monster: MH4UMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: MH4UMonster) => getStrongestWeakness(games.MH4U.getWeaknesses(monster)),
        getWeaknesses: (monster: MH4UMonster): WeaknessTableRow[] =>
            monster.weaknesses
                .filter((w) => weaknesses.includes(w.name))
                .map((w): WeaknessTableRow => ({ name: w.name, value: w.value }))
                .sort((first, second) => second.value - first.value),
        getBaseHealth: () => null,
    },
};
