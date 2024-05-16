import { ParseOCRTokenResult } from "@/lib/parseOCRTokens";
import { create } from "zustand";

type UploadFormStoreState = {
  data: ParseOCRTokenResult;
  place: string;
  setPlace: (place: string) => void;
  setData: (data: ParseOCRTokenResult) => void;
  clear: () => void;
};

export const useUploadFormStore = create<UploadFormStoreState>((set) => ({
  data: {},
  place: "0",
  setPlace: (place) => set((state) => ({ ...state, place })),
  setData: (data) => set((state) => ({ ...state, data })),
  clear: () => set((state) => ({ ...state, data: {}, place: "0" })),
}));
