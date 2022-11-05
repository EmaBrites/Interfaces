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

  cellSize = 40
  tokenSize = 15
  boardYPos = 100
  graphicBoard = []
  logicBoard
  cellsStylePath
  tokenStylePlayer1Path
  tokenStylePlayer2Path
  tokensPerLine
  canvas = new Canvas("game", 1000, 500, "gray","./assets/connectx/fondo-juego.jpg")

  constructor({
    tokensPerLine,
    cellStyle,
    tokenColorPlayer1,
    tokenColorPlayer2,
  }) {
    this.tokensPerLine = tokensPerLine
    this.tokensPerPlayer = (tokensPerLine + 2)*(tokensPerLine + 3)/2
    this.boardXPos = this.canvas.getWidth() / 2 - this.cellSize * (tokensPerLine+3) / 2
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
      this.boardXPos - this.tokenSize * 2
    )
    this.createAndDrawTokensForPlayer(
      this.tokenStylePlayer2Path,
      this.boardXPos + this.cellSize * this.logicBoard.getColumnsAmount() + this.tokenSize * 2
    )
    this.canvas.drawFigures()
    this.canvas.startListeningMouseEvents()
  }

  createAndDrawTokensForPlayer(tokenStylePlayerPath, xPos) {
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
        const row = that.logicBoard.findRowForNewToken(chosenColumn -1)
        //le resto 1 a la posición de la columna xq empiezan en cero por ser un arreglo
        const cell = that.graphicBoard[chosenColumn - 1][row]

        if(that.logicBoard.dropToken(chosenColumn))
          cell.drawTokenInside(lastDraggedToken)
        else 
          lastDraggedToken.restorePosition()
        lastDraggedToken.disableDragging()
      }
      that.canvas.drawFigures()
    }
  }

  calculateColumnOfToken(posX, posY) {
    if (posY >= this.boardYPos + this.cellSize) return -1

    if (
      posX < this.boardposXPos ||
      posX > this.boardXPos + this.cellSize * this.logicBoard.getColumnsAmount()
    )
      return -1

    return Math.ceil((posX - this.boardXPos) / this.cellSize)
  }

  activateTokenDropping() {
    this.canvas.addMouseUpListener(this.onTokenDropped())
  }
}
