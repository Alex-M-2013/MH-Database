const toRows = (values) => Object.entries(values).filter(([, value]) => value > 0).map(([name, value]) => ({ name, value }));

const getStrongest = (rows) => rows.filter(row => ["fire", "water", "ice", "thunder", "dragon"].includes(row.name)).sort((first, second) => second.value - first.value)[0]?.name

export const games = {
    Wilds: {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.kind,
        getWeakness: (monster) => getStrongest(games.Wilds.getWeaknesses(monster)),
        getWeaknesses: (monster) => monster.weaknesses.filter((w) => w.element ?? w.status).map((w) => ({ name: w.element ?? w.status, value: w.level, note: w.condition })),
        getBaseHealth: (monster) => monster.baseHealth,
    },
    "Rise/Sunbreak": {
        getIcon: (monster) => monster.name,
        getType: () => "Large",
        getWeakness: (monster) => getStrongest(games["Rise/Sunbreak"].getWeaknesses(monster)),
        getWeaknesses: (monster) => monster.weaknesses.map((w) => ({ name: w.element, value: w.stars })),
        getBaseHealth: () => null,
    },
    "World/Iceborne": {
        getIcon: (monster) => monster.name,
        getType: (monster) => monster.type,
        getWeakness: (monster) => getStrongest(games["World/Iceborne"].getWeaknesses(monster)),
        getWeaknesses: (monster) => monster.weaknesses.map((w) => ({ name: w.element, value: w.stars, note: w.condition })),
        getBaseHealth: () => null,
    },
    MHGU: {
        getIcon: (monster) => monster.icon_name,
        getType: (monster) => monster.type,
        getWeakness: (monster) => getStrongest(games.MHGU.getWeaknesses(monster)),
        getWeaknesses: (monster) => {
            // eslint-disable-next-line no-unused-vars
            const { state, pitfall_trap, shock_trap, flash_bomb, sonic_bomb, dung_bomb, meat, ...rest } = monster.weaknesses?.[0] ?? {};
            return toRows(rest);
        },
        getBaseHealth: (monster) => monster.base_hp,
    },
    MH4U: {
        getIcon: (monster) => monster.icon_name,
        getType: () => "Large",
        getWeakness: monster => getStrongest(games.MHGU.getWeaknesses(monster)),
        getWeaknesses: (monster) => {
            const { elements, status } = monster.weaknesses?.[0] ?? {};
            return toRows({ ...elements, ...status });
        },
        getBaseHealth: () => null,
    },
};
