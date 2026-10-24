import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "../styles/FavouriteButton.module.css";

export const FavouriteButton = ({ monster, game }) => {
    const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem("favourites")) ?? []);

    const toggleFavourite = (event) => {
        event.preventDefault();

        const current = JSON.parse(localStorage.getItem("favourites")) ?? [];
        const exists = current.some(([id, savedGame]) => id === monster.id && savedGame === game);

        const updated = exists ? current.filter(([id, savedGame]) => id !== monster.id && savedGame !== game) : [...current, [monster.id, game]];

        localStorage.setItem("favourites", JSON.stringify(updated));
        setFavourites(updated);
    };

    return (
        <button className={styles.button} onClick={toggleFavourite}>
            {favourites.some(([id, savedGame]) => id === monster.id && savedGame === game) ? <BsStarFill className="icon star" /> : <BsStar className="icon star" />}
        </button>
    );
};
