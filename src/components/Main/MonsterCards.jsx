import "../../styles/Main/MonsterCards.scss";
import { useState, useEffect } from "react";

import { fetchMonsters } from "../../utils/fetchMonsters";
import { games } from "../../utils/games";
import { getTabSlug } from "../../utils/tabs";
import { capitalise, removeDashes } from "../../utils/helper";

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
            {monsters.length > 0 ? (
                monsters.map((monster) => {
                    const game = games[gameTab];

                    const icon = game.getIcon(monster);
                    const type = game.getType(monster);
                    const baseHealth = game.getBaseHealth(monster)
                    const elementWeakness = game.getWeakness(monster) ?? "No Data";

                    const matchesSearch = [monster.name, type, monster.species].filter(Boolean).some((field) => removeDashes(field).toLowerCase().includes(userSearch));
                    if (!matchesSearch) return null;

                    return (
                        <Link className="monster-card" key={monster.name} to={`/${getTabSlug(gameTab)}/${monster.id}`}>
                            <img className="monster-icon" src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon}${gameTab !== "MH4U" ? ".png" : ""}`} alt={monster.name} loading="lazy" />

                            <p>
                                <strong>Name: </strong>
                                {monster.name}
                            </p>

                            <p>
                                <strong>Type: </strong>
                                {capitalise(type ?? "Large")}
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
                                {baseHealth ?? "No Data"}
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
