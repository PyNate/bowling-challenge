const STRIKE = 'X';
const SPARE = '/';
const MISS = '-';

function getBowlingScore(scoreString) {
  const scores = scoreString.split(' ');
  return scores.reduce((total, frameString) => {
    const frameScore = getSingleFrameScore(frameString);
    return total + frameScore;
  }, 0);
}

function getSingleFrameScore(frameString) {
  if (isStrike(frameString) || isSpare(frameString)) {
    return 10;
  }
  return frameString.split('').reduce((total, throwString) => {
    if (throwString === MISS) {
      return total;
    }
    return total + parseInt(throwString, 10);
  }, 0);
}

function isStrike(frameString) {
  return frameString.includes(STRIKE);
}

function isSpare(frameString) {
  return frameString.includes(SPARE);
}

module.exports = getBowlingScore;
