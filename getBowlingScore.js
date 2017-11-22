const STRIKE = 'X';
const SPARE = '/';
const MISS = '-';

function getBowlingScore(scoreString) {
  const scores = scoreString.split(' ');
  let doubledThrows = 0;
  let tripleNextThrow;
  return scores.reduce((total, frameString, index) => {
    let frameScore = getSingleFrameScore(frameString);
    if (tripleNextThrow) {
      frameScore = (frameScore * 2) + getFirstThrow(frameString);
      tripleNextThrow = false;
      if (!isStrike(frameString)) {
        doubledThrows -= 1;
      }
    } else if (doubledThrows > 1) {
      frameScore *= 2;
      doubledThrows -= 1;
      if (!isStrike(frameString)) {
        doubledThrows -= 1;
      }
    } else if (doubledThrows === 1) {
      frameScore += getFirstThrow(frameString);
      doubledThrows -= 1;
    }

    if (isSpare(frameString)) {
      doubledThrows += 1;
    }
    if (isStrike(frameString) && index < 10) {
      if (doubledThrows) {
        tripleNextThrow = true;
        doubledThrows += 1;
      } else {
        doubledThrows += 2;
      }
    }

    if (index > 9) {
      frameScore -= getSingleFrameScore(frameString);
    }

    return total + frameScore;
  }, 0);
}

function getSingleFrameScore(frameString) {
  if (isStrike(frameString)) {
    return 10;
  }
  let frameTotal = 0;
  return frameString.split('').reduce((total, throwString) => {
    let throwScore;
    switch (throwString) {
      case (MISS):
        throwScore = 0;
        break;
      case (SPARE):
        throwScore = 10 - frameTotal;
        break;
      default:
        throwScore = parseInt(throwString, 10);
        frameTotal += throwScore;
        break;
    }
    return total + throwScore;
  }, 0);
}

function getFirstThrow(frameString) {
  if (isStrike(frameString)) {
    return 10;
  }
  const throws = frameString.split('');
  const firstThrow = throws[0];
  if (firstThrow === MISS) {
    return 0;
  }
  return parseInt(firstThrow, 10);
}

function isStrike(frameString) {
  return frameString.includes(STRIKE);
}

function isSpare(frameString) {
  return frameString.includes(SPARE);
}

module.exports = getBowlingScore;
