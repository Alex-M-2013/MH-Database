import styles from "../../styles/Main/MonsterCards.module.scss";
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

    const sortOrder = localStorage.getItem("savedSortOrder") ?? "default";
    const sortedMonsters = [...monsters];

    switch (sortOrder) {
        case "name-asc":
            sortedMonsters.sort((first, second) => first.name.localeCompare(second.name));
            break;

        case "name-desc":
            sortedMonsters.sort((first, second) => second.name.localeCompare(first.name));
            break;

        default:
            break;
    }

    return (
        <>
            {sortedMonsters.length > 0 ? (
                sortedMonsters.map((monster) => {
                    const { getIcon, getType, getBaseHealth, getWeakness } = games[gameTab];

                    const icon = getIcon(monster);
                    const type = getType(monster);
                    const baseHealth = getBaseHealth(monster);
                    const elementWeakness = getWeakness(monster) ?? "No Data";

                    const matchesSearch = [monster.name, type, monster.species].filter(Boolean).some((field) => removeDashes(field).toLowerCase().includes(userSearch));
                    if (!matchesSearch) return null;

                    const imagesOn = JSON.parse(localStorage.getItem("imagesOn")) ?? true;

                    return (
                        <Link className={styles.card} key={monster.name} to={`/${getTabSlug(gameTab)}/${monster.id}`}>
                            <img className={styles.icon} style={{ display: imagesOn ? "" : "none" }} src={`/assets/icons/Monsters/${gameTab.split("/")[0]}/${icon}${gameTab !== "MH4U" ? ".png" : ""}`} alt={monster.name} loading="lazy" />

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
                                {capitalise(elementWeakness)} {elementWeakness !== "No Data" && <img className={styles.element} src={`/assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} loading="lazy" />}
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
