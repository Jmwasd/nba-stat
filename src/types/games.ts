import { DateType, ScoresType, TeamType } from './common';

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

export interface RecentMatchType {
  id: number;
  teams: {
    visitors: TeamType;
    home: TeamType;
  };
  scores: {
    visitors: {
      linescore: string[];
      points: number;
    };
    home: {
      linescore: string[];
      points: number;
    };
  };
  date: DateType;
  status: {
    clock: null | string;
    halftime: boolean;
    short: number;
    long: 'In Play' | 'Finished';
  };
}
