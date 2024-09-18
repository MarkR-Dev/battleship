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

  test('Receive attack calls ship.hit on correct ship', () => {
    board.placeShip(3, 'vertical', [3, 3]);
    const ship1 = board.board[3][3];
    board.placeShip(2, 'horizontal', [0, 0]);
    const ship2 = board.board[0][0];
    board.receiveAttack([3, 3]);
    expect(ship1.totalHits).toBe(1);
    expect(ship2.totalHits).toBe(0);
    expect(board.hits).toEqual([[3, 3]]);
    expect(board.misses).toEqual([]);
  });

  test('Receive attack records a miss correctly', () => {
    board.placeShip(3, 'vertical', [3, 3]);
    const ship1 = board.board[3][3];
    board.placeShip(2, 'horizontal', [0, 0]);
    const ship2 = board.board[0][0];
    board.receiveAttack([6, 8]);
    expect(ship1.totalHits).toBe(0);
    expect(ship2.totalHits).toBe(0);
    expect(board.hits).toEqual([]);
    expect(board.misses).toEqual([[6, 8]]);
  });

  test("Receive attack doesn't error with invalid board positions", () => {
    board.receiveAttack([12, 4]);
    board.receiveAttack([3, -2]);
    expect(board.misses).toEqual([]);
  });

  test('All ships sunk returns true when every ship is sunk', () => {
    board.placeShip(2, 'vertical', [0, 0]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);
    expect(board.allShipsSunk()).toBe(true);
  });

  test('All ships sunk returns false when any ship is not sunk', () => {
    board.placeShip(2, 'vertical', [0, 0]);
    board.placeShip(1, 'horizontal', [5, 5]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);
    expect(board.allShipsSunk()).toBe(false);
  });

  test('isValidPlacement returns true when ship can be placed', () => {
    expect(board.isValidPlacement(2, 'horizontal', [0, 0])).toBe(true);
    expect(board.isValidPlacement(5, 'vertical', [0, 0])).toBe(true);
  });

  test('isValidPlacement returns false when starting co-ordinate is out of bounds of the grid', () => {
    expect(board.isValidPlacement(3, 'horizontal', [2, 13])).toBe(false);
    expect(board.isValidPlacement(4, 'vertical', [12, 3])).toBe(false);
  });

  test('isValidPlacement returns false when any of the ships co-ordinates would go out of bounds of the grid', () => {
    expect(board.isValidPlacement(4, 'horizontal', [0, 8])).toBe(false);
    expect(board.isValidPlacement(2, 'vertical', [9, 8])).toBe(false);
  });

  test('isValidPlacement returns false when any of the ships co-ordinates would overlap an existing ship', () => {
    board.placeShip(2, 'vertical', [0, 5]);
    expect(board.isValidPlacement(4, 'horizontal', [0, 3])).toBe(false);
    expect(board.isValidPlacement(2, 'vertical', [0, 5])).toBe(false);
    expect(board.isValidPlacement(2, 'horizontal', [7, 6])).toBe(true);
  });
});
