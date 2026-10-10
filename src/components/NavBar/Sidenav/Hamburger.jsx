import "../../../styles/NavBar/Sidenav/Hamburger.css"
import { BsList } from "react-icons/bs";

export const Hamburger = ({ openCloseNav }) => (
    <button id="hamburger-menu" onClick={openCloseNav}>
        <BsList className="icon navbar" />
    </button>
);
