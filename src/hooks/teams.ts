import APIv2 from '@/consts/api';
import { TeamScheduleType } from '@/types/games';
import { PlayerPerTeamType } from '@/types/players';
import { TeamStatsType } from '@/types/stats';
import useSWR from 'swr';

export const useTeamStats = (id: string) => {
  const { data, isLoading, error } = useSWR<TeamStatsType[]>(`${APIv2.teamsStats}&id=${id}`);

  return { data, isLoading, error };
};

export const useTeamSchedule = (id: string) => {
  const { data, isLoading, error } = useSWR<TeamScheduleType[]>(`${APIv2.game}&team=${id}`);

  return { data, isLoading, error };
};

export const useTeamPlayer = (id: string) => {
  const { data, isLoading, error } = useSWR<PlayerPerTeamType[]>(`${APIv2.player}&team=${id}`);

  const teamPlayer = data?.filter((el) => {
    if (!el.birth.date || !el.nba.start || !el.leagues.standard.jersey) {
      return false;
    }
    return true;
  });

  return { data: teamPlayer, isLoading, error };
};
