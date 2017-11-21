module.exports = (scoreString) => {
  const scores = scoreString.split(' ');
  return scores.reduce((total, frameString) => {
    const frame = frameString.split('');
    const frameScore = frame.reduce((frameTotal, throwString) => {
      const throwScore = parseInt(throwString, 10);
      return frameTotal + throwScore;
    }, 0);
    return total + frameScore;
  }, 0);
};
