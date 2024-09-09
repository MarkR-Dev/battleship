import Player from '../scripts/player';

describe('Player', () => {
  test('Module exists', () => {
    expect(Player).toBeDefined();
  });

  test('Creates a Player', () => {
    const player = new Player();
    expect(player).toBeInstanceOf(Player);
    expect(player.gameboard).toBeDefined();
  });

  test('Resets gameboard for new game', () => {
    const player = new Player();
    player.gameboard.placeShip(5, 'horizontal', [0, 0]);
    player.gameboard.receiveAttack([0, 0]);
    player.gameboard.receiveAttack([1, 0]);

    player.reset();
    expect(player.gameboard.ships).toEqual([]);
    expect(player.gameboard.hits).toEqual([]);
    expect(player.gameboard.misses).toEqual([]);
  });
});
