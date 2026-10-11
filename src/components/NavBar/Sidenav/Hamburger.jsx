import styles from "../../../styles/NavBar/Sidenav/Hamburger.module.css";
import { BsList } from "react-icons/bs";

export const Hamburger = ({ openCloseNav }) => (
    <button className={styles.hamburger} onClick={openCloseNav}>
        <BsList className="icon navbar" />
    </button>
);
