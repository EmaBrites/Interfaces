class GameBoard{

    tokensPerLine
    board
    nextPlayer = 1
    spacesLeft
    lastChosenColumn

    //los puntos cardinales representan una dirección y los valores de X e Y se utilizan para mover los indices en la dirección indicada
    // movimientos en x: -1 arriba, 1 abajo, y 0 fijo
    // movimientos en y: -1 izquierda, 1 derecha , y 0 fijo
    directionsMovements = {
        "N": {x: -1, y: 0},
        "S": {x: 1, y: 0},
        "E": {x: 0, y: 1},
        "W": {x: 0, y: -1},
        "NE": {x: -1, y: 1},
        "SE": {x: 1, y: 1},
        "NW": {x: -1, y: -1},
        "SW": {x: 1, y: -1}
    }

    //lineas creadas por dos segmentes según las direcciones dadas, las lineas se representan como funciones matemáticas
    lines = {
        "y = 0": {s1: "N",s2: "S"},
        "x = 0": {s1: "E", s2: "W"},
        "y = x": {s1: "NE", s2: "SW"},
        "y = -1": {s1: "NW", s2: "SE"}
    }

    constructor(tokensPerLine){
        this.tokensPerLine = tokensPerLine

        //se agrega una fila y una columna por cada extra ficha que se quiera agregar después del 4 en linea para hacer el 5, 6 o 7 en linea
        const extraRowsAndColumns = this.tokensPerLine % 4
        const rowsAmount = 6 + extraRowsAndColumns
        const columnsAmount = 7 + extraRowsAndColumns

        this.board = Array(rowsAmount).fill(Array(columnsAmount))
        this.spacesLeft = rowsAmount * columnsAmount
    }

    //#######################################
    //########## PUBLIC METHODS!!! ##########
    dropToken(chosenColumn){
        if(this.isGameOver()) return

        chosenColumn-- //le resto 1 xq los arreglo empiezan en cero xD

        this.board[chosenColumn].shift()
        this.board[chosenColumn].push(this.nextPlayer)
        this.nextPlayer = this.nextPlayer % 2 + 1
        this.spacesLeft--
        this.lastChosenColumn = chosenColumn
    }

    isGameOver(){
        return this.spacesLeft === 0 || this.haslastPlayerWon()
    }

    getNextPlayer(){
        return this.nextPlayer
    }

    getLastPlayer(){
        return this.nextPlayer % 2 + 1
    }

    haslastPlayerWon(){
        for (const line of Object.keys(this.lines)) {
            if(this.getAmoutOfEqualTokensInLine(line) >= this.tokensPerLine)
                return true
        }
        return false
    }

    //#######################################
    //########## PRIVATE METHODS!!! ##########

    getAmoutOfEqualTokensInLine(lineFunction){
        //retorno la suma de los dos segmentos que forman la linea más la ficha que se jugó
        const line = this.lines[lineFunction]
        return (  
            1   + this.getAmountOfEqualTokensOfDirection(line.s1) 
                + this.getAmountOfEqualTokensOfDirection(line.s2)
        )
    }

    getAmountOfEqualTokensOfDirection(cardinalPoint){
        let {xMovement, yMovement} = this.directionsMovements[cardinalPoint]

        //según la dirección que se indice, muevo los indices para posicionarme en la siguiente ficha
        let r = this.findRowOfLastToken() + xMovement
        let c = this.lastChosenColumn + yMovement

        let count = 0;

        //mientras ningún indice se vaya de rango cuento las fichas iguales a la del jugador
        while(r <= this.rowsAmount && r >= 0 && c <= this.columnsAmount && c >= 0){
            if(this.board[r][c] === this.getLastPlayer()){
                count++
                r += xMovement
                c += yMovement
            }
            else break //si encuentro una ficha distinta a la del jugador, no tiene sentido seguir contando
        }
        return count
    }

    findRowOfLastToken(){
        for(let r = 0; r < this.rowsAmount; r++){
            if(this.board[r][this.lastChosenColumn] === this.getLastPlayer()) return r
        }
    }

    getNextPlayer(){
        return this.nextPlayer
    }

    getLastPlayer(){
        return this.nextPlayer % 2 + 1
    }
}

module.exports = { GameBoard }


const gameBoard = new GameBoard(4)
gameBoard.dropToken(1)
console.log(gameBoard.board[0])