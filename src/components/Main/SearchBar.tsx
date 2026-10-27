import { type FC } from "react"
import styles from "../../styles/Main/SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
    search: string,
    setSearch: (search: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ search, setSearch }: SearchBarProps) => {
    return (
        <div className={styles.searchBar}>
            <BsSearch className="icon search" />
            <input type="text" aria-label="Search Monsters" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
    );
};
