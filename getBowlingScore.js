const STRIKE = 'X';
const SPARE = '/';
const MISS = '-';

function getBowlingScore(scoreString) {
  const scores = scoreString.split(' ');
  let doubledThrows = 0;
  return scores.reduce((total, frameString) => {
    let frameScore;
    if (doubledThrows > 1) {
      frameScore = getSingleFrameScore(frameString, true, true);
      doubledThrows -= 2;
    } else if (doubledThrows === 1) {
      frameScore = getSingleFrameScore(frameString, true);
      doubledThrows -= 1;
    } else {
      frameScore = getSingleFrameScore(frameString);
    }

    if (isSpare(frameString)) {
      doubledThrows += 1;
    }
    return total + frameScore;
  }, 0);
}

function getSingleFrameScore(frameString, doubleFirstThrow, doubleSecondThrow) {
  if (isStrike(frameString)) {
    return 10;
  }
  let frameTotal = 0;
  return frameString.split('').reduce((total, throwString, index) => {
    let throwScore;
    switch (throwString) {
      case (SPARE):
        throwScore = 10 - frameTotal;
        break;
      case (MISS):
        throwScore = 0;
        break;
      default:
        throwScore = parseInt(throwString, 10);
        frameTotal += throwScore;
        break;
    }
    if ((doubleFirstThrow && index === 0) || (doubleSecondThrow && index === 1)) {
      return total + (2 * throwScore);
    }
    return total + throwScore;
  }, 0);
}

function isStrike(frameString) {
  return frameString.includes(STRIKE);
}

function isSpare(frameString) {
  return frameString.includes(SPARE);
}

module.exports = getBowlingScore;
