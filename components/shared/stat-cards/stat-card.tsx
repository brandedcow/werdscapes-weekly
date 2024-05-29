"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { StatData } from "./container";
import { cn, toCapitalCase } from "@/lib/utils";

type StatCardProps = React.HTMLAttributes<HTMLDivElement> & {
  stat: StatData;
};

export function StatCard({ stat, className, ...props }: StatCardProps) {
  const { displayName, variants } = stat;
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [timeframeData] = useState(Object.entries(variants ?? {}));

  if (!variants) return null;

  if (timeframeData.length === 0) return null;

  const handleCardClick = () => {
    setCurrIdx((state) =>
      state + 1 > timeframeData.length - 1 ? 0 : state + 1
    );
  };

  const displayStat = timeframeData[currIdx][1];

  return (
    <Card
      className={cn("hover:cursor-pointer", className)}
      {...props}
      onClick={handleCardClick}
    >
      <CardHeader className="flex flex-col h-full justify-between">
        <CardDescription>{displayName}</CardDescription>
        <div className="space-y-1">
          <CardTitle className="pt-3">{displayStat}</CardTitle>
          <Separator />
          <CardDescription className="text-xs">
            {toCapitalCase(timeframeData[currIdx][0], { from: "camel_case" })}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
