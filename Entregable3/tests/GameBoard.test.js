const { GameBoard } = require('./../javascript/GameBoard');

describe('board construction test', ()=>{
    let gameBoard
    
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
