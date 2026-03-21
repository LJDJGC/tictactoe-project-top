//const Gameboard = (() => {
    //3x3の盤面
//    let board = ["", "", "", "", "", "", "", "", "", ];
//
//    const resetBoard = () => {
//        board = ["", "", "", "", "", "", "", "", "", ];
//    };
//
//    const getBoard = () => [...board];
//
//    const placeMarker = (index, marker) => {[[[]]]
//        if (board[index] === "") {
//            board[index] = marker;
//            return true;
//        }
//        return false;
//    };

//    return { resetBoard, getBoard, placeMarker};
//})(); 

class Gameboard {
    #board;

    constructor() {
        this.#board = ["", "", "", "", "", "", "", "", "", ];
    }

    resetBoard() {
        this.#board = ["", "", "", "", "", "", "", "", "", ];  
    }

    getBoard() {
        return[...this.#board];
    }

    placeMarker(index, marker) {
        if(this.#board[index] === "") {
            this.#board[index] = marker;
            return true;
        }
        return false;
    }
}

//const Player = (name, marker) => { //
//    return { name, marker }; //
//}; //

class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}

// const gameController = (() => {
//     const players = [
//         Player("Player 1", "X"),
//         Player("Player 2", "0")
//     ];

//     let activePlayer = players[0];
//     let isGameOver = false;



//     const winningConditions = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8],
//         [0, 3, 6], [1, 4, 7], [2, 5, 8],
//         [0, 4, 8], [2, 4, 6]
//     ];

//     const checkWinner = () => {
//         const board = Gameboard.getBoard();

//         for (let i = 0; i < winningConditions.length; i++) {
//             const condition = winningConditions[i];

//             const a = condition[0];
//             const b = condition[1];
//             const c = condition[2];

//             if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
//                 return true;
//             }
//         }

//         return false;
//     };

//     const checkDraw = () => {
//         const board = Gameboard.getBoard();

//         if (!board.includes("")) {
//             return true;
//         }

//         return false;
//     };

//     const resetBoard = () => {
//         Gameboard.resetBoard();
//         activePlayer = players[0];
//         gameMessage = "";
//         isGameOver = false;
//     };

//     const switchPlayerTurn = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : players[0];
//         // TODO: activePlayer を切り替える（三項演算子がおすすめ）
//         // activePlayer = activePlayer === players[0] ? ... : ...;
//     };

//     const getActivePlayer = () => activePlayer; 
    
//     let gameMessage = "";
//     const getGameMessage = () =>  gameMessage;

//     const playRound = (index) => {
//         if (isGameOver === true) { 
//             return;
//         }

//         const isSuccess = Gameboard.placeMarker(index, activePlayer.marker);

//         if (!isSuccess) {
//             return;
//         }

//         if (checkWinner()) {
//             gameMessage = `Winner: ${activePlayer.name}! congratulations!`;
//             isGameOver = true;
//             return;
//         }

//         if (checkDraw()) {
//             gameMessage = `Draw!`;
//             isGameOver = true;
//             return;
//         }

//         switchPlayerTurn();

//         printNewRound();
//     }

//     const printNewRound = () => {
//         const board = Gameboard.getBoard();
//         console.log(`${getActivePlayer().name} , It's your turn.`);
//         console.log(board);
//     }

//     printNewRound();

//     return { playRound, getActivePlayer, getGameMessage, resetBoard };
// })(); 

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

// const ScreenController = (() => {
//     const boardDiv = document.querySelector(".board");
//     const boardMessage = document.querySelector(".message");
//     const resetButton = document.querySelector(".restart-btn");

//     const updateScreen = () => {
//         const board = Gameboard.getBoard();
//         const activePlayer = gameController.getActivePlayer();
//         const message = gameController.getGameMessage();

//         boardDiv.textContent = "";

//         if (message !== "") {
//             boardMessage.textContent = message;
//         } else {
//         boardMessage.textContent = `${activePlayer.name} , It's your turn.`;
//         }

//         board.forEach((cellMark, index) => {
//             const cellButton = document.createElement("div");
//             cellButton.classList.add("cell");
//             cellButton.dataset.index = index;
//             cellButton.textContent = cellMark;
            
//             boardDiv.appendChild(cellButton);
//         });
//     };

//     const clickHandlerBoard = (e) => {
//         const selectedIndex = e.target.dataset.index;

//         if (!selectedIndex) return;

//         gameController.playRound(selectedIndex);

//         updateScreen();
//     };

//     boardDiv.addEventListener("click", clickHandlerBoard);

//     resetButton.addEventListener("click", () => {
//         gameController.resetBoard();
//         updateScreen();
//     });

//     updateScreen();
// })();


class ScreenController {
    constructor() {
        this.game = new GameController();

        this.boardDiv = document.querySelector(".board");
        this.boardMessage = document.querySelector(".message");
        this.resetButton = document.querySelector(".restart-btn");

        this.boardDiv.addEventListener("click", (e) => this.clickHandlerBoard(e));
        this.resetButton.addEventListener("click", () => {
            this.game.resetGame();
            this.updateScreen();
        });

        this.updateScreen();
    }

    updateScreen() {
        const board = this.game.getBoard();
        const activePlayer = this.game.getActivePlayer();
        const message = this.game.getGameMessage();

        this.boardDiv.textContent = "";

        if (message !== "") {
            this.boardMessage.textContent = message;
        } else {
            this.boardMessage.textContent = `${activePlayer.name} , It's your turn.`;
        }

        board.forEach((cellMark, index) => {
            const cellButton = document.createElement("div");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            cellButton.textContent = cellMark;
            this.boardDiv.appendChild(cellButton);
        });
    }

    clickHandlerBoard(e) {
        const selectedIndex = e.target.dataset.index;
        if (!selectedIndex) return;

        this.game.playRound(selectedIndex);

        this.updateScreen();
    }
}

const app =new ScreenController();