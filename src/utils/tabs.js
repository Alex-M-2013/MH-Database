import { capitalise } from "./helper";
import { useLocation } from "react-router";

export const gameTabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU", "MH4U"];
export const allTabs = [...gameTabs, "About"];

export const getTabSlug = (tab) => tab.split("/")[0].toLowerCase();
export const getTabDisplayMobile = (tab) => ((tab.toUpperCase() !== "MHGU" && tab.toUpperCase() !== "MH4U") ? capitalise(getTabSlug(tab)) : tab.toUpperCase());

export const useCurrentTab = () => {
    const { pathname } = useLocation();
    const slug = pathname.split("/")[1];

    return allTabs.find((tab) => getTabSlug(tab) === slug) ?? "";
};
