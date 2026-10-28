import { type Monster } from "../utils/monsters";
import { type Game } from "../utils/games";
import { type FC, useState, type MouseEvent } from "react";
import { type Favourite } from "./pages/Favourites";

import styles from "../styles/FavouriteButton.module.css";
import { BsStar, BsStarFill } from "react-icons/bs";

interface FavouriteButtonProps {
    monster: Monster;
    game: Game;
}

export const FavouriteButton: FC<FavouriteButtonProps> = ({ monster, game }: FavouriteButtonProps) => {
    const [favourites, setFavourites] = useState<Favourite[]>(() => JSON.parse(localStorage.getItem("favourites") ?? "[]"));

    const toggleFavourite = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const current = JSON.parse(localStorage.getItem("favourites") ?? "[]");
        const exists = current.some(([id, savedGame]: Favourite) => id === monster.id && savedGame === game);

        const updated = exists ? current.filter(([id, savedGame]: Favourite) => id !== monster.id && savedGame !== game) : [...current, [monster.id, game]];

        localStorage.setItem("favourites", JSON.stringify(updated));
        setFavourites(updated);
    };

    return (
        <button className={styles.button} onClick={toggleFavourite}>
            {favourites.some(([id, savedGame]: Favourite) => id === monster.id && savedGame === game) ? <BsStarFill className="icon star" /> : <BsStar className="icon star" />}
        </button>
    );
};
