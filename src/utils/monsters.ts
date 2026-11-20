interface BaseMonster {
    id: number;
    name: string;
    weaknesses: {
        name: string;
        value: number;
        condition?: string;
    }[];
}

export interface OptionalMonsterProps {
    species?: string;
    description?: string;
    features?: string;
    tips?: string;
    signatureMove?: string;
    baseHealth?: number;
    ailments?: {
        name: string;
        description?: string;
    }[];
}

interface WildsMonster extends BaseMonster {
    type: "large";
    species: string;
    description: string;
    features: string;
    tips: string;
    baseHealth: number;
}

interface RiseMonster extends BaseMonster {
    type: "large";
    species: string;
    ailments: {
        name: string;
    }[];
}

interface WorldMonster extends BaseMonster {
    type: "large";
    species: string;
    description: string;
    ailments: {
        name: string;
        description: string;
    }[];
}

interface MHGUMonster extends BaseMonster {
    type: "large" | "deviant";
    iconName: string;
    baseHealth: number;
    ailments: {
        name: string;
    }[];
}

interface MH4UMonster extends BaseMonster {
    type: "large";
    iconName: string;
    signatureMove: string;
    ailments: {
        name: string;
    }[];
}

export type Monster = Readonly<WildsMonster | RiseMonster | WorldMonster | MHGUMonster | MH4UMonster>;
