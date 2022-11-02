import ConnectX from "./ConnectX.js"

const gameConfiguration = {
  tokensPerLine: 4,
  cellStyle: "round",
  tokenColorPlayer1: "red",
  tokenColorPlayer2: "blue"
}

let play = document.querySelector(".play-game-button")
play.addEventListener("click", () => {

  document.getElementById("game").style.display = "block"
  document.querySelector(".play-game-button").style.display = "none"

  let connectX = new ConnectX(gameConfiguration)

  connectX.createAndDrawGraphicalBoard()
  connectX.createAnDrawTokens()
  connectX.activateTokenDropping()
})