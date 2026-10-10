import "../../../styles/NavBar/Sidenav/TabDivider.css";
import { useIsMobile } from "../../../utils/useIsMobile.js";

export const TabDivider = ({ isOpen }) => {
    const isMobile = useIsMobile();
    return <hr className="tab-divider" style={{ display: isMobile ? (isOpen ? "" : "none") : "" }} />;
};
