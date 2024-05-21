import getPlayerTrendsById from "@/data/by-player-id/getPlayerTrendsById";
import { TrendCard } from "../trend-card";
import { v4 } from "uuid";
import { StatCards } from "../stat-cards/container";

interface TrendsInfoProps {
  playerId: string;
}

export async function PlayerTrendsInfo({ playerId }: TrendsInfoProps) {
  const { success, data } = await getPlayerTrendsById(playerId);

  if (!success || !data) {
    return null;
  }

  return <StatCards stats={data} />;
}
