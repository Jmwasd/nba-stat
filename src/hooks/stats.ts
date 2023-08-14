import { APIv2 } from "@/consts/api";
import { GameStatsType, PlayerStatsType } from "@/types/stats";
import useSWR from "swr";

export const setGameStats = (id: string) => {
  const { data, isLoading, error } = useSWR<GameStatsType[]>(
    `${APIv2.gameStats}?id=${id}`
  );

  return { data, isLoading, error };
};

export const setPlayerStats = (id: string) => {
  const { data, isLoading, error } = useSWR<PlayerStatsType[]>(
    `${APIv2.playerStats}?game=${id}`
  );

  return { data, isLoading, error };
};
