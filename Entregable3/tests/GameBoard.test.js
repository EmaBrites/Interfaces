const { GameBoard } = require('./../javascript/GameBoard');

let gameBoard
describe('test board construction', ()=>{
    
    it('should be a 6 rows board', () => {
        gameBoard = new GameBoard(4)
        const rows = gameBoard.board.length
        expect(rows).toBe(6)
    });

    it('should be a 7 columns board', () => {
        gameBoard = new GameBoard(4)
        const columns = gameBoard.board[0].length
        expect(columns).toBe(7)
    });
    
    it('should be a 7 rows board', () => {
        gameBoard = new GameBoard(5)
        const rows = gameBoard.board.length
        expect(rows).toBe(7)
    });

    it('should be a 8 columns board', () => {
        gameBoard = new GameBoard(5)
        const columns = gameBoard.board[0].length
        expect(columns).toBe(8)
    });
    
    it('should be a 8 rows board', () => {
        gameBoard = new GameBoard(6)
        const rows = gameBoard.board.length
        expect(rows).toBe(8)
    });
      
    it('should be a 9 columns board', () => {
        gameBoard = new GameBoard(6)
        const columns = gameBoard.board[0].length
        expect(columns).toBe(9)
    });
})

describe('test token-dropping', ()=>{
    gameBoard = new GameBoard(4)

    test('if the board has a token in the first column after dropping a token', () => {
        gameBoard = new GameBoard(4)
        gameBoard.dropToken(1)
        expect(gameBoard.board[5][0]).toBe(gameBoard.getLastPlayer())
    });

    test('if the board has a token of the second player after two token-dropping',()=>{
        gameBoard = new GameBoard(4)
        gameBoard.dropToken(1)
        gameBoard.dropToken(2)
        expect(gameBoard.board[5][1]).toBe(2)
    })

})

describe('test winning condition', ()=>{
    it('should return false when no one has played', ()=>{
        gameBoard = new GameBoard(4)
        expect(gameBoard.haslastPlayerWon()).toBe(false)
    })

    it('should return true when a player has won', ()=>{
        gameBoard = new GameBoard(4)
        gameBoard.dropToken(1)
        gameBoard.dropToken(2)
        gameBoard.dropToken(1)
        gameBoard.dropToken(2)
        gameBoard.dropToken(1)
        gameBoard.dropToken(2)
        gameBoard.dropToken(1)
        expect(gameBoard.haslastPlayerWon()).toBe(true)
    })
})

describe('test row search of a token dropped', ()=>{
    test('if the row of the first token dropped is the first one ',()=>{
        gameBoard = new GameBoard(4)
        gameBoard.dropToken(6)
        expect(gameBoard.findRowForNewToken() + 1).toBe(5)
    })

    test('if the row of the sixth token dropped in a column is the last one in a 6x7 board',()=>{
        gameBoard = new GameBoard(4)
        gameBoard.dropToken(1)
        gameBoard.dropToken(1)
        gameBoard.dropToken(1)
        gameBoard.dropToken(1)
        gameBoard.dropToken(1)
        gameBoard.dropToken(1)
        expect(gameBoard.findRowForNewToken() + 1).toBe(0)
    })
})