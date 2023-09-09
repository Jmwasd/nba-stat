import { ParsedUrlQuery } from 'querystring';

export interface GamePageQueryType extends ParsedUrlQuery {
  homeLineScore: string[];
  visitorLineScore: string[];
  homeTeamName: string;
  visitorTeamName: string;
  id: string;
}

export interface TeamPageQueryType extends ParsedUrlQuery {
  id: string;
}
