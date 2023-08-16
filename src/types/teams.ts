import { StatsKeyType } from "./common";

export interface ConferenceStandingResponseType {
  league: string;
  season: number;
  team: {
    id: number;
    name: string;
    nickname: string;
    code: string;
    logo: string;
  };
  conference: {
    name: string;
    rank: number;
    win: number;
    loss: number;
  };
  division: {
    name: string;
    rank: number;
    win: number;
    loss: number;
    gamesBehind: null | string;
  };
  win: {
    home: number;
    away: number;
    total: number;
    percentage: string;
    lastTen: number;
  };
  loss: {
    home: number;
    away: number;
    total: number;
    percentage: string;
    lastTen: number;
  };
  gamesBehind: null | string;
  streak: number;
  winStreak: boolean;
  tieBreakerPoints: null;
}

export interface ConferenceStandingTypes {
  get: string;
  parameters: {
    league: string;
    conference: string;
    season: string;
  };
  errors: never[];
  results: number;
  response: Array<ConferenceStandingResponseType>;
}

export type TeamStatsType = { [key in StatsKeyType]: number | string };
