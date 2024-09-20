import Player from './player';

class AI extends Player {
  constructor() {
    super();
    this.validMoves = this.#getValidMoves();
    this.lastKnownHit = [];
    this.smarterMoves = [];
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

  smarterAttack(currentValidMoves, hits, misses) {
    if (!hits.length) {
      return this.randomAttack(currentValidMoves, hits, misses);
    }

    const lastHit = hits[hits.length - 1];

    if (
      !this.lastKnownHit.length ||
      this.lastKnownHit[0] !== lastHit[0] ||
      this.lastKnownHit[1] !== lastHit[1]
    ) {
      const potentialNextMoves = [];
      potentialNextMoves.push([lastHit[0] + 1, lastHit[1]]);
      potentialNextMoves.push([lastHit[0] - 1, lastHit[1]]);
      potentialNextMoves.push([lastHit[0], lastHit[1] + 1]);
      potentialNextMoves.push([lastHit[0], lastHit[1] - 1]);

      const filtered = potentialNextMoves.filter((move) => {
        if (move[0] >= 0 && move[0] <= 9 && move[1] >= 0 && move[1] <= 9) {
          return true;
        }
      });

      this.smarterMoves.push(...filtered);

      const toBeRemoved = [];

      if (hits.length) {
        toBeRemoved.push(...hits);
      }
      if (misses.length) {
        toBeRemoved.push(...misses);
      }

      for (let i = 0; i < this.smarterMoves.length; i++) {
        for (let j = 0; j < toBeRemoved.length; j++) {
          if (
            this.smarterMoves[i][0] === toBeRemoved[j][0] &&
            this.smarterMoves[i][1] === toBeRemoved[j][1]
          ) {
            this.smarterMoves.splice(i, 1);
            i--;
          }
        }
      }

      this.lastKnownHit[0] = lastHit[0];
      this.lastKnownHit[1] = lastHit[1];
    }

    if (this.smarterMoves.length) {
      return this.smarterMoves.pop();
    } else {
      return this.randomAttack(currentValidMoves, hits, misses);
    }
  }

  reset() {
    super.reset();
    this.validMoves = this.#getValidMoves();
  }
}

export default AI;
