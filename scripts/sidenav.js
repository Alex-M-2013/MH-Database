const sideNav = document.getElementById("sidenav");
const sideNavGameTabs = sideNav.querySelector("#game-tabs-sidenav").querySelectorAll("button");

sideNavGameTabs.forEach((tab) => {
    tab.addEventListener("click", closeNav);
});

function openNav() {
    sideNav.style.width = "80dvw";
}

function closeNav() {
    sideNav.style.width = "0";
}
