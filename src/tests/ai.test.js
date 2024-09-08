import AI from '../scripts/ai';

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
});
