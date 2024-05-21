import getPlayerTrendsById from "@/data/getPlayerTrendsById";
import { TrendCard } from "../trend-card";
import { v4 } from "uuid";

interface TrendsInfoProps {
  playerId: string;
}

export async function TrendsInfo({ playerId }: TrendsInfoProps) {
  const { success, data } = await getPlayerTrendsById(playerId);

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
