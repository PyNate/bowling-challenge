const { expect } = require('chai');
const getBowlingScore = require('../getBowlingScore');

describe('getBowlingScore v1', () => {
  it('should be a function', () => {
    expect(typeof getBowlingScore).to.equal('function');
  });

  it('can calculate a basic game', () => {
    const BASIC_GAME = '12 34 12 34 12 34 12 34 12 34'; // 50
    expect(getBowlingScore(BASIC_GAME)).to.equal(50);
  });

  it('can calculate a perfect game', () => {
    const PERFECT_GAME = 'X X X X X X X X X X X X'; // 300
    expect(getBowlingScore(PERFECT_GAME)).to.equal(300);
  });

  it('can calculate a game with misses', () => {
    const WITH_MISSES = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-'; // 90
    expect(getBowlingScore(WITH_MISSES)).to.equal(90);
  });

  it('can calculate a game with spares', () => {
    const WITH_SPARES = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5'; // 150
    expect(getBowlingScore(WITH_SPARES)).to.equal(150);
  });

  it('can calculate a game with all types', () => {
    const TEST_GAME = '12 3- 4/ 51 X 72 8- X -9 3/-'; // 101
    expect(getBowlingScore(TEST_GAME)).to.equal(101);
  });

  it('can calculate a strike in the 10th frame', () => {
    const TEST_GAME_2 = '12 3- 4/ 51 X 72 8- X -9 X 9/'; // 111
    expect(getBowlingScore(TEST_GAME_2)).to.equal(111);
  });

  it('can calculate two strikes in the 10th frame', () => {
    const ALMOST_PERFECT_GAME = 'X X X X X X X X X X X 9'; // 299
    expect(getBowlingScore(ALMOST_PERFECT_GAME)).to.equal(299);
  });
});
