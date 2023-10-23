import { DETAIL_STATS, STATS } from '@/consts/stats';
import { StatsKeyType } from '@/types/common';
import { RecentMatchType } from '@/types/games';

export const getDateKr = (date: string | Date) => {
  const dates = new Date(date);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const day = dates.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const getStatsChangedKr = (stats: StatsKeyType, type?: 'detail') => {
  if (type !== 'detail' && DETAIL_STATS.includes(stats)) {
    return null;
  }

  return STATS[stats];
};

export const getRecentMatchData = (data: RecentMatchType[], date: string | null) => {
  if (date) {
    return data.reverse().slice(0, 12);
  }
  const recentMatchData = data.filter((el) => !!el.scores.home.points);

  return recentMatchData.reverse().slice(0, 12);
};

export const getHourKr = (date: string | Date) => {
  const dates = new Date(date);
  const hour = dates.toLocaleTimeString('ko-kr');

  return hour.slice(0, -3);
};
