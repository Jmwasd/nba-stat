import { create } from "zustand";

import { ConferenceStandingResponseType } from "@/types/teams";

type ConferenceStandingState = {
  east: ConferenceStandingResponseType[];
  west: ConferenceStandingResponseType[];
};

type ConferenceStandingAction = {
  updateConference: (
    east: ConferenceStandingState["east"],
    west: ConferenceStandingState["west"]
  ) => void;
};

const useConferenceStandingStore = create<
  ConferenceStandingState & ConferenceStandingAction
>((set) => ({
  west: [],
  east: [],
  updateConference: (west, east) => set(() => ({ west, east })),
}));

export default useConferenceStandingStore;
