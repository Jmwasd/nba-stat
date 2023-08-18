import { APIv2 } from "@/consts/api";
import { GameStatsType, PlayerStatsType } from "@/types/stats";
import { useRouter } from "next/router";
import useSWR from "swr";

export const useGameStats = (id: string) => {
  const { data, isLoading, error } = useSWR<GameStatsType[]>(
    `${APIv2.gameStats}?id=${id}`
  );

  return { data, isLoading, error };
};

export const usePlayerStats = (id: string) => {
  const { data, isLoading, error } = useSWR<PlayerStatsType[]>(
    `${APIv2.playerStats}?game=${id}`
  );

  // const router = useRouter();
  // router.push("/error");

  return { data, isLoading, error };
};
