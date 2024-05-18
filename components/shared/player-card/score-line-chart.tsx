"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ScoreLineChartData = {
  week: string;
  score: number;
};

interface ScoreLineChartProps {
  scores: ScoreLineChartData[];
  height?: number | string;
}

export function ScoreLineChart({ scores, height }: ScoreLineChartProps) {
  return (
    <div>
      <p className="text-sm font-medium leading-none">Score History</p>
      <ResponsiveContainer width="100%" height={height ?? "100%"}>
        <LineChart
          data={scores}
          margin={{
            bottom: 0,
            right: 25,
            left: 0,
            top: 25,
          }}
        >
          <XAxis dataKey="week" />
          <YAxis dataKey="score" />
          <Line dataKey="score" stroke="#8884d8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            wrapperStyle={{ color: "transparent" }}
            labelStyle={{ color: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
