import { gameTabs, getTabSlug } from "../utils/tabs";
import { Navigate } from "react-router-dom";

export const Home = () => {
    const savedSlug = localStorage.getItem("savedSlug") ?? "wilds";
    const validSlugs = [...gameTabs.map((tab) => getTabSlug(tab)), "about"];

    return <Navigate to={`/${validSlugs.includes(savedSlug) ? savedSlug : "wilds"}`} replace />;
};