import "../styles/About.css";
import { GitHubLink } from "./GitHubLink";

export const About = ({ isMobile }) => (
    <div id="about">
        <h1>MH Database</h1>
        {!isMobile ? (
            <p>
                A database containing info about Monsters from various Monster Hunter games. <br /> Includes info from: Wilds, Rise/Sunbreak, World/Iceborne and GU.
            </p>
        ) : (
            <>
                <p>A database containing info about Monsters from various Monster Hunter games.</p>
                <p>Includes info from: Wilds, Rise/Sunbreak, World/Iceborne and GU.</p>
            </>
        )}
        <h3>Links:</h3>
        <GitHubLink />
    </div>
);
