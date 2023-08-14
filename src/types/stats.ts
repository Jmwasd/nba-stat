export type StatsKeyType =
  | "game"
  | "fgp"
  | "ftp"
  | "tpp"
  | "totReb"
  | "assists"
  | "pFouls"
  | "steals"
  | "turnovers"
  | "blocks"
  | "fgm"
  | "fga"
  | "ftm"
  | "fta"
  | "tpm"
  | "tpa"
  | "offReb"
  | "defReb"
  | "points"
  | "pos"
  | "min";

export type StatsType = {
  [key in StatsKeyType]: number | string;
};

export interface TeamType {
  id: number;
  name: string;
  nickname: string;
  code: string;
  logo: string;
}

export interface GameStatsType {
  team: TeamType;
  statistics: Array<StatsType>;
}

export interface PlayerNameType {
  id: number;
  firstname: string;
  lastname: string;
}
export interface PlayerType {
  player: PlayerNameType;
  team: TeamType;
  game: {
    id: number;
  };
}

export type PlayerStatsType = PlayerType & StatsType;
