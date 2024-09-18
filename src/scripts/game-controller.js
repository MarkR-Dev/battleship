import Player from './player';
import AI from './ai';
import domController from './dom-controller';

const player = new Player();
const ai = new AI();
let orientation = 'horizontal';
let draggedShipLength = null;
let clearLatestCell = false;
const prevPos = [];
const potentialPos = [];

const gameController = {
  setupGame() {
    domController.setupGameDOM();

    ai.gameboard.placeShip(5, 'horizontal', [0, 0]);
    ai.gameboard.placeShip(4, 'horizontal', [2, 0]);
    ai.gameboard.placeShip(3, 'horizontal', [4, 0]);
    ai.gameboard.placeShip(2, 'horizontal', [6, 0]);
    ai.gameboard.placeShip(1, 'horizontal', [8, 0]);

    const oriBtnDiv = document.querySelector('#orientation');
    oriBtnDiv.addEventListener('click', this.swapOrientation);

    const shipsDOM = document.querySelectorAll('.setup-ship');
    const setupGridDOM = document.querySelector('#player');

    shipsDOM.forEach((ship) => {
      ship.addEventListener('dragstart', this.drag);
    });

    setupGridDOM.addEventListener('dragover', this.dragOver);
    setupGridDOM.addEventListener('dragenter', this.dragEnter);
    setupGridDOM.addEventListener('dragleave', this.dragLeave);
    setupGridDOM.addEventListener('drop', this.drop);
  },

  swapOrientation(event) {
    if (event.target.classList.contains('ori-btn')) {
      orientation = event.target.id;
      domController.swapOrientation(event.target, orientation);
    }
  },

  drag(event) {
    draggedShipLength = +event.target.dataset.length;
    event.dataTransfer.setData('text/ship/id', `${event.target.id}`);
    event.dataTransfer.setDragImage(event.target, 25, 25);
  },

  dragOver(event) {
    event.preventDefault();
  },

  dragEnter(event) {
    event.preventDefault();

    // Check to see if the element entering is the grid container
    // clearLatestCell set back to false so the cells render properly
    if (!event.target.dataset.pos) {
      clearLatestCell = false;
    }

    // As we enter a cell, we remove the previous highlighted cells' styles
    if (event.target.dataset.pos) {
      if (prevPos.length) {
        prevPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.remove('valid');
          cell.classList.remove('invalid');
        });
        prevPos.length = 0;
      }

      // Store the target cells co-ordinates
      const y = event.target.dataset.pos.split('-')[0];
      const x = event.target.dataset.pos.split('-')[1];

      // Calculate the potential ship placement position
      potentialPos.push(
        ...gameController.getPotentialPos(
          [+y, +x],
          draggedShipLength,
          orientation,
        ),
      );

      // Displays a valid/invalid potential ship placement
      if (
        player.gameboard.isValidPlacement(draggedShipLength, orientation, [
          +y,
          +x,
        ])
      ) {
        potentialPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.add('valid');
        });
      } else {
        potentialPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.add('invalid');
        });
      }

      // Push the current potential ship placement into prevPos so we can remove them once entering/leaving another cell
      prevPos.push(...potentialPos);
      potentialPos.length = 0;
    }
  },

  dragLeave(event) {
    event.preventDefault();

    // Removes grid highlighting when leaving the grid
    if (!event.target.dataset.pos && clearLatestCell) {
      if (prevPos.length) {
        prevPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.remove('valid');
          cell.classList.remove('invalid');
        });
        prevPos.length = 0;
      }
    }

    // clearLatestCell set to true here to remove the last highlighted cell when leaving the grid
    if (event.target.dataset) {
      clearLatestCell = true;
    }
  },

  drop(event) {
    event.preventDefault();

    if (prevPos.length) {
      const dropCell = prevPos[0];

      if (
        player.gameboard.isValidPlacement(draggedShipLength, orientation, [
          dropCell[0],
          dropCell[1],
        ])
      ) {
        prevPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.remove('valid');
          cell.classList.remove('invalid');
          cell.classList.add('placed-ship');
        });

        player.gameboard.placeShip(draggedShipLength, orientation, [
          dropCell[0],
          dropCell[1],
        ]);

        const shipID = event.dataTransfer.getData('text/ship/id');
        const shipDOM = document.querySelector(`#${shipID}`);
        shipDOM.remove();

        if (player.gameboard.ships.length === 6) {
          domController.createStartButton();
          gameController.addStartListener();
        }
      } else {
        prevPos.forEach((pos) => {
          const cell = document.querySelector(
            `#player [data-pos="${pos[0]}-${pos[1]}"]`,
          );
          cell.classList.remove('valid');
          cell.classList.remove('invalid');
        });
      }

      prevPos.length = 0;
    }
  },

  getPotentialPos(boardPos, len, ori) {
    const potentialPos = [];
    const y = boardPos[0];
    const x = boardPos[1];
    if (ori === 'horizontal') {
      for (let i = 0; i < len; i++) {
        if (x + i <= 9 && x + i >= 0) {
          potentialPos.push([y, x + i]);
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (y + i <= 9 && y + i >= 0) {
          potentialPos.push([y + i, x]);
        }
      }
    }
    return potentialPos;
  },

  addStartListener() {
    const startBtn = document.querySelector('#start-btn');
    startBtn.removeEventListener('click', gameController.startGame);
    startBtn.addEventListener('click', gameController.startGame);
  },

  removeListeners() {
    const setupGridDOM = document.querySelector('#player');
    setupGridDOM.removeEventListener('dragover', this.dragOver);
    setupGridDOM.removeEventListener('dragenter', this.dragEnter);
    setupGridDOM.removeEventListener('dragleave', this.dragLeave);
    setupGridDOM.removeEventListener('drop', this.drop);
  },

  startGame() {
    domController.startGameDOM();
    gameController.removeListeners();
    const aiBoard = document.querySelector('#ai');
    aiBoard.removeEventListener('click', gameController.sendPlayerAttack);
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
    }, 2000);
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

    const newGameBtn = document.querySelector('#new-game-btn');
    newGameBtn.addEventListener('click', gameController.newGame);
  },

  newGame() {
    player.reset();
    ai.reset();

    const newGameBtn = document.querySelector('#new-game-btn');
    newGameBtn.removeEventListener('click', gameController.newGame);

    gameController.setupGame();
  },
};

export default gameController;
