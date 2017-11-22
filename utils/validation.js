const { STRIKE } = require('../constants/throwConstants');

module.exports = {
  isValidFrame(frameString, index) {
    if (index < 9) {
      return frameString.match(/^([X]|(\d|[-]){2}|((\d|[-]){1}[/]))$/);
    }
    if (index === 11) {
      return frameString.match(/^([X]|(\d|[-]){1})$/);
    }
    return frameString.match(/^([X]|(\d|[-]){2}|((\d|[-]){1}[/](\d|[-X])?))$/);
  },

  isValidGameLength(frames) {
    if (frames.length < 10 || frames.length > 12) {
      return false;
    }
    if (frames.length === 10) {
      return frames[9] !== STRIKE;
    }
    if (frames.length === 11) {
      return frames[9] === STRIKE && frames[10] !== STRIKE;
    }
    if (frames.length === 12) {
      return frames[9] === STRIKE && frames[10] === STRIKE;
    }
    return true;
  },
};
