import APIv2 from '@/consts/api';
import { RecentMatchType } from '@/types/games';
import useSWR from 'swr';

const useRecentMatch = (date: string | null) => {
  const url = !date
    ? `${APIv2.game}?season=2022&league=standard`
    : `${APIv2.game}?season=2022&league=standard&date=${date}`;
  const { data, isLoading, error, mutate } = useSWR<RecentMatchType[]>(url);
  if (data) {
    const { length } = data;
    data.slice(length - 12);
    return {
      data: data.slice(length - 12).reverse(),
      isLoading,
      error,
      mutate,
    };
  }
  return { data, isLoading, error, mutate };
};

export default useRecentMatch;
