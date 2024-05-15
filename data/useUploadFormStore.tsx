import { ParseOCRTokenResult } from "@/lib/parseOCRTokens";
import { create } from "zustand";

type UploadFormStoreState = {
  data: ParseOCRTokenResult;
  setData: (data: ParseOCRTokenResult) => void;
  clear: () => void;
};

export const useUploadFormStore = create<UploadFormStoreState>((set) => ({
  data: {},
  setData: (uploads) => set((state) => ({ ...state, data: uploads })),
  clear: () => set((state) => ({ ...state, data: {} })),
}));
