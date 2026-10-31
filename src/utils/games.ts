import { type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";

interface AilmentTableRow {
    name: string;
    description?: string;
}

export interface WeaknessTableRow {
    name: string;
    value: number;
    condition?: string;
}

const getStrongestWeakness = (rows: WeaknessTableRow[]) => rows.filter((row) => ["fire", "water", "ice", "thunder", "dragon"].includes(row.name)).sort((first, second) => second.value - first.value)[0]?.name;

export interface GameHelpers {
    getIcon: (monster: Monster) => string;
    getType: (monster: Monster) => string | undefined;
    getAilments: (monster: Monster) => AilmentTableRow[] | null;
    getWeakness: (monster: Monster) => string | undefined;
    getWeaknesses: (monster: Monster) => WeaknessTableRow[];
    getBaseHealth: (monster: Monster) => number | null;
}

export const games = {
    Wilds: {
        getIcon: (monster: WildsMonster) => monster.name,
        getType: (monster: WildsMonster) => monster.kind,
        getAilments: () => null,
        getWeakness: (monster: WildsMonster) => getStrongestWeakness(games.Wilds.getWeaknesses(monster)),
        getWeaknesses: (monster: WildsMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element ?? w.status ?? w.effect ?? "Not found", value: w.level, condition: w.condition })),
        getBaseHealth: (monster: WildsMonster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster: RiseMonster) => monster.name,
        getType: () => "Large",
        getAilments: (monster: RiseMonster): AilmentTableRow[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: RiseMonster) => getStrongestWeakness(games["Rise/Sunbreak"].getWeaknesses(monster)),
        getWeaknesses: (monster: RiseMonster): WeaknessTableRow[] => monster.weaknesses.filter((w) => w.stars > 0).map((w): WeaknessTableRow => ({ name: w.element, value: w.stars })),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster: WorldMonster) => monster.name,
        getType: (monster: WorldMonster) => monster.type,
        getAilments: (monster: WorldMonster): AilmentTableRow[] => monster.ailments.map((ailment) => ({ name: ailment.name, description: ailment.description })),
        getWeakness: (monster: WorldMonster) => getStrongestWeakness(games["World/Iceborne"].getWeaknesses(monster)),
        getWeaknesses: (monster: WorldMonster): WeaknessTableRow[] => monster.weaknesses.map((w): WeaknessTableRow => ({ name: w.element, value: w.stars, condition: w.condition })),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster: MHGUMonster) => monster.icon_name,
        getType: (monster: MHGUMonster) => monster.type,
        getAilments: (monster: MHGUMonster): AilmentTableRow[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: MHGUMonster) => getStrongestWeakness(games.MHGU.getWeaknesses(monster)),
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
        getAilments: (monster: MH4UMonster): AilmentTableRow[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getWeakness: (monster: MH4UMonster) => getStrongestWeakness(games.MH4U.getWeaknesses(monster)),
        getWeaknesses: (monster: MH4UMonster): WeaknessTableRow[] => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};

            const entries = Object.entries({ ...elements, ...status });
            const filtered = entries.filter(([, value]) => value > 0);
            return filtered.map(([name, value]) => ({ name, value }));
        },
        getBaseHealth: () => null,
    },
};
