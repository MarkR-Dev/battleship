import Ship from '../scripts/ship';

describe('Ship', () => {
  test('Module exists', () => {
    expect(Ship).toBeDefined();
  });

  test('Creates ship', () => {
    const destroyer = new Ship(3);
    expect(destroyer).toBeInstanceOf(Ship);
    expect(destroyer.length).toBe(3);
    expect(destroyer.totalHits).toBe(0);
    expect(destroyer.sunk).toBe(false);
  });

  test('hit() method increases ship.totalHits by 1', () => {
    const submarine = new Ship(2);
    submarine.hit();
    expect(submarine.totalHits).toBe(1);
  });

  test('isSunk() method returns false when hits less than ship.length', () => {
    const submarine = new Ship(2);
    submarine.hit();
    expect(submarine.isSunk()).toBe(false);
  });

  test('isSunk() method returns true when hits greater than or equal to ship.length', () => {
    const submarine = new Ship(2);
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(true);
  });
});
