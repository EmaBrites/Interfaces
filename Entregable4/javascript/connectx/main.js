import ConnectX from "./ConnectX.js"

const gameConfiguration = {
  tokensPerLine: 0,
  cellStyle: "round",
  tokenColorPlayer1: "",
  tokenColorPlayer2: ""
}
let game
let message = document.getElementById("message")
let playButton = document.querySelector(".play-game-button")
let modeButtons = document.querySelectorAll(".game-mode-button")
let tokenButtons = document.querySelectorAll(".player-token-button")

playButton.addEventListener("click", () => {
  playButton.classList.add("hidden")
  modeButtons.forEach((element) => {
    element.classList.remove("hidden")
  })
  message.innerHTML = "Choose a game mode"
  message.classList.remove("hidden")
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
    message.innerHTML = "Choose a token color player 1"
  })
})

tokenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if(game) resetGame()
    if (gameConfiguration.tokenColorPlayer1 === "") {
      gameConfiguration.tokenColorPlayer1 = button.dataset.token
      button.classList.add("hidden")
      message.innerHTML = "Choose a token color player 2"
    }else{
      gameConfiguration.tokenColorPlayer2 = button.dataset.token
      tokenButtons.forEach((button) => {
        button.classList.add("hidden")
      })
      message.classList.add("hidden")
      game = new ConnectX(gameConfiguration)
      document.getElementById("game").classList.remove("hidden")
    }
  })
})

function resetGame(){
  game=null
  gameConfiguration.tokenColorPlayer1 = ""
}