import teamScheduleData from "@/data/teamSchedule.json";
import { DateType, ScoresType, TeamType } from "./common";

export type TeamScheduleResponseType = typeof teamScheduleData.response;

export interface TeamScheduleType {
  id: number;
  league: string;
  season: number;
  date: DateType;
  stage: number;
  teams: {
    visitors: TeamType;
    home: TeamType;
  };
  scores: {
    visitors: ScoresType;
    home: ScoresType;
  };
}
