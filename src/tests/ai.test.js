import AI from '../scripts/ai';
import Player from '../scripts/player';

const allValidMoves = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    allValidMoves.push([i, j]);
  }
}

describe('AI', () => {
  test('Module exists', () => {
    expect(AI).toBeDefined();
  });

  test('Creates AI player', () => {
    const ai = new AI();
    expect(ai).toBeInstanceOf(AI);
    expect(ai.gameboard).toBeDefined();
    expect(ai.validMoves).toBeDefined();
  });

  test('Resets gameboard for new game', () => {
    const player = new Player();
    player.gameboard.placeShip(5, 'horizontal', [0, 0]);
    player.gameboard.receiveAttack([0, 0]);

    const ai = new AI();
    ai.gameboard.placeShip(5, 'horizontal', [0, 0]);
    ai.gameboard.receiveAttack([0, 0]);
    ai.gameboard.receiveAttack([1, 0]);

    const smarterAttack = ai.smarterAttack(
      ai.validMoves,
      player.gameboard.hits,
      player.gameboard.misses,
    );
    player.gameboard.receiveAttack(smarterAttack);

    ai.reset();
    expect(ai.gameboard.ships).toEqual([]);
    expect(ai.gameboard.hits).toEqual([]);
    expect(ai.gameboard.misses).toEqual([]);
    expect(ai.validMoves).toEqual(allValidMoves);
  });
});
