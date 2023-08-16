import { APIv2 } from "@/consts/api";
import { ConferenceType } from "@/types/common";
import { ConferenceStandingResponseType } from "@/types/teams";
import useSWR from "swr";

export const setConferenceStanding = (
  conferenceName: ConferenceType,
  teamId?: string
) => {
  const url = teamId
    ? `${APIv2.standing}&conference=${conferenceName}&team=${teamId}`
    : `${APIv2.standing}&conference=${conferenceName}`;

  const { data, isLoading, error } =
    useSWR<ConferenceStandingResponseType[]>(url);

  return { data, isLoading, error };
};
