import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodTypeAny } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bufferToBase64 = (buffer: Buffer) =>
  `data:image/jpeg;base64,${buffer.toString("base64")}`;

export const toCapitalCase = (
  string: string,
  options?: { from: "camel_case" | "kebab-case" }
) => {
  const { from } = options || {};
  switch (from) {
    case "camel_case": {
      const spaced = string.replace(/([A-Z])/g, " $1");
      return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    }
    case "kebab-case": {
      const tokens = string.toLowerCase().split("-");
      return tokens.reduce((acc, curr, index) => {
        return `${acc}${index !== tokens.length && " "}${curr
          .charAt(0)
          .toUpperCase()}${curr.slice(1)}`;
      }, "");
    }
    default:
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

export const zodInputStringPipe = (zodPipe: ZodTypeAny) =>
  z
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: "Invalid Number",
    })
    .transform((value) => (value === null ? 0 : Number(value)))
    .pipe(zodPipe);
