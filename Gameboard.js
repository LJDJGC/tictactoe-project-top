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

export default Gameboard;