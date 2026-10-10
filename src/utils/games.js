export const games = {
    Wilds: {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.kind,
        getWeakness: (monster) => monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0],
        getBaseHealth: (monster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster) => monster.name,
        getType: () => "Large",
        getWeakness: (monster) => monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element,
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.type,
        getWeakness: (monster) => monster.weaknesses.filter((w) => ["fire", "water", "thunder", "ice", "dragon"].includes(w.element)).reduce((best, current) => (current.stars > best.stars || (current.stars === best.stars && best.condition && !current.condition) ? current : best), { stars: -1, element: null, condition: null }).element,
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
        getBaseHealth: () => null,
    },
};
