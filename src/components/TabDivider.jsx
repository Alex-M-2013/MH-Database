import "../styles/TabDivider.css";

export const TabDivider = ({ isMobile, isOpen }) => <hr className="tab-divider" style={{ display: isMobile ? (isOpen ? "" : "none") : "" }} />;
