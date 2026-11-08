import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { type Monster } from "./monsters";
import { type Game } from "./games";
import { getTabSlug } from "./tabs"

const showErrorToast = () =>
    toast("Could not fetch monster data. See console (F12) for more details.", {
        toastId: "monsterFetchingError",
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
        draggableDirection: "y",
        className: "toast",
        style: {
            color: "white",
            backgroundColor: "#e83a3a",
        },
    });

export const fetchMonsters = async (game: Game): Promise<Monster[]> => {
    try {
        const response = await fetch(`/data/${getTabSlug(game).toLowerCase()}_monsters.json`);
        const data: Monster[] = await response.json();
        return data;
    } catch (error) {
        showErrorToast();
        console.error(error);
        return [];
    }
};
