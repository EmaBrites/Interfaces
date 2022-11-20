const carousel = document.getElementsByClassName("carousel")[0]
const characterCards = document.getElementsByClassName("character-card")


carousel.addEventListener("mousedown",()=>{
    for (let i = 0; i < characterCards.length; i++){
        characterCards.item(i).classList.remove("character-card-animation-out")
        characterCards.item(i).classList.add("character-card-animation-in")
    }
})

carousel.addEventListener("mouseup",()=>{
    for (let i = 0; i < characterCards.length; i++){
        characterCards.item(i).classList.remove("character-card-animation-in")
        characterCards.item(i).classList.add("character-card-animation-out")
    }
})