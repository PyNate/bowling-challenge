const { expect } = require('chai');
const getBowlingScore = require('../getBowlingScore');

// console.log(getBowlingScore);
// const PERFECT_GAME = 'X X X X X X X X X X X X';
// const ALL_NINES = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-';
// const WITH_SPARES = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5';

describe('getBowlingScore v1', () => {
  it('should be a function', () => {
    expect(typeof getBowlingScore).to.equal('function');
  });

  it('can calculate a perfect game', () => {
  });
});
