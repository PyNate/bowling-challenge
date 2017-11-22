const STRIKE = 'X';
const SPARE = '/';
const MISS = '-';

function getBowlingScore(gameString) {
  const frames = gameString.split(' ');
  let doubledThrows = 0;
  let tripleNextThrow;

  return frames.reduce((total, frameString, index) => {
    const framePins = getFramePins(frameString);
    let bonusPins = 0;

    if (tripleNextThrow) {
      // first throw tripled, second throw doubled
      bonusPins = framePins + getFirstThrowPins(frameString);
      tripleNextThrow = false;
      if (!isStrike(frameString)) {
        doubledThrows -= 1;
      }
    } else if (doubledThrows > 1) {
      // both throws doubled
      bonusPins = framePins;
      doubledThrows -= 1;
      if (!isStrike(frameString)) {
        doubledThrows -= 1;
      }
    } else if (doubledThrows === 1) {
      // first throw doubled
      bonusPins = getFirstThrowPins(frameString);
      doubledThrows -= 1;
    }

    // Set flags for following frame
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
      // only bonus pins count for bonus throws
      return total + bonusPins;
    }

    return total + framePins + bonusPins;
  }, 0);
}

function getFramePins(frameString) {
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

function getFirstThrowPins(frameString) {
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
