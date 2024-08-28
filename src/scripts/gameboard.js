class Gameboard {
  constructor() {
    this.board = this.#makeBoard();
    this.misses = [];
    this.ships = [];
  }

  #makeBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }
}

export default Gameboard;
