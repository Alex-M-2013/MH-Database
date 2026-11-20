import { type Monster } from "./monsters";

export type Game = "Wilds" | "Rise/Sunbreak" | "World/Iceborne" | "MHGU" | "MH4U";
export type Element = "fire" | "water" | "thunder" | "ice" | "dragon";

export const getIcon = (monster: Monster, game: Game) => {
    switch (game) {
        case "MHGU":
        case "MH4U":
            const { iconName } = monster as { iconName: string };
            return iconName;

        default:
            return monster.name;
    }
};

export const getWeakness = (monster: Monster): Element | undefined => monster.weaknesses.filter((weakness) => ["fire", "water", "thunder", "ice", "dragon"].includes(weakness.name)).sort((first, second) => second.value - first.value)[0]?.name as Element | undefined;
