import { create } from "zustand";

export interface PlayerInfoType {
  id: number;
  pos: string;
}

export type PlayerInfoState = {
  open: boolean;
  playerInfo: PlayerInfoType;
};

export type PlayerInfoAction = {
  openModal: () => void;
  setPlayerInfo: (playerInfo: PlayerInfoType) => void;
};

const usePlayerInfo = create<PlayerInfoState & PlayerInfoAction>((set) => ({
  playerInfo: {
    id: 0,
    pos: "",
  },
  open: false,
  openModal: () =>
    set((state) => ({
      open: !state.open,
    })),
  setPlayerInfo: (player) =>
    set((state) => ({
      ...state,
      playerInfo: player,
    })),
}));

export default usePlayerInfo;
