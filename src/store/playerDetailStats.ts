import { create } from "zustand";

export interface PlayerInfoType {
  id: number;
  weight: string;
  height: string;
  pos: string;
}

export type PlayerInfoState = {
  open: boolean;
  playerInfo: PlayerInfoType;
};

export type PlayerInfoAction = {
  openModal: () => void;
  setPlayerNumber: (playerInfo: PlayerInfoType) => void;
};

const usePlayerInfo = create<PlayerInfoState & PlayerInfoAction>((set) => ({
  playerInfo: {
    id: 0,
    weight: "",
    height: "",
    pos: "",
  },
  open: false,
  openModal: () =>
    set((state) => ({
      open: !state.open,
    })),
  setPlayerNumber: (player) =>
    set((state) => ({
      ...state,
      playerInfo: player,
    })),
}));

export default usePlayerInfo;
