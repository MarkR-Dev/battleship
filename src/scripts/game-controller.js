import Player from './player';
import AI from './ai';
import domController from './dom-controller';

const player = new Player();
const ai = new AI();

const gameController = {
  setupGame() {
    domController.setupGameDOM();

    player.gameboard.placeShip(5, 'horizontal', [0, 0]);
    player.gameboard.placeShip(4, 'horizontal', [2, 0]);
    player.gameboard.placeShip(3, 'horizontal', [4, 0]);
    player.gameboard.placeShip(2, 'horizontal', [6, 0]);
    player.gameboard.placeShip(1, 'horizontal', [8, 0]);

    ai.gameboard.placeShip(5, 'horizontal', [0, 0]);
    ai.gameboard.placeShip(4, 'horizontal', [2, 0]);
    ai.gameboard.placeShip(3, 'horizontal', [4, 0]);
    ai.gameboard.placeShip(2, 'horizontal', [6, 0]);
    ai.gameboard.placeShip(1, 'horizontal', [8, 0]);

    const startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', gameController.startGame);
  },

  startGame() {
    domController.startGameDOM(player);

    const aiBoard = document.querySelector('#ai');

    aiBoard.addEventListener('click', gameController.sendPlayerAttack);
  },

  sendPlayerAttack(event) {
    if (
      !event.target.dataset.pos ||
      event.target.classList.contains('selected')
    ) {
      return;
    }
    event.target.classList.add('selected');
    const chosenCell = event.target.dataset.pos;
    let [y, x] = chosenCell.split('-');
    y = +y;
    x = +x;
    ai.gameboard.receiveAttack([y, x]);
    domController.updateBoard(ai, 'ai');

    if (gameController.isGameOver()) {
      gameController.endGame('Player');
      return;
    }

    gameController.sendAIAttack();
  },

  sendAIAttack() {
    const aiBoard = document.querySelector('#ai');

    aiBoard.removeEventListener('click', gameController.sendPlayerAttack);

    setTimeout(() => {
      const randomAttack = ai.randomAttack(
        ai.validMoves,
        player.gameboard.hits,
        player.gameboard.misses,
      );
      player.gameboard.receiveAttack(randomAttack);
      domController.updateBoard(player, 'player');
      aiBoard.addEventListener('click', gameController.sendPlayerAttack);

      if (gameController.isGameOver()) {
        gameController.endGame('AI');
      }
    }, 2);
  },

  isGameOver() {
    const isPlayerSunk = player.gameboard.allShipsSunk();
    const isAISunk = ai.gameboard.allShipsSunk();

    return isAISunk || isPlayerSunk;
  },

  endGame(winner) {
    const aiBoard = document.querySelector('#ai');
    aiBoard.removeEventListener('click', gameController.sendPlayerAttack);
    domController.displayWinner(winner);
  },
};

export default gameController;
