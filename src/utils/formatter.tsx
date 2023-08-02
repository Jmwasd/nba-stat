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
  const day = today.getDay();

  return `${year}-${month}-${day}`;
};

export const getStatsChangedKr = (stats: string, type?: "detail") => {
  const DETAIL_STATS = [
    "fgm",
    "fga",
    "ftm",
    "fta",
    "tpm",
    "tpa",
    "offReb",
    "defReb",
  ];
  if (type !== "detail" && DETAIL_STATS.includes(stats)) {
    return "error";
  }
  switch (stats) {
    case "game":
      return "게임";
    case "fgm":
      return "필드골 성공 개수";
    case "fga":
      return "필드골 시도 개수";
    case "fgp":
      return "필드골(%)";
    case "ftm":
      return "자유투 성공 개수";
    case "fta":
      return "자유투 성공 개수";
    case "ftp":
      return "자유투(%)";
    case "tpm":
      return "3점슛 성공 개수";
    case "tpa":
      return "3점슛 시도 개수";
    case "tpp":
      return "3점슛(%)";
    case "offReb":
      return "공격 리바운드";
    case "defReb":
      return "수비 리바운드";
    case "totReb":
      return "리바운드";
    case "assists":
      return "어시스트";
    case "pFouls":
      return "파울";
    case "steals":
      return "스틸";
    case "turnovers":
      return "턴오버";
    case "blocks":
      return "블락";
    default:
      return "error";
  }
};
