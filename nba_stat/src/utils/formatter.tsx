export const getDate = (date: string) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return `${month}월 ${day}일`;
};
