import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlayerTrendsInfo } from "./player-card/player-trends-info";
import { TournamentStats } from "./stat-cards/tournament-stats";
import { TeamTrendsInfo } from "./team-card/team-trends-info";

export function QuickGlanceCard({
  id,
  type,
}: {
  type?: "team" | "individual" | "tournament";
  id?: string;
}) {
  if (!id) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Glance</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "team" ? (
          <TeamTrendsInfo teamId={id} />
        ) : type === "tournament" ? (
          <TournamentStats id={id} />
        ) : (
          <PlayerTrendsInfo playerId={id} />
        )}
      </CardContent>
    </Card>
  );
}
