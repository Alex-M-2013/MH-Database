import { useState, useEffect } from "react";
import mobile from "./mobile.module.scss";

const mobileWidth = Number.parseInt(mobile.mobileWidth);

export const useIsMobile = (): boolean => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth <= mobileWidth;
};
