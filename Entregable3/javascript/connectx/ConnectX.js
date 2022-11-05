import Token from "./Token.js"
import Cell from "./Cell.js"
import Canvas from "./Canvas.js"
import LogicBoard from "./LogicBoard.js"

export default class ConnectX {
  cellsStyle = {
    round: "./assets/connectx/cell.png",
    square: "./assets/connectx/square-cell.png",
  }

  tokensStyle = {
    roundred: "./assets/connectx/ficha-roja1.png",
    roundgreen: "./assets/connectx/green-token.png",
    roundblue: "./assets/connectx/ficha-azul1.png",
    squarered: "./assets/connectx/red-square-token.png",
    squaregreen: "./assets/connectx/green-square-token.png",
    squareblue: "./assets/connectx/blue-square-token.png",
  }

  cellSize = 50
  tokenSize = 20
  boardXPos = 300
  boardYPos = 150
  graphicBoard = []
  logicBoard
  cellsStylePath
  tokenStylePlayer1Path
  tokenStylePlayer2Path
  tokensPerLine
  tokensPerPlayer = 21
  canvas = new Canvas(
    "game",
    1000,
    500,
    "gray",
    "./assets/connectx/fondo-juego.jpg"
  )
  tokensLeftPlayer1 = []
  tokensLeftPlayer2 = []

  constructor({
    tokensPerLine,
    cellStyle,
    tokenColorPlayer1,
    tokenColorPlayer2,
  }) {
    this.tokensPerLine = tokensPerLine
    this.logicBoard = new LogicBoard(tokensPerLine)
    this.cellsStylePath = this.cellsStyle[cellStyle]
    this.tokenStylePlayer1Path = this.tokensStyle[cellStyle + tokenColorPlayer1]
    this.tokenStylePlayer2Path = this.tokensStyle[cellStyle + tokenColorPlayer2]
  }

  createAndDrawGraphicalBoard() {
    let cell
    let xOffset = 0
    let column

    for (let c = 0; c < this.logicBoard.getColumnsAmount(); c++) {
      let yOffset = 0
      column = []

      for (let r = 0; r < this.logicBoard.getRowsAmount(); r++) {
        cell = new Cell(
          this.boardXPos + xOffset,
          this.boardYPos + yOffset,
          this.cellSize,
          this.cellsStylePath
        )

        column.push(cell)
        this.canvas.addFigure(cell)
        yOffset += this.cellSize
      }

      this.graphicBoard.push(column)
      xOffset += this.cellSize
    }

    this.canvas.drawFigures()
  }

  createAnDrawTokens() {
    this.createAndDrawTokensForPlayer(
      this.tokenStylePlayer1Path,
      this.boardXPos - this.tokenSize * 2,
      this.tokensLeftPlayer1
    )
    this.createAndDrawTokensForPlayer(
      this.tokenStylePlayer2Path,
      this.boardXPos +
        this.tokenSize * 2 * (this.logicBoard.getColumnsAmount() + 3),
      this.tokensLeftPlayer2
    )
    this.disableTokensOfPlayer(2)
    this.canvas.drawFigures()
    this.canvas.startListeningMouseEvents()
  }

  createAndDrawTokensForPlayer(tokenStylePlayerPath, xPos, arrayForStorage) {
    let token
    let offset = 0
    for (let i = 0; i < this.tokensPerPlayer; i++) {
      token = new Token(
        xPos,
        this.boardYPos + (offset * this.tokenSize) / 2,
        this.tokenSize,
        tokenStylePlayerPath
      )
      this.canvas.addFigure(token)
      arrayForStorage.push(token)
      offset++
    }
  }

  onTokenDropped() {
    const that = this
    return function () {
      const lastDraggedToken = that.canvas.getLastDruggedFigure()
      const { posX, posY } = lastDraggedToken.getPosition()
      const chosenColumn = that.calculateColumnOfToken(posX, posY)
      if (chosenColumn === -1) lastDraggedToken.restorePosition()
      else {
        const row = that.logicBoard.findRowForNewToken(chosenColumn - 1)
        //le resto 1 a la posición de la columna xq empiezan en cero por ser un arreglo
        const cell = that.graphicBoard[chosenColumn - 1][row]

        if (that.logicBoard.dropToken(chosenColumn)) {
          cell.drawTokenInside(lastDraggedToken)
          that.disableTokensOfPlayer(that.logicBoard.getLastPlayer())
          that.removeFromPlayerTokensLeft(lastDraggedToken)
          that.enableTokensOfPlayer(that.logicBoard.getNextPlayer())
        } else lastDraggedToken.restorePosition()
      }
      that.canvas.drawFigures()
    }
  }

  removeFromPlayerTokensLeft(token) {
    const lastPlayer = this.logicBoard.getLastPlayer()
    const arr =
      lastPlayer === 1 ? this.tokensLeftPlayer1 : this.tokensLeftPlayer2
    const index = arr.findIndex((t) => t == token)
    arr.splice(index, 1)
  }

  disableTokensOfPlayer(player) {
    const arr = player === 1 ? this.tokensLeftPlayer1 : this.tokensLeftPlayer2
    arr.forEach((t) => t.disableDragging())
  }

  enableTokensOfPlayer(player) {
    const arr = player === 1 ? this.tokensLeftPlayer1 : this.tokensLeftPlayer2
    arr.forEach((t) => t.enableDragging())
  }

  calculateColumnOfToken(posX, posY) {
    if (posY >= this.boardYPos + this.cellSize) return -1

    if (
      posX < this.boardXPos ||
      posX > this.boardXPos + this.cellSize * this.logicBoard.getColumnsAmount()
    )
      return -1

    return Math.ceil((posX - this.boardXPos) / this.cellSize)
  }

  activateTokenDropping() {
    this.canvas.addMouseUpListener(this.onTokenDropped())
  }
}
