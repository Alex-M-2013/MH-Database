import styles from "../../../styles/NavBar/Sidenav/TabDivider.module.css";
import { useIsMobile } from "../../../utils/useIsMobile.js";

export const TabDivider = ({ isOpen }) => {
    const isMobile = useIsMobile();
    return <hr className={styles.divider} style={{ display: isMobile ? (isOpen ? "" : "none") : "" }} />;
};
