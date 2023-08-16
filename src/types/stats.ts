import { PlayerNameType, StatsKeyType, TeamType } from "./common";

export type StatsType = {
  [key in StatsKeyType]: number | string;
};

export interface GameStatsType {
  team: TeamType;
  statistics: Array<StatsType>;
}

export interface PlayerType {
  player: PlayerNameType;
  team: TeamType;
  game: {
    id: number;
  };
}

export type PlayerStatsType = PlayerType & StatsType;

export type TeamStatsType = { [key in StatsKeyType]: number | string };
