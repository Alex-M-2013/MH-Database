interface BaseMonster {
    id: number;
    name: string;
}

export interface WildsMonster extends BaseMonster {
    kind: "large";
    species: string;
    description: string;
    features: string;
    tips: string;
    baseHealth: number;
    weaknesses: {
        element?: string;
        status?: string;
        effect?: string;
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
        stars: 2;
        condition?: string;
    }[];
}

export interface MHGUMonster extends BaseMonster {
    type: "large" | "small" | "deviant";
    base_hp: number;
    icon_name: string;
    weaknesses: {
        state: string;
        fire: number;
        water: number;
        thunder: number;
        ice: number;
        dragon: number;
        poison: number;
        paralysis: number;
        sleep: number;
        pitfall_trap: number;
        shock_trap: number;
        flash_bomb: number;
        sonic_bomb: number;
        dung_bomb: number;
        meat: number;
    }[];
}

export interface MH4UMonster extends BaseMonster {
    class: "Boss" | "Minion";
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
