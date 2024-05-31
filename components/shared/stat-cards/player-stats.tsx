import getPlayerStatsById from "@/data/by-player-id/getPlayerStatsById";
import { StatCards } from "./container";

export async function PlayerStats({ id }: { id: string }) {
  const { success, data } = await getPlayerStatsById(id);

  if (!success || !data) {
    return null;
  }

  return <StatCards stats={data} />;
}
