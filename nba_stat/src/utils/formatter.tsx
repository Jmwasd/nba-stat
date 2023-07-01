export const getDate = (date: string) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return `${month}월 ${day}일`;
};

export const getDatePicker = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  return `${year}-${month}-${day}`;
};
