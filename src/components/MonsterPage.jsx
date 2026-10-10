import "../styles/MonsterPage.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { fetchMonsters } from "../utils/fetchMonsters";
import { games } from "../utils/games";
import { getTabSlug } from "../utils/tabs";
import { capitalise } from "../utils/helper";

import { Loader } from "./Loader";

export const MonsterPage = ({ gameTab }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [monster, setMonster] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchMonster = async () => {
            const allMonsters = await fetchMonsters(gameTab);
            const monster = await allMonsters.find((monster) => String(monster.id) === id);
            if (!ignore) setMonster(monster);
        };
        fetchMonster();

        return () => (ignore = true);
    }, [gameTab, id]);

    if (!monster) return <Loader />;

    const game = games[gameTab];

    const icon = game.getIcon(monster);
    const type = game.getType(monster);
    const baseHealth = game.getBaseHealth(monster);
    const elementWeakness = game.getWeakness(monster) ?? "No Data";

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="monster-info-card">
                <button onClick={() => navigate(`/${getTabSlug(gameTab)}`)}>
                    <img src="/assets/icons/arrow-return-left.svg" alt="Return" />
                </button>

                <div className="monster-info-icon">
                    <img src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon}${gameTab !== "MH4U" ? ".png" : ""}`} alt={monster.name} />
                </div>
                <h1>{monster.name}</h1>

                {monster.description && (
                    <p>
                        <strong>Description: </strong>
                        {monster.description}
                    </p>
                )}

                {type && (
                    <p>
                        <strong>Type: </strong>
                        {capitalise(type)}
                    </p>
                )}

                {monster.species && (
                    <p>
                        <strong>Species: </strong>
                        {capitalise(monster.species)}
                    </p>
                )}

                {monster.signature_move && (
                    <p>
                        {monster.signature_move.split(",").length === 1 ? <strong>Signature Move: </strong> : <strong>Signature Moves: </strong>}
                        {capitalise(monster.signature_move)}
                    </p>
                )}

                {elementWeakness !== "No Data" && (
                    <p>
                        <strong>Weakness: </strong>
                        {capitalise(elementWeakness)} <img className="element-icon" src={`/assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} />
                    </p>
                )}

                {baseHealth && (
                    <p>
                        <strong>Base Health: </strong>
                        {baseHealth}
                    </p>
                )}
            </div>
        </div>
    );
};
