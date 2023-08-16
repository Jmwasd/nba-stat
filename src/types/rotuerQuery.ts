import { ParsedUrlQuery } from "querystring";
import { ConferenceType } from "./common";

export interface GamePageQueryType extends ParsedUrlQuery {
  homeLineScore: string[];
  visitorLineScore: string[];
  homeTeamName: string;
  visitorTeamName: string;
  id: string;
}

export interface TeamPageQueryType extends ParsedUrlQuery {
  conferenceName: ConferenceType;
  id: string;
}
