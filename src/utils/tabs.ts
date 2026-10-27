import { capitalise } from "./helper";
import { useLocation } from "react-router";

export const gameTabs: string[] = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU", "MH4U"];
export const otherTabs: string[] = ["About", "Settings"];
export const allTabs: string[] = ["Favourites", ...gameTabs, ...otherTabs];

export const getTabSlug = (tab: string) => tab.split("/")[0].toLowerCase();
export const getTabDisplayMobile = (tab: string) => (tab.toUpperCase() !== "MHGU" && tab.toUpperCase() !== "MH4U" ? capitalise(getTabSlug(tab)) : tab.toUpperCase());

export const useCurrentTab = () => {
    const { pathname }: { pathname: string } = useLocation();
    const slug: string = pathname.split("/")[1];

    return allTabs.find((tab: string) => getTabSlug(tab) === slug) ?? "";
};
