import playerPerTeamData from "@/data/playerPerTeam.json";
import { PlayerNameType } from "./common";

// export type PlayerPerTeamType = typeof playerPerTeamData;
export type PlayerPerTeamResponseType = typeof playerPerTeamData.response;

export interface PlayerPerTeamType extends PlayerNameType {
  birth: {
    date: string;
    country: string;
  };
  nba: {
    start: number; // nba 시작연도
    pro: number;
  };
  college: string;
  affiliation: string;
  leagues: {
    standard: {
      jersey: number; // 등번호
      active: boolean; // 활동 여부
      pos: string;
    };
  };
}
