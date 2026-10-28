import { type FC } from "react";
import { type Game, type GameHelpers } from "../../utils/games";
import { type Monster } from "../../utils/monsters";

import styles from "../../styles/pages/MonsterPage.module.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { fetchMonsters } from "../../utils/fetchMonsters";
import { games } from "../../utils/games";
import { getTabSlug } from "../../utils/tabs";
import { capitalise } from "../../utils/helper";

import { Loader } from "../Loader";
import { BsArrowReturnLeft } from "react-icons/bs";

export const MonsterPage: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const { id } = useParams();
    const [monster, setMonster] = useState<Monster | null | undefined>(null);

    useEffect(() => {
        let ignore: boolean = false;

        const fetchMonster = async () => {
            const allMonsters: Monster[] = await fetchMonsters(gameTab);
            const monster: Monster | undefined = allMonsters.find((monster) => String(monster.id) === id);
            if (!ignore) setMonster(monster);
        };
        fetchMonster();

        return () => {
            ignore = true;
        };
    }, [gameTab, id]);

    if (!monster) return <Loader />;

    const { getIcon, getType, getBaseHealth, getWeaknesses } = games[gameTab] as GameHelpers;

    const icon = getIcon(monster);
    const type = getType(monster);
    const baseHealth = getBaseHealth(monster);
    const weaknesses = getWeaknesses(monster);

    const imagesOn: boolean = JSON.parse(localStorage.getItem("imagesOn") ?? "true");

    interface OptionalFields {
        description?: string;
        features?: string;
        tips?: string;
        species?: string;
        signature_move?: string;
    }

    const { description, features, tips, species, signature_move } = monster as OptionalFields;

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <img style={{ display: imagesOn ? "" : "none" }} src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon.split(".")[0]}.webp`} alt={monster.name} />
                </div>
                <h1>{monster.name}</h1>

                {description && (
                    <p>
                        <strong>Description: </strong>
                        {description}
                    </p>
                )}

                {features && <p>{features}</p>}

                {tips && <p>{tips}</p>}

                {type && (
                    <p>
                        <strong>Type: </strong>
                        {capitalise(type)}
                    </p>
                )}

                {species && (
                    <p>
                        <strong>Species: </strong>
                        {capitalise(species)}
                    </p>
                )}

                {signature_move && (
                    <p>
                        {signature_move.split(",").length === 1 ? <strong>Signature Move: </strong> : <strong>Signature Moves: </strong>}
                        {capitalise(signature_move)}
                    </p>
                )}

                {baseHealth && (
                    <p>
                        <strong>Base Health: </strong>
                        {baseHealth}
                    </p>
                )}

                {weaknesses.length > 0 && (
                    <table className={styles.weaknesses}>
                        <caption>
                            <strong>Weaknesses</strong>
                        </caption>
                        <tbody>
                            {weaknesses
                                .sort((first, second) => second.value - first.value)
                                .map((row) => (
                                    <tr key={row.name}>
                                        <td>
                                            <img className={styles.element} src={`/assets/icons/Elements/${capitalise(row.name)}.png`} alt={capitalise(row.name)} style={{ display: row.name !== "noise" ? "" : "none" }} /> {capitalise(row.name)}
                                        </td>
                                        <td>
                                            {Array(row.value)
                                                .fill(null)
                                                .map(() => "★")}
                                        </td>
                                        {row.condition && <td>{row.condition}</td>}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}

                <BackButton gameTab={gameTab} />
            </div>
        </div>
    );
};

const BackButton: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/${getTabSlug(gameTab)}`)}>
            <BsArrowReturnLeft className="icon" />
        </button>
    );
};
