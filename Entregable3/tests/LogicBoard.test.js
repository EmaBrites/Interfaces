const { LogicBoard } = require("./../javascript/connectx/LogicBoard")

let logicBoard
describe("test board construction", () => {
  it("should be a 6 rows board", () => {
    logicBoard = new LogicBoard(4)
    const rows = logicBoard.board.length
    expect(rows).toBe(6)
  })

  it("should be a 7 columns board", () => {
    logicBoard = new LogicBoard(4)
    const columns = logicBoard.board[0].length
    expect(columns).toBe(7)
  })

  it("should be a 7 rows board", () => {
    logicBoard = new LogicBoard(5)
    const rows = logicBoard.board.length
    expect(rows).toBe(7)
  })

  it("should be a 8 columns board", () => {
    logicBoard = new LogicBoard(5)
    const columns = logicBoard.board[0].length
    expect(columns).toBe(8)
  })

  it("should be a 8 rows board", () => {
    logicBoard = new LogicBoard(6)
    const rows = logicBoard.board.length
    expect(rows).toBe(8)
  })

  it("should be a 9 columns board", () => {
    logicBoard = new LogicBoard(6)
    const columns = logicBoard.board[0].length
    expect(columns).toBe(9)
  })
})

describe("test token-dropping", () => {
  logicBoard = new LogicBoard(4)

  test("if the board has a token in the first column after dropping a token", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    expect(logicBoard.board[5][0]).toBe(logicBoard.getLastPlayer())
  })

  test("if the board has a token of the second player after two token-dropping", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    expect(logicBoard.board[5][1]).toBe(2)
  })

  it("should return true when chosen column is not full", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    expect(logicBoard.dropToken(1)).toBe(true)
  })

  it("should return false when chosen column is full", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    expect(logicBoard.dropToken(1)).toBe(false)
  })
})

describe("test winning condition", () => {
  it("should return false when no one has played", () => {
    logicBoard = new LogicBoard(4)
    expect(logicBoard.haslastPlayerWon()).toBe(false)
  })

  it("should return true when a player has won (vertical)", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })

  it("should return true when a player has won (vertical) in a board of 5 tokens per line condition", () => {
    logicBoard = new LogicBoard(5)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })

  it("should return true when a player has won (horizontal)", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(2)
    logicBoard.dropToken(3)
    logicBoard.dropToken(3)
    logicBoard.dropToken(4)
    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })

  it("should return true when a player has won (vertical) in a board of 6 tokens per line condition", () => {
    logicBoard = new LogicBoard(6)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(2)
    logicBoard.dropToken(3)
    logicBoard.dropToken(3)
    logicBoard.dropToken(4)
    logicBoard.dropToken(4)
    logicBoard.dropToken(5)
    logicBoard.dropToken(5)
    logicBoard.dropToken(6)
    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })

  it("should return true when a player has won (y = x)", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(2)
    logicBoard.dropToken(3)
    logicBoard.dropToken(4)
    logicBoard.dropToken(3)
    logicBoard.dropToken(3)
    logicBoard.dropToken(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(4)
    logicBoard.dropToken(4)
    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })

  it("should return true when a player has won (y = -x)", () => {
    logicBoard = new LogicBoard(4)

    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(2)
    logicBoard.dropToken(2)
    logicBoard.dropToken(3)
    logicBoard.dropToken(3)
    logicBoard.dropToken(3)
    logicBoard.dropToken(4)

    expect(logicBoard.haslastPlayerWon()).toBe(true)
  })
})

describe("test row search of a token dropped", () => {
  test("if the row of the first token dropped is the first one ", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(6)

    //le resto 1 a la columna xq internamente la 6 es el 5 xq los arreglos empiezan en 0
    expect(logicBoard.board[5][6 - 1]).toBe(logicBoard.getLastPlayer())
  })

  test("if the row of the sixth token dropped in a column is the last one in a 6x7 board", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)
    logicBoard.dropToken(1)

    //cuando una columna está llena findForwForNewToken devuelve -1
    expect(logicBoard.board[0][0]).toBe(logicBoard.getLastPlayer())
  })
})

describe("test game over method", () => {
  it("should return false when a player hasn't won and there's space left in the board", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    expect(logicBoard.isGameOver()).toBe(false)
  })

  it("should return true when a player has won", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    expect(logicBoard.isGameOver()).toBe(true)
  })

  it("should return true when a player has won", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    logicBoard.dropToken(2)
    logicBoard.dropToken(1)
    expect(logicBoard.isGameOver()).toBe(true)
  })

  it("should return true when a player hasn't won but the board is full", () => {
    logicBoard = new LogicBoard(4)
    logicBoard.spacesLeft = 0
    expect(logicBoard.isGameOver()).toBe(true)
  })
})
