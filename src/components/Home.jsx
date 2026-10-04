import { allTabs, getTabSlug } from "../utils/tabs";
import { Navigate } from "react-router-dom";

export const Home = () => {
    const savedSlug = localStorage.getItem("savedSlug") ?? "wilds";
    const validSlugs = allTabs.map((tab) => getTabSlug(tab))

    return <Navigate to={`/${validSlugs.includes(savedSlug) ? savedSlug : "wilds"}`} replace />;
};