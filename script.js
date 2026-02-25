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
    const players =



    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
})();