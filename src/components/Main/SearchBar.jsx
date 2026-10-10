import "../../styles/Main/SearchBar.scss";
import { BsSearch } from "react-icons/bs";

export const SearchBar = ({ search, setSearch }) => {
    return (
        <div id="search-bar">
            <BsSearch className="icon search" />
            <input
                type="text"
                aria-label="Search Monsters"
                placeholder="Search..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </div>
    );
};
