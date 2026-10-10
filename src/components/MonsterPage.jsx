import "../styles/MonsterPage.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { fetchMonsters } from "../utils/fetchMonsters";
import { getTabSlug } from "../utils/tabs";
import { capitalise } from "../utils/helper";

import { Loader } from "./Loader"

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

    const games = {
        Wilds: {
            typeVar: monster.kind,
            getWeakness: (monster) => monster.weaknesses.map((weakness) => weakness.element).filter(Boolean)[0],
            baseHealthVar: monster.baseHealth,
        },
        "Rise/Sunbreak": {
            typeVar: "Large",
            getWeakness: (monster) => monster.weaknesses.reduce((best, current) => (current.stars > best.stars ? current : best)).element,
            baseHealthVar: null,
        },
        "World/Iceborne": {
            typeVar: monster.type,
            getWeakness: (monster) => monster.weaknesses.filter((w) => ["fire", "water", "thunder", "ice", "dragon"].includes(w.element)).reduce((best, current) => (current.stars > best.stars || (current.stars === best.stars && best.condition && !current.condition) ? current : best), { stars: -1, element: null, condition: null }).element,
            baseHealthVar: null,
        },
        MHGU: {
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
    const { getWeakness, typeVar, baseHealthVar } = game;
    const elementWeakness = capitalise(getWeakness(monster)  ?? "No Data")

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="monster-info-card">
                <button onClick={() => navigate(`/${getTabSlug(gameTab)}`)}>
                    <img src="/assets/icons/arrow-return-left.svg" alt="Return" />
                </button>

                <div className="monster-info-icon">
                    <img src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${monster.icon_name ?? monster.name}${gameTab !== "MH4U" ? ".png" : ""}`} alt={monster.name} />
                </div>
                <h1>{monster.name}</h1>

                {monster.description && (
                    <p>
                        <strong>Description: </strong>
                        {monster.description}
                    </p>
                )}

                {typeVar && (
                    <p>
                        <strong>Type: </strong>
                        {capitalise(typeVar)}
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
                        {elementWeakness} <img className="element-icon" src={`/assets/icons/Elements/${elementWeakness}.png`} alt={elementWeakness} />
                    </p>
                )}

                {baseHealthVar && (
                    <p>
                        <strong>Base Health: </strong>
                        {baseHealthVar}
                    </p>
                )}
            </div>
        </div>
    );
};
