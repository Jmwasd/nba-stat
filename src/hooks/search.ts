import { APIv2 } from "@/consts/api";
import { PlayerPerTeamType } from "@/types/players";
import useSWR from "swr";

export const useSearchPlayer = (id: number) => {
  const { data, isLoading, error } = useSWR<PlayerPerTeamType[]>(
    `${APIv2.searchPlayer}?id=${id}`
  );

  return { data, isLoading, error };
};
