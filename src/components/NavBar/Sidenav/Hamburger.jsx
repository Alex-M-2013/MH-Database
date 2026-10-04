import "../../../styles/NavBar/Sidenav/Hamburger.css"

export const Hamburger = ({ openCloseNav }) => (
    <button id="hamburger-menu" onClick={openCloseNav}>
        <img id="hamburger-icon" src="/assets/icons/hamburger.svg" alt="Hamburger Icon" />
    </button>
);
