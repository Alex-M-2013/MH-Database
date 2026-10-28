import { type FC } from "react";
import styles from "@styles/NavBar/Sidenav/TabDivider.module.css";
import { useIsMobile } from "@utils/useIsMobile.js";

export const TabDivider: FC<{ isOpen: boolean }> = ({ isOpen }: { isOpen: boolean }) => {
    const isMobile = useIsMobile();
    return <hr className={styles.divider} style={{ display: isMobile ? (isOpen ? "" : "none") : "" }} />;
};
