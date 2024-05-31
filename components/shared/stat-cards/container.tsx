import { v4 } from "uuid";
import { StatCard } from "./stat-card";

type Stat = number | string | null;

type StatVariants = { [variant: string]: Stat };

export type StatData = {
  displayName: string;
  variants: StatVariants | undefined;
};

interface StatCardsProps {
  stats: StatData[];
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {stats.map((stat) => (
        <StatCard key={v4()} stat={stat} className="flex-1" />
      ))}
    </div>
  );
}
