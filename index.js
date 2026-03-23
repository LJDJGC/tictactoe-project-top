import GameController from "./GameController.js";

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