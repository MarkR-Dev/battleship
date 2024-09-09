import Gameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  reset() {
    this.gameboard = new Gameboard();
  }
}

export default Player;
