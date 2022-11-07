import ConnectX from "./ConnectX.js"

const gameConfiguration = {
  tokensPerLine: 0,
  cellStyle: "round",
  tokenColorPlayer1: "",
  tokenColorPlayer2: ""
}
let game
let playButton = document.querySelector(".play-game-button")
let modeButtons = document.querySelectorAll(".game-mode-button")
let tokenButtons = document.querySelectorAll(".player-token-button")

playButton.addEventListener("click", () => {
  playButton.classList.add("hidden")
  modeButtons.forEach((element) => {
    element.classList.remove("hidden")
  })

})

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((button) => {
      button.classList.add("hidden")
    })
    gameConfiguration.tokensPerLine = parseInt(button.dataset.mode)
    tokenButtons.forEach((button) => {
      button.classList.remove("hidden")
    })
  })
})

tokenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("entrada")
    console.log(gameConfiguration)
    if(game) resetGame()
    if (gameConfiguration.tokenColorPlayer1 === "") {
      gameConfiguration.tokenColorPlayer1 = button.dataset.token
      button.classList.add("hidden")
    }else{
      gameConfiguration.tokenColorPlayer2 = button.dataset.token
      tokenButtons.forEach((button) => {
        button.classList.add("hidden")
      })
      game = new ConnectX(gameConfiguration)
      document.getElementById("game").classList.remove("hidden")
    }
    console.log("salida")
    console.log(gameConfiguration)
  })
})

function resetGame(){
  game=null
  gameConfiguration.tokenColorPlayer1 = ""
}