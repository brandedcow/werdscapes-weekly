import { v4 } from "uuid";
import { TrendCard } from "../../trend-card";
import getTeamTrendsById from "@/data/getTeamTrendsById";

interface TeamTrendsInfoProps {
  teamId: string;
}

export async function TeamTrendsInfo({ teamId }: TeamTrendsInfoProps) {
  const { success, data } = await getTeamTrendsById(teamId);

  if (!success || !data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap gap-3">
        {Object.values(data).map(({ displayName, value }) => (
          <TrendCard
            key={v4()}
            name={displayName}
            value={value}
            className="flex flex-1"
          />
        ))}
      </div>
    </div>
  );
}
