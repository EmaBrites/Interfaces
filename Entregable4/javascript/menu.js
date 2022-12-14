const burgerMenu = document.getElementsByClassName("burger-menu")[0];
const menu = document.getElementsByTagName("menu")[0];
const bar1 = document.getElementById("bar1")
const bar2 = document.getElementById("bar2")
const bar3 = document.getElementById("bar3")
const navbar = document.querySelector("nav");
let isMenuOpen = false;

burgerMenu.addEventListener("click", (event) => {
    toogleMenuClasses(event);
})

menu.addEventListener("click", (event) => {
    event.stopPropagation()
})

window.addEventListener("click", (event) => {
    if (isMenuOpen)
        toogleMenuClasses(event)
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function toogleMenuClasses(event) {
    bar1.classList.toggle("bar-animation-config")
    bar1.classList.toggle("bar1-animation")
    bar2.classList.toggle("bar-animation-config")
    bar2.classList.toggle("bar2-animation")
    bar3.classList.toggle("bar-animation-config")
    bar3.classList.toggle("bar3-animation")
    menu.style.display = isMenuOpen ? "none" : "flex";
    isMenuOpen = !isMenuOpen;
    event.stopPropagation()
}

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        navbar.style.animationName = "scroll-header";
        menu.style.animationName = "position-up";
    }
    else {
        if(navbar.style.animationName == "scroll-header")
        navbar.style.animationName = "scroll-top";
        if(menu.style.animationName == "position-up")
        menu.style.animationName = "position-down";
    }
})