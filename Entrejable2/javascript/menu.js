const burgerMenu = document.getElementsByClassName("burger-menu")[0];
const menu = document.getElementsByTagName("menu")[0];
const closeBtn = document.getElementsByClassName("close-btn")[0];
let isMenuOpen = false;

burgerMenu.addEventListener("click",(event)=>{
    menu.style.display = "grid";
    isMenuOpen = true;
    event.stopPropagation()
})

menu.addEventListener("click",(event)=>{
    event.stopPropagation()
})

window.addEventListener("click",()=>{
    if(isMenuOpen)
        menu.style.display = "none";
})

closeBtn.addEventListener("click",()=>{
    menu.style.display = "none";
})