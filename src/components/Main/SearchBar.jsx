import "../../styles/Main/SearchBar.scss";

export const SearchBar = ({ search, setSearch }) => {
    return (
        <div id="search-bar">
            <img src="/assets/icons/search.svg" alt="Search" />
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
