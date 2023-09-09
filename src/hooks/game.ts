import APIv2 from '@/consts/api';
import { RecentMatchType } from '@/types/games';
import useSWR from 'swr';

const useRecentMatch = (date: string | null) => {
  const url = !date ? APIv2.game : `${APIv2.game}&date=${date}`;
  const { data, isLoading, error, mutate } = useSWR<RecentMatchType[]>(url);
  if (data) {
    const { length } = data;
    data.slice(length - 10);
    return {
      data: data.slice(length - 10).reverse(),
      isLoading,
      error,
      mutate,
    };
  }
  return { data, isLoading, error, mutate };
};

export default useRecentMatch;
