const text1 = document.getElementById("text-1")
const text2 = document.getElementById("text-2")
const text3 = document.getElementById("text-3")
const img1 = document.getElementById("img-1")
const img2 = document.getElementById("img-2")
const img3 = document.getElementById("img-3")
const imagesContainer = document.getElementById("images-container")

window.addEventListener("scroll",()=>{
    toogleVisibility()
})

function toogleVisibility(){

    const yposImages = imagesContainer.getBoundingClientRect().y
    const yposText1 = text1.getBoundingClientRect().y
    console.log(`posicion del div de imagenes: ${yposImages}`)

    if(yposText1 > -250 && yposText1 < + 350){
        console.log(`posicion del text1: ${yposText1}`)
        console.log("img 1 active")
        img1.src = "./assets/feature1.png"
        text1.classList.remove("v-hidden")
        img1.classList.remove("v-hidden")
        text2.classList.add("v-hidden")
        img2.classList.add("v-hidden")
        text3.classList.add("v-hidden")
        img3.classList.add("v-hidden")
        return
    }

    const yposText2 = text2.getBoundingClientRect().y

    if(yposText2 > -150 && yposText2 < + 350){
        console.log("img 2 active")
        img1.src = "./assets/feature2.png"
        text2.classList.remove("v-hidden")
        text1.classList.add("v-hidden")
        text3.classList.add("v-hidden")
        return
    }

    const yposText3 = text3.getBoundingClientRect().y

    if(yposText3 > -250 && yposText3 < + 350){
        console.log("img 3 active")
        img1.src = "./assets/feature3.png"
        text3.classList.remove("v-hidden")
        text1.classList.add("v-hidden")
        text2.classList.add("v-hidden")
    }
}