import { create } from "zustand";

export type ProfileState = {
  playerName: string;
  teamName: string;
  setPlayerName: (input: string) => void;
  setTeamName: (input: string) => void;
};

const useProfileStore = create<ProfileState>((set) => ({
  playerName: "",
  teamName: "",
  setPlayerName: (input: string) =>
    set((state) => ({ ...state, playerName: input })),
  setTeamName: (input: string) =>
    set((state) => ({ ...state, teamName: input })),
}));

export default useProfileStore;
