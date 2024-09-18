const domController = {
  setupGameDOM() {
    const boardContainer = document.querySelector('#board-container');
    boardContainer.textContent = '';

    const winnerDisplay = document.querySelector('#winner-display');
    winnerDisplay.style.visibility = 'hidden';

    const playerBoard = document.createElement('div');
    playerBoard.id = 'player';
    playerBoard.classList.add('board');
    boardContainer.appendChild(playerBoard);
    this.renderBoard('player');

    const orientationDiv = document.createElement('div');
    orientationDiv.id = 'orientation';

    const horizontalBtn = document.createElement('button');
    horizontalBtn.textContent = 'Horizontal';
    horizontalBtn.classList.add('ori-btn');
    horizontalBtn.classList.add('active');
    horizontalBtn.id = 'horizontal';
    orientationDiv.appendChild(horizontalBtn);

    const verticalBtn = document.createElement('button');
    verticalBtn.textContent = 'Vertical';
    verticalBtn.classList.add('ori-btn');
    verticalBtn.id = 'vertical';
    orientationDiv.appendChild(verticalBtn);

    const shipsContainer = document.createElement('div');
    shipsContainer.id = 'ships-container';
    boardContainer.appendChild(shipsContainer);

    shipsContainer.appendChild(orientationDiv);

    const shipsDiv = document.createElement('div');
    shipsDiv.id = 'ships-div';
    shipsContainer.appendChild(shipsDiv);
    this.renderSetupShips();
  },

  renderBoard(playerString) {
    const playerBoard = document.querySelector(`#${playerString}`);

    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < 10; j++) {
        const col = document.createElement('div');
        col.classList.add('col');
        col.dataset.pos = `${i}-${j}`;

        row.appendChild(col);
      }
      playerBoard.appendChild(row);
    }
  },

  renderPlayerShips(player) {
    const ships = player.gameboard.ships;

    for (let i = 0; i < ships.length; i++) {
      const shipPos = ships[i].pos;
      for (let j = 0; j < shipPos.length; j++) {
        const cell = document.querySelector(
          `#player [data-pos="${shipPos[j][0]}-${shipPos[j][1]}"]`,
        );
        cell.classList.add('ship');
      }
    }
  },

  renderSetupShips() {
    const shipsDiv = document.querySelector('#ships-div');
    const carrier = this.createShip('carrier', 5);
    const battleship = this.createShip('battleship', 4);
    const destroyer = this.createShip('destroyer', 3);
    const destroyerTwo = this.createShip('destroyer-two', 3);
    const submarine = this.createShip('submarine', 2);
    const submarineTwo = this.createShip('submarine-two', 2);
    shipsDiv.appendChild(carrier);
    shipsDiv.appendChild(battleship);
    shipsDiv.appendChild(destroyer);
    shipsDiv.appendChild(destroyerTwo);
    shipsDiv.appendChild(submarine);
    shipsDiv.appendChild(submarineTwo);
  },

  createShip(id, length) {
    const ship = document.createElement('div');
    ship.classList.add('setup-ship');
    ship.id = id;
    ship.draggable = true;
    ship.dataset.length = length;
    for (let i = 0; i < length; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      ship.appendChild(cell);
    }
    return ship;
  },

  swapOrientation(targetBtn, orientation) {
    const buttons = document.querySelectorAll('#orientation button');
    const shipsDiv = document.querySelector('#ships-div');
    const ships = document.querySelectorAll('#ships-div .setup-ship');

    buttons.forEach((button) => {
      button.classList.remove('active');
    });
    targetBtn.classList.add('active');

    if (orientation === 'horizontal') {
      shipsDiv.classList.remove('vertical');
      ships.forEach((ship) => ship.classList.remove('vertical'));
    } else {
      shipsDiv.classList.add('vertical');
      ships.forEach((ship) => ship.classList.add('vertical'));
    }
  },

  createStartButton() {
    const startBtn = document.createElement('button');
    const shipsContainer = document.querySelector('#ships-container');
    shipsContainer.textContent = '';
    startBtn.textContent = 'Start Game';
    startBtn.id = 'start-btn';

    shipsContainer.appendChild(startBtn);
  },

  startGameDOM() {
    const boardContainer = document.querySelector('#board-container');
    const shipsContainer = document.querySelector('#ships-container');
    shipsContainer.remove();

    const aiBoard = document.createElement('div');
    aiBoard.id = 'ai';
    aiBoard.classList.add('board');
    boardContainer.appendChild(aiBoard);

    this.renderBoard('ai');
  },

  updateBoard(player, name) {
    this.renderHits(player, name);
    this.renderMisses(player, name);
  },

  renderHits(player, name) {
    const hits = player.gameboard.hits;
    if (hits.length) {
      const lastHit = hits[hits.length - 1];
      const cell = document.querySelector(
        `#${name} [data-pos="${lastHit[0]}-${lastHit[1]}"]`,
      );
      cell.classList.add('hit');
      cell.classList.remove('placed-ship');
    }
  },

  renderMisses(player, name) {
    const misses = player.gameboard.misses;
    if (misses.length) {
      const lastMiss = misses[misses.length - 1];
      const cell = document.querySelector(
        `#${name} [data-pos="${lastMiss[0]}-${lastMiss[1]}"]`,
      );
      cell.classList.add('miss');
    }
  },

  displayWinner(winner) {
    const winnerDisplay = document.querySelector('#winner-display');
    const winnerH2 = document.querySelector('#winner-display h2');
    winnerH2.textContent = `${winner} wins!`;
    winnerDisplay.style.visibility = 'visible';
  },
};

export default domController;
