interface BaseMonster {
    id: number;
    name: string;
}

export interface OptionalFields {
    description?: string;
    features?: string;
    tips?: string;
    species?: string;
    signature_move?: string;
}

type Element = "fire" | "water" | "thunder" | "ice" | "dragon";

export interface WildsMonster extends BaseMonster {
    kind: "large";
    species: string;
    description: string;
    features: string;
    tips: string;
    baseHealth: number;
    weaknesses: {
        element?: Element;
        status?: string;
        effect?: string;
        kind: "element" | "status" | "effect";
        level: number;
        condition?: string;
    }[];
}

export interface RiseMonster extends BaseMonster {
    species: string;
    weaknesses: {
        element: string;
        stars: number;
    }[];
}

export interface WorldMonster extends BaseMonster {
    type: "large" | "small";
    species: string;
    description: string;
    weaknesses: {
        element: string;
        stars: number;
        condition?: string;
    }[];
}

export interface MHGUMonster extends BaseMonster {
    type: "large" | "small" | "deviant";
    base_hp: number;
    icon_name: string;
    weaknesses: {
        state: string;
        elements: {
            fire: number;
            water: number;
            thunder: number;
            ice: number;
            dragon: number;
        };
        status: {
            poison: number;
            paralysis: number;
            sleep: number;
        };
        items: {
            pitfall_trap: number;
            shock_trap: number;
            flash_bomb: number;
            sonic_bomb: number;
            dung_bomb: number;
            meat: number;
        };
    }[];
}

export interface MH4UMonster extends BaseMonster {
    type: "large" | "small";
    signature_move: string;
    icon_name: string;
    weaknesses: {
        state: string;
        elements: {
            fire: number;
            water: number;
            thunder: number;
            ice: number;
            dragon: number;
        };
        status: {
            poison: number;
            paralysis: number;
            sleep: number;
        };
        items: {
            pitfall_trap: number;
            shock_trap: number;
            flash_bomb: number;
            sonic_bomb: number;
            dung_bomb: number;
            meat: number;
        };
    }[];
}

export type Monster = WildsMonster | RiseMonster | WorldMonster | MHGUMonster | MH4UMonster;
