import APIv2 from '@/consts/api';
import { GameStatsType, PlayerStatsType } from '@/types/stats';
import useSWR from 'swr';

export const useGameStats = (id: string) => {
  const { data, isLoading, error } = useSWR<GameStatsType[]>(`${APIv2.gameStats}?id=${id}`);

  return { data, isLoading, error };
};

export const usePlayerStats = (id: string) => {
  const { data, isLoading, error } = useSWR<PlayerStatsType[]>(
    `${APIv2.playerStats}?season=2023&game=${id}`,
  );
  return { data, isLoading, error };
};

export const usePlayerDetailStats = (id: number) => {
  const { data, isLoading, error } = useSWR<PlayerStatsType[]>(
    `${APIv2.playerStats}?season=2023&id=${id}`,
  );

  return { data, isLoading, error };
};
