import { StatsKeyType } from "@/types/common";

export const STATS: {
  [key in StatsKeyType]: string;
} = {
  game: "게임",
  fgm: "필드골 성공 개수",
  fga: "필드골 시도 개수",
  fgp: "필드골(%)",
  ftm: "자유투 성공 개수",
  fta: "자유투 시도 개수",
  ftp: "자유투(%)",
  tpm: "3점슛 성공 개수",
  tpa: "3점슛 시도 개수",
  tpp: "3점슛(%)",
  offReb: "공격 리바운드",
  defReb: "수비 리바운드",
  totReb: "리바운드",
  assists: "어시스트",
  pFouls: "파울",
  steals: "스틸",
  turnovers: "턴오버",
  blocks: "블락",
  points: "점수",
  min: "분",
  pos: "포지션",
};

export const DETAIL_STATS: Array<StatsKeyType> = [
  "fgm",
  "fga",
  "ftm",
  "fta",
  "tpm",
  "tpa",
  "offReb",
  "defReb",
];
