import "../styles/components/MonsterCards.css";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { parse } from "jsonc-parser";
import { capitalise } from "../utils/helper";

const monsterSources = {
    Wilds: {
        url: 'https://wilds.mhdb.io/en/monsters?q={"kind":"large"}',
        parse: (r) => r.json(),
    },
    "Rise/Sunbreak": {
        url: "/data/rise_monster_db.jsonc",
        parse: (r) => r.text().then((text) => parse(text)),
    },
    "World/Iceborne": {
        url: "/data/mhw-db-com-monsters-large.json",
        parse: (r) => r.json(),
    },
    MHGU: {
        url: "/data/mhgu_monsters.json",
        parse: (r) => r.json().then((monsters) => monsters.filter((monster) => monster.type === "large" || monster.type === "deviant")),
    },
};

export const MonsterCards = ({ gameTab }) => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        const errorToast = Toastify({
            text: "Could not fetch monster data. See console (F12) for more details.",
            duration: 4500,
            style: {
                background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                borderRadius: "8px",
            },
        });

        queueMicrotask(() => setMonsters([]));

        const dataSource = monsterSources[gameTab];

        fetch(dataSource.url)
            .then(dataSource.parse)
            .then((data) => setMonsters(data))
            .catch((error) => {
                errorToast.showToast();
                console.error(error);
            });
    }, [gameTab]);

    return (
        <>
            {monsters.map((monster) => {
                const games = {
                    Wilds: {
                        iconVar: monster.name,
                        typeVar: monster.kind,
                        getWeakness: (monster) => monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0],
                        baseHealthVar: monster.baseHealth,
                    },
                    "Rise/Sunbreak": {
                        iconVar: monster.name,
                        typeVar: "Large",
                        getWeakness: (monster) => monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element,
                        baseHealthVar: null,
                    },
                    "World/Iceborne": {
                        iconVar: monster.name,
                        typeVar: monster.type,
                        getWeakness: (monster) => monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element,
                        baseHealthVar: null,
                    },
                    MHGU: {
                        iconVar: monster.icon_name,
                        typeVar: monster.type,
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
                        baseHealthVar: monster.base_hp,
                    },
                };

                const game = games[gameTab];
                const elementWeakness = game.getWeakness(monster) ?? "No Data";

                return (
                    <div className="monster-card" key={monster.name}>
                        <img className="monster-icon" src={`assets/icons/Monsters/${gameTab.split("/")[0]}/${game.iconVar}.png`} alt={monster.name} loading="lazy" />

                        <p>
                            <strong>Name: </strong>
                            {monster.name}
                        </p>

                        <p className="monster-type">
                            <strong>Type: </strong>
                            {capitalise(game.typeVar ?? "Large")}
                        </p>

                        <p style={{ display: gameTab !== "MHGU" ? "" : "none" }} className="monster-species">
                            <strong>Species: </strong>
                            {capitalise(monster.species ?? "No Data")}
                        </p>

                        <p>
                            <strong>Weakness: </strong>
                            {capitalise(elementWeakness)} {elementWeakness !== "No Data" && <img className="element-icon" src={`assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} loading="lazy" />}
                        </p>

                        <p style={{ display: gameTab !== "Rise/Sunbreak" && gameTab !== "World/Iceborne" ? "" : "none" }}>
                            <strong>Base HP: </strong>
                            {game.baseHealthVar ?? "No Data"}
                        </p>
                    </div>
                );
            })}
        </>
    );
};
