"use client";

import { Score } from "@prisma/client";
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
}

export function ScoreLineChart({ scores }: ScoreLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={scores}
        margin={{
          bottom: 15,
          right: 15,
          left: 0,
          top: 20,
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
  );
}
