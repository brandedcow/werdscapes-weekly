import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileState = {
  playerName: string;
  teamName: string;
  setPlayerName: (input: string) => void;
  setTeamName: (input: string) => void;
};

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      playerName: "",
      teamName: "",
      setPlayerName: (input: string) =>
        set((state) => ({ ...state, playerName: input })),
      setTeamName: (input: string) =>
        set((state) => ({ ...state, teamName: input })),
    }),
    {
      name: "profile-store",
    }
  )
);

export default useProfileStore;
