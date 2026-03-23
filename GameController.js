import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

class GameController {
    constructor() {
        this.board = new Gameboard();

        this.players = [
            new Player("Player 1", "X"),
            new Player("Player 2", "O")
        ];

        this.activePlayer = this.players[0];
        this.isGameOver = false;
        this.gameMessage = "";

        this.winningConditions = [
         [0, 1, 2], [3, 4, 5], [6, 7, 8],
         [0, 3, 6], [1, 4, 7], [2, 5, 8],
         [0, 4, 8], [2, 4, 6]
        ];
    }

    checkWinner() {
        const currentBoard = this.board.getBoard();
        for (let i = 0; i < this.winningConditions.length; i++) {
            const[a, b, c] = this.winningConditions[i];
            if (currentBoard[a] !== "" && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        const currentBoard = this.board.getBoard();
        return !currentBoard.includes("");
    }

    switchPlayerTurn() {
        this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }

    playRound(index) {
        if (this.isGameOver) return;

        const isSuccess = this.board.placeMarker(index, this.activePlayer.marker);
        if (!isSuccess) return;

        if (this.checkWinner()) {
            this.gameMessage = `Winner: ${this.activePlayer.name}! congratulations!`;
            this.isGameOver  = true;
            return; 
        }

        if (this.checkDraw()) {
            this.gameMessage = `Draw!`;
            this.isGameOver = true;
            return;
        }

        this.switchPlayerTurn();
    }

    resetGame() {
        this.board.resetBoard();
        this.activePlayer = this.players[0];
        this.gameMessage = "";
        this.isGameOver = false;
    }

    getActivePlayer() { return this.activePlayer; }
    getGameMessage() { return this.gameMessage; }
    getBoard() { return this.board.getBoard(); }
    
}

export default GameController;