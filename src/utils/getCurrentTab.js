import { capitalise } from "./helper";

export const getCurrentTab = () => {
    const path = window.location.pathname.split("/")[1];
    const currentTab = path !== "mhgu" ? capitalise(path) : path.toUpperCase();
    return currentTab;
};
