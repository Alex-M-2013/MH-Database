import styles from "../../styles/pages/MonsterPage.module.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { fetchMonsters } from "../../utils/fetchMonsters";
import { games } from "../../utils/games";
import { getTabSlug } from "../../utils/tabs";
import { capitalise } from "../../utils/helper";

import { Loader } from "../Loader";
import { BsArrowReturnLeft } from "react-icons/bs";

export const MonsterPage = ({ gameTab }) => {
    const { id } = useParams();
    const [monster, setMonster] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchMonster = async () => {
            const allMonsters = await fetchMonsters(gameTab);
            const monster = allMonsters.find((monster) => String(monster.id) === id);
            if (!ignore) setMonster(monster);
        };
        fetchMonster();

        return () => (ignore = true);
    }, [gameTab, id]);

    if (!monster) return <Loader />;

    const { getIcon, getType, getBaseHealth, getWeakness } = games[gameTab];

    const icon = getIcon(monster);
    const type = getType(monster);
    const baseHealth = getBaseHealth(monster);
    const elementWeakness = getWeakness(monster) ?? "No Data";

    const imagesOn = JSON.parse(localStorage.getItem("imagesOn")) ?? true;

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <img style={{ display: imagesOn ? "" : "none" }} src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon.split(".")[0]}.webp`} alt={monster.name} />
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
                        {capitalise(elementWeakness)} <img className={styles.element} src={`/assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} />
                    </p>
                )}

                {baseHealth && (
                    <p>
                        <strong>Base Health: </strong>
                        {baseHealth}
                    </p>
                )}

                <BackButton gameTab={gameTab} />
            </div>
        </div>
    );
};

const BackButton = ({ gameTab }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/${getTabSlug(gameTab)}`)}>
            <BsArrowReturnLeft className="icon" />
        </button>
    );
};
