import Player from './player';

class AI extends Player {
  constructor() {
    super();
    this.validMoves = this.#getValidMoves();
  }

  #binarySearch(board, toRemove, start, end) {
    if (start > end) return -1;

    let mid = Math.floor((start + end) / 2);

    if (board[mid][0] === toRemove[0] && board[mid][1] === toRemove[1])
      return mid;

    if (board[mid] > toRemove) {
      return this.#binarySearch(board, toRemove, start, mid - 1);
    } else {
      return this.#binarySearch(board, toRemove, mid + 1, end);
    }
  }

  #getValidMoves() {
    const validMoves = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        validMoves.push([i, j]);
      }
    }
    return validMoves;
  }

  // Take the current valid moves and remove the most recent hits/misses,
  // then make a random attack from the updated valid moves
  randomAttack(currentValidMoves, hits, misses) {
    const toBeRemoved = [];

    if (hits.length) {
      toBeRemoved.push(hits[hits.length - 1]);
    }
    if (misses.length) {
      toBeRemoved.push(misses[misses.length - 1]);
    }
    toBeRemoved.forEach((pos) => {
      const index = this.#binarySearch(
        currentValidMoves,
        pos,
        0,
        currentValidMoves.length - 1,
      );
      if (index >= 0) {
        currentValidMoves.splice(index, 1);
      }
    });

    const randomIndex = Math.floor(Math.random() * currentValidMoves.length);

    return currentValidMoves[randomIndex];
  }
}

export default AI;
