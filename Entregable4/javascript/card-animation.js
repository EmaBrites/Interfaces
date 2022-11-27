let cards = document.querySelectorAll(".character-card");

cards.forEach(card => {
    window.addEventListener("scroll", () => {
        if (inView(card)){
            card.classList.add("in-view");
        } else {
            card.classList.remove("in-view");
        }
    });
});

function inView(card){
    let windowHeight = window.innerHeight;
    let windowBottom = windowHeight + window.scrollY;
    let cardTop = card.getBoundingClientRect().top + window.scrollY;
    return windowBottom > cardTop;
}