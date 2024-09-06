import Player from './player';
import domController from './dom-controller';

const player = new Player();
const ai = new Player();

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
    startBtn.addEventListener('click', this.startGame);
  },

  startGame() {
    domController.startGameDOM(player);
  },
};

export default gameController;
