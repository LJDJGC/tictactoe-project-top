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

})();