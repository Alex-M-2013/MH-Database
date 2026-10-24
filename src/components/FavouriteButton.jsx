import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "../styles/FavouriteButton.module.css";

export const FavouriteButton = ({ monster, game }) => {
    const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem("favourites")) ?? []);
    const isFavourite = favourites.some(([id, savedGame]) => id === monster.id && savedGame === game);

    const toggleFavourite = (event) => {
        event.preventDefault();

        const updated = isFavourite ? favourites.filter(([id, savedGame]) => id !== monster.id && savedGame !== game) : [...favourites, [monster.id, game]];

        localStorage.setItem("favourites", JSON.stringify(updated));
        setFavourites(updated);
    };

    return (
        <button className={styles.button} onClick={toggleFavourite}>
            {isFavourite ? <BsStarFill className="icon star" /> : <BsStar className="icon star" />}
        </button>
    );
};
