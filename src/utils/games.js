const toRows = (values) => Object.entries(values).filter(([, value]) => value > 0).map(([name, value]) => ({ name, value }));

export const games = {
    Wilds: {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.kind,
        getWeakness: (monster) => monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0],
        getWeaknesses: (monster) => monster.weaknesses.filter((w) => w.element ?? w.status).map((w) => ({ name: w.element ?? w.status, value: w.level, note: w.condition })),
        getBaseHealth: (monster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster) => monster.name,
        getType: () => "Large",
        getWeakness: (monster) => monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element,
        getWeaknesses: (monster) => monster.weaknesses.map((w) => ({ name: w.element, value: w.stars })),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.type,
        getWeakness: (monster) => monster.weaknesses.filter((w) => ["fire", "water", "thunder", "ice", "dragon"].includes(w.element)).reduce((best, current) => (current.stars > best.stars || (current.stars === best.stars && best.condition && !current.condition) ? current : best), { stars: -1, element: null, condition: null }).element,
        getWeaknesses: (monster) => monster.weaknesses.map((w) => ({ name: w.element, value: w.stars, note: w.condition })),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster) => monster.icon_name,
        getType: (monster) => monster.type,
        getWeakness: (monster) => {
            const data = monster.weaknesses?.[0];

            let bestKey = null;
            let bestValue = -Infinity;

            for (const [key, value] of Object.entries(data)) {
                if (key === "state") continue;
                if (value > bestValue) {
                    bestValue = value;
                    bestKey = key;
                }
            }

            return bestKey;
        },
        getWeaknesses: (monster) => {
            const { state, pitfall_trap, shock_trap, flash_bomb, sonic_bomb, dung_bomb, meat, ...rest } = monster.weaknesses?.[0] ?? {};
            return toRows(rest);
        },
        getBaseHealth: (monster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster) => monster.icon_name,
        getType: () => "Large",
        getWeakness: (monster) => {
            const elements = monster.weaknesses?.[0]?.elements ?? {};

            let bestKey = null;
            let bestValue = 0;

            for (const [key, value] of Object.entries(elements)) {
                if (value > bestValue) {
                    bestValue = value;
                    bestKey = key;
                }
            }

            return bestKey;
        },
        getWeaknesses: (monster) => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};
            return toRows({ ...elements, ...status });
        },
        getBaseHealth: () => null,
    },
};
