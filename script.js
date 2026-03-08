const Gameboard = (() => {
    //3x3の盤面
    let board = ["", "", "", "", "", "", "", "", "", ];

    const getBoard = () => [...board];

    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    return { getBoard, placeMarker};
})();

const Player = (name, marker) => {
    return { name, marker };
};

const gameController = (() => {
    const players = [
        Player("Player 1", "X"),
        Player("Player 2", "0")
    ];

    let activePlayer = players[0];



    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];

            const a = condition[0];
            const b = condition[1];
            const c = condition[2];

            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        const board = Gameboard.getBoard();

        if (!board.includes("")) {
            return true;
        }

        return false;
    }


    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        // TODO: activePlayer を切り替える（三項演算子がおすすめ）
        // activePlayer = activePlayer === players[0] ? ... : ...;
    };

    const getActivePlayer = () => activePlayer; 
    
    let gameMessage = "";
    const getGameMessage = () =>  gameMessage;

    const playRound = (index) => {
        const isSuccess = Gameboard.placeMarker(index, activePlayer.marker);

        if (!isSuccess) {
            return;
        }

        if (checkWinner()) {
            gameMessage = `Winner: ${activePlayer.name}! congratulations!`;
            return;
        }

        if (checkDraw()) {
            gameMessage = `Draw!`;
            return;
        }

        switchPlayerTurn();

        printNewRound();
    }

    const printNewRound = () => {
        const board = Gameboard.getBoard();
        console.log(`${getActivePlayer().name} , It's your turn.`);
        console.log(board);
    }

    printNewRound();

    return { playRound, getActivePlayer, getGameMessage };
})(); 

const ScreenController = (() => {
    const boardDiv = document.querySelector(".board");
    const boardMessage = document.querySelector(".message");

    const updateScreen = () => {
        const board = Gameboard.getBoard();
        const activePlayer = gameController.getActivePlayer();
        const message = gameController.getGameMessage();

        boardDiv.textContent = "";

        if (message !== "") {
            boardMessage.textContent = message;
        } else {
        boardMessage.textContent = `${activePlayer.name} , It's your turn.`;
        }

        board.forEach((cellMark, index) => {
            const cellButton = document.createElement("div");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            cellButton.textContent = cellMark;
            
            boardDiv.appendChild(cellButton);
        });
    };

    const clickHandlerBoard = (e) => {
        const selectedIndex = e.target.dataset.index;

        if (!selectedIndex) return;

        gameController.playRound(selectedIndex);

        updateScreen();
    };

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
})();