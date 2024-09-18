import Ship from '../scripts/ship';

class Gameboard {
  constructor() {
    this.board = this.#makeBoard();
    this.misses = [];
    this.hits = [];
    this.ships = [];
  }

  // Make a 10x10 grid to represent the board
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

  // Check for out of bounds of board, ship positions going out of bounds and ship collisions
  isValidPlacement(shipLength, direction, [posY, posX]) {
    const potentialPos = [];
    if (posY < 0 || posY > 9 || posX < 0 || posX > 9) {
      return false;
    } else if (direction === 'horizontal') {
      if (shipLength + posX > 10) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        potentialPos.push([posY, posX + i]);
      }
    } else if (direction === 'vertical') {
      if (shipLength + posY > 10) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        potentialPos.push([posY + i, posX]);
      }
    }

    return potentialPos.every(([posY, posX]) => this.board[posY][posX] === 0);
  }

  placeShip(shipLength, direction, [posY, posX]) {
    if (this.isValidPlacement(shipLength, direction, [posY, posX])) {
      const ship = new Ship(shipLength);
      const shipData = {
        ship: ship,
        pos: [],
      };

      if (direction === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          this.board[posY][posX + i] = ship;
          shipData.pos.push([posY, posX + i]);
        }
      } else if (direction === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          this.board[posY + i][posX] = ship;
          shipData.pos.push([posY + i, posX]);
        }
      }

      this.ships.push(shipData);
    }
  }

  #isValidAttack([posY, posX]) {
    if (posY < 0 || posY > 9 || posX < 0 || posX > 9) {
      return false;
    }
    return true;
  }

  receiveAttack([posY, posX]) {
    if (this.#isValidAttack([posY, posX])) {
      const ship = this.board[posY][posX];
      if (ship) {
        ship.hit();
        ship.isSunk();
        this.hits.push([posY, posX]);
      } else {
        this.misses.push([posY, posX]);
      }
    }
  }

  allShipsSunk() {
    return this.ships.every((shipData) => shipData.ship.sunk === true);
  }
}

export default Gameboard;
