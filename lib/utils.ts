import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bufferToBase64 = (buffer: Buffer) =>
  `data:image/jpeg;base64,${buffer.toString("base64")}`;
