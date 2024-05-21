import { v4 } from "uuid";
import { StatCard } from "./stat-card";

type Stat = number | string | null;

type StatTimeframes = { [timeframe: string]: Stat };

export type StatData = {
  displayName: string;
  timeframes: StatTimeframes | undefined;
  type: "number" | "percent";
};

interface StatCardsProps {
  stats: StatData[];
}

// const sampleStats: StatData[] = [
//   {
//     displayName: "Avg Total Stars",
//     timeframes: {
//       lastMonth: 3000,
//       allTime: 2000,
//     },
//     type: "number",
//   },
//   {
//     displayName: "Participation%",
//     timeframes: {
//       lastMonth: 51,
//       allTime: 2000,
//     },
//     type: "percent",
//   },
// ];

export function StatCards({ stats }: StatCardsProps) {
  console.log(stats);
  return (
    <div className="flex gap-3 flex-wrap">
      {stats.map((stat) => (
        <StatCard key={v4()} stat={stat} className="flex-1" />
      ))}
    </div>
  );
}
