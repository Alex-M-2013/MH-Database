import "../styles/About.css";
import { GitHubLink } from "./GitHubLink";

export const About = ({ isMobile }) => (
    <div id="about">
        <div id="about-card">
            <h1>MH Database</h1>
            {!isMobile ? (
                <>
                    <p>A database containing info about Monsters from various Monster Hunter games. Includes info from: Wilds, Rise/Sunbreak, World/Iceborne and GU.</p>
                    <p>
                        Inspired by <a href="https://nmsassistant.com/">NMS Assistant</a> and <a href="https://github.com/gatheringhallstudios/MHGenDatabase">MHGU Database</a>.
                    </p>
                </>
            ) : (
                <>
                    <p>A database containing info about Monsters from various Monster Hunter games.</p>
                    <p>Includes info from: Wilds, Rise/Sunbreak, World/Iceborne and GU.</p>
                    <p>
                        Inspired by <a href="https://nmsassistant.com/">NMS Assistant</a> and <a href="https://github.com/gatheringhallstudios/MHGenDatabase">MHGU Database</a>.
                    </p>
                </>
            )}
            <h3>Links:</h3>
            <GitHubLink />
        </div>
    </div>
);
