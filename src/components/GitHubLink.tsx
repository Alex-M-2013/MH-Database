import { type FC } from "react"
import styles from "@styles/GitHubLink.module.scss";

export const GitHubLink: FC<{inline?: boolean }> = ({ inline = false }: {inline?: boolean}) => (
    <a href="https://github.com/Alex-M-2013/MH-Database" className={`${styles.githubLink} ${inline ? styles.inline : ""}`}>
        <img src="/assets/images/github.png" alt="GitHub Logo" />
    </a>
);