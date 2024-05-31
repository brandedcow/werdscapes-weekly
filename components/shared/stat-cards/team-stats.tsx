import getTeamStatsById from "@/data/by-team-id/getTeamStatsById";
import { StatCards } from "./container";

export default async function TeamStats({ id }: { id: string }) {
  const { success, data } = await getTeamStatsById(id);

  if (!success || !data) {
    return null;
  }

  return <StatCards stats={data} />;
}
