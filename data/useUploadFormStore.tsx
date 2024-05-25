import { ParseOCRTokenResult } from "@/lib/parseOCRTokens";
import { Team } from "@prisma/client";
import { create } from "zustand";

type UploadFormStoreState = {
  data: ParseOCRTokenResult | null;
  place: string | null;
  team: Team | null;
  setPlace: (place: string) => void;
  setData: (data: ParseOCRTokenResult) => void;
  setTeam: (team: Team) => void;
  clear: () => void;
};

export const useUploadFormStore = create<UploadFormStoreState>((set) => ({
  data: null,
  place: null,
  team: null,
  setPlace: (place) => set((state) => ({ ...state, place })),
  setData: (data) => set((state) => ({ ...state, data })),
  setTeam: (team) => set((state) => ({ ...state, team })),
  clear: () =>
    set((state) => ({ ...state, data: null, place: null, team: null })),
}));
