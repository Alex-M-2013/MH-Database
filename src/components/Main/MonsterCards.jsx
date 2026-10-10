import "../../styles/Main/MonsterCards.scss";
import { useState, useEffect } from "react";

import { fetchMonsters } from "../../utils/fetchMonsters";
import { getTabSlug } from "../../utils/tabs";
import { capitalise, removeDashes } from "../../utils/helper";

import { ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { Loader } from "../Loader";

export const MonsterCards = ({ gameTab, search }) => {
    const [monsters, setMonsters] = useState([]);
    const userSearch = removeDashes(search).toLowerCase().trim();

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
            <ToastContainer />
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
                            getWeakness: (monster) => monster.weaknesses.filter((w) => ["fire", "water", "thunder", "ice", "dragon"].includes(w.element)).reduce((best, current) => (current.stars > best.stars || (current.stars === best.stars && best.condition && !current.condition) ? current : best), { stars: -1, element: null, condition: null }).element,
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
                        MH4U: {
                            iconVar: monster.icon_name,
                            typeVar: "Large",
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
                            baseHealthVar: null,
                        },
                    };

                    const game = games[gameTab];
                    const elementWeakness = game.getWeakness(monster) ?? "No Data";

                    const matchesSearch = [monster.name, game.typeVar, monster.species].filter(Boolean).some((field) => removeDashes(field).toLowerCase().includes(userSearch));
                    if (!matchesSearch) return null;

                    return (
                        <Link className="monster-card" key={monster.name} to={`/${getTabSlug(gameTab)}/${monster.id}`}>
                            <img className="monster-icon" src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${game.iconVar}${gameTab !== "MH4U" ? ".png" : ""}`} alt={monster.name} loading="lazy" />

                            <p>
                                <strong>Name: </strong>
                                {monster.name}
                            </p>

                            <p>
                                <strong>Type: </strong>
                                {capitalise(game.typeVar ?? "Large")}
                            </p>

                            <p style={{ display: gameTab !== "MHGU" && gameTab !== "MH4U" ? "" : "none" }}>
                                <strong>Species: </strong>
                                {capitalise(monster.species ?? "No Data")}
                            </p>

                            <p>
                                <strong>Weakness: </strong>
                                {capitalise(elementWeakness)} {elementWeakness !== "No Data" && <img className="element-icon" src={`/assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} loading="lazy" />}
                            </p>

                            <p style={{ display: gameTab !== "Rise/Sunbreak" && gameTab !== "World/Iceborne" && gameTab !== "MH4U" ? "" : "none" }}>
                                <strong>Base HP: </strong>
                                {game.baseHealthVar ?? "No Data"}
                            </p>
                        </Link>
                    );
                })
            ) : (
                <Loader />
            )}
        </>
    );
};
