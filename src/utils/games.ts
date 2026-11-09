import { type Element, type Monster, type WildsMonster, type RiseMonster, type WorldMonster, type MHGUMonster, type MH4UMonster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";

interface Ailment {
    name: string;
    description?: string;
}

export const getWeakness = (monster: Monster): Element | undefined => monster.weaknesses.filter((weakness) => ["fire", "water", "thunder", "ice", "dragon"].includes(weakness.name)).sort((first, second) => second.value - first.value)[0]?.name as Element | undefined;

export interface GameHelpers {
    getIcon: (monster: Monster) => string;
    getType: (monster: Monster) => string;
    getAilments: (monster: Monster) => Ailment[];
    getBaseHealth: (monster: Monster) => number | null;
}

export const games = {
    Wilds: {
        getIcon: (monster: WildsMonster) => monster.name,
        getType: (monster: WildsMonster) => monster.type,
        getAilments: () => [],
        getBaseHealth: (monster: WildsMonster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster: RiseMonster) => monster.name,
        getType: (monster: RiseMonster) => monster.type,
        getAilments: (monster: RiseMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster: WorldMonster) => monster.name,
        getType: (monster: WorldMonster) => monster.type,
        getAilments: (monster: WorldMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment.name, description: ailment.description })),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster: MHGUMonster) => monster.icon_name,
        getType: (monster: MHGUMonster) => monster.type,
        getAilments: (monster: MHGUMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getBaseHealth: (monster: MHGUMonster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster: MH4UMonster) => monster.icon_name,
        getType: (monster: MH4UMonster) => monster.type,
        getAilments: (monster: MH4UMonster): Ailment[] => monster.ailments.map((ailment) => ({ name: ailment })),
        getBaseHealth: () => null,
    },
};
