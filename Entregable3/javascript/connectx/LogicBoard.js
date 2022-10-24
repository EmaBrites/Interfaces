export default class LogicBoard {
  tokensPerLine
  board
  nextPlayer = 1
  spacesLeft
  lastChosenColumn
  rowsAmount
  columnsAmount

  //los puntos cardinales representan una dirección y los valores de X e Y se utilizan para mover los indices en la dirección indicada
  // movimientos en x: -1 arriba, 1 abajo, y 0 fijo
  // movimientos en y: -1 izquierda, 1 derecha , y 0 fijo
  directionsMovements = {
    N: { x: -1, y: 0 },
    S: { x: 1, y: 0 },
    E: { x: 0, y: 1 },
    W: { x: 0, y: -1 },
    NE: { x: -1, y: 1 },
    SE: { x: 1, y: 1 },
    NW: { x: -1, y: -1 },
    SW: { x: 1, y: -1 },
  }

  //lineas creadas por dos segmentos indicados con puntos cardinales, estas lineas se representan como funciones matemáticas
  lines = {
    "x = 0": { s1: "N", s2: "S" },
    "y = 0": { s1: "E", s2: "W" },
    "y = x": { s1: "NE", s2: "SW" },
    "y = -1": { s1: "NW", s2: "SE" },
  }

  constructor(tokensPerLine) {
    this.tokensPerLine = tokensPerLine

    //se agrega una fila y una columna por cada extra ficha que se quiera agregar después del 4 en linea para hacer el 5, 6 o 7 en linea
    const extraRowsAndColumns = this.tokensPerLine % 4
    this.rowsAmount = 6 + extraRowsAndColumns
    this.columnsAmount = 7 + extraRowsAndColumns

    this.board = Array(this.rowsAmount)
      .fill()
      .map(() => Array(this.columnsAmount).fill())
    this.spacesLeft = this.rowsAmount * this.columnsAmount
  }

  //#######################################
  //########## PUBLIC METHODS!!! ##########
  //return true si la ficha se pudo agregar
  dropToken(chosenColumn) {
    //le resto 1 xq los arreglo empiezan en cero xD
    chosenColumn--

    const row = this.findRowForNewToken(chosenColumn)
    if (row === -1) {
      console.log(`the column ${chosenColumn} is full`)
      return false
    }

    console.log(
      `dropping token in column:${chosenColumn}  row:${row} for player:${this.nextPlayer}`
    )
    this.board[row][chosenColumn] = this.nextPlayer

    this.nextPlayer = (this.nextPlayer % 2) + 1
    this.lastChosenColumn = chosenColumn
    this.spacesLeft--
    return true
  }

  isGameOver() {
    return this.spacesLeft === 0 || this.haslastPlayerWon()
  }

  getNextPlayer() {
    return this.nextPlayer
  }

  getLastPlayer() {
    return (this.nextPlayer % 2) + 1
  }

  haslastPlayerWon() {
    console.log("checking if last player has won...")
    console.log(
      `last token played column:${this.lastChosenColumn} row:${
        this.findRowForNewToken(this.lastChosenColumn) + 1
      }`
    )

    for (const line of Object.keys(this.lines)) {
      if (this.getAmoutOfEqualTokensInLine(line) >= this.tokensPerLine)
        return true
    }
    return false
  }

  getRowsAmount() {
    return this.rowsAmount
  }

  getColumnsAmount() {
    return this.columnsAmount
  }

  findRowForNewToken(column) {
    for (let r = this.rowsAmount - 1; r >= 0; r--) {
      if (this.board[r][column] == undefined) return r
    }
    //si la columna elegida está llena devolvemos un valor discernible
    return -1
  }

  //#######################################
  //########## PRIVATE METHODS!!! ##########

  getAmoutOfEqualTokensInLine(lineFunction) {
    //retorno la suma de los dos segmentos que forman la linea más la ficha que se jugó
    const line = this.lines[lineFunction]
    const amount =
      1 +
      this.getAmountOfEqualTokensOfDirection(line.s1) +
      this.getAmountOfEqualTokensOfDirection(line.s2)

    console.log(`line ${lineFunction} has an amount of ${amount} equal tokens`)
    return amount
  }

  getAmountOfEqualTokensOfDirection(cardinalPoint) {
    let { x, y } = this.directionsMovements[cardinalPoint]

    //según la dirección que se indique, muevo los indices para posicionarme en la siguiente ficha
    let c = this.lastChosenColumn + y
    let r = this.findRowForNewToken(this.lastChosenColumn) + 1 + x

    let count = 0

    //mientras ningún indice se vaya de rango cuento las fichas iguales a la del jugador
    while (r < this.rowsAmount && r >= 0 && c <= this.columnsAmount && c >= 0) {
      if (this.board[r][c] === this.getLastPlayer()) {
        count++
        r += x
        c += y
      } else break //si encuentro una ficha distinta a la del jugador, no tiene sentido seguir contando
    }
    return count
  }

  getNextPlayer() {
    return this.nextPlayer
  }

  getLastPlayer() {
    return (this.nextPlayer % 2) + 1
  }
}