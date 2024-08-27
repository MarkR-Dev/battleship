class Ship {
  constructor(length) {
    this.length = length;
    this.totalHits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.sunk) {
      this.totalHits += 1;
    }
  }

  isSunk() {
    if (this.totalHits >= this.length) {
      this.sunk = true;
    }

    return this.sunk;
  }
}

export default Ship;
