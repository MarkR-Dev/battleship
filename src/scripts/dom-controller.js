const domController = {
  setupGameDOM() {
    const boardContainer = document.querySelector('#board-container');
    boardContainer.textContent = '';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Game';
    startBtn.id = 'start-btn';

    boardContainer.appendChild(startBtn);
  },

  startGameDOM(player) {
    const boardContainer = document.querySelector('#board-container');
    boardContainer.textContent = '';

    const playerBoard = document.createElement('div');
    playerBoard.id = 'player';
    playerBoard.classList.add('board');
    boardContainer.appendChild(playerBoard);

    const aiBoard = document.createElement('div');
    aiBoard.id = 'ai';
    aiBoard.classList.add('board');
    boardContainer.appendChild(aiBoard);

    this.renderBoards();
    this.renderPlayerShips(player);
  },

  renderBoards() {
    const player = document.querySelector('#player');
    const ai = document.querySelector('#ai');

    for (let i = 0; i < 10; i++) {
      const playerRow = document.createElement('div');
      const aiRow = document.createElement('div');
      playerRow.classList.add('row');
      aiRow.classList.add('row');

      for (let j = 0; j < 10; j++) {
        const playerCol = document.createElement('div');
        const aiCol = document.createElement('div');

        playerCol.classList.add('col');
        playerCol.dataset.pos = `${i}-${j}`;

        aiCol.classList.add('col');
        aiCol.dataset.pos = `${i}-${j}`;

        playerRow.appendChild(playerCol);
        aiRow.appendChild(aiCol);
      }
      player.appendChild(playerRow);
      ai.appendChild(aiRow);
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
};

export default domController;
