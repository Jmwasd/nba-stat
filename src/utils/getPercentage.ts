const getWinPercentage = (win: number, loss: number) => {
  const sum = win + loss;
  const percentage = Number(((win / sum) * 1000).toFixed()) / 1000;

  return percentage;
};

export default getWinPercentage;
