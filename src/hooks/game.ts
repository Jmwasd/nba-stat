import { APIv2 } from "@/consts/api";
import { RecentMatchType } from "@/types/games";
import useSWR from "swr";

export const useRecentMatch = (date: string) => {
  const { data, isLoading, error, mutate } = useSWR<RecentMatchType[]>(
    `${APIv2.game}&date=${date}`
  );

  return { data, isLoading, error, mutate };
};
