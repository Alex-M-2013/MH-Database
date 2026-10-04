import { capitalise } from "./helper";
import { useLocation } from "react-router-dom";

export const gameTabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU"];
export const allTabs = [...gameTabs, "About"]

export const getTabSlug = (tab) => tab.split("/")[0].toLowerCase();
export const getTabDisplayMobile = (tab) => (tab.toUpperCase() !== "MHGU" ? capitalise(getTabSlug(tab)) : tab.toUpperCase());

export const useCurrentTab = () => {
    const { pathname } = useLocation();
    const slug = pathname.split("/")[1];

    return allTabs.find((tab) => getTabSlug(tab) === slug) ?? ""
};
