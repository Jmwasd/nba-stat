export type StatsKeyType =
  | 'game'
  | 'fgp'
  | 'ftp'
  | 'tpp'
  | 'totReb'
  | 'assists'
  | 'pFouls'
  | 'steals'
  | 'turnovers'
  | 'blocks'
  | 'fgm'
  | 'fga'
  | 'ftm'
  | 'fta'
  | 'tpm'
  | 'tpa'
  | 'offReb'
  | 'defReb'
  | 'points'
  | 'pos'
  | 'min';

export type TeamCodeType =
  | 'DEN'
  | 'MIL'
  | 'BOS'
  | 'PHI'
  | 'MIN'
  | 'OKC'
  | 'UTA'
  | 'POR'
  | 'SAC'
  | 'PHX'
  | 'LAC'
  | 'GSW'
  | 'LAL'
  | 'MEM'
  | 'NOP'
  | 'DAL'
  | 'HOU'
  | 'SAS'
  | 'NYK'
  | 'BKN'
  | 'TOR'
  | 'MIL'
  | 'CLE'
  | 'CHI'
  | 'IND'
  | 'DET'
  | 'ATL'
  | 'MIA'
  | 'WAS'
  | 'ORL'
  | 'CHA';

export interface PlayerNameType {
  id: number;
  firstname: string;
  lastname: string;
}

export interface TeamType {
  id: number;
  name: string;
  nickname: string;
  code: TeamCodeType;
  logo: string;
}

export interface DateType {
  start: string;
  end: string | null;
  duration: string;
}

export interface ScoresType {
  win: number;
  loss: number;
  series: {
    win: number;
    loss: number;
  };
  linescore: string[];
  points: number;
}

export type ConferenceType = 'east' | 'west';
