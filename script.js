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


    const switchPlayerTurn = () => {
        // TODO: activePlayer を切り替える（三項演算子がおすすめ）
        // activePlayer = activePlayer === players[0] ? ... : ...;
    };

    const getActivePlayer = () => {
        const board = Gameboard.getBoard();
        console.log(`${getActivePlayer().name} のターンです。`);
        console.log(board);
    }
})();