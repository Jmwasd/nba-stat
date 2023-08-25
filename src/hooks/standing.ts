import { APIv2 } from "@/consts/api";
import { ConferenceType } from "@/types/common";
import { ConferenceStandingResponseType } from "@/types/teams";
import { getWinPercentage } from "@/utils/getPercentage";
import useSWR from "swr";

export const useConferenceStanding = (conference: ConferenceType) => {
  const { data, isLoading, error } = useSWR<ConferenceStandingResponseType[]>(
    `${APIv2.standing}&conference=${conference}`
  );

  const getSortedRank = () => {
    return data?.sort((a, b) => {
      const aPercentage = getWinPercentage(
        a.win.away + a.win.home,
        a.loss.away + a.loss.home
      );
      const bPercentage = getWinPercentage(
        b.win.away + b.win.home,
        b.loss.away + b.loss.home
      );

      return bPercentage - aPercentage;
    });
  };

  return { data: getSortedRank(), isLoading, error };
};

export const useTeamRank = (teamId: string) => {
  const { data, isLoading, error } = useSWR<ConferenceStandingResponseType[]>(
    `${APIv2.standing}&team=${teamId}`
  );

  return { data, isLoading, error };
};
