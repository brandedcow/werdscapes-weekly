import { cn } from "@/lib/utils";
import { ReactElement } from "react";

type CardLabelProps = {
  label: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function CardLabel({ label, className }: CardLabelProps) {
  return (
    <h3 className={cn("mt-4 text-sm font-medium leading-none", className)}>
      {label}
    </h3>
  );
}
