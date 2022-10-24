import ConnectX from "./ConnectX.js"


const gameConfiguration = {
  tokensPerLine: 4,
  cellStyle: "round",
  tokenColorPlayer1: "red",
  tokenColorPlayer2: "blue"
}

let connectX = new ConnectX(gameConfiguration)

connectX.createAndDrawGraphicalBoard()
connectX.createAnDrawTokens()
connectX.activateTokenDropping()