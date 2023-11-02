import APIv2 from '@/consts/api';
import { RecentMatchType } from '@/types/games';
import { getRecentMatchData } from '@/utils/formatter';
import useSWR from 'swr';

const useRecentMatch = (date: string | null) => {
  const url = !date
    ? `${APIv2.game}?season=2023&league=standard`
    : `${APIv2.game}?season=2023&league=standard&date=${date}`;
  const { data, isLoading, error, mutate } = useSWR<RecentMatchType[]>(url);

  if (data) {
    return {
      data: getRecentMatchData(data, date),
      isLoading,
      error,
      mutate,
    };
  }
  return { data, isLoading, error, mutate };
};

export default useRecentMatch;
