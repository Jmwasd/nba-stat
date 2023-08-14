import { ParsedUrlQuery } from "querystring";

export interface GamePageType extends ParsedUrlQuery {
  homeLineScore: string[];
  visitorLineScore: string[];
  homeTeamName: string;
  visitorTeamName: string;
  id: string;
}
