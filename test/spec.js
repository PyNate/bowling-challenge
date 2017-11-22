const { expect } = require('chai');
const getBowlingScore = require('../getBowlingScore');

describe('getBowlingScore', () => {
  it('should be a function', () => {
    expect(typeof getBowlingScore).to.equal('function');
  });

  it('can calculate a basic game', () => {
    const testGame = '12 34 12 34 12 34 12 34 12 34'; // 50
    expect(getBowlingScore(testGame)).to.equal(50);
  });

  it('can calculate a perfect game', () => {
    const testGame = 'X X X X X X X X X X X X'; // 300
    expect(getBowlingScore(testGame)).to.equal(300);
  });

  it('can calculate a game with misses', () => {
    const testGame = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-'; // 90
    expect(getBowlingScore(testGame)).to.equal(90);
  });

  it('can calculate a game with spares', () => {
    const testGame = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5'; // 150
    expect(getBowlingScore(testGame)).to.equal(150);
  });

  it('can calculate a game with all types', () => {
    const testGame = '12 3- 4/ 51 X 72 8- X -9 3/-'; // 101
    expect(getBowlingScore(testGame)).to.equal(101);
  });

  it('can calculate a strike in the 10th frame', () => {
    const testGame = '12 3- 4/ 51 X 72 8- X -9 X 9/'; // 111
    expect(getBowlingScore(testGame)).to.equal(111);
  });

  it('can calculate two strikes in the 10th frame', () => {
    const testGame = 'X X X X X X X X X X X 9'; // 299
    expect(getBowlingScore(testGame)).to.equal(299);
  });
});

describe('getBowlingScore validation', () => {
  it('throws an incomplete game error if there are too few frames', () => {
    const testGame = '9- 9- 9- 9- 9- 9-';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('incomplete game');
  });

  it('throws an incomplete game error if bonus throws are missing', () => {
    const testGame = 'X X X X X X X X X X X';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('incomplete game');
  });

  it('throws an invalid game error if too many frames are submitted', () => {
    const testGame = 'X X X X X X X X X X X X X';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid game');
  });

  it('throws an invalid frame error if a character is invalid', () => {
    const testGame = 'X A X X X X X X X X X X';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });

  it('throws an invalid frame error if a frame is incomplete', () => {
    const testGame = '9- 9- 9- 9- 9 9- 9- 9- 9- 9-';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });

  it('throws an invalid frame error if a frame counts too many pins', () => {
    const testGame = '9- 9- 9- 9- 98 9- 9- 9- 9- 9-';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });

  it('throws an invalid frame error if a bonus spare throw is missing', () => {
    const testGame = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });

  it('throws an invalid frame error if a spare is recorded for the first throw', () => {
    const testGame = '5/ 5/ 5/ /5 5/ 5/ 5/ 5/ 5/ 5/5';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });

  it('throws an invalid frame error if a frame has too many throws', () => {
    const testGame = '5/ 5/ 5/ 5/ 5/ 5/5 5/ 5/ 5/ 5/5';
    let testError;
    try {
      getBowlingScore(testGame);
    } catch (e) {
      testError = e;
    }
    expect(testError.message).to.equal('invalid frame');
  });
});
