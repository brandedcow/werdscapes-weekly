import { ParseOCRTokenResult } from "@/lib/parseOCRTokens";
import { Player, Team } from "@prisma/client";
import { create } from "zustand";

type UploadFormStoreState = {
  data: ParseOCRTokenResult | null;
  place: string | null;
  team: Team | null;
  player: Player | null;

  setPlace: (place: string) => void;
  setData: (data: ParseOCRTokenResult) => void;
  setTeam: (team: Team) => void;
  setPlayer: (player: Player) => void;

  clear: () => void;
};

export const useUploadFormStore = create<UploadFormStoreState>((set) => ({
  data: null,
  place: null,
  team: null,
  player: null,
  setPlace: (place) => set((state) => ({ ...state, place })),
  setData: (data) => set((state) => ({ ...state, data })),
  setTeam: (team) => set((state) => ({ ...state, team })),
  setPlayer: (player) => set((state) => ({ ...state, player })),
  clear: () =>
    set((state) => ({ ...state, data: null, place: null, team: null })),
}));
