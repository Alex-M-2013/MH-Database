import { type FC } from "react"
import { allTabs, getTabSlug } from "@utils/tabs";
import { Navigate } from "react-router";

export const Home: FC = () => {
    const savedSlug: string = localStorage.getItem("savedSlug") ?? "wilds";
    const validSlugs: string[] = allTabs.map((tab: string) => getTabSlug(tab));

    return <Navigate to={`/${validSlugs.includes(savedSlug) ? savedSlug : "wilds"}`} replace />;
};
