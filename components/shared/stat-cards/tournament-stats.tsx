import getTournamentStatsById from "@/data/by-tournament-id/getTournamentStatsById";
import { StatCards } from "./container";

export async function TournamentStats({ id }: { id: string }) {
  const { success, data } = await getTournamentStatsById(id);

  if (!success || !data) {
    return null;
  }

  return (
    <div>
      <StatCards stats={data} />
    </div>
  );
}
