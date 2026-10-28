import styles from "@styles/Main/MonsterCard.module.scss";
import { type FC } from "react";

import { type Game, games, type GameHelpers } from "@utils/games";
import { type Monster } from "@utils/monsters";
import { getTabSlug } from "@utils/tabs";
import { capitalise, removeDashes } from "@utils/helper";

import { Link } from "react-router";
import { FavouriteButton } from "@components/FavouriteButton";

interface MonsterCardProps {
    monster: Monster;
    game: Game;
    userSearch?: string;
}

export const MonsterCard: FC<MonsterCardProps> = ({ monster, game, userSearch = "" }: MonsterCardProps) => {
    const { getIcon, getType, getBaseHealth, getWeakness } = games[game] as GameHelpers;

    const icon = getIcon(monster);
    const type = getType(monster);
    const baseHealth = getBaseHealth(monster);
    const elementWeakness = getWeakness(monster) ?? "No Data";

    const { species } = monster as { species?: string };

    if (userSearch !== "") {
        const matchesSearch = [monster.name, type, species].filter(Boolean).some((field) => removeDashes(field).toLowerCase().includes(userSearch));
        if (!matchesSearch) return null;
    }

    const imagesOn: boolean = JSON.parse(localStorage.getItem("imagesOn") ?? "true");

    return (
        <Link className={styles.card} key={monster.name} to={`/${getTabSlug(game)}/${monster.id}`}>
            <FavouriteButton monster={monster} game={game} />
            <img className={styles.icon} style={{ display: imagesOn ? "" : "none" }} src={`/assets/icons/Monsters/${game.split("/")[0]}/${icon.split(".")[0]}.webp`} alt={monster.name} loading="lazy" />

            <p>
                <strong>Name: </strong>
                {monster.name}
            </p>

            <p>
                <strong>Type: </strong>
                {capitalise(type ?? "Large")}
            </p>

            <p style={{ display: game !== "MHGU" && game !== "MH4U" ? "" : "none" }}>
                <strong>Species: </strong>
                {capitalise(species ?? "No Data")}
            </p>

            <p>
                <strong>Weakness: </strong>
                {capitalise(elementWeakness)} {elementWeakness !== "No Data" && <img className={styles.element} src={`/assets/icons/Elements/${capitalise(elementWeakness)}.png`} alt={capitalise(elementWeakness)} loading="lazy" />}
            </p>

            <p style={{ display: game !== "Rise/Sunbreak" && game !== "World/Iceborne" && game !== "MH4U" ? "" : "none" }}>
                <strong>Base HP: </strong>
                {baseHealth ?? "No Data"}
            </p>
        </Link>
    );
};
