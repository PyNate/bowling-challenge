const STRIKE = 'X';
const SPARE = '/';
const MISS = '-';

const INVALID_GAME_ERROR = 'invalid game';
const INVALID_FRAME_ERROR = 'invalid frame';
const INCOMPLETE_GAME_ERROR = 'incomplete game';

function getBowlingScore(gameString) {
  const frames = gameString.split(' ');
  if (frames.length < 10) {
    throw new Error(INCOMPLETE_GAME_ERROR);
  }
  if (frames.length > 12) {
    throw new Error(INVALID_GAME_ERROR);
  }
  let doubledThrows = 0;
  let tripleNextThrow;

  return frames.reduce((total, frameString, index) => {
    if (!isValidFrame(frameString, index)) {
      console.log(frameString);
      throw new Error(INVALID_FRAME_ERROR);
    }
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

function isValidFrame(frameString, index) {
  if (index < 9) {
    return frameString.match(/^([X]|(\d|[-]){2}|((\d|[-]){1}[/]))$/);
  }
  if (index === 11) {
    return frameString.match(/^([X]|(\d|[-]){1})$/);
  }
  return frameString.match(/^([X]|(\d|[-]){2}|((\d|[-]){1}[/](\d|[-X])?))$/);
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

    if ((!isSpare(frameString) && frameTotal > 10) || (isSpare(frameString) && frameTotal > 20)) {
      throw new Error(INVALID_FRAME_ERROR);
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
