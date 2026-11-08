interface BaseMonster {
    id: number;
    name: string;
    weaknesses: {
        name: string;
        value: number
        condition?: string;
    }[];
}

export interface OptionalFields {
    species?: string;
    description?: string;
    features?: string;
    tips?: string;
    signature_move?: string;
}

export type Element = "fire" | "water" | "thunder" | "ice" | "dragon";

export interface WildsMonster extends BaseMonster {
    type: "large";
    species: string;
    description: string;
    features: string;
    tips: string;
    baseHealth: number;
}

export interface RiseMonster extends BaseMonster {
    type: "large";
    species: string;
    ailments: string[];
}

export interface WorldMonster extends BaseMonster {
    type: "large";
    species: string;
    description: string;
    ailments: {
        name: string;
        description: string;
    }[];
}

export interface MHGUMonster extends BaseMonster {
    type: "large" | "deviant";
    base_hp: number;
    icon_name: string;
    ailments: string[];
}

export interface MH4UMonster extends BaseMonster {
    type: "large";
    signature_move: string;
    icon_name: string;
    ailments: string[];
}

export type Monster = WildsMonster | RiseMonster | WorldMonster | MHGUMonster | MH4UMonster;
