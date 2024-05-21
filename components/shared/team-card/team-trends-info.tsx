import { v4 } from "uuid";
import { TrendCard } from "../trend-card";
import getTeamTrendsById from "@/data/by-team-id/getTeamTrendsById";
import { StatCards } from "../stat-cards/container";

interface TeamTrendsInfoProps {
  teamId: string;
}

export async function TeamTrendsInfo({ teamId }: TeamTrendsInfoProps) {
  const { success, data } = await getTeamTrendsById(teamId);

  if (!success || !data) {
    return null;
  }

  return <StatCards stats={data} />;
}
