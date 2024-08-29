import Gameboard from '../scripts/gameboard.js';
import Ship from '../scripts/ship.js';

let board = null;
let emptyBoard = null;

describe('Gameboard', () => {
  beforeEach(() => {
    board = new Gameboard();
    emptyBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  });

  afterEach(() => {
    board = null;
    emptyBoard = null;
  });

  test('Module exists', () => {
    expect(Gameboard).toBeDefined();
  });

  test('Creates gameboard', () => {
    expect(board).toBeInstanceOf(Gameboard);
    expect(board.board).toEqual(emptyBoard);
    expect(board.misses).toEqual([]);
    expect(board.hits).toEqual([]);
    expect(board.ships).toEqual([]);
  });

  test('Places ship onto gameboard horizontally', () => {
    const submarine = new Ship(2);
    const testBoard = [
      [submarine, submarine, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    board.placeShip(2, 'horizontal', [0, 0]);

    expect(board.board).toEqual(testBoard);
    expect(board.ships).toContainEqual({
      ship: submarine,
      pos: [
        [0, 0],
        [0, 1],
      ],
    });
  });

  test('Places ship onto gameboard vertically', () => {
    const destroyer = new Ship(3);
    const testBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, destroyer],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, destroyer],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, destroyer],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    board.placeShip(3, 'vertical', [3, 9]);

    expect(board.board).toEqual(testBoard);
    expect(board.ships).toContainEqual({
      ship: destroyer,
      pos: [
        [3, 9],
        [4, 9],
        [5, 9],
      ],
    });
  });

  test('Ship can be placed on the edge of the board', () => {
    const patrolBoat = new Ship(1);
    const testBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, patrolBoat],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.placeShip(1, 'horizontal', [0, 9]);
    expect(board.board).toEqual(testBoard);
    expect(board.ships).toContainEqual({
      ship: patrolBoat,
      pos: [[0, 9]],
    });
  });

  test("Doesn't place ship if starting co-ordinate is out of bounds of the board", () => {
    board.placeShip(2, 'horizontal', [3, 15]);
    expect(board.board).toEqual(emptyBoard);
    expect(board.ships).toEqual([]);

    board.placeShip(3, 'vertical', [-1, 3]);
    expect(board.board).toEqual(emptyBoard);
    expect(board.ships).toEqual([]);
  });

  test("Doesn't place ship if any ship co-ordinate would go out of bounds of the board", () => {
    board.placeShip(2, 'horizontal', [0, 9]);
    expect(board.board).toEqual(emptyBoard);
    expect(board.ships).toEqual([]);

    board.placeShip(5, 'vertical', [6, 0]);
    expect(board.board).toEqual(emptyBoard);
    expect(board.ships).toEqual([]);
  });

  test("Doesn't place ship if any ship co-ordinates would overlap any existing ships", () => {
    const destroyer = new Ship(3);
    const submarine = new Ship(2);
    const testBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, destroyer, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, destroyer, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, destroyer, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    board.placeShip(3, 'vertical', [3, 3]);
    board.placeShip(2, 'horizontal', [4, 2]);
    expect(board.board).toEqual(testBoard);
    expect(board.ships).not.toContainEqual({
      ship: submarine,
      pos: [
        [4, 2],
        [4, 3],
      ],
    });
  });
});
