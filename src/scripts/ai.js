import Player from './player';

class AI extends Player {
  constructor() {
    super();
    this.validMoves = this.#getValidMoves();
    this.lastKnownHit = [];
    this.smarterMoves = [];
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

  // Take the current valid moves and remove the most recent hits/misses,
  // then make a random attack from the updated remaining valid moves
  #randomAttack(currentValidMoves, hits, misses) {
    const toBeRemoved = [];

    if (hits.length) {
      toBeRemoved.push(...hits);
    }
    if (misses.length) {
      toBeRemoved.push(...misses);
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
    // Makes a random attack until the AI hits a ship for the first time
    if (!hits.length) {
      return this.#randomAttack(currentValidMoves, hits, misses);
    }

    const lastHit = hits[hits.length - 1];

    // Enter on first ship hit or AI hits a new ship co-ordinate
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

      // Filter potential positions that go out of bounds of the board
      const filtered = potentialNextMoves.filter((move) => {
        if (move[0] >= 0 && move[0] <= 9 && move[1] >= 0 && move[1] <= 9) {
          return true;
        }
      });

      const toBeRemoved = [];

      if (hits.length) {
        toBeRemoved.push(...hits);
      }
      if (misses.length) {
        toBeRemoved.push(...misses);
      }

      this.smarterMoves.push(...filtered);

      // Remove the previous hits and misses from the array of smarter moves to make
      outer: for (let i = 0; i < this.smarterMoves.length; i++) {
        for (let j = 0; j < toBeRemoved.length; j++) {
          if (
            this.smarterMoves[i][0] === toBeRemoved[j][0] &&
            this.smarterMoves[i][1] === toBeRemoved[j][1]
          ) {
            this.smarterMoves.splice(i, 1);

            i--;
            continue outer;
          }
        }
      }

      this.lastKnownHit[0] = lastHit[0];
      this.lastKnownHit[1] = lastHit[1];
    }

    // Make a smarter move until all possible moves are made then make a random move
    if (this.smarterMoves.length) {
      return this.smarterMoves.pop();
    } else {
      return this.#randomAttack(currentValidMoves, hits, misses);
    }
  }

  reset() {
    super.reset();
    this.validMoves = this.#getValidMoves();
    this.smarterMoves = [];
    this.lastKnownHit = [];
  }
}

export default AI;
