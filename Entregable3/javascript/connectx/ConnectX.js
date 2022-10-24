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
    roundred: "./assets/connectx/red-token.png",
    roundgreen: "./assets/connectx/green-token.png",
    roundblue: "./assets/connectx/blue-token.png",
    squarered: "./assets/connectx/red-square-token.png",
    squaregreen: "./assets/connectx/green-square-token.png",
    squareblue: "./assets/connectx/blue-square-token.png",
  }

  cellSize = 63
  tokenSize = 25
  boardXPos = 200
  boardYPos = 400
  graphicBoard = []
  logicBoard
  cellsStylePath
  tokenStylePlayer1Path
  tokenStylePlayer2Path
  tokensPerLine
  tokensPerPlayer = 8
  canvas = new Canvas("myCanvas", 1024, 1024, "gray")

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

  createAnDrawTokens(){
    this.createAndDrawTokensForPlayer(this.tokenStylePlayer1Path,this.boardXPos - this.tokenSize*2)
    this.canvas.drawFigures()
    this.canvas.startListeningMouseEvents()
  }

  createAndDrawTokensForPlayer(tokenStylePlayerPath, xPos) {
    let token
    let offset = 0
    for (let i = 0; i < this.tokensPerPlayer; i++) {
      token = new Token(
        xPos,
        this.boardYPos + offset*this.tokenSize/2,
        this.tokenSize,
        tokenStylePlayerPath
      )
      this.canvas.addFigure(token);
      offset++
    }

  }

  onTokenDropped() {
    const lastDraggedToken = this.canvas.getLastDruggedFigure()
    const { posX, posY } = lastDraggedToken.getPosition()
    const chosenColumn = calculateColumnOfToken(posX, posY)
    if (chosenColumn === -1) lastDraggedToken.restorePosition()
    else {
      const row = this.logicBoard.findRowForNewToken(chosenColumn)

      //le resto 1 a la posición de la columna xq empiezan en cero por ser un arreglo
      const cell = this.graphicBoard[row][chosenColumn - 1]

      this.logicBoard.dropToken(chosenColumn)
      cell.drawTokenInside(lastDraggedToken)
      this.canvas.drawFigures()
    }
  }

  calculateColumnOfToken(x, y) {
    if (y >= this.boardYPos + this.cellSize) return -1

    if (
      x < this.boardXPos ||
      x > this.boardXPos + this.cellSize * this.tokensPerLine
    )
      return -1

    return Math.ceil((x - this.boardXPos) / this.cellSize)
  }
}
