import { useState, useEffect } from "react";
import breakpoints from "./breakpoints.module.scss";

const mobileWidth: number = Number.parseInt(breakpoints.mobileWidth);

export const useIsMobile = (): boolean => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth <= mobileWidth;
};
