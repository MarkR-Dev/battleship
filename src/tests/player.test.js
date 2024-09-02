import Player from '../scripts/player';

describe('Player', () => {
  test('Module exists', () => {
    expect(Player).toBeDefined();
  });

  test('Creates a Player', () => {
    const playerOne = new Player();
    expect(playerOne).toBeInstanceOf(Player);
    expect(playerOne.gameboard).toBeDefined();
  });
});
