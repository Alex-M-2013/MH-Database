import { type FC } from "react";
import { type Game, getIcon } from "@utils/games";
import { type Monster, type OptionalMonsterProps } from "@utils/monsters";

import styles from "@styles/pages/MonsterPage.module.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { fetchMonsters } from "@utils/fetchMonsters";
import { getTabSlug } from "@utils/tabs";
import { capitalise } from "@utils/helper";

import { Loader } from "@components/Loader";
import { BsArrowLeft } from "react-icons/bs";

export const MonsterPage: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const { id } = useParams();
    const [monster, setMonster] = useState<Monster | undefined>(undefined);

    useEffect(() => {
        let ignore = false;

        const fetchMonster = async () => {
            const allMonsters = await fetchMonsters(gameTab);
            const monster = allMonsters.find((monster) => monster.id.toString() === id);
            if (!ignore) setMonster(monster);
        };
        fetchMonster();

        return () => {
            ignore = true;
        };
    }, [gameTab, id]);

    if (!monster) return <Loader />;

    const icon = getIcon(monster, gameTab);
    const imagesOn: boolean = JSON.parse(localStorage.getItem("imagesOn") ?? "true");

    const { description, features, tips, species, signatureMove, baseHealth, ailments } = monster as OptionalMonsterProps;

    const getElementIcon = (name: string) => name.replace("Severe ", "").replace("blight", "");

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <img style={{ display: imagesOn ? "" : "none" }} src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon}.webp`} alt={monster.name} />
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

                <p>
                    <strong>Type: </strong>
                    {capitalise(monster.type)}
                </p>

                {species && (
                    <p>
                        <strong>Species: </strong>
                        {capitalise(species)}
                    </p>
                )}

                {signatureMove && (
                    <p>
                        {signatureMove.split(",").length === 1 ? <strong>Signature Move: </strong> : <strong>Signature Moves: </strong>}
                        {capitalise(signatureMove)}
                    </p>
                )}

                {baseHealth && (
                    <p>
                        <strong>Base Health: </strong>
                        {baseHealth}
                    </p>
                )}

                {ailments && ailments.length > 0 && (
                    <>
                        <p style={{ marginBottom: "0" }}>
                            <strong>Ailments:</strong>
                        </p>
                        <ul style={{ textAlign: "left" }}>
                            {ailments.map((ailment) => (
                                <li key={ailment.name}>
                                    <img className={styles.element} src={`/assets/icons/Elements/${capitalise(getElementIcon(ailment.name))}.png`} alt={capitalise(ailment.name)} onError={(event) => (event.currentTarget.style.display = "none")} /> {capitalise(ailment.name)} {ailment.description && `- ${ailment.description}`}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {monster.weaknesses.length > 0 && (
                    <>
                        <p>
                            <strong>Weaknesses:</strong>
                        </p>
                        <table className={styles.weaknesses}>
                            {monster.weaknesses
                                .toSorted((first, second) => second.value - first.value)
                                .map((weakness, i) => (
                                    <tr key={`${weakness.name}-${i + 1}`}>
                                        <td>
                                            <img className={styles.element} src={`/assets/icons/Elements/${capitalise(getElementIcon(weakness.name))}.png`} alt={capitalise(weakness.name)} onError={(event) => (event.currentTarget.style.display = "none")} /> {capitalise(weakness.name)}
                                        </td>
                                        <td>
                                            {Array(weakness.value)
                                                .fill(null)
                                                .map((): "★" => "★")}
                                        </td>
                                        {weakness.condition && <td>{weakness.condition}</td>}
                                    </tr>
                                ))}
                        </table>
                    </>
                )}

                <BackButton gameTab={gameTab} />
            </div>
        </div>
    );
};

const BackButton: FC<{ gameTab: Game }> = ({ gameTab }: { gameTab: Game }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/${getTabSlug(gameTab)}`)} className={styles.back}>
            <BsArrowLeft className="icon" style={{ height: "1.8em", width: "auto" }} /> Back
        </button>
    );
};
