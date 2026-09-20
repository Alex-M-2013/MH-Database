export const GameTabs = ({ currentTab, changeTab, openCloseNav }) => {
    const tabs = ["Wilds", "Rise/Sunbreak", "World/Iceborne", "MHGU"];

    return (
        <>
            {tabs.map((tab) => {
                return (
                    <button
                        className={`sidenav-tab ${tab === currentTab ? "active-tab" : ""}`}
                        onClick={(event) => {
                            changeTab(event);
                            openCloseNav();
                        }}
                        key={tab}
                    >
                        {tab}
                    </button>
                );
            })}
        </>
    );
};
