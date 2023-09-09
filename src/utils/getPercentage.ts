const getWinPercentage = (win: number, loss: number) => {
  const sum = win + loss;
  const percentage = ((win / sum) * 1000).toFixed();

  return Number(percentage);
};

export default getWinPercentage;
