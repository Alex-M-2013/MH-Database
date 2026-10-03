import "../styles/MonsterCards.css";
import { useState, useEffect } from "react";
import { fetchMonsters } from "../utils/fetchMonsters";
import { capitalise } from "../utils/helper";
import { Loader } from "./Loader";

export const MonsterCards = ({ gameTab }) => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        let ignore = false;

        const getMonsters = async () => {
            const data = await fetchMonsters(gameTab);
            if (!ignore) setMonsters(data);
        };
        getMonsters();
        
        return () => (ignore = true);
    }, [gameTab]);
    return (
        <>
            {monsters.length > 0 ? (
                monsters.map((monster) => {
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
                })
            ) : (
                <Loader />
            )}
        </>
    );
};
