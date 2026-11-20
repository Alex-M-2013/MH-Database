import { type Game } from "./games";
import { capitalise } from "./helper";
import { useLocation } from "react-router";

export type OtherTab = "About" | "Settings";

export const gameTabs: Game[] = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU", "MH4U"];
export const otherTabs: OtherTab[] = ["About", "Settings"];
export const allTabs = ["Favourites", ...gameTabs, ...otherTabs];

export const getTabSlug = (tab: string) => tab.split("/")[0].toLowerCase();
export const getTabDisplayMobile = (tab: string) => {
    switch (tab.toUpperCase()) {
        case "MHGU":
        case "MH4U":
            return tab.toUpperCase();

        default:
            capitalise(getTabSlug(tab));
    }
};

export const useCurrentTab = () => {
    const { pathname } = useLocation();
    const slug = pathname.split("/")[1];

    return allTabs.find((tab) => getTabSlug(tab) === slug) ?? "";
};
